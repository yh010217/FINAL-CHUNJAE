/* 이미지 배열 생성 */
let imgList = [];
for(let i=0; i<40; i++){
    const img = document.createElement('img');
    if(i%2===0){
        img.src = 'images/temp.svg'
    }else if(i%3===1){
        img.src = 'images/img2.png';
    }else{
        img.src = 'images/img.png';
    }
    img.alt = '이미지'+(i+1);
    img.className = 'item';
    imgList[i] = img;
}

let imgList2 = [];
for(let i=0; i<40; i++){
    const img = document.createElement('img');
    if(i%2===0){
        img.src = 'images/temp.svg'
    }else if(i%3===1){
        img.src = 'images/img2.png';
    }else{
        img.src = 'images/img.png';
    }
    img.alt = '이미지'+(i+1);
    img.className = 'item2';
    imgList2[i] = img;
}


let index = 0; //이미지 번호

window.onload = function (){
    const num=23;

    const init_json = async function (){
        await fetch("/api/pdftest/getImages/"+num+"/"+"question",
            {
                method:'GET'
                , headers: {
                    'Accept': 'application/json'

                }
            }).then(response=>{
            if(!response.ok)
                throw new Error('not load');
            return response.json();
        }).then((data)=> {
            let dataList = [];
            let i = 0;

            /* svg to png */
            fetch('/convertImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    , 'Accept':'application/json'
                },
                body: JSON.stringify(data)
            }).then(response=>{
                if(response.status===200){
                    console.log("svgToPng 성공!!!");
                    return response.json();
                }else if(response.status===403){
                    console.log("code-403");
                    return response.json();
                }
            }).then(data=>{
                console.log(data);

                data.map(item => {
                    // console.log(item.substring(item.length-3));
                    if(item.substring(item.length-3)==="png"){
                        const img = document.createElement('img');
                        img.src = "images/svgToPgitng/"+item;
                        img.alt = '이미지'+(i+1);
                        img.className = 'item svg';
                        let imgWidth;
                        let imgHeight;
                        img.onload = function (){
                            imgHeight = img.naturalHeight;
                            imgWidth = img.naturalWidth;
                            img.width = 310;
                            img.height = imgHeight*310/imgWidth;
                            if(img.height>980){
                                img.height=970;
                            }// 980px : leftRightWrap의 높이
                        }
                        console.log('imgHeight ; ', imgHeight)
                        dataList[i] = img;
                        i++;
                    }else{
                        const p = document.createElement('p');
                        const p_txt = document.createTextNode(item);
                        p.appendChild(p_txt);
                        p.className = 'item';
                        p.width = 310;
                        p.height = 21;
                        dataList[i] = p;
                        i++;
                    }
                });

                let index = 0;
                dataList.map(item => {
                    /* 첫번째 문제인 경우 */
                    if(index===0){
                        console.log('asdfasdfasdfasdfasdf')
                        // 헤더
                        const header = document.createElement('div');
                        const title = document.createElement('div');
                        const title_p = document.createElement('p');
                        const gradeNameWrap = document.createElement('div');
                        const gradeClass = document.createElement('div');
                        const name = document.createElement('div');

                        const title_txt = document.createTextNode("제목");
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

                    }else{
                        /* left, right 계산 */
                        let leftCount = 0;
                        let left = null;
                        let leftChildCount = 0;
                        if(document.querySelectorAll('.left')!==null){
                            leftCount =
                                document.querySelectorAll('.left').length;
                            if(leftCount > 0){
                                left
                                    = document.querySelectorAll('.left')[leftCount-1];
                                leftChildCount = left.childElementCount;
                            }
                        }
                        let rightCount = 0;
                        let right = null;
                        let rightChildCount = 0;
                        if(document.querySelectorAll('.right')!==null){
                            rightCount =
                                document.querySelectorAll('.right').length;
                            if(rightCount > 0){
                                right
                                    = document.querySelectorAll('.right')[rightCount-1];
                                rightChildCount = right.childElementCount;
                            }
                        }

                        const leftRightHeight
                            = document.querySelectorAll('.leftRightWrap')[0].offsetHeight;

                        let leftChildHeight = 0;
                        //이전 이미지가 left에 존재하고 있을 때
                        // console.log(item)
                        if(document.querySelectorAll('.item')[index-1].parentElement.className==='left'){
                            let LChildH = 0;
                            for(let i=0; i<left.children.length; i++){
                                LChildH += (left.children[i]
                                    .offsetHeight * 310)/left.children[i]
                                    .offsetWidth;//LChildH를 그냥 left.children[i].offsetHeight로 해도 될 듯...;
                                // console.log('왼쪽 자식 이미지 : ',left.children[i].offsetHeight)
                            }
                            let curImgH = item.height;
                            console.log("naturalHeight : ",item.naturalHeight)
                            console.log("height : ",item.height)
                            console.log("offsetHeight : ",item.offsetHeight)
                            leftChildHeight = LChildH+curImgH+15+20*(left.children.length+1);
                            // console.log('LChildH : ',LChildH,'.....curImg ; ',curImgH,'.....left.children.length+1',left.children.length+1);
                            // console.log("index : ",index,".........",curImgH)
                        }
                        // console.log('leftChildHeight..................', leftChildHeight);

                        let rightChildHeight = 0;
                        //이전 이미지가 right에 존재하고 있을 때
                        if(document.querySelectorAll('.item')[index-1].parentElement.className==='right'){
                            let RChildH = 0;
                            for(let i=0; i<right.children.length; i++){
                                RChildH += (right.children[i]
                                    .offsetHeight * 310)/right.children[i]
                                    .offsetWidth;
                                // console.log(index,' : 오른쪽 자식 이미지 : ',RChildH);
                            }
                            let curImgH = item.height;
                            rightChildHeight = RChildH+curImgH+15+20*(right.children.length+1);
                            // console.log(RChildH,', ',curImgH,', ',index)
                        }
                        // console.log(index,' : rightChildHeight..................', rightChildHeight);


                        /* left에 있는 문제 수 > || left에 있는 문제 높이의 합이 left의 높이보다 커지는 경우 */
                        if(leftChildHeight > leftRightHeight){
                            // 요소 생성
                            const newRight = document.createElement('div');

                            // 요소 클래스 이름 추가
                            newRight.className = 'right';

                            newRight.appendChild(item);
                            left.insertAdjacentElement('afterend', newRight);
                            // console.log('leftChildHeight > leftRightHeight.....',index);
                        }
                        /* left 문제 수 2개 미만 && left 다음 right가 없는 경우 */
                        else if(leftChildHeight <= leftRightHeight && left.nextElementSibling===null){
                            left.appendChild(item);
                            // console.log('leftChildHeight <= leftRightHeight.....',index);
                        }
                        /* right 문제 수 2개 이상 && right 문제 높이가 전체 높이보다 큰 경우 */
                        else if(rightChildHeight > leftRightHeight){
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
                        else if(rightChildHeight <= leftRightHeight && right !== null){
                            right.appendChild(item);
                            // console.log('rightChildHeight <= leftRightHeight.....',index);
                        }

                    }
                    index++; // 이미지 번호+1
                })


            }).catch(error=>{
                console.log('error', error);
            }).finally(()=>{
                console.log("finally");
            });
        })
            .catch(error => console.log('error.......', error))
            .finally(() => {
                console.log('finally');
            })
    }
    init_json();


