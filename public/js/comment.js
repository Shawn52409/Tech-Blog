async function newFormHandler(evt) {
    evt.preventDefault();

    const comment = document.querySelector('#comment-text').value;
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];


    if (comment) {
    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            post_id,
            comment
        }),
        headers: {
            'Content-Type': 'application/json'
        }
        });
        if (response.ok) {
            document.location.replace('/');        
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', newFormHandler);