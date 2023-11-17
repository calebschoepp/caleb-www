[![Netlify Status](https://api.netlify.com/api/v1/badges/9f0a7799-e68e-41d3-be03-2fb12ca8d621/deploy-status)](https://app.netlify.com/sites/nostalgic-brattain-dd7388/deploys)

# caleb-www

My personal website which is hosted [here](https://calebschoepp.com).

## Building

To run the website locally just run the command `npm run start`

## Writing a new post

```bash
git checkout -b caleb/my-new-post
hugo new blog/my-blog-post-name.md
```

## Syndicated posts

If I write a post somewhere else (like a company blog) I have two options. I can either redirect to it by setting the `redirectUrl` and `customReadingTime` params. Or I can have my own copy of it and then set the `canonicalUrl` param.
