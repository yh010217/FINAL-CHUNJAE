import React, { useState } from "react";


function SIMLARLIST(props) {

    const simRemoveList = (itemId) => {
        props.list(itemId);
    };

    /** 유사 문제 전체 추가하기 */
    const allSimList = async (group) => {
        group.items.reverse();
        for (let item of group.items) {
            await props.list(item.itemId);

            const itemToAdd = {
                itemId: item.itemId,
                itemNo: item.itemNo,
                difficultyName: item.difficultyName,
                questionFormName: item.questionFormName,
                questionUrl: item.questionUrl,
                explainUrl: item.explainUrl,
                answerUrl: item.answerUrl,
                mediumChapterName: item.mediumChapterName,
                smallChapterName: item.smallChapterName,
                topicChapterName: item.topicChapterName,
                passageId: item.passageId,
                passageUrl: item.passageUrl
            };

            props.addToChangeList(itemToAdd);
        }
    };

    /** 추가하기 버튼 누르기 */
    const addToChangeList =(item)=> {
        // view-que-box 정보 저장하기
        const itemToAdd = {
            itemId: item.itemId,
            itemNo: item.itemNo,
            difficultyName: item.difficultyName,
            questionFormName: item.questionFormName,
            questionUrl: item.questionUrl,
            explainUrl: item.explainUrl,
            answerUrl: item.answerUrl,
            mediumChapterName: item.mediumChapterName,
            smallChapterName: item.smallChapterName,
            topicChapterName: item.topicChapterName,
            passageId: item.passageId,
            passageUrl: item.passageUrl
        };

        // addToChangeList 함수 호출 (VIEWBOTTOM의 addToChangeList)
        props.addToChangeList(itemToAdd);

        // removeList 함수 호출 (부모 컴포넌트에서 전달된 함수)
        simRemoveList(item.itemId);
    }

    let hasFilteredItems = false;

    return (
        <>
            {Object.values(props.groupedData).map((group, index) => {
                let filteredItems = group.items;

                switch (props.view) {
                    case '01':
                        filteredItems = group.items.filter(item => item.difficultyName === '상');
                        break;
                    case '02':
                        filteredItems = group.items.filter(item => item.difficultyName === '중');
                        break;
                    case '03':
                        filteredItems = group.items.filter(item => item.difficultyName === '하');
                        break;
                }

                if (filteredItems.length > 0) {
                    hasFilteredItems = true;
                    return (
                        <React.Fragment key={index}>
                            <>
                                {group.passageUrl && (
                                    <div className="view-que-box">
                                        <div className="que-top">
                                            <div className="title">
                                                {group.items.length > 1 ? (
                                                    <span className="num">지문 {group.items[0].itemNo}~{group.items[group.items.length - 1].itemNo}</span>
                                                ) : (
                                                    <span className="num">지문 {group.items[0].itemNo}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="view-que">
                                            <img src={group.passageUrl} alt="지문입니다..." />
                                            <div className="que-bottom">
                                                <div className="data-area">
                                                    <button className="btn-default" onClick={() => allSimList(group)}>
                                                        <i className="add-type02"></i>
                                                        전체 추가
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {filteredItems.map((item, itemIndex) => (
                                    <div className="view-que-box" key={item.itemId}>
                                        <>
                                            <div className="que-top">
                                                <div className="title">
                                                    <span className="num">{item.itemNo}</span>
                                                    <div className="que-badge-group">
                                                        {/*<span className="que-badge">{item.difficultyName}</span>*/}
                                                        <span
                                                            className={`que-badge ${
                                                                item.difficultyName === '상' ? 'yellow' :
                                                                    item.difficultyName === '중' ? 'green' :
                                                                        'purple'
                                                            }`}
                                                        >
                                                              {item.difficultyName}
                                                        </span>
                                                        <span className="que-badge gray">{item.questionFormName === '단답 유순형' ? '주관식' : '객관식'}</span>
                                                    </div>
                                                </div>
                                                <div className="btn-wrap">
                                                    <button className="btn-error" onClick={() => {
                                                        props.setModal(true);
                                                        props.setItemId(item.itemId);
                                                    }}></button>
                                                </div>
                                            </div>
                                            <div className="view-que">
                                                <div>
                                                    <img src={item.questionUrl} alt="문제" />
                                                </div>
                                                <div className="que-bottom">
                                                    <div className="data-area">
                                                        <div className="que-info">
                                                            <p className="answer">
                                                                <span className="label">해설</span>
                                                            </p>
                                                            <div className="data-answer-area">
                                                                <img src={item.explainUrl} alt="해설" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="data-area type01">
                                                        <div className="que-info">
                                                            <p className="answer">
                                                                <span className="label type01">정답</span>
                                                            </p>
                                                            <div className="data-answer-area">
                                                                <img src={item.answerUrl} alt="정답" />
                                                            </div>
                                                        </div>
                                                        <div className="btn-wrap">
                                                            <button className="btn-default" onClick={() => addToChangeList(item)}>
                                                                <i className="add-type02"></i>
                                                                추가
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="que-info-last">
                                                <p className="chapter">
                                                    {item.mediumChapterName} > {item.mediumChapterName} > {item.smallChapterName} > {item.topicChapterName}
                                                </p>
                                            </div>
                                        </>
                                    </div>
                                ))}
                            </>
                        </React.Fragment>
                    );
                } else {
                    return null;
                }
            })}

            {!hasFilteredItems && <>
                <div className="contents on">
                    <div className="view-que-list no-data">
                        <p>
                            해당 난이도의 유사 문제는 존재하지 않습니다.
                        </p>
                    </div>
                </div>
            </>}
        </>
    );


}

export default SIMLARLIST;