import React, {useEffect, useState} from 'react';

function CNTLIST({
                     changeList,
                     setSimilar,
                     setTab,
                     setNo,
                     viewType,
                     userSort,
                     tab,
                     setChangeId,
                     setNo2,
                     groupedData,
                     removeList
                 }) {

    const multipleChoiceForms = ['5지 선택', '단답 무순형', '자유 선지형'];

    const sortByChapter = (list) => {
        return list.sort((a, b) => {
            if (a.largeChapterName !== b.largeChapterName) {
                return a.largeChapterName.localeCompare(b.largeChapterName);
            } else if (a.mediumChapterName !== b.mediumChapterName) {
                return a.mediumChapterName.localeCompare(b.mediumChapterName);
            } else if (a.smallChapterName !== b.smallChapterName) {
                return a.smallChapterName.localeCompare(b.smallChapterName);
            } else {
                return a.topicChapterName.localeCompare(b.topicChapterName)
            }
        });
    };

    const sortByDifficulty = (list) => {
        return list.sort((a, b) => {
            return a.difficultyName.localeCompare(b.difficultyName);
        });
    };

    const sortByQuestionForm = (list) => {
        return list.sort((a, b) => {
            if (multipleChoiceForms.includes(a.questionFormName) && !multipleChoiceForms.includes(b.questionFormName)) {
                return -1;
            } else if (!multipleChoiceForms.includes(a.questionFormName) && multipleChoiceForms.includes(b.questionFormName)) {
                return 1;
            } else {
                return 0;
            }
        });
    };

    const getSortedList = () => {
        let sortedList = [...Object.values(groupedData)]; // Convert to array

        switch (userSort) {
            case '단원순':
                sortedList = sortByChapter(sortedList);
                break;
            case '난이도순':
                sortedList = sortByDifficulty(sortedList);
                break;
            case '문제 형태순':
                sortedList = sortByQuestionForm(sortedList);
                break;
            default:
                sortedList = Object.values(groupedData); // Default to original order
                break;
        }
        return sortedList;
    }

    const sortedList = getSortedList();

    const similarData = (itemIdList, no, passageId, no2) => {
        setSimilar(itemIdList); // itemId 얻어오기
        setTab(1); // 탭 1로 이동
        setNo(no); // no 뽑아오기 => 유사문제에서 출력
        setChangeId(passageId) // 해당하는 passageId
        setNo2(no2) // 뽑아오기
    };

    const deletePage = (item) => {
        setTab(2);
        removeList(item);
    }

    // console.log('sortedList...', sortedList);
    // console.log('groupedData...', groupedData);

    return (
        <div className="view-que-list scroll-inner">
            {sortedList.map((group, groupIndex) => (
                <React.Fragment key={group.groupKey}>
                    {group.items.map((item, itemIndex) => (
                        <div key={item.itemId} className="view-que-box">
                            {itemIndex === 0 && (
                                <div className="view-que">
                                    <div className="que-content">
                                        <p className="txt">※</p>
                                    </div>
                                    <div className="que-bottom">
                                        <div className="passage-area">
                                            <img src={item.passageUrl} alt="지문" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="que-top">
                                <div className="title">
                                    <span className="num">{itemIndex + 1}</span>
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
                                    <img src={item.questionUrl} alt="문제" />
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
                                                        <img src={item.explainUrl} alt="해설" />
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
                                                        <img src={item.answerUrl} alt="정답" />
                                                    </div>
                                                </div>
                                                <button className="btn-similar-que btn-default" onClick={() => similarData(item.itemId, groupIndex)}>
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
                                            <button className="btn-similar-que btn-default" onClick={() => similarData(item.itemId, groupIndex)}>
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
                    ))}
                </React.Fragment>
            ))}
        </div>
    );

}

export default CNTLIST;
