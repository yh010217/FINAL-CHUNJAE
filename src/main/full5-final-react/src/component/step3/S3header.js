import React, {useState} from "react";

function S3header(){

    const [showConfirm, setShowConfirm] = useState(false);

    const handleCloseBtn = () => {
        setShowConfirm(true);
    }

    const handleCancel = () => {
        setShowConfirm(false);
    }

    const handleConfirm=()=>{
        setShowConfirm(false);
        window.close();
    }

    return <>
        <ul className="title">
            <li>STEP 1 단원선택</li>
            <li>STEP 2 문항 편집</li>
            <li className="active">STEP 3 시험지 저장</li>
        </ul>
        <button type="button" onClick={handleCloseBtn} className="del-btn"></button>

        {showConfirm && (
            <div className="step-modal">
                <p>이 페이지에서 나가시겠습니까?</p>
                <div className="btn-wrap">
                    <button className="btn-default" onClick={handleCancel}>
                        취소
                    </button>
                    <button className="btn-default" onClick={handleConfirm}>
                        확인
                    </button>
                </div>
            </div>
        )}
    </>
}
export default S3header;