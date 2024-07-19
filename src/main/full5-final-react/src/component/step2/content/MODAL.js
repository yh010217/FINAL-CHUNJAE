import { useRef, useState } from "react";
import axios from "axios";

function MODAL({setModal}) {
    const [showPopup, setShowPopup] = useState(true);

    const closePopup = () => {
        setShowPopup(false); // 모달창 닫는 이벤트
        setModal(false); // setModal false 만들어줘야 재실행 가능함
    };

    /** 기존 css 스타일 유지하기 위한 장치들 */
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileAttachClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const allowedExtensions = ['png', 'jpg', 'hwp'];
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
        }

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            alert(`업로드 파일의 확장자를 확인해주세요`);
            fileInputRef.current.value = ''; // 파일 선택을 초기화
        } else {
            setSelectedFile(file);
        }

    };



    /** s3 이미지 업로드 관련 */
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('multipartFiles', selectedFile); // formData에 정보 저장됨.
        console.log(selectedFile, "맞나?")

         await axios({
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                url: "http://localhost:8080/file/uploadImageFile/error",
                method: "POST",
                data: formData,
            })
                .then(response => {
                    console.log(Object.fromEntries(formData.entries()), "여기 안에 대체 뭐 들음?")
                    console.log('파일 업로드 성공:', response.data);
                })
                .then((data) => {
                    console.log("하 드디어 됐냐")
                }) // 미리 만들어둔 state
                .catch((err) => {
                    console.log(err)

                })
             .finally(() => {
                 closePopup();
                 alert('내용 문항 오류 신고 처리가 완료되었습니다.');
             })
    }

    if (showPopup) {
        return (
            <div className="pop-wrap table-type" style={{ display: 'block' }}>
                <div className="pop-inner">
                    <div className="pop-header">
                        <span>문항 오류 신고</span>
                        <button type="button" className="pop-close" onClick={closePopup}></button>
                    </div>
                    <form>
                        <div className="pop-content">
                            <table>
                                <colgroup>
                                    <col style={{ width: '30%' }} />
                                    <col style={{ width: '70%' }} />
                                </colgroup>
                                <tbody>
                                <tr>
                                    <th>오류유형</th>
                                    <td>
                                        <div className="select-wrap">
                                            <button type="button" className="select-btn">문제오류</button>
                                            {/*<ul className="select-list">
                                            <li><a href="#">문제오류</a></li>
                                            <li><a href="#">정답오류</a></li>
                                            <li><a href="#">풀이오류</a></li>
                                            <li><a href="#">이미지오류</a></li>
                                            <li><a href="#">유형오류</a></li>
                                            <li><a href="#">기타</a></li>
                                        </ul>*/}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>첨부파일</th>
                                    <td className="file">
                                        <input type="text" placeholder="최대 100MB까지 등록가능" value={fileName} readOnly />
                                        <button type="button" className="btn-icon" onClick={handleFileAttachClick}> 파일 첨부 </button>
                                        <input
                                            type="file"
                                            id="file-input"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            accept="image/png, image/jpg, application/vnd.hancom.hwp"
                                            onChange={handleFileChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>오류 내용</th>
                                    <td>
                                        <textarea name="" id="" cols="30" rows="4" placeholder="오류내용을 간단히 적어주세요. (최대 50자)"></textarea>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pop-footer">
                            <button type="button" onClick={() => handleUpload()}>신고하기</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default MODAL;
