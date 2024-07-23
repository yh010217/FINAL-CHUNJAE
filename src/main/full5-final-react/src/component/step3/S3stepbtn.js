import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function S3stepbtn({ paperTitle, paper }) {

    const [response, setResponse] = useState(null);
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
        // title + paper 합쳐서 back 으로 post 로딩 페이지
        axios.post()
    };

    // const handleSave = async () => {
    //     try {
    //         const url = '/api/';
    //         const data = {
    //
    //         };
    //
    //         const response = await axios.post(url, data);
    //         setResponse(response.data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    //
    // };

    return (
        <>
            <Link to="/step2">
                <button className="btn-step">STEP 2 문항 편집</button>
            </Link>
            <button className="btn-step next" onClick={handleSaveBtn}>
                시험지 저장하기
            </button>

            {showAlert && (
                <div className="step3-modal">
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
                <div className="step3-modal">
                    <p>시험지를 저장하시겠습니까?</p>
                    <div className="btn-wrap">
                        <button className="btn-default" onClick={handleCancel}>
                            취소
                        </button>
                        <button className="btn-default" onClick={handleSaveConfirm}>
                            확인
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default S3stepbtn;
