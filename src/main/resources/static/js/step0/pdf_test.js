document.addEventListener('DOMContentLoaded', function () {


    document.getElementById('download').addEventListener('click', function () {
        const examId = '182'; // 여기에 실제 examId 값을 설정합니다.
        const differentiation = 'A'; // 여기에 실제 differentiation 값을 설정합니다.

        fetch('/preview/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'examId': examId, 'differentiation': differentiation})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('preview URL fetch 실패: ' + response.statusText);
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'preview.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('PDF 다운로드 실패: ' + error.message);
            });
    });

});