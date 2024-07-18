// window.onload = function () {
//     let email = document.getElementById("email");
//     let name = document.getElementById("name");
//     let nameValid = false; // nameValid 변수 초기화
//
//     email.addEventListener("input", function () {
//         fetch("/checkEmail?email=" + encodeURIComponent(email.value), {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json'
//             }
//         }).then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.text(); // response.json() 대신 response.text() 사용
//         }).then(data => {
//             let emsg = document.getElementById("emsg");
//             if (emsg) emsg.remove();
//
//             let ele_p = document.createElement('p');
//             ele_p.id = "emsg";
//
//             if (data === "null") {
//                 ele_p.textContent = "이메일을 작성해 주세요.";
//                 ele_p.className = "msg_error";
//             } else if (data === "true") {
//                 ele_p.textContent = "사용 불가능한 이메일입니다.";
//                 ele_p.className = "msg_error";
//             } else if (data === "false") {
//                 ele_p.textContent = "사용 가능한 이메일입니다.";
//                 ele_p.className = "msg_ok";
//             }
//
//             document.getElementById("email_msg").appendChild(ele_p);
//         }).catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
//     });
//
//     name.addEventListener("input", function () {
//         if (name.value.trim().length === 0) {
//             showNameMessage("이름을 작성해 주세요.", false);
//             nameValid = false;
//         } else if (name.value.trim().length < 2 || name.value.trim().length > 20) {
//             showNameMessage("이름은 2자 이상 20자 이하로 작성해 주세요.", false);
//             nameValid = false;
//         } else {
//             showNameMessage("사용 가능한 이름입니다.", true);
//             nameValid = true;
//         }
//     });
//
//     function showNameMessage(message, isValid) {
//         let nameMsg = document.getElementById("name_msg");
//         nameMsg.innerHTML = '';
//         let ele_p = document.createElement('p');
//         ele_p.className = isValid ? "msg_ok" : "msg_error";
//         ele_p.textContent = message;
//         nameMsg.appendChild(ele_p);
//     }
//
//     let form = document.getElementById("sign_up_form");
//     form.addEventListener("submit", function (event) {
//         if (!nameValid) {
//             event.preventDefault();
//             alert("입력한 정보를 확인해 주세요.");
//         }
//     });
// }

window.onload = function () {
    // 이메일 중복 검사
    let email = document.getElementById("email");
    let name = document.getElementById("name");
    let pwd = document.getElementById("pwd");
    let nameValid = false;
    let passwordValid = false;

    email.addEventListener("input", function () {
        fetch("/checkEmail?email=" + encodeURIComponent(email.value), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // response.json() 대신 response.text() 사용
        }).then(data => {
            let emsg = document.getElementById("emsg");
            if (emsg) emsg.remove();

            let ele_p = document.createElement('p');
            ele_p.id = "emsg";

            if (data === "null") {
                ele_p.textContent = "이메일을 작성해 주세요.";
                ele_p.className = "msg_error";
            } else if (data === "true") {
                ele_p.textContent = "사용 불가능한 이메일입니다.";
                ele_p.className = "msg_error";
            } else if (data === "false") {
                ele_p.textContent = "사용 가능한 이메일입니다.";
                ele_p.className = "msg_ok";
            }

            document.getElementById("email_msg").appendChild(ele_p);
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
// 이름 길이 
    name.addEventListener("input", function () {
        if (name.value.trim().length === 0) {
            showNameMessage("이름을 작성해 주세요.", false);
            nameValid = false;
        } else if (name.value.trim().length < 2 || name.value.trim().length > 20) {
            showNameMessage("이름은 2자 이상 20자 이하로 작성해 주세요.", false);
            nameValid = false;
        } else {
            showNameMessage("사용 가능한 이름입니다.", true);
            nameValid = true;
        }
    });
// 비밀번호 유효성
    pwd.addEventListener("input", function () {
        if (pwd.value.trim().length < 8 || !/[A-Z]/.test(pwd.value) || !/[a-z]/.test(pwd.value) || !/[0-9]/.test(pwd.value) || !/[!@#$%^&*]/.test(pwd.value)) {
            showPasswordMessage("비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수 문자를 포함해야 합니다.", false);
            passwordValid = false;
        } else {
            showPasswordMessage("사용 가능한 비밀번호입니다.", true);
            passwordValid = true;
        }
    });

    function showNameMessage(message, isValid) {
        let nameMsg = document.getElementById("name_msg");
        nameMsg.innerHTML = '';
        let ele_p = document.createElement('p');
        ele_p.className = isValid ? "msg_ok" : "msg_error";
        ele_p.textContent = message;
        nameMsg.appendChild(ele_p);
    }

    function showPasswordMessage(message, isValid) {
        let passwordMsg = document.getElementById("password_msg");
        passwordMsg.innerHTML = '';
        let ele_p = document.createElement('p');
        ele_p.className = isValid ? "msg_ok" : "msg_error";
        ele_p.textContent = message;
        passwordMsg.appendChild(ele_p);
    }

    let form = document.getElementById("sign_up_form");
    form.addEventListener("submit", function (event) {
        if (!nameValid || !passwordValid) {
            event.preventDefault();
            alert("입력한 정보를 확인해 주세요.");
        }
    });
}
