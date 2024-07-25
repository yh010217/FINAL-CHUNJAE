let index = 0; //이미지 번호


window.onload = function () {
    const paperId = 27;

    init_json(paperId, "answer_explain");
    init_json(paperId, "answer_only");
    init_json(paperId, "question");

}

const init_json = function (paperId, paperType) {
    fetch("/api/pdftest/getImages/" + paperId + "/" + paperType,
        {
            method: 'GET'
            , headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
        if (!response.ok)
            throw new Error('not load');
        return response.json();
    }).then((data) => {

        let dataList = [];
        let i = 0;

        /* svg to png */
        fetch('/convertImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                , 'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status === 200) {
                console.log("svgToPng 성공!!!");
                return response.json();
            } else if (response.status === 403) {
                console.log("code-403");
                return response.json();
            }
        }).then(data => {

            let num = 1;
            if(paperType==="answer_explain"){
                num = 3;
            }else if(paperType==="answer_only"){
                num = 2;
            }else{
                num = 1;
            }

            let first = data[0];
            const pf = document.createElement('p');
            const pf_txt = document.createTextNode(first.content);
            pf.appendChild(pf_txt);
            pf.className = 'item'+num;
            pf.width = 310;
            pf.height = 21;

            if(paperType==="answer_explain"){
                headerMake3(pf);
            }else if(paperType==="answer_only"){
                headerMake2(pf);
            }else{
                headerMake(pf);
            }

            for (let tempIndex = 0; tempIndex < data.length; tempIndex++) {

                console.log(tempIndex);
                let item = data[tempIndex];


                if (item.content.substring(item.content.length - 3) === "png") {

                    const img = document.createElement('img');

                    img.src = "/images/svgToPng/" + item.content;
                    img.alt = '이미지'
                    img.className = 'item'+num;

                    img.width = 310;
                    img.height = item.imageHeight;

                    if (img.height > 980) {
                        img.height = 970;
                    }// 980px : leftRightWrap의 높이

                    if(paperType==="answer_explain"){
                        elementMaking3(img, tempIndex);
                    }else if(paperType==="answer_only"){
                        elementMaking2(img, tempIndex);
                    }else{
                        elementMaking(img, tempIndex);
                    }

                } else {
                    const p = document.createElement('p');
                    const p_txt = document.createTextNode(item.content);
                    p.appendChild(p_txt);
                    p.className = 'item'+num;
                    p.width = 310;
                    p.height = 21;
                    dataList.push(p);

                    // if (tempIndex !== 0) elementMaking(p, tempIndex);

                    if(tempIndex !== 0){
                        if(paperType==="answer_explain"){
                            elementMaking3(p, tempIndex);
                        }else if(paperType==="answer_only"){
                            elementMaking2(p, tempIndex);
                        }else{
                            elementMaking(p, tempIndex);
                        }
                    }

                }
            }

            //dataListMapping(dataList);


        }).catch(error => {
            console.log('error', error);
        }).finally(() => {
            console.log("finally");
        });
    }).catch(error => console.log('error.......', error))
        .finally(() => {
            console.log('finally');
        })
}

