// async function newFormHandler(evt) {
//     evt.preventDefault();

//     const comment = document.querySelector('textarea').value;

//     if (comment) {
//     const response = await fetch('/api/posts', {
//         method: 'POST',
//         body: JSON.stringify({
//             postTitle,
//             postContent
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//         });
//         if (response.ok) {
//             document.location.replace('/dashboard');        
//         } else {
//             alert(response.statusText);
//         }
//     }
// }

// document.querySelector('.new-posting').addEventListener('submit', newFormHandler);