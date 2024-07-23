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
        }

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            alert(`업로드 파일의 확장자를 확인해주세요`);
            fileInputRef.current.value = ''; // 파일 선택을 초기화
        } else {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('multipartFiles', selectedFile);

        try {
            const response = await axios({
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                url: "http://localhost:8080/file/uploadImageFile/error",
                method: "POST",
                data: formData,
            });

            let responseData = response.data;
            const imageUrl = responseData[0].substring(responseData[0].lastIndexOf('/') + 1);

            console.log(imageUrl); // 마지막 요소 출력

            // DB에 저장할 데이터 구성
            let dbData = {
                attachmentFileName: fileName,
                attachmentFilePath: imageUrl,
                errorType: errorType,
                content: errorContent,
                itemId: itemId
            };

            console.log(dbData, "db로 넘어갈 데이터 확인하기");

            // DB로 값 넘기기
            await axios({
                method: 'POST',
                url: "http://localhost:8080/test/error", // 실제 API URL로 변경
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Accept': 'application/json'
                },
                data: dbData
            });

            alert('신고가 완료되었습니다.');
        } catch (err) {
            console.log(err); // 에러 로그 출력

            // 이미지 업로드 실패 시에도 DB 저장 시도
            let dbData = {
                errorType: errorType,
                content: errorContent,
                itemId: itemId
            };

            try {
                await axios({
                    method: 'POST',
                    url: "http://localhost:8080/test/error", // 실제 API URL로 변경
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Accept': 'application/json'
                    },
                    data: dbData
                });

                alert('신고가 완료되었습니다.');
            } catch (dbErr) {
                console.log(dbErr);
                alert('DB에 저장하는 데 실패하였습니다.');
            }
        } finally {
            closePopup();
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
