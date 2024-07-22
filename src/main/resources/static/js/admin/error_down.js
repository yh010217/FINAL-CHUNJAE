document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.querySelector('#down');
    downloadButton.addEventListener('click', (event) => {
        event.preventDefault();
        const attachmentFilePath = event.currentTarget.getAttribute('data-attachment-file-name');
        csv_download(attachmentFilePath);
    });
});

function csv_download(attachmentFilePath) {
    const encodedFilePath = encodeURIComponent(attachmentFilePath);
    window.location.href = '/file/download/' + encodedFilePath;
}


// document.addEventListener('DOMContentLoaded', () => {
//     const downloadButton = document.querySelector('#down');
//     downloadButton.addEventListener('click', (event) => {
//         event.preventDefault();
//         const attachmentFilePath = 'abc.jpg'; // 파일명을 직접 지정
//         csv_download(attachmentFilePath);
//     });
// });
//
// function csv_download(attachmentFilePath) {
//     const encodedFilePath = encodeURIComponent(attachmentFilePath);
//     window.location.href = '/file/download/' + encodedFilePath;
// }
