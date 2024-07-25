document.addEventListener('DOMContentLoaded', () => {

    // 삭제 버튼 클릭 이벤트 리스너
    const deleteButtons = document.querySelectorAll('.del-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const attachmentFilePath = event.currentTarget.getAttribute('data-attachment-file-name');
            delete_file(attachmentFilePath);
        });
    });
});
function delete_file(attachmentFilePath) {
    const encodedFilePath = encodeURIComponent(attachmentFilePath);
    fetch(`/file/paperDelete?fileName=${encodedFilePath}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('파일이 성공적으로 삭제되었습니다.');
                // 필요 시 삭제된 파일과 관련된 UI 업데이트
            } else {
                alert('파일 삭제에 실패했습니다.');
            }
        })
        .catch(error => console.error('Error:', error))
};