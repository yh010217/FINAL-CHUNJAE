import React, { useState } from "react";

function SIMLARLIST(props) {
    // 유사 문제 삭제 함수
    const simRemoveList = (itemId) => {
        props.list(itemId);
    };

    // 유사 문제 전체 추가 함수
    const allSimList = async (group) => {
        // 아이템 순서를 뒤집음
        group.items.reverse();
        for (let item of group.items) {
            await props.list(item.itemId);

            // 추가할 아이템 정보
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

            // 상위 컴포넌트에서 전달된 함수 호출
            props.addToChangeList(itemToAdd);
        }
    };

    // 리스트에 추가하기 함수
    const addToChangeList = (item) => {
        // 추가할 아이템 정보
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

        // 삭제 함수 호출
        simRemoveList(item.itemId);
    };

    // 필터된 아이템이 있는지 확인하는 변수
    let hasFilteredItems = false;

    return (
        <>
            {Object.values(props.groupedData).map((group, index) => {
                let filteredItems = group.items;

                const passageId = group.items.map(item => item.passageId);
                const passageUrl = group.items.map(item => item.passageUrl);
                console.log(group)

                // 난이도에 따라 아이템 필터링
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
                    default:
                        filteredItems = group.items;
                }

                // 필터링된 아이템이 있을 경우
                if (filteredItems.length > 0) {
                    hasFilteredItems = true;
                    return (
                        <React.Fragment key={index}>
                            {/* 지문이 있는 경우 */}
                            {passageId[0] != null && (
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
                                        <img src={passageUrl[0]} alt="지문입니다..." />
                                        <div className="que-bottom">
                                            <div className="data-area">
                                                {/* 전체 추가 버튼 */}
                                                <button className="btn-default" onClick={() => allSimList(group)}>
                                                    <i className="add-type02"></i>
                                                    전체 추가
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 필터된 아이템들을 매핑 */}
                            {filteredItems.map((item, itemIndex) => (
                                <div className="view-que-box" key={item.itemId}>
                                    <div className="que-top">
                                        <div className="title">
                                            <span className="num">{item.itemNo}</span>
                                            <div className="que-badge-group">
                                                {/* 난이도 뱃지 */}
                                                <span
                                                    className={`que-badge ${
                                                        item.difficultyName === '상' ? 'yellow' :
                                                            item.difficultyName === '중' ? 'green' :
                                                                'purple'
                                                    }`}
                                                >
                                                {item.difficultyName}
                                            </span>
                                                {/* 문제 형식 뱃지 */}
                                                <span className="que-badge gray">{item.questionFormName === '단답 유순형' ? '주관식' : '객관식'}</span>
                                            </div>
                                        </div>
                                        <div className="btn-wrap">
                                            {/* 오류 버튼 */}
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
                                                {/* 해설 정보 */}
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
                                                {/* 정답 정보 */}
                                                <div className="que-info">
                                                    <p className="answer">
                                                        <span className="label type01">정답</span>
                                                    </p>
                                                    <div className="data-answer-area">
                                                        <img src={item.answerUrl} alt="정답" />
                                                    </div>
                                                </div>
                                                {/* 추가 버튼 */}
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
                                        {/* 챕터 정보 */}
                                        <p className="chapter">
                                            {item.mediumChapterName} > {item.mediumChapterName} > {item.smallChapterName} > {item.topicChapterName}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    );
                } else {
                    return null;
                }
            })}

            {/* 필터된 아이템이 없을 경우 */}
            {!hasFilteredItems && (
                <div className="contents on">
                    <div className="view-que-list no-data">
                        <p>
                            해당 난이도의 유사 문제는 존재하지 않습니다.
                        </p>
                    </div>
                </div>
            )}
        </>
    );

}

export default SIMLARLIST;
