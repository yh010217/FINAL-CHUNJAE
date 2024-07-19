import React, {useEffect, useState} from 'react';

function CNTLIST({
                     initialChangeList,
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
                     groupedItems
                 }) {

    const [groupedData, setGroupedData] = useState(initialGroupData);
    const multipleChoiceForms = ['5지 선택', '단답 무순형', '자유 선지형'];

    useEffect(() => {
        setGroupedData(initialGroupData);
    }, [initialGroupData]);

    useEffect(() => {
        const sortedList = getSortedList();
        onChangeGroup(sortedList);
    }, [userSort]);

    // 단원순 정렬
    const sortByChapter = () => {
        groupedData.forEach(group => {
            group.items.sort((item1, item2) => {
                if (item1.largeChapterName !== item2.largeChapterName) {
                    return item1.largeChapterName.localeCompare(item2.largeChapterName);
                } else if (item1.mediumChapterName !== item2.mediumChapterName) {
                    return item1.mediumChapterName.localeCompare(item2.mediumChapterName);
                } else if (item1.smallChapterName !== item2.smallChapterName) {
                    return item1.smallChapterName.localeCompare(item2.smallChapterName);
                } else {
                    return item1.topicChapterName.localeCompare(item2.topicChapterName)
                }
            });
        });
    };

    // 난이도순 정렬
    const sortByDifficulty = () => {
        groupedData.forEach(group => {
            group.items.sort((item1, item2) => {
                return item2.difficultyName.localeCompare(item1.difficultyName);
            });
        });
    };

    // 문제 형태순 정렬
    const sortByQuestionForm = () => {
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
    // 순서 올림차순으로 나오게
    // const [orderList ,setOrderList] = useState(sortedList);
    //
    // useEffect(() => {
    //     let sorted = getSortedList();
    //
    //     let i = 1;
    //     let indexList = sorted.map((item)=>{
    //         item.index=i;
    //         i++;
    //         return item;
    //     })
    //
    //     setOrderList(indexList)
    // }, [sortedList, userSort]);

    return (
        <div className="view-que-list scroll-inner">
            {sortedList.map((group, groupIndex) => (
                <React.Fragment key={group.groupKey}>
                    {group.items.map((item, itemIndex) => (
                        <React.Fragment key={item.itemId}>
                            {itemIndex === 0 && (
                                <div className="view-que-box">
                                    <div className="que-top">
                                        <div className="title">
                                            <span className="num">
                                                지문 범위
                                                {/*{item.index} ~ {item.index + groupedItems[item.passageId].length - 1}*/}
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
                            <div key={item.itemId} className="view-que-box">
                                <div className="que-top">
                                    <div className="title">
                                        {/*<span className="num">{itemIndex + 1}</span>*/}
                                        <span className="num">{item.itemNo}</span>
                                        <div className="que-badge-group">
                                            <span className="que-badge">{item.difficultyName}</span>
                                            <span className="que-badge gray">
                                        {multipleChoiceForms.includes(item.questionFormName) ? '객관식' : '주관식'}
                                    </span>
                                        </div>
                                    </div>
                                    <div className="btn-wrap">
                                        <button className="btn-error"></button>
                                        <button className="btn-delete" onClick={() => deletePage(item)}></button>
                                    </div>
                                </div>
                                <div className="view-que">
                                    <div>
                                        <img src={item.questionUrl} alt="문제"/>
                                    </div>
                                    {viewType !== '문제만 보기' && (
                                        <div className="que-bottom">
                                            {viewType === '문제+해설+정답 보기' && (
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
                                            {(viewType === '문제+해설+정답 보기' || viewType === '문제+정답 보기') && (
                                                <div className="data-area type01">
                                                    <div className="que-info">
                                                        <p className="answer">
                                                            <span className="label type01">정답</span>
                                                        </p>
                                                        <div className="data-answer-area">
                                                            <img src={item.answerUrl} alt="정답"/>
                                                        </div>
                                                    </div>
                                                    <button className="btn-similar-que btn-default"
                                                            onClick={() => similarData(item.itemId, groupIndex)}>
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
                                                <button className="btn-similar-que btn-default"
                                                        onClick={() => similarData(item.itemId, groupIndex)}>
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
