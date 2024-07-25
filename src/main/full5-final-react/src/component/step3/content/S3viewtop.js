import React, {useState} from 'react';

function S3viewtop() {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDefaultStep = () => {
        setShowConfirmation(true);
    }

    const handleConfirm = () => {
        setShowConfirmation(false);

        // STEP 0 으로
        // window.location.href = '/step0/{subjectId}';
    }

    const handleCancel = () => {
        setShowConfirmation(false);
    }

    return (
        <>
            <div className="paper-info">
                <span>수학</span>
                선생님 이름
            </div>
            <div className="btn-wrap">
                <button onClick={handleDefaultStep} className="btn-default">처음으로</button>
            </div>

            {showConfirmation && (
                <div className="step3-modal">
                    <p>처음화면으로 이동하시겠습니까?</p>
                    <p>(출제방법 선택 화면으로 이동)</p>
                    <p>페이지 이동시 변경사항이 저장되지 않습니다.</p>
                    <div className="btn-wrap">
                        <button className="btn-default" onClick={handleCancel}>취소</button>
                        <button className="btn-default" onClick={handleConfirm}>확인</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default S3viewtop;
