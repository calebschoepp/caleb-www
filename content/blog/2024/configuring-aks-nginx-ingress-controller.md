---
title: "Configuring AKS NGINX Ingress Controller"
date: 2024-10-22
draft: false
categories: ["tutorials"]
---

Every time I try to set up ingress into an AKS cluster, I forget how, so I thought I'd quickly write down the steps. This tutorial assumes you're familiar with Kubernetes concepts and interacting with a cluster.

## Prerequisites

- A running [AKS cluster](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli).
- `kubectl` [config](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli#connect-to-the-cluster) for the cluster setup.
- Helm installed on your machine.
- The application you want to expose running in the cluster. For the purposes of this tutorial, we'll be working with the following sample application.

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: sample-app
  spec:
    selector:
      matchLabels:
        app: http-echo
    template:
      metadata:
        labels:
          app: http-echo
      spec:
        containers:
          - name: http-echo
            image: hashicorp/http-echo:1.0.0
            args:
              - "-text=Hello, World!"
            ports:
              - containerPort: 5678
  ```

## Installing NGINX Ingress Controller

Start by installing the NGINX ingress controller.

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx \
  --create-namespace \
  --namespace ingress-nginx \
  --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz \
  --set controller.service.externalTrafficPolicy=Local
```

{{% callout %}}
Note that the [special annotation](https://learn.microsoft.com/en-us/answers/questions/1166380/why-aks-loadbalancer-created-wrong-health-check-pa) is required.
{{% /callout %}}

Now install cert-manager.

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.16.1 \
  --set crds.enabled=true
```

You'll need to configure a ClusterIssuer in order for the certificate provisioning to work.

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    # The ACME server URL
    server: https://acme-v02.api.letsencrypt.org/directory
    # Email address used for ACME registration
    email: <YOUR EMAIL HERE>
    # Name of a secret used to store the ACME account private key
    privateKeySecretRef:
      name: letsencrypt-prod
    # Enable the HTTP-01 challenge provider
    solvers:
      - http01:
          ingress:
            ingressClassName: nginx
```

## Setting Up Ingress

Before creating an ingress resource we need to put a service in front of our deployment.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sample-app
spec:
  type: ClusterIP
  selector:
    app: http-echo
  ports:
    - protocol: TCP
      port: 5678
      targetPort: 5678
```

Now we create the ingress resource.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: sample-app
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  rules:
    - host: <YOUR DOMAIN HERE>
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: sample-app
                port:
                  number: 5678
  tls:
    - hosts:
        - <YOUR DOMAIN HERE>
      secretName: sample-app-tls
```

## DNS

The only thing left to do is to setup an A record in your DNS provider. Create an A record that points from your domain to the external IP address of the ingress controller.

{{% callout %}}
If your domain was something like `foo.com` than you'd want to map `*` to the IP. However, if your domain was something like `bar.foo.com` than you'd want to map `bar` to the IP.
{{% /callout %}}

Now you should be able to receive secure traffic to your application on your domain.