/*    const init_json2 = function (){
        fetch("/api/pdftest/getImages/"+num+"/"+"answer_only",
            {
                method:'GET'
                , headers: {
                    'Accept': 'application/json'

                }
            }).then(response=>{
            if(!response.ok)
                throw new Error('not load');
            return response.json();
        }).then((data)=> {
            let dataList = [];
            let i = 0;
            data.map(item => {
                if(item.substring(item.length-3)==="svg"){
                    const img = document.createElement('img');
                    img.src = item;
                    img.alt = '이미지'+(i+1);
                    img.className = 'item2 svg2';
                    const o_width = img.width;
                    img.width = 310;
                    img.height = img.height*310/o_width;
                    if(img.height>980){
                        img.height=970;
                    }// 980px : leftRightWrap의 높이
                    dataList[i] = img;
                    i++;
                }else{
                    const p = document.createElement('p');
                    const p_txt = document.createTextNode(item);
                    p.appendChild(p_txt);
                    p.className = 'item2';
                    p.width = 310;
                    p.height = 21;
                    dataList[i] = p;
                    i++;
                }
            });

            let index = 0;
            dataList.map(item => {
                /!* 첫번째 문제인 경우 *!/
                if(index===0){
                    // 헤더
                    const header = document.createElement('div');
                    const title = document.createElement('div');
                    const title_p = document.createElement('p');
                    const gradeNameWrap = document.createElement('div');
                    const gradeClass = document.createElement('div');
                    const name = document.createElement('div');

                    const title_txt = document.createTextNode("제목2");
                    const gradeClass_txt = document.createTextNode("학년 반 번");
                    const name_txt = document.createTextNode("이름 :");

                    header.className = 'header2';

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
                    newPageInner.className = 'pageInner2';
                    leftRightWrap.className = 'leftRightWrap2';
                    left.className = 'left2';

                    left.appendChild(item);
                    leftRightWrap.appendChild(left);
                    newPageInner.appendChild(header);
                    newPageInner.appendChild(leftRightWrap);
                    newPage.appendChild(newPageInner);
                    document.getElementById('wrap').appendChild(newPage);

                }else{
                    /!* left, right 계산 *!/
                    let leftCount = 0;
                    let left = null;
                    let leftChildCount = 0;
                    if(document.querySelectorAll('.left2')!==null){
                        leftCount =
                            document.querySelectorAll('.left2').length;
                        if(leftCount > 0){
                            left
                                = document.querySelectorAll('.left2')[leftCount-1];
                            leftChildCount = left.childElementCount;
                        }
                    }
                    let rightCount = 0;
                    let right = null;
                    let rightChildCount = 0;
                    if(document.querySelectorAll('.right2')!==null){
                        rightCount =
                            document.querySelectorAll('.right2').length;
                        if(rightCount > 0){
                            right
                                = document.querySelectorAll('.right2')[rightCount-1];
                            rightChildCount = right.childElementCount;
                        }
                    }

                    const leftRightHeight
                        = document.querySelectorAll('.leftRightWrap')[0].offsetHeight;

                    let leftChildHeight = 0;
                    //이전 이미지가 left에 존재하고 있을 때
                    // console.log(item)
                    if(document.querySelectorAll('.item2')[index-1].parentElement.className==='left2'){
                        let LChildH = 0;
                        for(let i=0; i<left.children.length; i++){
                            LChildH += (left.children[i]
                                .offsetHeight * 310)/left.children[i]
                                .offsetWidth;//LChildH를 그냥 left.children[i].offsetHeight로 해도 될 듯...;
                            // console.log('왼쪽 자식 이미지 : ',left.children[i].offsetHeight)
                        }
                        let curImgH = item.height;
                        leftChildHeight = LChildH+curImgH+15+20*(left.children.length+1);
                        // console.log('LChildH : ',LChildH,'.....curImg ; ',curImgH,'.....left.children.length+1',left.children.length+1);
                        // console.log("index : ",index,".........",curImgH)
                    }
                    // console.log('leftChildHeight..................', leftChildHeight);

                    let rightChildHeight = 0;
                    //이전 이미지가 right에 존재하고 있을 때
                    if(document.querySelectorAll('.item2')[index-1].parentElement.className==='right2'){
                        let RChildH = 0;
                        for(let i=0; i<right.children.length; i++){
                            RChildH += (right.children[i]
                                .offsetHeight * 310)/right.children[i]
                                .offsetWidth;
                            // console.log(index,' : 오른쪽 자식 이미지 : ',RChildH);
                        }
                        let curImgH = item.height;
                        rightChildHeight = RChildH+curImgH+15+20*(right.children.length+1);
                        // console.log(RChildH,', ',curImgH,', ',index)
                    }
                    // console.log(index,' : rightChildHeight..................', rightChildHeight);


                    /!* left에 있는 문제 수 > || left에 있는 문제 높이의 합이 left의 높이보다 커지는 경우 *!/
                    if(leftChildHeight > leftRightHeight){
                        // 요소 생성
                        const newRight = document.createElement('div');

                        // 요소 클래스 이름 추가
                        newRight.className = 'right2';

                        newRight.appendChild(item);
                        left.insertAdjacentElement('afterend', newRight);
                        // console.log('leftChildHeight > leftRightHeight.....',index);
                    }
                    /!* left 문제 수 2개 미만 && left 다음 right가 없는 경우 *!/
                    else if(leftChildHeight <= leftRightHeight && left.nextElementSibling===null){
                        left.appendChild(item);
                        // console.log('leftChildHeight <= leftRightHeight.....',index);
                    }
                    /!* right 문제 수 2개 이상 && right 문제 높이가 전체 높이보다 큰 경우 *!/
                    else if(rightChildHeight > leftRightHeight){
                        console.log('right 높이 : ', right.firstChild.naturalHeight)
                        const newPage = document.createElement('div');
                        const newPageInner = document.createElement('div');
                        const leftRightWrap = document.createElement('div');
                        const left = document.createElement('div');

                        // 요소 클래스 이름 추가
                        newPage.className = 'page2';
                        newPageInner.className = 'pageInner2';
                        leftRightWrap.className = 'leftRightWrap2';
                        left.className = 'left2';

                        left.appendChild(item);
                        leftRightWrap.appendChild(left);
                        newPageInner.appendChild(leftRightWrap);
                        newPage.appendChild(newPageInner);
                        document.getElementById('wrap').appendChild(newPage);
                        // console.log('rightChildHeight > leftRightHeight.....',index);
                    }
                    /!* right 문제 수 2개 미만 && right 존재하는 경우 *!/
                    else if(rightChildHeight <= leftRightHeight && right !== null){
                        right.appendChild(item);
                        // console.log('rightChildHeight <= leftRightHeight.....',index);
                    }

                }
                index++; // 이미지 번호+1
            })

        })
            .catch(error => console.log('error.......', error))
            .finally(() => {
                console.log('finally');
            })
    }
    init_json2();*/
}