const elementMaking = function (item, choi) {

    /* left, right 계산 */
    let leftCount = 0;
    let left = null;
    let leftChildCount = 0;
    if (document.querySelectorAll('.left') !== null) {
        leftCount =
            document.querySelectorAll('.left').length;
        if (leftCount > 0) {
            left
                = document.querySelectorAll('.left')[leftCount - 1];
            leftChildCount = left.childElementCount;
        }
    }
    let rightCount = 0;
    let right = null;
    let rightChildCount = 0;
    if (document.querySelectorAll('.right') !== null) {
        rightCount =
            document.querySelectorAll('.right').length;
        if (rightCount > 0) {
            right
                = document.querySelectorAll('.right')[rightCount - 1];
            rightChildCount = right.childElementCount;
        }
    }

    const leftRightHeight
        = document.querySelectorAll('.leftRightWrap')[0].offsetHeight;
    console.log('leftRightHeight 높이 : ' + leftRightHeight);

    let leftChildHeight = 0;
    //이전 이미지가 left에 존재하고 있을 때
    // console.log(item)
    console.log(document.querySelectorAll('.item1'));
    console.log('choi : ', choi);
    console.log(document.querySelectorAll('.item1')[choi - 1]===null)
    if (document.querySelectorAll('.item1')[choi - 1].parentElement.className === 'left') {
        let LChildH = 0;
        for (let i = 0; i < left.children.length; i++) {
            LChildH += (left.children[i]
                .offsetHeight * 310) / left.children[i]
                .offsetWidth;//LChildH를 그냥 left.children[i].offsetHeight로 해도 될 듯...;
            // console.log('왼쪽 자식 이미지 : ',left.children[i].offsetHeight)
        }
        let curImgH = item.height;

        leftChildHeight = LChildH + curImgH + 15 + 20 * (left.children.length + 1);
    }

    let rightChildHeight = 0;
    //이전 이미지가 right에 존재하고 있을 때
    if (document.querySelectorAll('.item1')[choi - 1].parentElement.className === 'right') {
        let RChildH = 0;
        for (let i = 0; i < right.children.length; i++) {
            RChildH += (right.children[i]
                .offsetHeight * 310) / right.children[i]
                .offsetWidth;
            // console.log(index,' : 오른쪽 자식 이미지 : ',RChildH);
        }
        let curImgH = item.height;
        rightChildHeight = RChildH + curImgH + 15 + 20 * (right.children.length + 1);
        // console.log(RChildH,', ',curImgH,', ',index)
    }
    // console.log(index,' : rightChildHeight..................', rightChildHeight);


    /* left에 있는 문제 높이의 합이 left의 높이보다 커지는 경우 */
    if (leftChildHeight > leftRightHeight) {
        // 요소 생성
        const newRight = document.createElement('div');

        // 요소 클래스 이름 추가
        newRight.className = 'right';

        newRight.appendChild(item);
        left.insertAdjacentElement('afterend', newRight);
        // console.log('leftChildHeight > leftRightHeight.....',index);
    }
    /* left 문제 수 2개 미만 && left 다음 right가 없는 경우 */
    else if (leftChildHeight <= leftRightHeight && left.nextElementSibling === null) {
        left.appendChild(item);
        // console.log('leftChildHeight <= leftRightHeight.....',index);
    }
    /* right 문제 수 2개 이상 && right 문제 높이가 전체 높이보다 큰 경우 */
    else if (rightChildHeight > leftRightHeight) {
        console.log('right 높이 : ', right.firstChild.naturalHeight)
        const newPage = document.createElement('div');
        const newPageInner = document.createElement('div');
        const leftRightWrap = document.createElement('div');
        const left = document.createElement('div');

        // 요소 클래스 이름 추가
        newPage.className = 'page';
        newPageInner.className = 'pageInner';
        leftRightWrap.className = 'leftRightWrap';
        left.className = 'left';

        left.appendChild(item);
        leftRightWrap.appendChild(left);
        newPageInner.appendChild(leftRightWrap);
        newPage.appendChild(newPageInner);
        document.getElementById('wrap').appendChild(newPage);
        // console.log('rightChildHeight > leftRightHeight.....',index);
    }
    /* right 문제 수 2개 미만 && right 존재하는 경우 */
    else if (rightChildHeight <= leftRightHeight && right !== null) {
        right.appendChild(item);
        // console.log('rightChildHeight <= leftRightHeight.....',index);
    }

}

const headerMake = function (item) {

    const header = document.createElement('div');
    const title = document.createElement('div');
    const title_p = document.createElement('p');
    const gradeNameWrap = document.createElement('div');
    const gradeClass = document.createElement('div');
    const name = document.createElement('div');

    const title_txt = document.createTextNode("question");
    const gradeClass_txt = document.createTextNode("학년 반 번");
    const name_txt = document.createTextNode("이름 :");

    header.className = 'header';

    title_p.appendChild(title_txt)
    title.appendChild(title_p);
    gradeClass.appendChild(gradeClass_txt);
    name.appendChild(name_txt);
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
    newPage.className = 'page';
    newPageInner.className = 'pageInner';
    leftRightWrap.className = 'leftRightWrap';
    left.className = 'left';

    left.appendChild(item);
    leftRightWrap.appendChild(left);
    newPageInner.appendChild(header);
    newPageInner.appendChild(leftRightWrap);
    newPage.appendChild(newPageInner);
    document.getElementById('wrap').appendChild(newPage);

}

