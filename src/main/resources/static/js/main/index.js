/** step 새로운 창 이런식으로 열기 */
function openPopup(code) {
    window.open(`http://10.41.1.61:8080/step0/${code}`, 'popupWindow', 'width=1350, height=1000, scrollbars=yes');
}

function notLonginPopup() {
    alert('로그인 후 이용 가능합니다.');
    // 또는 다른 팝업창을 열 수 있습니다.
}

let modal = document.getElementById('modalContainer');
let wrap = document.getElementById('wrap');

/** 티셀파 유출사례 모달창 열고 닫기*/
function openEx() {
    modal.style.display = 'block';
    wrap.style.overflow = 'hidden'; // 모달창 열렸을 때 스크롤 기능 막기
}

function closeEx() {
    modal.style.display = 'none';
    wrap.style.overflow = 'scroll';
}

/** 탭메뉴 관련 제이쿼리 */
$(document).ready(function(){

    /** 중학 / 시험지 보관함 탭 */
/*    $('ul.tabs li').click(function(){
        let tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    });*/

    /** 과목별 탭 */
    $('ul.tab li').click(function(){
        let tab_id = $(this).attr('data-subject');

        $('ul.tab li').removeClass('now');
        $('.tab-book').removeClass('now');

        $(this).addClass('now');
        $("#" + tab_id).addClass('now');
    });

});