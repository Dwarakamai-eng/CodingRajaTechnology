document.addEventListener("DOMContentLoaded", function() {
    const createPostBtn = document.getElementById('createPostBtn');
    const postModal = document.getElementById('postModal');
    const postForm = document.getElementById('postForm');
    const mainContent = document.getElementById('mainContent');

    createPostBtn.addEventListener('click', function() {
        postModal.style.display = 'block';
    });

    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        const post = createPost(title, content);
        mainContent.appendChild(post);
        postModal.style.display = 'none';
        postForm.reset();
    });

    window.addEventListener('click', function(event) {
        if (event.target == postModal) {
            postModal.style.display = 'none';
            postForm.reset();
        }
    });

    function createPost(title, content) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        const contentElement = document.createElement('p');
        contentElement.textContent = content;
        postDiv.appendChild(titleElement);
        postDiv.appendChild(contentElement);
        return postDiv;
    }
});
