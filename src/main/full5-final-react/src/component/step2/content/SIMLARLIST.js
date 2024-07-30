import React, { useRef, useState } from "react";

function SIMLARLIST(props) {
    const topRef = useRef(null); // 최상단에 대한 참조 생성

    // 유사 문제 삭제 함수
    const simRemoveList = (itemId) => {
        props.list(itemId);
    };

    // 유사 문제 전체 추가 함수
    const allSimList = async (group) => {
        // 아이템 순서를 뒤집음
        group.items.reverse();

        const totalItemsToAdd = group.items.length + props.changeList.length;

        if (totalItemsToAdd > 100) {
            alert("변경 목록은 최대 100개까지만 추가할 수 있습니다.");
            return; // 추가를 중단
        }

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

        // changeList의 길이가 100을 초과하는지 확인
        if (props.changeList.length >= 100) {
            alert("최대 100개까지만 추가할 수 있습니다.");
        } else if (props.changeList.length < 100) {
            props.addToChangeList(itemToAdd);
            simRemoveList(item.itemId); // 삭제 함수 호출
        } else {
            console.log('오류 발생')
        }
    };

    // 함수: 클릭 시 스크롤 이동
    const handleScrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="view-que-list scroll-inner">
            {Object.values(props.groupedData).map((group, index) => {
                let filteredItems = group.items;

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
                    // 참조를 담을 배열을 만듭니다.
                    const refs = filteredItems.reduce((acc, item) => {
                        acc[item.itemId] = React.createRef();
                        return acc;
                    }, {});

                    // hasFilteredItems 값을 true로 설정
                    let hasFilteredItems = true;

                    return (
                        <React.Fragment key={index}>
                            {/* 지문이 있는 경우 */}
                            {group.items[0].passageId != null && (
                                <div className="view-que-box" ref={index === 0 ? topRef : null}>
                                    <div className="que-top" ref={refs[group.items[0].itemId]}>
                                        <div className="title">
                                            {group.items.length > 1 ? (
                                                <span className="num">지문 {group.items[0].itemNo}~{group.items[group.items.length - 1].itemNo}</span>
                                            ) : (
                                                <span className="num">지문 {group.items[0].itemNo}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="view-que">
                                        <img src={group.items[0].passageUrl} alt="지문입니다..." />
                                        <div className="que-bottom">
                                            <div className="data-area">
                                                <button className="btn-default" onClick={() => {
                                                    allSimList(group);
                                                    handleScrollToTop(); // 최상단으로 스크롤 이동
                                                }}>
                                                    <i className="add-type02"></i>
                                                    전체 추가
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 필터된 아이템들을 매핑 */}
                            {filteredItems.map((item) => (
                                <div className="view-que-box" key={item.itemId}>
                                    <div className="que-top">
                                        <div className="title">
                                            <span className="num">{item.itemNo}</span>
                                            <div className="que-badge-group">
                                                <span
                                                    className={`que-badge ${
                                                        item.difficultyName === '상' ? 'yellow' :
                                                            item.difficultyName === '중' ? 'green' :
                                                                'purple'
                                                    }`}
                                                >
                                                    {item.difficultyName}
                                                </span>
                                                <span className="que-badge gray">
                                                    {item.questionFormName === '단답 유순형' ? '주관식' : '객관식'}
                                                </span>
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
                                                    <button className="btn-default" onClick={() => {
                                                        addToChangeList(item);
                                                        handleScrollToTop(); // 최상단으로 스크롤 이동
                                                    }}>
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
                                            {item.mediumChapterName} > {item.smallChapterName} > {item.topicChapterName}
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
            {Object.values(props.groupedData).every(group => {
                let filteredItems = group.items;

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

                return filteredItems.length > 0;
            }) ? null : (
                <div className="contents on">
                    <div className="view-que-list no-data">
                        <p>
                            해당 난이도의 유사 문제는 존재하지 않습니다.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SIMLARLIST;
