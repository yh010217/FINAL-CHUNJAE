let itemCount = 0;
let itemInfoShow = false;

$(function () {
    activeText(0);
    //신규 시험지
    $('#create-paper-btn').on('click', function () {
        let subjectId = $("#subjectId").val();
        let new_form = $('<form></form>');
        new_form.attr("name", "new_form");
        new_form.attr("charset", "UTF-8");
        new_form.attr("method", "post");
        new_form.attr("action", "/customExam/step1");
        new_form.append($('<input/>', {type: 'hidden', name: 'subjectId', value: subjectId}));
        new_form.appendTo('body');
        new_form.submit();
    });
    //셋팅지 체크시
    $('.chk_paperId').on("click", function () {
        let _this = $(this);
        let chkCount = parseInt(_this.closest(".col").find(".itemCnt").val());
        if (_this.is(":checked")) {
            itemCount+=chkCount;
            if(itemCount > 90){
                itemCount-=chkCount;
                alert("최대 90문항까지 선택 가능합니다.");
                window.scrollTo(0, 0); // 스크롤을 상단으로 이동 - 스크롤 이슈 방지
                return false;
            }
        }else{
            itemCount-=chkCount;
        }
        $('#chk_item_cnt').text(itemCount);
        window.scrollTo(0, 0); // 스크롤을 상단으로 이동 - 스크롤 이슈 방지
    });
    //체크된 셋팅지 편집하기
    $("#modify-setting-btn").on("click", function (){
        let paperIdArr = [];
        $('#setting_list .col input[type="checkbox"]:checked').each(function (i) {
            paperIdArr.push(String($(this).closest(".col").find(".paperId").val()));
        });
        if(paperIdArr.length < 1 || itemCount <1){
            alert("시험지를 선택해 주세요. \n최대 90문항까지 선택 가능합니다.");
            return false;
        }
        $.ajax('setting/preview', { //편집가능 여부 - 미리보기 api로 이미지 여부 확인 후 편집으로 이동
            method: 'post',
            async: false,
            data: {paperIdArr:paperIdArr},
            success: function(data) {
                if(data.successYn === 'N') {
                    alert("시험지 준비 중입니다. 관리자에게 문의해 주시기 바랍니다.");
                    return false;
                }
                let new_form = $('<form></form>');
                new_form.attr("name", "new_form");
                new_form.attr("charset", "UTF-8");
                new_form.attr("method", "post");
                new_form.attr("action", "/customExam/step2");
                new_form.append($('<input/>', {type: 'hidden', name: 'paperIdArr', value: paperIdArr}));
                new_form.append($('<input/>', {type: 'hidden', name: 'paperGubun', value: 'setting'}));
                new_form.append($('<input/>', {type: 'hidden', name: 'subjectId', value: $("#subjectId").val()}));
                new_form.appendTo('body');
                new_form.submit();
            },
            beforeSend: function() {
                $(".loading-cnt").css('display', 'block');
            },
            error: function(request, status, error) {
                alert("관리자에게 문의해 주시기 바랍니다.");
                return false;
            },
            complete: function() {
                $(".loading-cnt").css('display', 'none');
            }
        });
    });

    //셋팅지 미리보기
    $('.preview-btn').on('click', function () {
        let paperId = $(this).closest(".col").find(".paperId").val();
        let paperTitle = $(this).closest(".col").find(".paperTitle").val();
        let itemCnt = $(this).closest(".col").find(".itemCnt").val();
        itemInfoShow = false;

        //문항 - 문제정답해설 미리보기
        $.ajax('setting/preview', {
            method: 'post',
            async: false,
            data: {paperIdArr: [paperId]},
            success: function(data) {
                if(data.successYn === 'N') {
                    alert("시험지 준비 중입니다. 관리자에게 문의해 주시기 바랍니다.");
                    return false;
                }
                $("#preview_tit").html('[시험지명]&ensp;'+paperTitle);
                $("#preview_cnt").html('&emsp;[문항수]&ensp;'+itemCnt +'문항');
                $("#preview_paperId").val(paperId);
                let html = '';
                let tmpPassageId = '';
                let half = Math.ceil(data.resultList.length/2);
                let limit_num = 0;
                let start_num = 0;
                let passageNum = 0; //지문 구분 Number
                let tmpNum=0;
                for (let part = 0; part < 2; part++) {
                    if (part === 0) {
                        limit_num = half;
                        start_num = 0;
                    } else if (part === 1) {
                        limit_num = data.resultList.length;
                        start_num = half;
                    }
                    html += '<div class="view-data">';
                    for (let s = start_num; s < limit_num; s++) {
                        let obj = data.resultList[s];
                        html += '<div class="example-area"><div class="example-box">';
                        //지문 문항
                        if (obj.passageId !== null && obj.passageId !== '') {
                            if (obj.passageId !== tmpPassageId) {
                                passageNum++;
                                html += '<div class="passage-area item-question">';
                                html += '   <span class="numbering numbering-numbers passage-num" data-passageNum="'+passageNum+'"></span>';
                                html += '   <img src="' + obj.passageUrl + '" alt="' + obj.passageId + '" width="453px">';
                                html += '</div>';
                                tmpPassageId = obj.passageId;
                            }
                            tmpNum=passageNum;
                        }
                        html += '<div class="item-question">';
                        html += '   <span class="numbering question-num" data-passageNum="'+tmpNum+'">' + (s < 9 ? "0" + (s+1) : (s+1)) + '.</span>';
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
                        html += '</div></div>';
                        tmpNum = 0 ;
                    }
                    html += '</div>';
                }
                document.getElementById('preview-question-data').innerHTML = html;

                //미리보기 지문 넘버링
                $(".passage-num").each(function (i) {
                    let passageNumTmp = $(this).attr("data-passageNum");
                    let que = $("[data-passageNum='"+passageNumTmp+"']").not(".passage-num");
                    let tmpText = que.first().text().replace('.','');
                    if(que.length > 1) tmpText += '~' + que.last().text().replace('.','');
                    $(this).text(tmpText);
                });
            },
            beforeSend: function() {
                $(".loading-cnt").css('display', 'block');
            },
            error: function(request, status, error) {
                alert("미리보기를 불러오지 못했습니다. 관리자에게 문의해 주시기 바랍니다.");
                return false;
            },
            complete: function() {
                $(".loading-cnt").css('display', 'none');
            }
        });
        //문항정보 미리보기
        $.ajax('setting/previewItemInfo', {
            method: 'post',
            async: false,
            data: {paperId: paperId},
            success: function(data) {
                if(data.successYn === 'Y') {
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
                    updateMathContent($("#preview-itemInfo-data"));
                    itemInfoShow = true;
                }else{
                    itemInfoShow = false;
                }
                $('#preview-tab li').removeClass("active");
                $('#preview-tab li').first().addClass('active');
                changePreview('A');
                // 팝업 띄우기
                $('html , body').css('overflow', 'hidden');
                $('.dim').fadeIn();
                $(".pop-wrap[data-pop='prev-pop']").show();
                $("#preview-data .scroll-inner").scrollTop(0);
            },
            beforeSend: function() {
                $(".loading-cnt").css('display', 'block');
            },
            error: function(request, status, error) {
                alert("미리보기를 불러오지 못했습니다. 관리자에게 문의해 주시기 바랍니다.");
                return false;
            },
            complete: function() {
                $(".loading-cnt").css('display', 'none');
            }
        });
    });

    // 셋팅지 다운로드
    $('*.download-btn').on('click', function () {
        let paperId = $(this).closest(".col").find(".paperId").val();
        let type = $(this).attr("data-type");
        downloadFileInfo(paperId, type);
    });
    // 미리보기 > 탭이동
    $('#preview-tab a').on('click', function () {
        let _this = $(this);
        _this.parent('li').addClass('active');
        _this.parent('li').siblings().removeClass("active");
        changePreview(_this.attr("data-type"));
    });
    // 미리보기 > 셋팅지 다운로드
    $('.preview-download').on('click', function () {
        let paperId = $("#preview_paperId").val();
        let type = $(this).attr("data-type");
        downloadFileInfo(paperId, type);
    });
})
//셋팅지 다운로드 > 파일정보
function downloadFileInfo(paperId, paperType) {
    $.ajax({
        url: "setting/downloadFile",
        type: "POST",
        // async: false,
        contentType: 'application/json',
        data: JSON.stringify({paperId: paperId, paperType: paperType}),
        dataType: 'json',
        success: function (data) {
            if(data == null || data.successYn === 'N') {
                alert("파일을 불러오지 못했습니다. 관리자에게 문의해 주시기 바랍니다.");
            }else if(data.successYn === 'Y') {
                const link = document.createElement('a');
                link.setAttribute('href', data.fileUrl);
                // 링크를 문서(body)에 추가
                document.body.appendChild(link);
                // 링크 클릭 => 파일 다운로드
                link.click();
                // 다운로드 후 링크와 URL을 정리
                link.parentNode.removeChild(link);
            }
        },
        beforeSend: function() {
            $(".loading-cnt").css('display', 'block');
        },
        error: function(request, status, error) {
            alert("관리자에게 문의해 주시기 바랍니다.");
            return false;
        },
        complete: function() {
            $(".loading-cnt").css('display', 'none');
        }
    });
}
function changePreview(type) {
    $(".preview-download").attr("data-type",type);
    $("#preview-data .scroll-inner").scrollTop(0);
    $('#preview-data .view-box').addClass('type-line');
    if (type === 'A') { //문제+해설+정답
        $("#preview-itemInfo-table").hide();
        $("#preview-question-data").show();
        $("#preview-data .passage-area").show();
        $("#preview-data .item-img").show();
        $("#preview-data .answer-container").show();
        $("#preview-data .explain-answer").show();
    } else if (type === 'Q') { //문제
        $("#preview-itemInfo-table").hide();
        $("#preview-question-data").show();
        $("#preview-data .passage-area").show();
        $("#preview-data .item-img").show();
        $("#preview-data .answer-container").hide();
        $("#preview-data .explain-answer").hide();
    } else if (type === 'E') { //정답+해설
        $("#preview-itemInfo-table").hide();
        $("#preview-question-data").show();
        $("#preview-data .passage-area").hide();
        $("#preview-data .item-img").hide();
        $("#preview-data .answer-container").show();
        $("#preview-data .explain-answer").show();
    } else if(type === 'C'){ //문항정보표
        if(itemInfoShow === false){
            alert("문항정보표가 존재하지 않습니다.");
            return false;
        }else{
            $('#preview-data .view-box').removeClass('type-line');
            $("#preview-itemInfo-table").show();
            $("#preview-question-data").hide();
        }
    }
}
function updateMathContent(s) {
    MathJax.typesetPromise();
}




document.querySelectorAll('.tbody').forEach(tbody => {
    tbody.addEventListener('click', event => {
        const button = event.target.closest('.pop-btn.btn-icon2');
        if (button) {
            const examId = button.previousElementSibling.value; // 시험지 ID

            // 미리보기 URL 가져오기
            fetch('/api/preview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ examId: examId, differentiation: 'A' })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch preview URL');
                    }
                    return response.text();
                })
                .then(previewUrl => {
                    // HTML 콘텐츠 가져오기
                    return fetch(previewUrl);
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch HTML content');
                    }
                    return response.text();
                })
                .then(htmlContent => {
                    // HTML 콘텐츠 표시
                    document.getElementById('previewContent').innerHTML = htmlContent;
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to load preview content.');
                });
        }
    });
});
