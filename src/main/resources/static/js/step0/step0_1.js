document.addEventListener('DOMContentLoaded', function () {

    function updateMathContent(element) {
        MathJax.typesetPromise([element]).then(() => {
            console.log("수식이 업데이트되었습니다.");
        }).catch((err) => {
            console.error("수식 업데이트 중 오류 발생:", err);
        });
    }

    let checkboxes = document.querySelectorAll('.chk_paperId'); // 모든 체크박스 요소를 선택
    let selectedCountElement = document.getElementById('chk_item_cnt'); // 선택된 문항 수
    let editButton = document.getElementById('edit-selected'); // 선택한 시험지 편집하기 버튼
    let newButton = document.getElementById('new-paper'); // 신규 시험지 만들기 버튼
    let subjectIdInput = document.getElementById('subjectId'); // 과목코드
    let subjectId = subjectIdInput.value; // 과목코드 값 가져오기
    let maxItemCount = 90; // 최대 선택 가능한 문항수
    let itemCount = 0;
    let itemInfoShow = false;

    // '신규 시험지 만들기' 버튼 클릭시
    newButton.addEventListener('click', function () {
        // console.log('subjectId..',subjectId);
        window.location.href = '/step1/select-chapter/' + subjectId;
    })

    let selectedItemCount = 0;  // 선택된 문항 수를 추적 변수
    let selectedExamIds = [];   // 선택된 시험지 ID를 저장하는 배열

    // 선택된 문항 수를 업데이트하는 함수
    let updateSelectedCount = () => {
        selectedCountElement.textContent = selectedItemCount;
    };


    checkboxes.forEach(checkbox => { // 각 체크박스에 이벤트 리스너를 추가
        checkbox.addEventListener('change', function () {

            itemCount = parseInt(this.getAttribute('item-cnt'));  // 체크한 문항 수 가져오기
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
            fetch('/step0/examId', {
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
                    window.location.href = 'http://localhost:3000/step2';
                }).catch(error => {
                console.log('에러 발생', error);
                alert('에러 발생..')
            });
        }
    });

    // 초기 선택된 문항 수 업데이트
    updateSelectedCount();


    // 체크박스 상태 초기화
    let resetCheckboxes = () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false; // 모든 체크박스 해제
        });
        selectedItemCount = 0; // 선택된 문항 수 초기화
        selectedExamIds = []; // 선택된 시험지 ID 배열 초기화
        updateSelectedCount(); // 선택된 문항 수 업데이트
    };

    // 페이지가 로드될 때 체크박스 초기화
    window.addEventListener('load', resetCheckboxes);


    // 미리보기
    document.querySelectorAll('.tbody').forEach(tbody => {  // tbody에 이벤트 리스너 추가
        tbody.addEventListener('click', function (event) {
            let button = event.target.closest('.pop-btn.btn-icon2');
            if (button) {
                let col = button.closest('.col'); // 버튼의 부모 요소인 .col을 찾음
                let examId = col.querySelector('input[id="examId"]').value; // examId 가져오기
                let paperTitle = col.querySelector('input[id="paperName"]').value; // paperName 가져오기
                let itemCnt = col.querySelector('input[id="itemCount"]').value; // itemCount 가져오기
                itemInfoShow = false;
                // console.log('examId...', examId);
                // console.log('paperTitle..',paperTitle);
                // console.log('itemCnt..',itemCnt);


                // 탭 업데이트
                const previewTabItems = document.querySelectorAll('#preview-tab li');
                previewTabItems.forEach(item => item.classList.remove("active"));
                if (previewTabItems.length > 0) {
                    previewTabItems[0].classList.add('active');
                }
                clickPreview('A');


                // 셋팅지 미리보기 api 호출
                // 문항 불러오기
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
                        // console.log('data...', data);
                        let half = Math.ceil(data.itemList.length / 2);
                        let passageNum = 0; // 지문 구분 Number
                        let tmpNum=0;
                        for (let part = 0; part < 2; part++) {
                            let limit_num = part === 0 ? half : data.itemList.length;
                            let start_num = part === 0 ? 0 : half;

                            // console.log('limit_num...', limit_num);
                            // console.log('start_num...', start_num);

                            html += '<div class="view-data">';
                            for (let s = start_num; s < limit_num; s++) {
                                let obj = data.itemList[s];

                                // console.log('obj...', obj);
                                html += '<div class="example-area"><div class="example-box">';
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
                                    tmpNum=passageNum;
                                }

                                html += '<div class="item-question passage-area">';
                                html += '   <span class="numbering question-num" data-passageNum="' + passageNum + '">' + (s < 9 ? "0" + (s + 1) : (s + 1)) + '.</span>';
                                html += '   <img class="item-img" src="' + obj.questionUrl + '" alt="' + obj.itemId + '">';
                                html += '</div>';
                                html += '<div class="answer-container">';
                                html += '   <div class="answer-tit">(정답)</div>';
                                html += '   <div class="answer-img"><img src="' + obj.answerUrl + '" alt="' + obj.itemId + '"></div>';
                                html += '</div>';
                                html += '<div class="explain-answer ">';
                                html += '   <div class="explain-tit">(해설)</div>';
                                html += '   <div class="explain-img"><img src="' + obj.explainUrl + '" alt="' + obj.itemId + '"></div>';
                                html += '</div>';
                                html += '</div></div>';
                                tmpNum = 0 ;
                            }
                            html += '</div>'; // view-data 끝
                        }
                        document.getElementById('preview-question-data').innerHTML = html;

                        // 미리보기 지문 넘버링
                        document.querySelectorAll(".passage-num").forEach(passageNumElement => {
                            let passageNumTmp = passageNumElement.getAttribute("data-passageNum");
                            if (passageNumTmp) {
                                let que = document.querySelectorAll("[data-passageNum='" + passageNumTmp + "']");
                                let firstQuestionNum = null;
                                let lastQuestionNum = null;

                                que.forEach((element, index) => {
                                    if (!element.classList.contains("passage-num")) {
                                        if (firstQuestionNum === null) {
                                            firstQuestionNum = element.textContent.replace('.', '');
                                        }
                                        lastQuestionNum = element.textContent.replace('.', '');
                                    }
                                });

                                if (firstQuestionNum !== null && lastQuestionNum !== null) {
                                    passageNumElement.textContent = firstQuestionNum + '~' + lastQuestionNum;
                                } else {
                                    console.warn('지문 번호가 올바르지 않습니다:', passageNumElement);
                                }
                            } else {
                                console.warn('passage number 값 없음', passageNumElement);
                            }
                        });


                    })

                    .catch(error => {
                        alert("미리보기를 불러오지 못했습니다. 관리자에게 문의해 주시기 바랍니다.");
                        console.error("Fetch error: ", error);
                    })
                    .finally(() => {
                        // document.querySelector(".loading-cnt").style.display = 'none'; // 로딩 표시 제거
                    });




                // 문항 정보표 데이터 불러오기
                fetch('/preview/info', {
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
                        if (data.successYn === 'Y') {
                            let html = '';
                            for (let s = 0; s < data.itemList.length; s++) {
                                let item = data.itemList[s];
                                html += `<tr>
                            <td>${item.itemNo || ''}</td>
                            <td><span class="latex_equation">${item.answer || ''}</span></td>
                            <td class="tit">${item.largeChapterName || ''}</td>
                            <td class="tit">${item.topicChapterName || ''}</td>
                            <td>${item.achievementCode || ''}</td>
                            <td>${item.contentAreaName || ''}</td>
                            <td>${item.activityAreaName || ''}</td>
                            <td>${item.curriculumCompetencyName || ''}</td>
                            <td>${item.difficultyName || ''}</td>
                        </tr>`;
                            }
                            document.getElementById('preview-itemInfo-data').innerHTML = html;
                         //   updateMathContent(document.getElementById("preview-itemInfo-data"));
                            itemInfoShow = true;
                        } else {
                            itemInfoShow = false;
                        }
/*
                        // 탭 업데이트
                        const previewTabItems = document.querySelectorAll('#preview-tab li');
                        previewTabItems.forEach(item => item.classList.remove("active"));
                        if (previewTabItems.length > 0) {
                            previewTabItems[0].classList.add('active');
                        }
                        clickPreview('A');

                        // 팝업 띄우기
                        document.documentElement.style.overflow = 'hidden';
                        document.querySelector('.dim').style.display = 'block';
                        document.querySelector(".pop-wrap[data-pop='prev-pop']").style.display = 'block';
                       // document.querySelector("#preview-data .scroll-inner").scrollTop = 0;

 */
                    })
                    .catch(error => {
                        alert("미리보기를 불러오지 못했습니다. 관리자에게 문의해 주시기 바랍니다.");
                        console.error("Fetch error: ", error);
                    })
                    .finally(() => {
                       // loadingIndicator.style.display = 'none';
                    });


                /*@@@@ 닫기하고 다른 미리보기 열 때 첫번째 버튼으로 가도록 변경 @@@@@*/
                // 미리보기 tab 이동
                document.querySelectorAll('#preview-tab a').forEach(function (link) {
                    link.addEventListener('click', function () {

                        let parentLi = this.parentElement;        // 현재 클릭된 링크의 부모 li 요소를 선택

                        // 모든 형제 li 요소에서 active 클래스 제거
                        let siblings = parentLi.parentElement.children;
                        for (let i = 0; i < siblings.length; i++) {
                            if (siblings[i] !== parentLi) {
                                siblings[i].classList.remove('active');
                            }
                        }

                        parentLi.classList.add('active');     // 현재 li 요소에 active 클래스 추가

                        clickPreview(this.getAttribute('data-type'));    // data-type 속성의 값을 가져와서 changePreview 호출

                    });
                });

                // 미리보기 tab 별 style 변경
                function setStyle(selector, displayStyle) {
                    let elemnets = document.querySelectorAll(selector);
                    elemnets.forEach(element => {
                        element.style.display = displayStyle;
                    })
                };

                function setVisibility(selector, visibilityStyle) {
                    let elemnets = document.querySelectorAll(selector);
                    elemnets.forEach(element => {
                        element.style.visibility = visibilityStyle;
                    })
                };

                function clickPreview(type) {
                    document.querySelector(".preview-download").setAttribute("data-type", type);    // .preview-download 요소의 data-type 속성 설정
                    document.querySelector(".preview-data .scroll-inner").scrollTop = 0;          // 스크롤 위치를 맨 위로
                    document.querySelector('.preview-data .view-box').classList.add('type-line');  // .view-box에 type-line 클래스 추가

                    // style 기본 값
                    // setStyle(".preview-data .passage-area", "none");
                    /*@@@@@@@@@ 수정 @@@@@@@@@@@@*/
                    // 각 타입에 따른 화면 전환
                    if (type === 'A') { // 문제+해설+정답
                        //setStyle("#preview-question-data", "block");
                        //    setStyle(".preview-data .passage-area", "block");

                        setStyle("#preview-itemInfo-table", "none");
                        setStyle(".preview-data .item-img", "block");
                        setStyle(".preview-data .answer-container", "block");
                        setStyle(".preview-data .explain-answer", "block");
                        setStyle(".passage-area .passage-num", "block");
                        setStyle(".passage-area img", "block");
                    } else if (type === 'Q') { // 문제
                        // setStyle(".preview-data .passage-area", "block");
                      //  setStyle("#preview-question-data", "block");
                        setStyle("#preview-itemInfo-table", "none");
                        setStyle(".preview-data .item-img", "block");
                        setStyle(".passage-area img", "block");
                        setStyle(".preview-data .answer-container", "none");
                        setStyle(".preview-data .explain-answer", "none");
                        setStyle(".passage-area .passage-num", "block");

                    } else if (type === 'E') { // 정답+해설
                        setStyle("#preview-itemInfo-table", "none");
                        setStyle(".passage-area img", "none");
                        setStyle(".passage-area .passage-num", "none");
                        //  setStyle(".passage-area .question-num", "block");
                        setStyle(".preview-data .answer-container", "block");
                        setStyle(".preview-data .explain-answer", "block");
                      //  setStyle("#preview-question-data", "block");

                    } else if (type === 'C') { // 문항 정보표
                        if(itemInfoShow === false){
                            alert("문항정보표가 존재하지 않습니다.");
                            return false;
                        }else{
                           // $('#preview-data .view-box').removeClass('type-line');
                            setStyle("#preview-itemInfo-table", "block");
                            setStyle("#preview-question-data", "none");
                        }
                    }


                }


            }
        });
    });

});