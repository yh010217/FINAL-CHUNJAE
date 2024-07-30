import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function S3stepbtn({ paperTitle, paper, paramType, subjectId }) {

    const [showAlert, setShowAlert] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSaveBtn = () => {
        if (paperTitle === '' || paperTitle.length > 20) {
            setShowAlert(true);
        } else {
            setShowConfirm(true);
        }
    };

    const handleConfirm = () => {
        setShowAlert(false);
    };

    const handleCancel = () => {
        setShowAlert(false);
        setShowConfirm(false);
    };

    const handleSaveConfirm = () => {
        setShowConfirm(false);
        handleSave();
    };

    const handleSave = async () => {
        try {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'http://localhost:8080/save';

            const input1 = document.createElement('input');
            input1.type = 'hidden';
            input1.name = 'paperTitle';
            input1.value = paperTitle;
            form.appendChild(input1);

            const input2 = document.createElement('input');
            input2.type = 'hidden';
            input2.name = 'paper';
            input2.value = JSON.stringify(paper);
            form.appendChild(input2);

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

/*      const handleSave = async () => {
        try {
            const url = '/back/savedpaper';
            const data = {
                paper: [paperTitle, paper]
            };
            await axios.post(url, data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };
*/


    // step2 가는 버튼 구현 ...
    console.log(paramType.current)
    console.log(subjectId)

    return (
        <>
            <Link to={`/step2/${paramType.current}/${subjectId}`}>
                <button className="btn-step">STEP 2 문항 편집</button>
            </Link>
            <button className="btn-step next" onClick={handleSaveBtn}>
                시험지 저장하기
            </button>
            {showAlert && (
                <div className="step-modal">
                    {paperTitle === '' && (
                        <>
                            <p>시험지명을 입력해주세요.</p>
                            <div className="btn-wrap">
                                <button className="btn-default" onClick={handleConfirm}>
                                    확인
                                </button>
                            </div>
                        </>
                    )}
                    {paperTitle.length > 20 && (
                        <>
                            <p>시험지명은 20자 이하로 입력해주세요.</p>
                            <div className="btn-wrap">
                                <button className="btn-default" onClick={handleConfirm}>
                                    확인
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {showConfirm && (
                <div className="step-modal">
                    <p>시험지를 저장하시겠습니까?</p>
                    <div className="btn-wrap">
                        <button className="btn-default" onClick={handleCancel}>
                            취소
                        </button>
                        <button type="submit" className="btn-default" onClick={handleSaveConfirm}>
                            확인
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
export default S3stepbtn;