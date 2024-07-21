// function openModalAndLoadDetails(uid) {
//     // 모달창을 보이도록 설정
//     document.getElementById('userModal').style.display = 'block';
//
//     // 사용자 정보를 불러오는 함수 호출
//     loadMemberDetails(uid);
// }
//
// function loadMemberDetails(uid) {
//     $.ajax({
//         url: '/userdetail/' + uid,
//         method: 'GET',
//         success: function(data) {
//             const memberDetails = `
//                 <strong>회원번호:</strong> ${data.uid}<br>
//                 <strong>이름:</strong> ${data.name}<br>
//                 <strong>이메일:</strong> ${data.email}<br>
//                 <strong>회원유형:</strong> ${data.role}<br>
//                 <strong>학교 정보: </strong> ${data.schoolType}<br>
//                 <strong>sns 정보: </strong> ${data.snsType}<br>
//                 <strong>sns아이디: </strong> ${data.snsId}<br>
//             `;
//             $('#memberDetails').html(memberDetails);
//         },
//         error: function(error) {
//             $('#memberDetails').text('회원 정보를 불러오는데 실패했습니다.');
//         }
//     });
// }
function loadMemberDetails(uid) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/userdetail/' + uid, true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            // 성공적으로 데이터를 받았을 때 처리
            var data = JSON.parse(xhr.responseText);
            var memberDetails = `
                <strong>회원번호:</strong> ${data.uid}<br>
                <strong>이름:</strong> ${data.name}<br>
                <strong>이메일:</strong> ${data.email}<br>
                <strong>회원유형:</strong> ${data.role}<br>
                <strong>학교 정보: </strong> ${data.schoolType}<br>
                <strong>sns 정보: </strong> ${data.snsType}<br>
                <strong>sns아이디: </strong> ${data.snsId}<br>
            `;
            document.getElementById('memberDetails').innerHTML = memberDetails;
        } else {
            // 요청이 실패했을 때 처리
            document.getElementById('memberDetails').textContent = '회원 정보를 불러오는데 실패했습니다.';
        }
    };

    xhr.onerror = function() {
        // 네트워크 에러 등이 발생했을 때 처리
        document.getElementById('memberDetails').textContent = '요청 중에 오류가 발생했습니다.';
    };

    xhr.send();
}