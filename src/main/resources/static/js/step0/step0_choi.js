document.addEventListener('DOMContentLoaded', function () {

    const {jsPDF} = window.jspdf;
    let subjectIdInput = document.getElementById('subjectId'); // 과목코드
    let subjectId = subjectIdInput.value; // 과목코드 값 가져오기
    let itemInfoShow = false;

    {
        let checkboxes = document.querySelectorAll('.chk_paperId'); // 모든 체크박스 요소를 선택
        let selectedCountElement = document.getElementById('chk_item_cnt'); // 선택된 문항 수
        let editButton = document.getElementById('edit-selected'); // 선택한 시험지 편집하기 버튼
        let newButton = document.getElementById('new-paper'); // 신규 시험지 만들기 버튼
        let maxItemCount = 90; // 최대 선택 가능한 문항수
        let itemCount = 0;
        let itemInfoShow = false;

        // 체크박스 상태 초기화
        let resetCheckboxes = () => {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false; // 모든 체크박스 해제
            });
            selectedItemCount = 0; // 선택된 문항 수 초기화
            selectedExamIds = []; // 선택된 시험지 ID 배열 초기화
            updateSelectedCount(); // 선택된 문항 수 업데이트
        };

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
                        window.location.href = 'http://localhost:8080/step2/edit/' + subjectId;
                        // examId 없을 때 redirect 처리
                    }).catch(error => {
                    console.log('에러 발생', error);
                    alert('에러 발생..')
                });
            }
        });

        // 초기 선택된 문항 수 업데이트
        updateSelectedCount();

        // 페이지가 로드될 때 체크박스 초기화
        window.addEventListener('load', resetCheckboxes);
    }

    let cols = document.querySelectorAll('.col');

    let urls = [];

    for (let i = 0; i < cols.length; i++) {

        let col = cols[i];

        let dataInputTag = col.querySelector('.chk_paperId');
        let examId = dataInputTag.getAttribute('exam-id');
        let paperTitle = col.querySelector('.choi-paperName').value;
        let itemCnt = dataInputTag.getAttribute('item-cnt');
        itemInfoShow = false;

        let previewButton = col.querySelector('.btn-icon2');

        attachDownloadButton(col,paperTitle,itemCnt,examId, itemInfoShow,jsPDF);

        previewButton.onclick = function () {

            /* All 탭으로 이동함 */
            {
                const previewTabItems = document.querySelectorAll('#preview-tab li');
                previewTabItems.forEach(item => item.classList.remove("active"));
                if (previewTabItems.length > 0) {
                    previewTabItems[0].classList.add('active');
                }
                itemInfoShow = clickPreview('A', itemInfoShow);
            }
            /* All 탭으로 이동함 끝 */

            document.querySelector(".title_header").textContent = paperTitle;

            let previewTabs = document.querySelectorAll('#preview-tab a');

            attachPreviewButton(previewTabs,itemInfoShow);


            urls = previewFirst(examId, paperTitle, itemCnt);

            itemInfoShow = previewInfo(examId);

            // 미리보기 내용을 설정 (여기에 실제 데이터를 넣어야 합니다)
            document.getElementById('preview-tit').textContent = `${paperTitle} 미리보기`;
            document.getElementById('preview-cnt').textContent = `${itemCnt} 문항`;

        }

        document.querySelector('.preview-download').onclick=function (){
            justDownload(paperTitle,jsPDF);
        }
    }
});


let clickPreview = function (type, itemInfoShow) {

    document.querySelector(".preview-download").setAttribute("data-type", type);    // .preview-download 요소의 data-type 속성 설정
    //  document.querySelector(".preview-data .scroll-inner").scrollTop = 0;          // 스크롤 위치를 맨 위로
    document.querySelector('.preview-data .view-box').classList.add('type-line');  // .view-box에 type-line 클래스 추가

    // 각 타입에 따른 화면 전환
    if (type === 'A') { // 문제+해설+정답
        setStyle("#preview-itemInfo-table", "none");
        setStyle(".preview-data .item-img", "block");
        setStyle(".preview-data .answer-container", "block");
        setStyle(".preview-data .explain-answer", "block");
        setStyle(".passage-area .passage-num", "block");
        setStyle(".passage-area img", "block");
        setStyle(".example-area", "block");
    } else if (type === 'Q') { // 문제
        setStyle("#preview-itemInfo-table", "none");
        setStyle(".preview-data .item-img", "block");
        setStyle(".passage-area img", "block");
        setStyle(".preview-data .answer-container", "none");
        setStyle(".preview-data .explain-answer", "none");
        setStyle(".passage-area .passage-num", "block");
        setStyle(".example-area", "block");
    } else if (type === 'E') { // 정답+해설
        setStyle("#preview-itemInfo-table", "none");
        setStyle(".passage-area img", "none");
        setStyle(".passage-area .passage-num", "none");
        //  setStyle(".passage-area .question-num", "block");
        setStyle(".preview-data .answer-container", "block");
        setStyle(".preview-data .explain-answer", "block");
        // setStyle("#preview-question-data", "block");
        setStyle(".example-area", "block");
    } else if (type === 'C') { // 문항 정보표
        if (itemInfoShow === false) {
            alert("문항정보표가 존재하지 않습니다.");
            return false;
        } else {
            // $('#preview-data .view-box').removeClass('type-line');
            setStyle("#preview-itemInfo-table", "block");
            setStyle(".example-area", "none");
            setStyle(".preview-data .item-img", "none");
            setStyle(".preview-data .answer-container", "none");
            setStyle(".preview-data .explain-answer", "none");
            setStyle(".passage-area .passage-num", "none");
            setStyle(".passage-area img", "none");
        }
    }
    return true;
}

