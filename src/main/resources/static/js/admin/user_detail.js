function loadMemberDetails(uid) {
    $.ajax({
        url: '/userdetail/' + uid,
        method: 'GET',
        success: function(data) {
            const memberDetails = `
                        <strong>회원번호:</strong> ${data.uid}<br>
                        <strong>이름:</strong> ${data.name}<br>
                        <strong>이메일:</strong> ${data.email}<br>
                        <strong>회원유형:</strong> ${data.role}<br>
                        <strong>학교 정보: </strong>   ${data.schoolType}<br>
                        <strong>sns 정보: </strong> ${data.snsType}<br>
                        <strong>sns아이디: </strong> ${data.snsId}<br>
                        
                    `;
            $('#memberDetails').html(memberDetails);
        },
        error: function(error) {
            $('#memberDetails').text('회원 정보를 불러오는데 실패했습니다.');
        }
    });
}