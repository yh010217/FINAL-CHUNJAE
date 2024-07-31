import React, { useState, useRef } from 'react';
import axios from 'axios';

function MODAL({ setModal, itemId }) {
    const [showPopup, setShowPopup] = useState(true);
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorType, setErrorType] = useState('문제오류'); // 기본 오류 유형
    const [errorContent, setErrorContent] = useState(''); // 오류 내용
    const [showErrorTypeOptions, setShowErrorTypeOptions] = useState(false); // 오류유형 옵션 보이기/감추기 상태
    const fileInputRef = useRef(null);

    const closePopup = () => {
        setShowPopup(false);
        setModal(false);
    };

    const handleFileAttachClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const allowedExtensions = ['png', 'jpg', 'hwp'];
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);

            /** 파일 크기 제한 */
            const maxSizeInBytes = 100 * 1024 * 1024; // 100MB 제한

            // 파일 크기 검사
            if (file.size > maxSizeInBytes) {
                alert('파일 크기가 100MB를 초과합니다.'); // 경고 메시지
                event.target.value = ''; // 입력값 초기화
                return;
            }
        }

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            alert(`업로드 파일의 확장자를 확인해주세요`);
            setFileName(''); // 파일 선택 초기화
        } else {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('multipartFiles', selectedFile);

        try {
            const response = await axios({
                url: "http://43.201.252.185/file/uploadImageFile/error",
                method: "POST",
                data: formData,
            });

            let responseData = response.data;
            const imageUrl = responseData[0].substring(responseData[0].lastIndexOf('/') + 1);

            console.log(responseData[0], "데이터 값 확인하기");
            console.log(imageUrl, "imageUrl"); // 마지막 요소 출력

            // DB에 저장할 데이터 구성
            let dbData = {
                attachmentFileName: fileName,
                attachmentFilePath: imageUrl,
                errorType: errorType,
                content: errorContent,
                itemId: itemId
            };

            // DB로 값 넘기기
            await axios({
                method: 'POST',
                url: "http://43.201.252.185/test/error", // 실제 API URL로 변경
                data: dbData
            });

        } catch (err) {
            // 이미지 업로드 실패 시에도 DB 저장 시도
            let dbData = {
                errorType: errorType,
                content: errorContent,
                itemId: itemId
            };

            try {
                await axios({
                    method: 'POST',
                    url: "http://43.201.252.185/test/error", // 실제 API URL로 변경
                    data: dbData
                });

                // 주말에 react-modal 사용해서 뭐 바꿔보기
            } catch (dbErr) {
                console.log(dbErr);
                alert('신고 실패! 다시 시도해 주세요.');
            }
        } finally {
            alert('신고가 완료되었습니다.');
            setModal(false);
        }
    };


    const handleSelectErrorType = (type) => {
        setErrorType(type);
        setShowErrorTypeOptions(false); // 선택 후 옵션 숨기기
    };

    const toggleErrorTypeOptions = () => {
        setShowErrorTypeOptions(!showErrorTypeOptions);
    };

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
                                            <button type="button" className="select-btn" onClick={toggleErrorTypeOptions}>{errorType}</button>
                                            {showErrorTypeOptions && (
                                                <ul className="select-list">
                                                    <li><button type="button" onClick={() => handleSelectErrorType('문제오류')}>문제오류</button></li>
                                                    <li><button type="button" onClick={() => handleSelectErrorType('정답오류')}>정답오류</button></li>
                                                    <li><button type="button" onClick={() => handleSelectErrorType('풀이오류')}>풀이오류</button></li>
                                                    <li><button type="button" onClick={() => handleSelectErrorType('이미지오류')}>이미지오류</button></li>
                                                    <li><button type="button" onClick={() => handleSelectErrorType('유형오류')}>유형오류</button></li>
                                                    <li><button type="button" onClick={() => handleSelectErrorType('기타')}>기타</button></li>
                                                </ul>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>첨부파일</th>
                                    <td className="file">
                                        <input id="file-input" type="text" placeholder="최대 100MB까지 등록가능" value={fileName} readOnly />

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
                                            <textarea
                                                value={errorContent}
                                                onChange={(e) => setErrorContent(e.target.value)}
                                                maxLength="50"
                                                cols="30"
                                                rows="4"
                                                placeholder="오류내용을 간단히 적어주세요. (최대 50자)"
                                            ></textarea>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pop-footer">
                            <button type="button" onClick={handleUpload}>신고하기</button>
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
