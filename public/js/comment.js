document.addEventListener('DOMContentLoaded', () => {
    const commentForms = document.querySelectorAll('.comment-form');

    commentForms.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const postId = form.getAttribute('data-post-id');
            const commentText = form.querySelector('#comment-text').value.trim();

            if (commentText) {
                const response = await fetch(`/api/comments`, {
                    method: 'POST',
                    body: JSON.stringify({ post_id: postId, comment_text: commentText }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.reload();
                } else {
                    alert('Failed to add comment');
                }
            }
        });
    });
});
