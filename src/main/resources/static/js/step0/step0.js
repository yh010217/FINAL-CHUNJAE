document.addEventListener('DOMContentLoaded', function () {
    const {jsPDF} = window.jspdf;
    let checkboxes = document.querySelectorAll('.chk_paperId'); // 모든 체크박스 요소를 선택
    let selectedCountElement = document.getElementById('chk_item_cnt'); // 선택된 문항 수
    let editButton = document.getElementById('edit-selected'); // 선택한 시험지 편집하기 버튼
    let newButton = document.getElementById('new-paper'); // 신규 시험지 만들기 버튼
    let subjectIdInput = document.getElementById('subjectId'); // 과목코드
    let subjectId = subjectIdInput.value; // 과목코드 값 가져오기
    let maxItemCount = 90; // 최대 선택 가능한 문항수
    let itemCount = 0;
    let itemInfoShow = false;

    {
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

    // 미리보기
    document.querySelectorAll('.tbody').forEach(tbody => {  // tbody에 이벤트 리스너 추가
        tbody.addEventListener('click', function (event) {
            let button = event.target.closest('.pop-btn.btn-icon2');
            if (button) {
                let col = button.closest('.col'); // 버튼의 부모 요소인 .col을 찾음
                let examId = col.querySelector('input[id="examId"]').value; // examId 가져오기
                let paperTitle = col.querySelector('input[id="paperName"]').value; // paperName 가져오기
                let itemCnt = col.querySelector('input[id="itemCount"]').value; // itemCount 가져오기
                let urls = []; // URL을 저장할 배열
                itemInfoShow = false;

                // 미리보기 진입시 첫번째 탭으로
                const previewTabItems = document.querySelectorAll('#preview-tab li');
                previewTabItems.forEach(item => item.classList.remove("active"));
                if (previewTabItems.length > 0) {
                    previewTabItems[0].classList.add('active');
                }
                clickPreview('A');

                document.querySelector(".title_header").textContent = paperTitle;

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
                        let passageNum = 0; // 지문 구분
                        let tmpNum = 0;
                        for (let part = 0; part < 2; part++) {
                            let limit_num = part === 0 ? half : data.itemList.length;
                            let start_num = part === 0 ? 0 : half;

                            // console.log('limit_num...', limit_num);
                            // console.log('start_num...', start_num);

                            html += '<div class="view-data">';
                            for (let s = start_num; s < limit_num; s++) {
                                let obj = data.itemList[s];

                                obj.questionUrl = '/getImage' + obj.questionUrl.split('tsherpa')[1];
                                obj.answerUrl = '/getImage' + obj.answerUrl.split('tsherpa')[1];
                                obj.explainUrl = '/getImage' + obj.explainUrl.split('tsherpa')[1];

                                // console.log('obj...', obj);
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
                                        //urls.push('/getImage' + obj.passageUrl.split('tsherpa')[1]);
                                    }
                                    tmpNum = passageNum;
                                }

                                html += '<div class="item-question passage-area">';
                                html += '   <span class="numbering question-num" data-passageNum="' + passageNum + '">' + (s < 9 ? "0" + (s + 1) : (s + 1)) + '.</span>';
                                html += '   <img class="item-img" src="' + obj.questionUrl + '" alt="' + obj.itemId + '">';
                                html += '</div>';

                                // URL을 배열에 추가
                                urls.push(obj.questionUrl);
                                //urls.push('/getImage' + obj.questionUrl.split('tsherpa')[1]);

                                html += '<div class="answer-container">';
                                html += '   <div class="answer-tit">정답</div>';
                                html += '   <div class="answer-img"><img src="' + obj.answerUrl + '" alt="' + obj.itemId + '"></div>';
                                html += '</div>';

                                // URL을 배열에 추가
                                urls.push(obj.answerUrl);
                                //urls.push('/getImage' + obj.answerUrl.split('tsherpa')[1]);


                                html += '<div class="explain-answer ">';
                                html += '   <div class="explain-tit">해설</div>';
                                html += '   <div class="explain-img"><img src="' + obj.explainUrl + '" alt="' + obj.itemId + '"></div>';
                                html += '</div>';


                                // URL을 배열에 추가
                                urls.push(obj.explainUrl);
                                //urls.push('/getImage' + obj.explainUrl.split('tsherpa')[1]);

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

                    })
                    .catch(error => {
                        alert("미리보기를 불러오지 못했습니다. 관리자에게 문의해 주시기 바랍니다.");
                        console.error("Fetch error: ", error);
                    })
                    .finally(() => {
                        // loadingIndicator.style.display = 'none';
                    });


                // 미리보기 창의 다운로드 버튼
                document.querySelector('.preview-download').addEventListener('click', async function () {

                    const type = this.getAttribute('data-type'); // 현재 선택된 탭의 data-type 가져오기
                    console.log('미리보기 다운로드 버튼 클릭...', type)
                    await downloadPreviewPDF(type); // PDF 다운로드 함수 호출

                });

                // 미리보기 tab 이동
                document.querySelectorAll('#preview-tab a').forEach(function (link) {
                    link.addEventListener('click', function () {
                        let parentLi = this.parentElement;
                        let siblings = parentLi.parentElement.children;
                        for (let i = 0; i < siblings.length; i++) {
                            siblings[i].classList.remove('active');
                        }
                        parentLi.classList.add('active');

                        let type = this.getAttribute('data-type');
                        clickPreview(type);

                        document.querySelector('.preview-download').setAttribute('data-type', type);
                    });
                });


            }
        });
    });

    /*  // pdf 다운로드
      async function downloadPreviewPDF(type) {
          let urls = []; // URL을 저장할 배열
          let paperTitle = document.getElementById('paperName').value; // paperName 가져오기

          const paperElement = document.querySelector('.paper');
          const pdf = new jspdf.jsPDF({
              orientation: 'portrait',
              unit: 'px',
              format: [paperElement.offsetWidth, paperElement.scrollHeight],
              putOnlyUsedFonts: true,
              floatPrecision: 16,
              foreignObjectRendering: true,
              useCORS: true,
              mode: 'cors',
              credentials: 'include'
          });

          const pageHeight = pdf.internal.pageSize.height;
          const pageWidth = pdf.internal.pageSize.width;
          const scrollHeight = paperElement.scrollHeight;

          // 전체 캡처
          const canvas = await html2canvas(paperElement, {
              scrollX: 0,
              scrollY: 0,
              width: paperElement.offsetWidth,
              height: scrollHeight,
              useCORS: true,
              scale: 2,
              mode: 'cors',
              credentials: 'include'
          });

          const imgData = canvas.toDataURL('image/jpeg');
          pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, (canvas.height * pageWidth) / canvas.width);

          // SVG URL 배열을 사용하여 PDF에 추가
          const svgUrls = urls.filter(url => url.endsWith('.svg')); // SVG URL만 필터링

          //console.log(svgUrls);

          for (let svgUrl of svgUrls) {
              try {
                  const svg = await fetch(svgUrl).then(response => {
                      if (!response.ok) throw new Error('Network response was not ok');
                      return response.text();
                  });

                  const base64 = btoa(unescape(encodeURIComponent(svg))); // SVG를 Base64로 인코딩
                  const base64Data = `data:image/svg+xml;base64,${base64}`;

                  const img = new Image();
                  img.crossOrigin = "anonymous"; // CORS 문제 해결
                  img.src = base64Data;

                  await new Promise((resolve) => {
                      img.onload = () => {
                          const imgWidth = pageWidth;
                          const imgHeight = (img.height * imgWidth) / img.width; // 비율 유지
                          pdf.addImage(img.src, 'JPEG', 0, 0, imgWidth, imgHeight);
                          resolve();
                      };
                      img.onerror = (e) => {
                          console.error('SVG Image loading error:', e);
                          resolve(); // 에러가 나도 계속 진행
                      };
                  });
              } catch (error) {
                  console.error('SVG Fetch Error:', error);
              }
          }

          // 추가적인 이미지 요소에 대한 처리
          const imgElements = paperElement.querySelectorAll('img:not([src$=".svg"])'); // SVG 제외
          for (let imgElement of imgElements) {
              const img = new Image();
              img.crossOrigin = "anonymous"; // CORS 문제 해결
              img.src = imgElement.src; // img 요소의 src 속성에서 URL 가져오기

              await new Promise((resolve) => {
                  img.onload = async () => {
                      const imgWidth = pageWidth;
                      const imgHeight = (img.height * imgWidth) / img.width; // 비율 유지
                      pdf.addImage(img.src, 'JPEG', 0, 0, imgWidth, imgHeight);
                      resolve();
                  };
                  img.onerror = (e) => {
                      console.error('Image loading error:', e);
                      resolve(); // 에러가 나도 계속 진행
                  };
              });
          }
          pdf.save(paperTitle + '.pdf');
      }*/


    document.querySelectorAll('.download').forEach(button => {
        button.addEventListener('click', async (event) => {


            //용훈
            let col = button.closest('.col'); // 버튼의 부모 요소인 .col을 찾음
            let paperTitle = col.querySelector('input[id="paperName"]').value; // paperName 가져오기
            let itemCnt = col.querySelector('input[id="itemCount"]').value; // itemCount 가져오기

            let buttonId = button.id.split('_')[1];
            let buttonType = '';
            if (button.classList.contains("A")) {
                buttonType = 'A';
            }
            if (button.classList.contains("Q")) {
                buttonType = 'Q';
            }
            if (button.classList.contains("E")) {
                buttonType = 'E';
            }
            if (button.classList.contains("C")) {
                buttonType = 'C';
            }


            clickPreview(buttonType);

            itemInfoShow = urlInjection(buttonId,paperTitle,itemCnt,itemInfoShow);
            //용훈끝

            // 1. 다운로드 버튼 클릭 시 미리보기 창의 내용 준비
            const paperName = event.target.closest('.col').querySelector('#paperName').value;
            const itemCount = event.target.closest('.col').querySelector('#itemCount').value;

            // 미리보기 내용을 설정 (여기에 실제 데이터를 넣어야 합니다)
            document.getElementById('preview-tit').textContent = `${paperName} 미리보기`;
            document.getElementById('preview-cnt').textContent = `${itemCount} 문항`;

            // 2. 미리보기 창을 DOM에 추가하되, 숨기기
            const qPreview = document.querySelector('#q-preview');

            //용훈
            qPreview.style.display = 'block';
            qPreview.style.zIndex = -100;
            //용훈 끝

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
                return;
            }

            // 5. PDF 다운로드
            pdf.save(`${paperName}.pdf`);

            // 6. 미리보기 창 다시 숨기기
            //paperElement.style.display = 'none'; // 미리보기 창 숨기기

            //용훈
            qPreview.style.display = 'none';
            qPreview.style.zIndex = 10;
            //용훈 끝
        });
    });


    // 미리보기 PDF 다운로드
    async function downloadPreviewPDF(type) {
        let paperTitle = document.getElementById('paperName').value; // paperName 가져오기
        let typeName = '';

        const paperElement = document.querySelector('.paper');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [paperElement.offsetWidth, paperElement.scrollHeight],
            putOnlyUsedFonts: true,
            floatPrecision: 16,
            foreignObjectRendering: true,
            useCORS: true,
            mode: 'cors',
            credentials: 'include'
        });

        const canvas = await html2canvas(paperElement, {
            scrollX: 0,
            scrollY: 0,
            width: paperElement.offsetWidth,
            height: paperElement.scrollHeight,
            useCORS: true,
            scale: 2,
        });

        const imgData = canvas.toDataURL('image/jpeg');
        const pageWidth = pdf.internal.pageSize.width;
        const imgHeight = (canvas.height * pageWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, imgHeight);

        const imgElements = paperElement.querySelectorAll('img:not([src$=".svg"])');
        for (let imgElement of imgElements) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = imgElement.src;

            await new Promise((resolve) => {
                img.onload = () => {
                    const imgWidth = pageWidth;
                    const imgHeight = (img.height * imgWidth) / img.width;

                    if (imgWidth > 0 && imgHeight > 0) {
                        pdf.addImage(img.src, 'JPEG', 0, 0, imgWidth, imgHeight);
                    } else {
                        console.error('Invalid image dimensions:', imgWidth, imgHeight);
                    }
                    resolve();
                };
                img.onerror = (e) => {
                    console.error('Image loading error:', e);
                    resolve();
                };
            });


            if (type === 'A') {
                typeName += '전체';
            } else if (type === 'Q') {
                typeName += '문제';
            } else if (type === 'E') {
                typeName += '정답+해설';
            } else {
                typeName += '문항정보표'
            }


        }

        pdf.save(`${paperTitle}_${typeName}.pdf`);
    }

    // 미리보기 tab 별 style 변경
    function setStyle(selector, displayStyle) {
        let elemnets = document.querySelectorAll(selector);
        elemnets.forEach(element => {
            element.style.display = displayStyle;
        })
    };

    // 미리보기 탭 별 문제지
    function clickPreview(type) {
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
    }

    function updatePreviewContent(type) {
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
    }



});