let setStyle = function (selector, displayStyle) {
    let elemnets = document.querySelectorAll(selector);
    elemnets.forEach(element => {
        element.style.display = displayStyle;
    })
};

let previewFirst = async function (examId, paperTitle, itemCnt) {

    let urls = [];
    await fetch('/preview/first', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({examId: examId})

    }).then(response => {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();

    }).then(data => {
        if (data.successYn === 'N') {
            alert("시험지 준비 중입니다. 관리자에게 문의해 주시기 바랍니다.");
            return;
        }

        document.getElementById("preview-tit").innerHTML = '[시험지명]&ensp;' + paperTitle;
        document.getElementById("preview-cnt").innerHTML = '&emsp;[문항수]&ensp;' + itemCnt + '문항';
        // document.getElementById("preview_paperId").value = examId;

        let html = '';
        let tmpPassageId = '';
        let half = Math.ceil(data.itemList.length / 2);
        let passageNum = 0; // 지문 구분
        let tmpNum = 0;
        for (let part = 0; part < 2; part++) {
            let limit_num = part === 0 ? half : data.itemList.length;
            let start_num = part === 0 ? 0 : half;


            html += '<div class="view-data">';
            for (let s = start_num; s < limit_num; s++) {
                let obj = data.itemList[s];

                obj.questionUrl = '/getImage' + obj.questionUrl.split('tsherpa')[1];
                obj.answerUrl = '/getImage' + obj.answerUrl.split('tsherpa')[1];
                obj.explainUrl = '/getImage' + obj.explainUrl.split('tsherpa')[1];

                html += '<div class="example-area"><div class="example-box">';
                // 지문 문항
                if (obj.passageId !== null && obj.passageId !== '') {
                    if (obj.passageId !== tmpPassageId) {

                        obj.passageUrl = '/getImage' + obj.passageUrl.split('tsherpa')[1]
                        passageNum++;
                        html += '<div class="passage-area item-question">';
                        html += '   <span class="numbering numbering-numbers passage-num" data-passageNum="' + passageNum + '"></span>';
                        html += '   <img src="' + obj.passageUrl + '" alt="' + obj.passageId + '" width="453px">';
                        html += '</div>';
                        tmpPassageId = obj.passageId;

                        // URL을 배열에 추가
                        urls.push(obj.passageUrl);
                    }
                    tmpNum = passageNum;
                }

                html += '<div class="item-question passage-area">';
                html += '   <span class="numbering question-num" data-passageNum="' + passageNum + '">' + (s < 9 ? "0" + (s + 1) : (s + 1)) + '.</span>';
                html += '   <img class="item-img" src="' + obj.questionUrl + '" alt="' + obj.itemId + '">';
                html += '</div>';

                // URL을 배열에 추가
                urls.push(obj.questionUrl);

                html += '<div class="answer-container">';
                html += '   <div class="answer-tit">정답</div>';
                html += '   <div class="answer-img"><img src="' + obj.answerUrl + '" alt="' + obj.itemId + '"></div>';
                html += '</div>';

                // URL을 배열에 추가
                urls.push(obj.answerUrl);

                html += '<div class="explain-answer ">';
                html += '   <div class="explain-tit">해설</div>';
                html += '   <div class="explain-img"><img src="' + obj.explainUrl + '" alt="' + obj.itemId + '"></div>';
                html += '</div>';


                // URL을 배열에 추가
                urls.push(obj.explainUrl);

                html += '</div></div>';
                tmpNum = 0;
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
                    if (firstQuestionNum < lastQuestionNum) {
                        passageNumElement.textContent = '[' + firstQuestionNum + '~' + lastQuestionNum + ']';
                    } else if (firstQuestionNum === lastQuestionNum) {
                        passageNumElement.textContent = '[' + lastQuestionNum + ']';
                    }
                } else {
                    console.warn('지문 번호가 올바르지 않습니다:', passageNumElement);
                }
            } else {
                console.warn('passage number 값 없음', passageNumElement);
            }
        });


    }).catch(error => {
        alert("미리보기를 불러오지 못했습니다. 관리자에게 문의해 주시기 바랍니다.");
        console.error("Fetch error: ", error);
    }).finally(() => {
        // document.querySelector(".loading-cnt").style.display = 'none'; // 로딩 표시 제거
    });

    return urls;
}

