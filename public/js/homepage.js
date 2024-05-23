// homepage.js

document.querySelectorAll('.post').forEach((post) => {
    post.addEventListener('click', () => {
      const postId = post.getAttribute('data-id');
      document.location.href = `/post/${postId}`;
    });
  });
  