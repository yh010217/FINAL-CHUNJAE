document.addEventListener('DOMContentLoaded', function () {

    let checkboxes = document.querySelectorAll('.chk_paperId'); // 모든 체크박스 요소를 선택
    let selectedCountElement = document.getElementById('chk_item_cnt'); // 선택된 문항 수
    let editButton = document.getElementById('edit-selected'); // 선택한 시험지 편집하기 버튼
    let newButton = document.getElementById('new-paper'); // 신규 시험지 만들기 버튼
    let subjectIdInput = document.getElementById('subjectId'); // 과목코드
    let subjectId = subjectIdInput.value; // 과목코드 값 가져오기
    let maxItemCount = 90; // 최대 선택 가능한 문항수

    // '신규 시험지 만들기' 버튼 클릭시
    newButton.addEventListener('click', function () {
        // console.log('subjectId..',subjectId);
        window.location.href = '/step1/select-chapter/'+subjectId;
    })

    let selectedItemCount = 0;  // 선택된 문항 수를 추적 변수
    let selectedExamIds = [];   // 선택된 시험지 ID를 저장하는 배열

    // 선택된 문항 수를 업데이트하는 함수
    let updateSelectedCount = () => {
        selectedCountElement.textContent = selectedItemCount;
    };


    checkboxes.forEach(checkbox => { // 각 체크박스에 이벤트 리스너를 추가
        checkbox.addEventListener('change', function () {

            let itemCount = parseInt(this.getAttribute('item-cnt'));  // 체크한 문항 수 가져오기
            let examId = this.getAttribute('exam-id');  // 체크한 시험지 ID 가져오기

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
                method: 'POST'
                , headers: {
                    'Accept': 'application/json'
                    , 'Content-Type': 'application/json'
                }
                , body: JSON.stringify({examIdList: selectedExamIds}) // JSON 문자열로 변환하여 전달
            }).then(response => response.text())
                .then(data => {
                    console.log('응답!!!!', data);
                    // 서버로 부터 데이터 성공적으로 받으면 step2로 이동
                    /* !!!!!! 경로 변경시 수정 !!!!!*/
                    window.location.href ='http://localhost:3000/step2';
                }).catch(error => {
                console.log('에러 발생', error);
                alert('에러 발생..')
            });

        }
    });

    // 초기 선택된 문항 수 업데이트
    updateSelectedCount();

    // 셋팅지 미리보기
    document.querySelectorAll('.tbody').forEach(tbody => {  // tbody에 이벤트 리스너 추가
        tbody.addEventListener('click', function (event) {
            let button = event.target.closest('.pop-btn.btn-icon2');
            if (button) {
                //let examId = button.previousElementSibling.value;   // 시험지ID
              //  const col = this.closest(".col");
              //  const paperId = col.querySelector(".examId").value;
           //     let paperTitle = document.getElementById('paperName').value;
              //let itemCnt = document.getElementById('itemCount').value;
                let col = button.closest('.col'); // 버튼의 부모 요소인 .col을 찾음
                let examId = col.querySelector('input[id="examId"]').value; // examId 가져오기
                let paperTitle = col.querySelector('input[id="paperName"]').value; // paperName 가져오기
                let itemCnt = col.querySelector('input[id="itemCount"]').value; // itemCount 가져오기


                console.log('examId...', examId);
                console.log('paperTitle..',paperTitle);
                console.log('itemCnt..',itemCnt);

            // 셋팅지 미리보기 api 호출
                // 문항 - 문제정답해설 미리보기
                fetch('/preview/first', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({examId: examId})
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("HTTP error, status = " + response.status);
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.successYn === 'N') {
                            alert("시험지 준비 중입니다. 관리자에게 문의해 주시기 바랍니다.");
                            return;
                        }

                        document.getElementById("preview-tit").innerHTML = '[시험지명]&ensp;' + paperTitle;
                        document.getElementById("preview-cnt").innerHTML = '&emsp;[문항수]&ensp;' + itemCnt + '문항';
                       // document.getElementById("preview_paperId").value = examId;

                        let html = '';
                        let tmpPassageId = '';
                        console.log('data...',data);
                        let half = Math.ceil(data.itemList.length / 2);
                        let passageNum = 0; // 지문 구분 Number

                        for (let part = 0; part < 2; part++) {
                            let limit_num = part === 0 ? half : data.itemList.length;
                            let start_num = part === 0 ? 0 : half;

                            html += '<div class="view-data">';
                            for (let s = start_num; s < limit_num; s++) {
                                let obj = data.itemList[s];

                                // 지문 문항
                                if (obj.passageId !== null && obj.passageId !== '') {
                                    if (obj.passageId !== tmpPassageId) {
                                        passageNum++;
                                        html += '<div class="passage-area item-question">';
                                        html += '   <span class="numbering numbering-numbers passage-num" data-passageNum="' + passageNum + '"></span>';
                                        html += '   <img src="' + obj.passageUrl + '" alt="' + obj.passageId + '" width="453px">';
                                        html += '</div>';
                                        tmpPassageId = obj.passageId;
                                    }
                                }

                                html += '<div class="item-question">';
                                html += '   <span class="numbering question-num" data-passageNum="' + passageNum + '">' + (s < 9 ? "0" + (s + 1) : (s + 1)) + '.</span>';
                                html += '   <img class="item-img" src="' + obj.questionUrl + '" alt="' + obj.itemId + '">';
                                html += '</div>';
                                html += '<div class="answer-container">';
                                html += '   <div class="answer-tit">(정답)</div>';
                                html += '   <div class="answer-img"><img src="' + obj.answerUrl + '" alt="' + obj.itemId + '"></div>';
                                html += '</div>';
                                html += '<div class="explain-answer">';
                                html += '   <div class="explain-tit">(해설)</div>';
                                html += '   <div class="explain-img"><img src="' + obj.explainUrl + '" alt="' + obj.itemId + '"></div>';
                                html += '</div>';
                                html += '</div>'; // item-question 끝
                            }
                            html += '</div>'; // view-data 끝
                        }
                        document.getElementById('preview-question-data').innerHTML = html;

                        // 미리보기 지문 넘버링
                        document.querySelectorAll(".passage-num").forEach(passageNumElement => {
                            let passageNumTmp = passageNumElement.getAttribute("data-passageNum");
                            if (passageNumTmp) {
                                document.querySelectorAll("[data-passageNum='" + passageNumTmp + "']").forEach((element, index) => {
                                    if (!element.classList.contains("passage-num")) {
                                        let tmpText = element.textContent ? element.textContent.replace('.', '') : '';
                                        if (index > 0) {
                                            const lastChild = element.lastElementChild;
                                            if (lastChild && lastChild.textContent) {
                                                tmpText += '~' + lastChild.textContent.replace('.', '');
                                            } else {
                                                console.warn('No last element child or its text content for:', element);
                                            }
                                        }
                                        passageNumElement.textContent = tmpText;
                                    }
                                });
                            } else {
                                console.warn('Data passage number is not defined for:', passageNumElement);
                            }
                        });
/*
                        // 미리보기 지문 넘버링
                        document.querySelectorAll(".passage-num").forEach(passageNumElement => {
                            let passageNumTmp = passageNumElement.getAttribute("data-passageNum");
                            document.querySelectorAll("[data-passageNum='" + passageNumTmp + "']").forEach((element, index) => {
                                if (!element.classList.contains("passage-num")) {
                                    let tmpText = element.textContent.replace('.', '');
                                    if (index > 0) {
                                        tmpText += '~' + element.lastElementChild.textContent.replace('.', '');
                                    }
                                    passageNumElement.textContent = tmpText;
                                }
                            });
                        });*/
                    })
                    .catch(error => {
                        alert("미리보기를 불러오지 못했습니다. 관리자에게 문의해 주시기 바랍니다.");
                        console.error("Fetch error: ", error);
                    })
                    .finally(() => {
                       // document.querySelector(".loading-cnt").style.display = 'none'; // 로딩 표시 제거
                    });



                // 문제


                // 정답+해설


                // 문항 정보표

            }
        });
    });

});