import React, {useEffect, useState} from 'react';

function CNTLIST({
                     initialChangeList,
                     onChangeList,
                     initialGroupData,
                     onChangeGroup,
                     setSimilar,
                     setTab,
                     setNo,
                     viewType,
                     userSort,
                     setChangeId,
                     setNo2,
                     removeList,
                     groupedItems,
                     setModal,
                     setItemId
                 }) {

    const [groupedData, setGroupedData] = useState(initialGroupData);
    const multipleChoiceForms = ['5지 선택', '단답 무순형', '자유 선지형'];

    useEffect(() => {
        setGroupedData(initialGroupData);
    }, [initialGroupData]);

    // 단원순 (오름차순) 정렬
    const sortByChapter = () => {
        groupedData.forEach(group => {
            group.items.sort((item1, item2) => {
                if (item1.largeChapterId !== item2.largeChapterId) {
                    return item1.largeChapterId - item2.largeChapterId;
                } else if (item1.mediumChapterId !== item2.mediumChapterId) {
                    return item1.mediumChapterId - item2.mediumChapterId;
                } else if (item1.smallChapterId !== item2.smallChapterId) {
                    return item1.smallChapterId - item2.smallChapterId;
                } else {
                    return item1.topicChapterId - item2.topicChapterId;
                }
            });
        });

        groupedData.sort((group1, group2) => {
            const firstItem1 = group1.items[0];
            const firstItem2 = group2.items[0];
            if (firstItem1.largeChapterId !== firstItem2.largeChapterId) {
                return firstItem1.largeChapterId - firstItem2.largeChapterId;
            } else if (firstItem1.mediumChapterId !== firstItem2.mediumChapterId) {
                return firstItem1.mediumChapterId - firstItem2.mediumChapterId;
            } else if (firstItem1.smallChapterId !== firstItem2.smallChapterId) {
                return firstItem1.smallChapterId - firstItem2.smallChapterId;
            } else {
                return firstItem1.topicChapterId - firstItem2.topicChapterId;
            }
        });
    };

    // 난이도순 (하/중/상) 정렬
    const sortByDifficulty = () => {
        groupedData.sort((group1, group2) => {
            group1.items.sort((item1, item2) => {
                return item2.difficultyName.localeCompare(item1.difficultyName);
            });
            group2.items.sort((item1, item2) => {
                return item2.difficultyName.localeCompare(item1.difficultyName);
            });

            const firstItem1 = group1.items[0];
            const firstItem2 = group2.items[0];
            return firstItem2.difficultyName.localeCompare(firstItem1.difficultyName);
        });
    };


    // 문제 형태순 (객관식/주관식) 정렬
    const sortByQuestionForm = () => {

        groupedData.sort((group1, group2) => {
            const form1 = group1.items.length > 0 ? group1.items[0].questionFormName : '';
            const form2 = group2.items.length > 0 ? group2.items[0].questionFormName : '';

            if (multipleChoiceForms.includes(form1) && !multipleChoiceForms.includes(form2)) {
                return -1;
            } else if (!multipleChoiceForms.includes(form1) && multipleChoiceForms.includes(form2)) {
                return 1;
            } else {
                return 0;
            }
        });
        groupedData.forEach(group => {
            group.items.sort((item1, item2) => {
                if (multipleChoiceForms.includes(item1.questionFormName)
                    && !multipleChoiceForms.includes(item2.questionFormName)) {
                    return -1;
                } else if (!multipleChoiceForms.includes(item1.questionFormName)
                    && multipleChoiceForms.includes(item2.questionFormName)) {
                    return 1;
                } else {
                    return 0;
                }
            });
        });

    };

    const getSortedList = () => {

        switch (userSort) {
            case '단원순':
                sortByChapter();
                break;
            case '난이도순':
                sortByDifficulty();
                break;
            case '문제 형태순':
                sortByQuestionForm();
                break;
            case '사용자 정렬':
                Object.values(groupedData);
                break;
            default:
                // Object.values(groupedData);
                break;
        }
        return groupedData;
    }

    const similarData = (itemIdList, no, passageId, no2) => {
        setSimilar(itemIdList); // itemId 얻어오기
        setTab(1); // 탭 1로 이동
        setNo(no); // no 뽑아오기 => 유사문제에서 출력
        setChangeId(passageId) // 해당하는 passageId
        setNo2(no2) // 뽑아오기
    };

    /** 삭제하기 버튼 누르기 */
    const deletePage = (item) => {
        setTab(2); // 삭제하기 탭으로 이동

        /*const itemDelItem = { // 옮길 애들...
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
        }*/

        removeList(item);
    }

    const sortedList = getSortedList();

    useEffect(() => {
        const sortedList = getSortedList();
        onChangeGroup(sortedList);
    }, [userSort]);

    return (
        <div className="view-que-list scroll-inner">
            {groupedData.map((group, groupIndex) => (
                <React.Fragment key={group.groupKey}>
                    {group.items.map((item, itemIndex) => (
                        <React.Fragment key={item.itemId}>
                            {itemIndex === 0 && (
                                <>
                                    {item.passageUrl && item.passageUrl !== 'null' && (
                                        <div className="view-que-box">
                                            <div className="que-top">
                                                <div className="title">
                                            <span className="num">
                                                {item.index} ~ {(group.items.length + item.index) - 1}
                                            </span>
                                                </div>
                                            </div>
                                            <div className="view-que">
                                                <div className="que-content">
                                                    <p className="txt">※ 지문을 읽고 물음에 답하시오.</p>
                                                </div>
                                                <div className="que-bottom">
                                                    <div className="passage-area">
                                                        <img src={item.passageUrl} alt="지문"></img>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            <div key={item.itemId} className="view-que-box" id={item.index}>
                                <div className="que-top">
                                    <div className="title">
                                        <span className="num">{item.index}</span>
                                        <div className="que-badge-group">
                                            <span className={`que-badge ${
                                                item.difficultyName === '상' ? 'yellow' :
                                                    item.difficultyName === '중' ? 'green' :
                                                        'purple'
                                            }`}>{item.difficultyName}</span>
                                            <span className="que-badge gray">
                                        {multipleChoiceForms.includes(item.questionFormName) ? '객관식' : '주관식'}
                                    </span>
                                        </div>
                                    </div>
                                    <div className="btn-wrap">
                                        <div className="btn-wrap">
                                            <button className="btn-error" onClick={() => {
                                                setModal(true);
                                                setItemId(item.itemId);
                                            }}></button>
                                        </div>
                                        <button className="btn-delete" onClick={() => deletePage(item)}></button>
                                    </div>
                                </div>
                                <div className="view-que">
                                    <div>
                                        <img src={item.questionUrl} alt="문제"/>
                                    </div>
                                    {viewType !== '문제만 보기' && (
                                        <div className="que-bottom">
                                            {viewType === '문제+해설+정답' && (
                                                <div className="data-area">
                                                    <div className="que-info">
                                                        <p className="answer">
                                                            <span className="label">해설</span>
                                                        </p>
                                                        <div className="data-answer-area">
                                                            <img src={item.explainUrl} alt="해설"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {(viewType === '문제+해설+정답' || viewType === '문제+정답 보기') && (
                                                <div className="data-area type01">
                                                    <div className="que-info">
                                                        <p className="answer">
                                                            <span className="label type01">정답</span>
                                                        </p>
                                                        <div className="data-answer-area">
                                                            <img src={item.answerUrl} alt="정답"/>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="btn-similar-que btn-default"
                                                        onClick={() => similarData(
                                                            item.itemId,
                                                            item.index,
                                                            item.passageId,
                                                            (group.items.length + item.index) - 1
                                                        )}
                                                    >
                                                        <i className="similar"></i>
                                                        유사문제
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {viewType === '문제만 보기' && (
                                        <div className="que-bottom">
                                            <div className="data-area type01">
                                                <button
                                                    className="btn-similar-que btn-default"
                                                    onClick={() => similarData(
                                                        item.itemId,
                                                        item.index,
                                                        item.passageId,
                                                        (group.items.length + item.index) - 1
                                                    )}
                                                >
                                                    <i className="similar"></i>
                                                    유사문제
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="que-info-last">
                                    <p className="chapter">
                                        {item.largeChapterName} > {item.mediumChapterName} > {item.smallChapterName} > {item.topicChapterName}
                                    </p>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );

}

export default CNTLIST;