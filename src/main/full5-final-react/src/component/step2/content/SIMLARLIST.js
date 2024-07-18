import React, { useState, useEffect } from "react";
import MODAL from "./MODAL";

function SIMLARLIST(props) {
    const [modal, setModal] = useState(false);

    /** 선택하면 remove에 저장 */
    const removeList =(itemId)=> {
        props.list(itemId); // 삭제하려고 저장
    }

    /** 추가하기 버튼 누르기 */
    const addToChangeList =()=> {
        // view-que-box 정보 저장하기
        const itemToAdd = {
            itemId: props.itemId,
            itemNo: props.itemNo,
            difficultyName: props.difficultyName,
            questionFormName: props.questionFormName,
            questionUrl: props.questionUrl,
            explainUrl: props.explainUrl,
            answerUrl: props.answerUrl,
            mediumChapterName: props.mediumChapterName,
            smallChapterName: props.smallChapterName,
            topicChapterName: props.topicChapterName,
            passageId: props.passageId,
            passageUrl: props.passageUrl
        };

        // addToChangeList 함수 호출 (VIEWBOTTOM의 addToChangeList)
        props.addToChangeList(itemToAdd);

        // removeList 함수 호출 (부모 컴포넌트에서 전달된 함수)
        removeList(props.itemId);
    }

    return <div className="view-que-box" key={props.itemId}>
        <div className="que-top">
            <div className="title">
                <span className="num">{props.itemNo}</span>
                <div className="que-badge-group">
                    <span className="que-badge">{props.difficultyName}</span>
                    <span className="que-badge">{props.questionFormName}</span>
                </div>
            </div>
            <div className="btn-wrap">
                <button className="btn-error" onClick={() => setModal(true)}></button>
                {modal === true && <MODAL />}
            </div>


        </div>
        <div className="view-que">
            <div>
                <img src={props.questionUrl} alt="문제"></img>
            </div>
            <div className="que-bottom">
                <div className="data-area">
                    <div className="que-info">
                        <p className="answer">
                            <span className="label">해설</span>
                        </p>
                        <div className="data-answer-area">
                            <img src={props.explainUrl} alt="해설"></img>
                        </div>
                    </div>
                </div>
                <div className="data-area type01">
                    <div className="que-info">
                        <p className="answer">
                            <span className="label type01">정답</span>
                        </p>
                        <div className="data-answer-area">
                            <img src={props.answerUrl} alt="정답"></img>
                        </div>
                    </div>
                    <div className="btn-wrap">
                        <button className="btn-default" onClick={() => addToChangeList()}>
                            <i className="add-type02"></i>
                            추가
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="que-info-last">
            <p className="chapter">
                {props.mediumChapterName} > {props.mediumChapterName} > {props.smallChapterName} > {props.topicChapterName}
            </p>
        </div>
    </div>
}

export default SIMLARLIST;