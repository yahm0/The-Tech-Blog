document.querySelector('.new-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard'); // Reload the dashboard to show the new post
            } else {
                alert('Failed to create post.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create post: ' + error.message);
        }
    }
});