/*

window.onload = function (){
    /!* 화면에 이미지 추가 *!/
    imgList.forEach(img=>{

        /!* 첫번째 문제인 경우 *!/
        if(index===0){
            // 헤더
            const header = document.createElement('div');
            const title = document.createElement('div');
            const title_p = document.createElement('p');
            const gradeNameWrap = document.createElement('div');
            const gradeClass = document.createElement('div');
            const name = document.createElement('div');

            const title_txt = document.createTextNode("제목");
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

            left.appendChild(img);
            leftRightWrap.appendChild(left);
            newPageInner.appendChild(header);
            newPageInner.appendChild(leftRightWrap);
            newPage.appendChild(newPageInner);
            document.getElementById('wrap').appendChild(newPage);

            console.log(index);
        }else{
            /!* left, right 계산 *!/
            let leftCount = 0;
            let left = null;
            let leftChildCount = 0;
            if(document.querySelectorAll('.left')!==null){
                leftCount =
                    document.querySelectorAll('.left').length;
                if(leftCount > 0){
                    left
                        = document.querySelectorAll('.left')[leftCount-1];
                    leftChildCount = left.childElementCount;
                }
            }
            let rightCount = 0;
            let right = null;
            let rightChildCount = 0;
            if(document.querySelectorAll('.right')!==null){
                rightCount =
                    document.querySelectorAll('.right').length;
                if(rightCount > 0){
                    right
                        = document.querySelectorAll('.right')[rightCount-1];
                    rightChildCount = right.childElementCount;
                }
            }

            const leftRightHeight
                = document.querySelectorAll('.leftRightWrap')[0].clientHeight;

            let leftChildHeight = 0;
            //이전 이미지가 left에 존재하고 있을 때
            if(document.querySelectorAll('.img')[index-1].parentElement.className==='left'){
                let LChildH = 0;
                for(let i=0; i<left.children.length; i++){
                    LChildH += (left.children[i]
                        .naturalHeight * 340)/left.children[i]
                        .naturalWidth;
                    // console.log('왼쪽 자식 이미지 : ',left.children[i]);
                }
                let curImgH = (img.naturalHeight * 340)/img.naturalWidth;
                leftChildHeight = LChildH+curImgH+15+40*(left.children.length+1);
            }
            // console.log('leftChildHeight..................', leftChildHeight);

            let rightChildHeight = 0;
            //이전 이미지가 right에 존재하고 있을 때
            if(document.querySelectorAll('.img')[index-1].parentElement.className==='right'){
                let RChildH = 0;
                for(let i=0; i<right.children.length; i++){
                    RChildH += (right.children[i]
                        .naturalHeight * 340)/right.children[i]
                        .naturalWidth;
                    console.log(index,' : 오른쪽 자식 이미지 : ',(right.children[i]
                        .naturalHeight * 340)/right.children[i]
                        .naturalWidth);
                }
                let curImgH = (img.naturalHeight * 340)/img.naturalWidth;
                rightChildHeight = RChildH+curImgH+15+40*(right.children.length+1);
                console.log(RChildH,', ',curImgH,', ',index)
            }
            console.log(index,' : rightChildHeight..................', rightChildHeight);


            /!* left에 있는 문제 수 > || left에 있는 문제 높이의 합이 left의 높이보다 커지는 경우 *!/
            if(leftChildHeight > leftRightHeight){
                // 요소 생성
                const newRight = document.createElement('div');

                // 요소 클래스 이름 추가
                newRight.className = 'right';

                newRight.appendChild(img);
                left.insertAdjacentElement('afterend', newRight);
                // console.log('leftChildHeight > leftRightHeight.....',index);
            }
            /!* left 문제 수 2개 미만 && left 다음 right가 없는 경우 *!/
            else if(leftChildHeight <= leftRightHeight && left.nextElementSibling===null){
                left.appendChild(img);
                // console.log('leftChildHeight <= leftRightHeight.....',index);
            }
            /!* right 문제 수 2개 이상 && right 문제 높이가 전체 높이보다 큰 경우 *!/
            else if(rightChildHeight > leftRightHeight){
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

                left.appendChild(img);
                leftRightWrap.appendChild(left);
                newPageInner.appendChild(leftRightWrap);
                newPage.appendChild(newPageInner);
                document.getElementById('wrap').appendChild(newPage);
                // console.log('rightChildHeight > leftRightHeight.....',index);
            }
            /!* right 문제 수 2개 미만 && right 존재하는 경우 *!/
            else if(rightChildHeight <= leftRightHeight && right !== null){
                right.appendChild(img);
                // console.log('rightChildHeight <= leftRightHeight.....',index);
            }

        }

        index++; // 이미지 번호+1
    })

}
*/


