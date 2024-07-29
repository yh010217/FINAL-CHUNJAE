document.addEventListener('DOMContentLoaded', () => {
    // 삭제 버튼 클릭 이벤트 리스너
    const deleteButtons = document.querySelectorAll('.del-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const attachmentFilePath = event.currentTarget.getAttribute('data-attachment-file-name');
            const paperId = event.currentTarget.getAttribute('data-paper-id');

            if (attachmentFilePath && paperId) {
                delete_file(attachmentFilePath, paperId);
            } else {
                console.error('파일 경로 또는 paperId가 누락되었습니다.');
            }
        });
    });
});

function delete_file(attachmentFilePath, paperId) {
    const encodedFilePath = encodeURIComponent(attachmentFilePath);
    fetch(`/file/fileDelete?fileName=${encodedFilePath}&paperId=${paperId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('파일이 성공적으로 삭제되었습니다.');
                // 필요 시 삭제된 파일과 관련된 UI 업데이트
            } else {
                alert('파일 삭제에 실패했습니다.');
                if (data.error) {
                    console.error('Error:', data.error);
                } else {
                    console.error('Unknown error occurred.');
                }
            }
        })
        .catch(error => console.error('Error:', error));
}
document.addEventListener('DOMContentLoaded', () => {
    // 삭제 버튼 클릭 이벤트 리스너
    const deleteButtons = document.querySelectorAll('.del-btn2');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const attachmentFilePath = event.currentTarget.getAttribute('data-attachment-file-name');
            const paperId = event.currentTarget.getAttribute('data-paper-id');

            if (attachmentFilePath && paperId) {
                delete_file2(attachmentFilePath, paperId);
            } else {
                console.error('파일 경로 또는 paperId가 누락되었습니다.');
            }
        });
    });
});

function delete_file2(attachmentFilePath, paperId) {
    const encodedFilePath = encodeURIComponent(attachmentFilePath);
    fetch(`/file/fileDelete2?fileName=${encodedFilePath}&paperId=${paperId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('파일이 성공적으로 삭제되었습니다.');
                // 필요 시 삭제된 파일과 관련된 UI 업데이트
            } else {
                alert('파일 삭제에 실패했습니다.');
                if (data.error) {
                    console.error('Error:', data.error);
                } else {
                    console.error('Unknown error occurred.');
                }
            }
        })
        .catch(error => console.error('Error:', error));
}
document.addEventListener('DOMContentLoaded', () => {
    // 삭제 버튼 클릭 이벤트 리스너
    const deleteButtons = document.querySelectorAll('.del-btn3');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const attachmentFilePath = event.currentTarget.getAttribute('data-attachment-file-name');
            const paperId = event.currentTarget.getAttribute('data-paper-id');

            if (attachmentFilePath && paperId) {
                delete_file3(attachmentFilePath, paperId);
            } else {
                console.error('파일 경로 또는 paperId가 누락되었습니다.');
            }
        });
    });
});

function delete_file3(attachmentFilePath, paperId) {
    const encodedFilePath = encodeURIComponent(attachmentFilePath);
    fetch(`/file/fileDelete3?fileName=${encodedFilePath}&paperId=${paperId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('파일이 성공적으로 삭제되었습니다.');
                // 필요 시 삭제된 파일과 관련된 UI 업데이트
            } else {
                alert('파일 삭제에 실패했습니다.');
                if (data.error) {
                    console.error('Error:', data.error);
                } else {
                    console.error('Unknown error occurred.');
                }
            }
        })
        .catch(error => console.error('Error:', error));
}