const elementMaking2 = function (item, choi) {

    /* left, right 계산 */
    let leftCount = 0;
    let left = null;
    let leftChildCount = 0;
    if (document.querySelectorAll('.left2') !== null) {
        leftCount =
            document.querySelectorAll('.left2').length;
        if (leftCount > 0) {
            left
                = document.querySelectorAll('.left2')[leftCount - 1];
            leftChildCount = left.childElementCount;
        }
    }
    let rightCount = 0;
    let right = null;
    let rightChildCount = 0;
    if (document.querySelectorAll('.right2') !== null) {
        rightCount =
            document.querySelectorAll('.right2').length;
        if (rightCount > 0) {
            right
                = document.querySelectorAll('.right2')[rightCount - 1];
            rightChildCount = right.childElementCount;
        }
    }

    const leftRightHeight
        = document.querySelectorAll('.leftRightWrap')[0].offsetHeight;
    console.log('leftRightHeight 높이 : ' + leftRightHeight);

    let leftChildHeight = 0;
    //이전 이미지가 left에 존재하고 있을 때
    // console.log(item)
    console.log(document.querySelectorAll('.item2'));
    console.log('choi : ', choi);
    console.log(document.querySelectorAll('.item2')[choi - 1]===null)
    if (document.querySelectorAll('.item2')[choi - 1].parentElement.className === 'left2') {
        let LChildH = 0;
        for (let i = 0; i < left.children.length; i++) {
            LChildH += (left.children[i]
                .offsetHeight * 310) / left.children[i]
                .offsetWidth;//LChildH를 그냥 left.children[i].offsetHeight로 해도 될 듯...;
            // console.log('왼쪽 자식 이미지 : ',left.children[i].offsetHeight)
        }
        let curImgH = item.height;

        leftChildHeight = LChildH + curImgH + 15 + 20 * (left.children.length + 1);
    }

    let rightChildHeight = 0;
    //이전 이미지가 right에 존재하고 있을 때
    if (document.querySelectorAll('.item2')[choi - 1].parentElement.className === 'right2') {
        let RChildH = 0;
        for (let i = 0; i < right.children.length; i++) {
            RChildH += (right.children[i]
                .offsetHeight * 310) / right.children[i]
                .offsetWidth;
            // console.log(index,' : 오른쪽 자식 이미지 : ',RChildH);
        }
        let curImgH = item.height;
        rightChildHeight = RChildH + curImgH + 15 + 20 * (right.children.length + 1);
        // console.log(RChildH,', ',curImgH,', ',index)
    }
    // console.log(index,' : rightChildHeight..................', rightChildHeight);


    /* left에 있는 문제 높이의 합이 left의 높이보다 커지는 경우 */
    if (leftChildHeight > leftRightHeight) {
        // 요소 생성
        const newRight = document.createElement('div');

        // 요소 클래스 이름 추가
        newRight.className = 'right2';

        newRight.appendChild(item);
        left.insertAdjacentElement('afterend', newRight);
        // console.log('leftChildHeight > leftRightHeight.....',index);
    }
    /* left 문제 수 2개 미만 && left 다음 right가 없는 경우 */
    else if (leftChildHeight <= leftRightHeight && left.nextElementSibling === null) {
        left.appendChild(item);
        // console.log('leftChildHeight <= leftRightHeight.....',index);
    }
    /* right 문제 수 2개 이상 && right 문제 높이가 전체 높이보다 큰 경우 */
    else if (rightChildHeight > leftRightHeight) {
        console.log('right 높이 : ', right.firstChild.naturalHeight)
        const newPage = document.createElement('div');
        const newPageInner = document.createElement('div');
        const leftRightWrap = document.createElement('div');
        const left = document.createElement('div');

        // 요소 클래스 이름 추가
        newPage.className = 'page2';
        newPageInner.className = 'pageInner';
        leftRightWrap.className = 'leftRightWrap';
        left.className = 'left2';

        left.appendChild(item);
        leftRightWrap.appendChild(left);
        newPageInner.appendChild(leftRightWrap);
        newPage.appendChild(newPageInner);
        document.getElementById('wrap').appendChild(newPage);
        // console.log('rightChildHeight > leftRightHeight.....',index);
    }
    /* right 문제 수 2개 미만 && right 존재하는 경우 */
    else if (rightChildHeight <= leftRightHeight && right !== null) {
        right.appendChild(item);
        // console.log('rightChildHeight <= leftRightHeight.....',index);
    }

}

