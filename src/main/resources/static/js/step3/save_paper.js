window.onload = function () {
    const saveName = document.getElementById("saveName").value;
    const paperList = document.getElementById("paperList").value;
    const paperListJson = JSON.parse(paperList);
    let questionList = [];
    let answerExplainList = [];
    let allList = [];

    let index = 1;
    paperListJson.map(item => {
        /* 문제 */
        if (questionList.includes(item.passageUrl) === false) {
            if (item.passageUrl !== "null") {
                questionList.push(item.passageUrl);
            }
        }
        questionList.push(index);
        questionList.push(item.questionUrl);
        /* 정답 + 해설 */
        answerExplainList.push(index);
        answerExplainList.push(item.answerUrl);
        answerExplainList.push(item.explainUrl);
        /* 문제 + 정답 + 해설 */
        if (allList.includes(item.passageUrl) === false) {
            if (item.passageUrl !== "null") {
                allList.push(item.passageUrl);
            }
        }
        allList.push(index);
        allList.push(item.questionUrl);
        allList.push(item.answerUrl);
        allList.push(item.explainUrl);

        index++;
    });

    const question = function (list, num) {
        return new Promise((resolve, reject) => {
            let dataList = [];

            fetch('/convertImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(list)
            }).then(response => {
                if (!response.ok)
                    throw new Error('not load');
                return response.json();
            }).then(result => {
                for (let i = 0; i < result.length; i++) {
                    let item = result[i];
                    if (item.content && item.content.substring(0, 4) === "data") {
                        const img = document.createElement('img');
                        img.src = item.content;
                        img.alt = '이미지' + (i + 1);
                        img.className = 'item' + num;
                        img.width = 310;
                        img.height = item.imageHeight;
                        if (img.height > 980) {
                            img.height = 970;
                        }
                        dataList.push(img);
                    } else {
                        const p = document.createElement('p');
                        const p_txt = document.createTextNode(item.content);
                        p.appendChild(p_txt);
                        p.className = 'item' + num;
                        p.width = 310;
                        p.height = item.imageHeight;
                        dataList.push(p);
                    }
                }
                let index = 0;
                dataList.map(item => {
                    /* 첫번째 문제인 경우 */
                    if (index === 0) {
                        // 헤더
                        const header = document.createElement('div');
                        const title = document.createElement('div');
                        const title_p = document.createElement('p');
                        const gradeNameWrap = document.createElement('div');
                        const gradeClass = document.createElement('div');
                        const gradeClass_p = document.createElement('p');
                        const name = document.createElement('div');
                        const name_p = document.createElement('p');

                        const title_txt = document.createTextNode(saveName);
                        const gradeClass_txt = document.createTextNode("학년 반 번");
                        const name_txt = document.createTextNode("이름 :");

                        header.className = 'header';

                        title_p.appendChild(title_txt);
                        title.appendChild(title_p);
                        gradeClass_p.appendChild(gradeClass_txt);
                        gradeClass.appendChild(gradeClass_p);
                        name_p.appendChild(name_txt);
                        name.appendChild(name_p);
                        gradeNameWrap.appendChild(gradeClass);
                        gradeNameWrap.appendChild(name);
                        header.appendChild(title);
                        header.appendChild(gradeNameWrap);

                        // 요소 생성
                        const newPage = document.createElement('div');
                        const newPageInner = document.createElement('div');
                        const leftRightWrap = document.createElement('div');
                        const left = document.createElement('div');

                        // 요소 클래스 이름 추가
                        newPage.className = `page${num}`;
                        newPageInner.className = 'pageInner';
                        leftRightWrap.className = 'leftRightWrap';
                        left.className = `left${num}`;

                        left.appendChild(item);
                        leftRightWrap.appendChild(left);
                        newPageInner.appendChild(header);
                        newPageInner.appendChild(leftRightWrap);
                        newPage.appendChild(newPageInner);
                        document.getElementById('wrap').appendChild(newPage);

                    } else {
                        /* left, right 계산 */
                        let leftCount = 0;
                        let left = null;
                        let leftChildCount = 0;
                        if (document.querySelectorAll(`.left${num}`) !== null) {
                            leftCount = document.querySelectorAll(`.left${num}`).length;
                            if (leftCount > 0) {
                                left = document.querySelectorAll(`.left${num}`)[leftCount - 1];
                                leftChildCount = left.childElementCount;
                            }
                        }
                        let rightCount = 0;
                        let right = null;
                        let rightChildCount = 0;
                        if (document.querySelectorAll(`.right${num}`) !== null) {
                            rightCount = document.querySelectorAll(`.right${num}`).length;
                            if (rightCount > 0) {
                                right = document.querySelectorAll(`.right${num}`)[rightCount - 1];
                                rightChildCount = right.childElementCount;
                            }
                        }

                        const leftRightHeight = document.querySelectorAll('.leftRightWrap')[0].offsetHeight;

                        let leftChildHeight = 0;
                        //이전 이미지가 left에 존재하고 있을 때
                        if (document.querySelectorAll(`.item${num}`)[index - 1].parentElement.className === `left${num}`) {
                            let LChildH = 0;
                            for (let i = 0; i < left.children.length; i++) {
                                LChildH += (left.children[i].offsetHeight * 310) / left.children[i].offsetWidth;
                            }
                            let curImgH = item.height;
                            leftChildHeight = LChildH + curImgH + 15 + 20 * (left.children.length + 1);
                        }

                        let rightChildHeight = 0;
                        //이전 이미지가 right에 존재하고 있을 때
                        if (document.querySelectorAll(`.item${num}`)[index - 1].parentElement.className === `right${num}`) {
                            let RChildH = 0;
                            for (let i = 0; i < right.children.length; i++) {
                                RChildH += (right.children[i].offsetHeight * 310) / right.children[i].offsetWidth;
                            }
                            let curImgH = item.height;
                            rightChildHeight = RChildH + curImgH + 15 + 20 * (right.children.length + 1);
                        }

                        /* left에 있는 문제 높이의 합이 left의 높이보다 커지는 경우 */
                        if (leftChildHeight > leftRightHeight) {
                            // 요소 생성
                            const newRight = document.createElement('div');

                            // 요소 클래스 이름 추가
                            newRight.className = `right${num}`;

                            newRight.appendChild(item);
                            left.insertAdjacentElement('afterend', newRight);
                        }
                        /* left 다음 right가 없는 경우 */
                        else if (leftChildHeight <= leftRightHeight && left.nextElementSibling === null) {
                            left.appendChild(item);
                        }
                        /* right 문제 높이가 전체 높이보다 큰 경우 */
                        else if (rightChildHeight > leftRightHeight) {
                            const newPage = document.createElement('div');
                            const newPageInner = document.createElement('div');
                            const leftRightWrap = document.createElement('div');
                            const left = document.createElement('div');

                            // 요소 클래스 이름 추가
                            newPage.className = `page${num}`;
                            newPageInner.className = 'pageInner';
                            leftRightWrap.className = 'leftRightWrap';
                            left.className = `left${num}`;

                            left.appendChild(item);
                            leftRightWrap.appendChild(left);
                            newPageInner.appendChild(leftRightWrap);
                            newPage.appendChild(newPageInner);
                            document.getElementById('wrap').appendChild(newPage);
                        }
                        /* right 존재하는 경우 */
                        else if (rightChildHeight <= leftRightHeight && right !== null) {
                            right.appendChild(item);
                        }
                    }
                    index++; // 이미지 번호+1
                })
                resolve(); // Resolve after all items are processed
            }).catch(() => {
                reject(); // Reject on failure
            });
        });
    }

    Promise.all([
        question(questionList, ''),
        question(answerExplainList, 2),
        question(allList, 3)
    ]).then(() => {
        downloadPDF();
    }).catch(error => {
        console.error('에러 : ', error);
    });
}