async function downloadPDF() {
/*    const pages = document.querySelectorAll('.page'); // 클래스 이름이 'page'인 모든 요소 선택
    let svgElements = document.querySelectorAll('.svg');
    svgElements.forEach(function(item) {
        item.setAttribute("width", item.getBoundingClientRect().width);
        item.setAttribute("height", item.getBoundingClientRect().height);
        item.style.width = null;
        item.style.height= null;
    });
    // Promise 배열을 사용하여 각 페이지를 순차적으로 처리하고 PDF 생성
    Promise.all(Array.from(pages).map((page, index) => {
        return html2canvas(page, {
            scale: 2, // 해상도 조정
            allowTaint: true,
            useCORS: true
        }).then((canvas) => {
            return canvas.toDataURL('image/png'); // 각 페이지의 캔버스를 PNG 데이터 URL로 변환
        });
    })).then((pageImages) => {
        const pdf = new jspdf.jsPDF();

        const imgWidth = 210; // A4 가로 크기 (mm)
        const imgHeight = 297; // A4 세로 크기 (mm)

        // 각 페이지 이미지를 PDF에 추가
        pageImages.forEach((imageData, index) => {
            if (index > 0) {
                pdf.addPage(); // 새로운 페이지 추가
            }
            pdf.addImage(imageData, 'PNG', 0, 0, imgWidth, imgHeight);
        });

        const blob = pdf.output('blob');
        const formData = new FormData();
        formData.append('pdfFile', blob, 'generated.pdf', 'application/pdf');

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
    }).catch((error) => {
        console.error('Error generating PDF:', error);
    });



    /////////////////
    const pages2 = document.querySelectorAll('.page2'); // 클래스 이름이 'page'인 모든 요소 선택
    // Promise 배열을 사용하여 각 페이지를 순차적으로 처리하고 PDF 생성
    Promise.all(Array.from(pages2).map((page, index) => {
        return html2canvas(page, {
            scale: 2, // 해상도 조정
            allowTaint: true,
            useCORS: true
        }).then((canvas) => {
            return canvas.toDataURL('image/png'); // 각 페이지의 캔버스를 PNG 데이터 URL로 변환
        });
    })).then((pageImages) => {
        const pdf = new jspdf.jsPDF();

        const imgWidth = 210; // A4 가로 크기 (mm)
        const imgHeight = 297; // A4 세로 크기 (mm)

        // 각 페이지 이미지를 PDF에 추가
        pageImages.forEach((imageData, index) => {
            if (index > 0) {
                pdf.addPage(); // 새로운 페이지 추가
            }
            pdf.addImage(imageData, 'PNG', 0, 0, imgWidth, imgHeight);
        });

        const blob = pdf.output('blob');
        const formData = new FormData();
        formData.append('pdfFile', blob, 'generated2.pdf', 'application/pdf');

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
    }).catch((error) => {
        console.error('Error generating PDF:', error);
    });*/

    async function generatePDFs() {
        try {
            // 클래스 이름이 'page'인 div 요소들을 PDF로 만들기
            const pdfBuffer1 = await createPDFs('.page', 'output1.pdf');
            console.log("pdfBuffer1 : ",pdfBuffer1)

            // 클래스 이름이 'page2'인 div 요소들을 PDF로 만들기
            const pdfBuffer2 = await createPDFs('.page2', 'output2.pdf');

            const formData = new FormData();
            formData.append('pdfFile1', pdfBuffer1, 'output1.pdf', 'application/pdf');
            formData.append('pdfFile2', pdfBuffer2, 'output2.pdf', 'application/pdf');

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

// A4 사이즈 (210mm x 297mm)로 설정
    const pdfWidth = 210;
    const pdfHeight = 297;

// 특정 클래스 이름을 가진 div 요소들을 PDF로 만들어 S3에 업로드하는 함수
    async function createPDFs(className, fileName) {
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
            const canvas = await html2canvas(element,{
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
            pdf.addImage(imageData, 'JPEG', 0, 0, pdfWidth, pdfHeight,'','FAST');
        }

        // PDF 파일을 버퍼로 변환
        const pdfBuffer = pdf.output('arraybuffer');
        return pdf.output('blob');
    }


    generatePDFs();
    console.log("1111111111111111111111111")
}

