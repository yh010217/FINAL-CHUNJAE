document.addEventListener('DOMContentLoaded', function () {

    const checkboxes = document.querySelectorAll('.chk_paperId'); // 모든 체크박스 요소를 선택
    const selectedCountElement = document.getElementById('chk_item_cnt'); // 선택된 문항 수
    const editButton = document.getElementById('edit-selected'); // 선택한 시험지 편집하기 버튼
    const maxItemCount = 90; // 최대 선택 가능한 문항수

    let selectedItemCount = 0;  // 선택된 문항 수를 추적 변수
    let selectedExamIds = [];   // 선택된 시험지 ID를 저장하는 배열

    // 선택된 문항 수를 업데이트하는 함수
    const updateSelectedCount = () => {
        selectedCountElement.textContent = selectedItemCount;
    };

    checkboxes.forEach(checkbox => { // 각 체크박스에 이벤트 리스너를 추가
        checkbox.addEventListener('change', function () {

            const itemCount = parseInt(this.getAttribute('item-cnt'));  // 체크한 문항 수 가져오기
            const examId = this.getAttribute('exam-id');  // 체크한 시험지 ID 가져오기

            if (this.checked) {

                if (selectedItemCount + itemCount > maxItemCount) {   // 최대 문항 수를 초과할 경우 경고를 표시하고 체크 해제
                    alert('최대 90문항까지 선택 가능합니다.');
                    this.checked = false;
                } else {   // 선택된 문항 수와 선택된 시험지 ID 배열에 추가
                    selectedItemCount += itemCount;
                    selectedExamIds.push(examId);
                }
            } else {
                // 선택 해제 시 문항 수와 시험지 ID 배열에서 제거
                selectedItemCount -= itemCount;
                selectedExamIds = selectedExamIds.filter(id => id !== examId);
            }

            updateSelectedCount(); // 선택된 문항 수 업데이트
        });
    });

    // '선택한 시험지 편집하기' 버튼 클릭 시
    editButton.addEventListener('click', function () {
        if (selectedItemCount === 0) {
            alert('시험지를 선택해주세요. ' +
                '최대 90문항까지 선택 가능합니다.');
        } else {
            console.log('선택된 시험지 ID:', selectedExamIds);

            // 선택된 examId 값 넘기기
            fetch('/step0/examid', {
                    method : 'POST'
                , headers : {
                        'Accept' : 'application/json'
                    }
                , body: JSON.stringify({examIds: selectedExamIds}) // JSON 문자열로 변환하여 전달
                }).then(response => response.json())
                .then(data => {
                    console.log('응답!!!!', data);

                }).catch(error => {
                    console.log('에러 발생',error);
                    alert('시험지 편집 중 에러 발생..')
            });
        }
    });

    // 초기 선택된 문항 수 업데이트
    updateSelectedCount();
});