const headerMake2 = function (item) {

    const header = document.createElement('div');
    const title = document.createElement('div');
    const title_p = document.createElement('p');
    const gradeNameWrap = document.createElement('div');
    const gradeClass = document.createElement('div');
    const name = document.createElement('div');

    const title_txt = document.createTextNode("answer_only");
    const gradeClass_txt = document.createTextNode("학년 반 번");
    const name_txt = document.createTextNode("이름 :");

    header.className = 'header';

    title_p.appendChild(title_txt)
    title.appendChild(title_p);
    gradeClass.appendChild(gradeClass_txt);
    name.appendChild(name_txt);
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
    newPage.className = 'page2';
    newPageInner.className = 'pageInner';
    leftRightWrap.className = 'leftRightWrap';
    left.className = 'left2';

    left.appendChild(item);
    leftRightWrap.appendChild(left);
    newPageInner.appendChild(header);
    newPageInner.appendChild(leftRightWrap);
    newPage.appendChild(newPageInner);
    document.getElementById('wrap').appendChild(newPage);

}

const elementMaking3 = function (item, choi) {

    /* left, right 계산 */
    let leftCount = 0;
    let left = null;
    let leftChildCount = 0;
    if (document.querySelectorAll('.left3') !== null) {
        leftCount =
            document.querySelectorAll('.left3').length;
        if (leftCount > 0) {
            left
                = document.querySelectorAll('.left3')[leftCount - 1];
            leftChildCount = left.childElementCount;
        }
    }
    let rightCount = 0;
    let right = null;
    let rightChildCount = 0;
    if (document.querySelectorAll('.right3') !== null) {
        rightCount =
            document.querySelectorAll('.right3').length;
        if (rightCount > 0) {
            right
                = document.querySelectorAll('.right3')[rightCount - 1];
            rightChildCount = right.childElementCount;
        }
    }

    const leftRightHeight
        = document.querySelectorAll('.leftRightWrap')[0].offsetHeight;
    console.log('leftRightHeight 높이 : ' + leftRightHeight);

    let leftChildHeight = 0;
    //이전 이미지가 left에 존재하고 있을 때
    // console.log(item)
    console.log(document.querySelectorAll('.item3'));
    console.log('choi : ', choi);
    console.log(document.querySelectorAll('.item3')[choi - 1]===null)
    if (document.querySelectorAll('.item3')[choi - 1].parentElement.className === 'left3') {
        let LChildH = 0;
        for (let i = 0; i < left.children.length; i++) {
            LChildH += (left.children[i]
                .offsetHeight * 310) / left.children[i]
                .offsetWidth;//LChildH를 그냥 left.children[i].offsetHeight로 해도 될 듯...;
            // console.log('왼쪽 자식 이미지 : ',left.children[i].offsetHeight)
        }
        let curImgH = item.height;

        leftChildHeight = LChildH + curImgH + 15 + 20 * (left.children.length + 1);
    }

    let rightChildHeight = 0;
    //이전 이미지가 right에 존재하고 있을 때
    if (document.querySelectorAll('.item3')[choi - 1].parentElement.className === 'right3') {
        let RChildH = 0;
        for (let i = 0; i < right.children.length; i++) {
            RChildH += (right.children[i]
                .offsetHeight * 310) / right.children[i]
                .offsetWidth;
            // console.log(index,' : 오른쪽 자식 이미지 : ',RChildH);
        }
        let curImgH = item.height;
        rightChildHeight = RChildH + curImgH + 15 + 20 * (right.children.length + 1);
        // console.log(RChildH,', ',curImgH,', ',index)
    }
    // console.log(index,' : rightChildHeight..................', rightChildHeight);


    /* left에 있는 문제 높이의 합이 left의 높이보다 커지는 경우 */
    if (leftChildHeight > leftRightHeight) {
        // 요소 생성
        const newRight = document.createElement('div');

        // 요소 클래스 이름 추가
        newRight.className = 'right3';

        newRight.appendChild(item);
        left.insertAdjacentElement('afterend', newRight);
        // console.log('leftChildHeight > leftRightHeight.....',index);
    }
    /* left 문제 수 2개 미만 && left 다음 right가 없는 경우 */
    else if (leftChildHeight <= leftRightHeight && left.nextElementSibling === null) {
        left.appendChild(item);
        // console.log('leftChildHeight <= leftRightHeight.....',index);
    }
    /* right 문제 수 2개 이상 && right 문제 높이가 전체 높이보다 큰 경우 */
    else if (rightChildHeight > leftRightHeight) {
        console.log('right 높이 : ', right.firstChild.naturalHeight)
        const newPage = document.createElement('div');
        const newPageInner = document.createElement('div');
        const leftRightWrap = document.createElement('div');
        const left = document.createElement('div');

        // 요소 클래스 이름 추가
        newPage.className = 'page3';
        newPageInner.className = 'pageInner';
        leftRightWrap.className = 'leftRightWrap';
        left.className = 'left3';

        left.appendChild(item);
        leftRightWrap.appendChild(left);
        newPageInner.appendChild(leftRightWrap);
        newPage.appendChild(newPageInner);
        document.getElementById('wrap').appendChild(newPage);
        // console.log('rightChildHeight > leftRightHeight.....',index);
    }
    /* right 문제 수 2개 미만 && right 존재하는 경우 */
    else if (rightChildHeight <= leftRightHeight && right !== null) {
        right.appendChild(item);
        // console.log('rightChildHeight <= leftRightHeight.....',index);
    }

}

