// document.addEventListener("DOMContentLoaded", () => {
//     const enumList = document.getElementById("enum-list");
//
//     const UserEnum = {
//         'User': 'A',
//         'Teacher': 'B',
//         'Stop': 'C'
//     };
//
//
//     // 서버에서 데이터를 받아오는 함수
//     async function fetchData() {
//         try {
//             const response = await fetch('https://kdtjava5-1.cfm6wkquapqe.ap-northeast-2.rds.amazonaws.com'); // 데이터 엔드포인트
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             return [];
//         }
//     }
//
//     // 받아온 데이터를 이용해 리스트 아이템 생성
//     fetchData().then(items => {
//         items.forEach(item => {
//             const li = document.createElement('li');
//             const statusKey = Object.keys(UserEnum).find(key => UserEnum[key] === item.status);
//             li.className = statusKey || ''; // 일치하는 키가 없으면 빈 문자열 사용
//             li.textContent = `${item.text} - ${item.status}`;
//             enumList.appendChild(li);
//         });
//     });
// });
async function fetchData() {
    try {
        let response = await fetch("https://kdtjava5-1.cfm6wkquapqe.ap-northeast-2.rds.amazonaws.com/");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        let data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error("Error in DOMContentLoaded: ", error);
    }
});
