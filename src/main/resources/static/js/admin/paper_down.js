document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const attachmentFilePath = event.currentTarget.getAttribute('data-attachment-file-name');
            csv_download(attachmentFilePath);
        });
    });
});

function csv_download(attachmentFilePath) {
    const encodedFilePath = encodeURIComponent(attachmentFilePath);
    window.location.href = '/file/paperDownload?fileName=' + encodedFilePath;
}