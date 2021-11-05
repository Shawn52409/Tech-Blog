async function newFormHandler(evt) {
    evt.preventDefault();

    const postTitle = document.querySelector('#post-title').value;
    const postContent = document.querySelector('#post-text').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            postTitle,
            postContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');        
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-posting').addEventListener('submit', newFormHandler);