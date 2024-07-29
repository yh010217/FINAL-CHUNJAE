import React, {useState} from 'react';
import axios from "axios";
import {useEffect} from "react";

function S3viewtop({subjectId}) {

    const [response, setResponse] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSubject = async () => {
        try {
            const url = '/api/chapter/chapter-list';
            const data = {
                subjectId: subjectId
            };

            const respData = await axios.post(url, data);

            let subjectName = respData.data.chapterList.map(item => item.subjectName);
            setResponse(subjectName[0] || '');
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    };

    useEffect(()=>{
        handleSubject()
    }, [subjectId])


    const handleDefaultStep = () => {
        setShowConfirmation(true);
    }

    const handleConfirm = () => {
        setShowConfirmation(false);

        // STEP 0 으로 `` 백틱 문자열로
        window.location.href = `/step0/${subjectId}`;
    }

    const handleCancel = () => {
        setShowConfirmation(false);
    }

    return (
        <>
            <div className="paper-info">
                <span>{response}</span>
            </div>
            <div className="btn-wrap">
                <button onClick={handleDefaultStep} className="btn-default">처음으로</button>
            </div>

            {showConfirmation && (
                <div className="step-modal">
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
