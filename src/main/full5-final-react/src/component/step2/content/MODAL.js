import { useState } from "react";

function MODAL() {
    console.log('모달 눌렀다')
    const [showPopup, setShowPopup] = useState(true);

    const closePopup = () => {
        setShowPopup(false);
    };

    if (showPopup) {
        return (
            <div className="pop-wrap table-type" style={{ display: 'block' }}>
                <div className="pop-inner">
                    <div className="pop-header">
                        <span>문항 오류 신고</span>
                        <button type="button" className="pop-close" onClick={closePopup}></button>
                    </div>
                    <div className="pop-content">
                        <table>
                            <colgroup>
                                <col width="30%"/>
                                <col width="*"/>
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
                                    <input type="text" placeholder="최대 100MB까지 등록가능"/>
                                    <button type="button" className="btn-icon">파일 첨부</button>
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
                        <button type="button">신고하기</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return null; 
    }
}

export default MODAL;