function downloadPDF() {
    const paperId = document.getElementById("paperId").value;
    const saveName = document.getElementById("saveName").value;
    const paperList = document.getElementById("paperList").value;
    const subjectId = document.getElementById("subjectId").value;

    async function generatePDFs() {
        try {
            // 클래스 이름이 'page'인 div 요소들을 PDF로 만들기
            const pdfBuffer1 = await createPDFs('.page', 'question.pdf');
            console.log("pdfBuffer1 : ", pdfBuffer1)

            // 클래스 이름이 'page2'인 div 요소들을 PDF로 만들기
            const pdfBuffer2 = await createPDFs('.page2', 'answerExplain.pdf');

            // 클래스 이름이 'page3'인 div 요소들을 PDF로 만들기
            const pdfBuffer3 = await createPDFs('.page3', 'all.pdf');

            const formData = new FormData();
            formData.append("paperId", paperId);
            formData.append("saveName", saveName);
            formData.append("paperList", paperList);
            formData.append("subjectId", subjectId);
            formData.append('question', pdfBuffer1, '문제.pdf', 'application/pdf');
            formData.append('answerExplain', pdfBuffer2, '정답,해설.pdf', 'application/pdf');
            formData.append('all', pdfBuffer3, '.pdf', 'application/pdf');

            fetch('/upload', {
                method: 'POST',
                body: formData,
                allowTaint: true,
                useCORS: true,
            })
                .then(response => response.text())
                .then(data => {
                    window.location.href = '/save_comp';
                })
                .catch(error => {
                    console.error('Error uploading PDF to S3:', error);
                });

            console.log('PDF 파일들이 성공적으로 S3에 업로드되었습니다.');
        } catch (error) {
            console.error('PDF 생성 및 업로드 중 오류가 발생했습니다.', error);
        }
    }

// A4 사이즈 (210mm x 297mm)로 설정
    const pdfWidth = 210;
    const pdfHeight = 297;

// 특정 클래스 이름을 가진 div 요소들을 PDF로 만들어 S3에 업로드하는 함수
    async function createPDFs(className) {
        const elements = document.querySelectorAll(className);

        // 새로운 PDF 객체 생성
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait', // 세로 방향
            unit: 'mm',
            format: [pdfWidth, pdfHeight],
            foreignObjectRendering: true,
            useCORS: true,
            mode: 'cors', // CORS 요청 설정
            credentials: 'include' // 필요에 따라 credentials 설정
        });

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            // div 요소를 이미지로 캡처
            const canvas = await html2canvas(element, {
                scale: 2, // 해상도 조정
                allowTaint: true,
                useCORS: true,
                mode: 'cors', // CORS 요청 설정
                credentials: 'include' // 필요에 따라 credentials 설정
            });
            const imageData = canvas.toDataURL('image/jpeg');

            // 첫 페이지가 아니면 새 페이지 추가
            if (i > 0) {
                pdf.addPage();
            }

            // 이미지를 PDF에 추가
            pdf.addImage(imageData, 'JPEG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
        }

        return pdf.output('blob');
    }

    generatePDFs()
}


