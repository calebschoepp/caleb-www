function fetchCommentCount(pair) {
  const url = `https://comment-service.herokuapp.com/platform/${pair[1]}/url/${pair[0]}`;
  return window.fetch(url).then(function (response) {
    return response.text();
  });
}

function run() {
  // Extract urls and platforms from page
  var postElements = document.getElementById("none").querySelectorAll("a.post");
  var urls = [];
  var platforms = [];
  for (postElement of postElements) {
    urls.push(btoa(encodeURIComponent(postElement.href)));
    platforms.push(postElement.innerText.toLowerCase().replace(/\s/g, ""));
  }

  // Get comment counts
  const zipped = urls.map((e, i) => [e, platforms[i]]);
  const promises = [];
  zipped.map((pair) => promises.push(fetchCommentCount(pair)));
  Promise.all(promises).then(function (values) {
    const comment_count = values.reduce(
      (total, num) => total + parseInt(num),
      0
    );

    // Rejigger HTML if necessary
    if (1 > 0) {
      document.getElementById(
        "comment_count"
      ).innerHTML = `Comments (${comment_count})`;
      document.getElementById("none").classList.add("hidden");
      document.getElementById("some").classList.remove("hidden");
    }
  });
}

window.addEventListener("DOMContentLoaded", run, false);
