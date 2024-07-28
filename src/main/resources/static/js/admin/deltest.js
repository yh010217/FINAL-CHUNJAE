function deleteFile(event) {
    event.preventDefault(); // 링크의 기본 동작을 막습니다.
    const url = event.currentTarget.href; // 링크의 href 값을 가져옵니다.
    const params = new URLSearchParams(url.split('?')[1]); // URL에서 쿼리 파라미터 추출
    const fileName = params.get('fileName'); // 파일 이름 추출

    fetch(`/file/paperDelete?fileName=${fileName}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('File deleted successfully');
            } else {
                alert('Failed to delete file');
            }
        })
        .catch(error => {
            alert('Error: ' + error);
        });
}