const headerMake3 = function (item) {

    const header = document.createElement('div');
    const title = document.createElement('div');
    const title_p = document.createElement('p');
    const gradeNameWrap = document.createElement('div');
    const gradeClass = document.createElement('div');
    const name = document.createElement('div');

    const title_txt = document.createTextNode("answer_explain");
    const gradeClass_txt = document.createTextNode("학년 반 번");
    const name_txt = document.createTextNode("이름 :");

    header.className = 'header';

    title_p.appendChild(title_txt)
    title.appendChild(title_p);
    gradeClass.appendChild(gradeClass_txt);
    name.appendChild(name_txt);
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
    newPage.className = 'page3';
    newPageInner.className = 'pageInner';
    leftRightWrap.className = 'leftRightWrap';
    left.className = 'left3';

    left.appendChild(item);
    leftRightWrap.appendChild(left);
    newPageInner.appendChild(header);
    newPageInner.appendChild(leftRightWrap);
    newPage.appendChild(newPageInner);
    document.getElementById('wrap').appendChild(newPage);

}


async function generatePDFs() {
    try {
        // 클래스 이름이 'page'인 div 요소들을 PDF로 만들기
        const pdfBuffer1 = await createPDFs('.page', 'output1.pdf');
        console.log("pdfBuffer1 : ", pdfBuffer1)

        // 클래스 이름이 'page2'인 div 요소들을 PDF로 만들기
        const pdfBuffer2 = await createPDFs('.page2', 'output2.pdf');

        // 클래스 이름이 'page2'인 div 요소들을 PDF로 만들기
        const pdfBuffer3 = await createPDFs('.page3', 'output3.pdf');

        const formData = new FormData();
        formData.append('pdfFile1', pdfBuffer1, 'output1.pdf', 'application/pdf');
        formData.append('pdfFile2', pdfBuffer2, 'output2.pdf', 'application/pdf');
        formData.append('pdfFile3', pdfBuffer3, 'output3.pdf', 'application/pdf');

        fetch('/upload', {
            method: 'POST',
            body: formData,
            allowTaint: true,
            useCORS: true
        })
            .then(response => response.text())
            .then(data => {
                console.log('PDF uploaded to S3:', data);
                alert('PDF uploaded to S3 successfully! : ' + data);
            })
            .catch(error => {
                console.error('Error uploading PDF to S3:', error);
                alert('Error uploading PDF to S3');
            });

        console.log('PDF 파일들이 성공적으로 S3에 업로드되었습니다.');
    } catch (error) {
        console.error('PDF 생성 및 업로드 중 오류가 발생했습니다.', error);
    }
}

async function createPDFs(className, fileName) {

    // A4 사이즈 (210mm x 297mm)로 설정
    const pdfWidth = 210;
    const pdfHeight = 297;

    const elements = document.querySelectorAll(className);

    // 새로운 PDF 객체 생성
    const pdf = new jspdf.jsPDF({
        orientation: 'portrait', // 세로 방향
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
    });

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        // div 요소를 이미지로 캡처
        const canvas = await html2canvas(element, {
            scale: 2, // 해상도 조정
            allowTaint: true,
            useCORS: true
        });
        const imageData = canvas.toDataURL('image/jpeg');

        // 첫 페이지가 아니면 새 페이지 추가
        if (i > 0) {
            pdf.addPage();
        }

        // 이미지를 PDF에 추가
        pdf.addImage(imageData, 'JPEG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
    }

    // PDF 파일을 버퍼로 변환
    const pdfBuffer = pdf.output('arraybuffer');
    return pdf.output('blob');
}

async function downloadPDF() {

    // 특정 클래스 이름을 가진 div 요소들을 PDF로 만들어 S3에 업로드하는 함수
    await generatePDFs();

}