let previewInfo = async function (examId) {
    let itemInfoShow = false;
    await fetch('/preview/info', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({examId: examId})

    }).then(response => {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();

    }).then(data => {
        if (data.successYn === 'Y') {
            let html = '';
            for (let s = 0; s < data.itemList.length; s++) {
                let item = data.itemList[s];

                html += `<tr>
                            <td>${item.itemNo || ''}</td>
                            <td><span class="latex_equation">${item.answer}</span></td>
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
            updateMathContent(document.getElementById("preview-itemInfo-data"));
            itemInfoShow = true;
        } else {
            itemInfoShow = false;
        }


    }).catch(error => {
        alert("미리보기를 불러오지 못했습니다. 관리자에게 문의해 주시기 바랍니다.");
        console.error("Fetch error: ", error);

    }).finally(() => {
        // loadingIndicator.style.display = 'none';
    });
    return itemInfoShow;
}

let attachPreviewButton = function(previewTabs,itemInfoShow){
    for(let i = 0 ; i < previewTabs.length; i++){
        let previewButton = previewTabs[i];

        previewButton.onclick = function(){
            let parentLi = previewButton.parentElement;
            let siblings = parentLi.parentElement.children;
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('active');
            }
            parentLi.classList.add('active');

            let type = previewButton.getAttribute('data-type');
            clickPreview(type,itemInfoShow);

            document.querySelector('.preview-download').setAttribute('data-type', type);

        }

    }
}

let attachDownloadButton = async function (col,paperTitle,itemCnt,examId,itemInfoShow,jsPDF){
    let downloads = col.querySelectorAll('.download');
    for(let i = 0 ; i < downloads.length ; i++){
        let button = downloads[i];
        if (button.classList.contains("A")) {
            button.onclick = async function (){
                await previewFirst(examId, paperTitle, itemCnt);
                await clickPreview('A', itemInfoShow);
                await rightDownload(paperTitle, jsPDF);
            }
        }else if (button.classList.contains("Q")) {
            button.onclick = async function () {
                await previewFirst(examId, paperTitle, itemCnt);
                await clickPreview('Q', itemInfoShow);
                await rightDownload(paperTitle, jsPDF);
            }
        }else if (button.classList.contains("E")) {
            button.onclick = async function () {
                await previewFirst(examId, paperTitle, itemCnt);
                await clickPreview('E', itemInfoShow);
                await rightDownload(paperTitle, jsPDF);
            }
        }else if (button.classList.contains("C")) {
            button.onclick = async function () {
                itemInfoShow = await previewInfo(examId);
                await clickPreview('C', itemInfoShow);
                await rightDownload(paperTitle, jsPDF);
            }
        }
    }

}

let justDownload = async function(paperName ,jsPDF){
    const paperElement = document.querySelector('.paper');
    paperElement.style.display = 'block'; // 사용자에게 보이지 않게 설정

    // 3. html2canvas로 미리보기 창 캡처
    const canvas = await html2canvas(paperElement, {
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        scale: 2,
    });

    // 4. PDF 생성
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [paperElement.offsetWidth, paperElement.scrollHeight],
        putOnlyUsedFonts: true,
        floatPrecision: 16,
        foreignObjectRendering: true,
    });

    const imgData = canvas.toDataURL('image/jpeg');
    const pageWidth = pdf.internal.pageSize.width;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    if (pageWidth > 0 && imgHeight > 0) {
        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, imgHeight);
    } else {
        console.error('Invalid image dimensions:', pageWidth, imgHeight);
        return null;
    }

    pdf.save(`${paperName}.pdf`);
}

let rightDownload = async function(paperName ,jsPDF){

    // 2. 미리보기 창을 DOM에 추가하되, 숨기기
    const qPreview = document.querySelector('#q-preview');

    //용훈
    qPreview.style.display = 'block';
    qPreview.style.zIndex = -100;
    //용훈 끝

   await justDownload(paperName,jsPDF)

    // 6. 미리보기 창 다시 숨기기
    //paperElement.style.display = 'none'; // 미리보기 창 숨기기

    //용훈
    qPreview.style.display = 'none';
    qPreview.style.zIndex = 10;

}

let updateMathContent = function(s) {
    MathJax.typesetPromise().then(() => {
        console.log("MathJax 렌더링 완료..");
    }).catch((err) => {
        console.error("MathJax error: ", err);
    });
}