function updateMathContent(s) {
    MathJax.typesetPromise().then(() => {
        console.log("MathJax 렌더링 완료..");
    }).catch((err) => {
        console.error("MathJax error: ", err);
    });
}

let urlInjection = async function (examId,paperTitle,itemCnt){
    let urls = [];
    let itemInfoShow = false;

    await fetch('/preview/first', {
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
            let passageNum = 0; // 지문 구분
            let tmpNum = 0;
            for (let part = 0; part < 2; part++) {
                let limit_num = part === 0 ? half : data.itemList.length;
                let start_num = part === 0 ? 0 : half;

                // console.log('limit_num...', limit_num);
                // console.log('start_num...', start_num);

                html += '<div class="view-data">';
                for (let s = start_num; s < limit_num; s++) {
                    let obj = data.itemList[s];

                    obj.questionUrl = '/getImage' + obj.questionUrl.split('tsherpa')[1];
                    obj.answerUrl = '/getImage' + obj.answerUrl.split('tsherpa')[1];
                    obj.explainUrl = '/getImage' + obj.explainUrl.split('tsherpa')[1];

                    // console.log('obj...', obj);
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
                            //urls.push('/getImage' + obj.passageUrl.split('tsherpa')[1]);
                        }
                        tmpNum = passageNum;
                    }

                    html += '<div class="item-question passage-area">';
                    html += '   <span class="numbering question-num" data-passageNum="' + passageNum + '">' + (s < 9 ? "0" + (s + 1) : (s + 1)) + '.</span>';
                    html += '   <img class="item-img" src="' + obj.questionUrl + '" alt="' + obj.itemId + '">';
                    html += '</div>';

                    // URL을 배열에 추가
                    urls.push(obj.questionUrl);
                    //urls.push('/getImage' + obj.questionUrl.split('tsherpa')[1]);

                    html += '<div class="answer-container">';
                    html += '   <div class="answer-tit">정답</div>';
                    html += '   <div class="answer-img"><img src="' + obj.answerUrl + '" alt="' + obj.itemId + '"></div>';
                    html += '</div>';

                    // URL을 배열에 추가
                    urls.push(obj.answerUrl);
                    //urls.push('/getImage' + obj.answerUrl.split('tsherpa')[1]);


                    html += '<div class="explain-answer ">';
                    html += '   <div class="explain-tit">해설</div>';
                    html += '   <div class="explain-img"><img src="' + obj.explainUrl + '" alt="' + obj.itemId + '"></div>';
                    html += '</div>';


                    // URL을 배열에 추가
                    urls.push(obj.explainUrl);
                    //urls.push('/getImage' + obj.explainUrl.split('tsherpa')[1]);

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

        })

        .catch(error => {
            alert("미리보기를 불러오지 못했습니다. 관리자에게 문의해 주시기 바랍니다.");
            console.error("Fetch error: ", error);
        })
        .finally(() => {
            // document.querySelector(".loading-cnt").style.display = 'none'; // 로딩 표시 제거
        });

    // 문항 정보표 데이터 불러오기
    await fetch('/preview/info', {
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

        })
        .catch(error => {
            alert("미리보기를 불러오지 못했습니다. 관리자에게 문의해 주시기 바랍니다.");
            console.error("Fetch error: ", error);
        })
        .finally(() => {
            // loadingIndicator.style.display = 'none';
        });
    return itemInfoShow;
}