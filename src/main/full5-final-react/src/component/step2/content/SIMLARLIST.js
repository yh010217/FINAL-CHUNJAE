import React, { useState, useEffect } from "react";

function SIMLARLIST(props) {
    const [modal, setModal] = useState();

    const errorPage =()=> {
    }

    /** 그룹화하기 */
    const grouped = props.groupedData(props.response);

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
        };

        // addToChangeList 함수 호출 (VIEWBOTTOM의 addToChangeList)
        props.addToChangeList(itemToAdd);

        // removeList 함수 호출 (부모 컴포넌트에서 전달된 함수)
        removeList(props.itemId);
    }

    /** 교체하기 */
    const ChangeList =()=> {
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
        };

        props.ChangeList(itemToAdd);
        removeList(props.itemId);
    }

    return (
        <>
            {Object.values(grouped).map((item, index) => (
                <div key={index}>
                    <div className="view-que-box">
                        <div className="que-top">
                            <div className="title">
                                {item.length > 1 ? (
                                    <span className="num">{item[0].itemNo}-{item[item.length - 1].itemNo}</span>
                                ) : (
                                    <span className="num">{item[0].itemNo}</span>
                                )}
                            </div>
                        </div>
                        <div className="view-que">
                            <img src={item[0].passageUrl} alt="지문입니다..." />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );













}

export default SIMLARLIST;