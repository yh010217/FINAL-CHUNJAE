import React from 'react';

function CNTLIST({changeList, onChangeList, setSimilar, setTab, setNo, viewType, tab}) {

    const groupByPassageId = (list) => {
        return list.reduce((grouped, item) => {
            const key = item.passageId || 'individual';
            (grouped[key] = grouped[key] || []).push(item);
            return grouped;
        }, {});
    };

    const groupedItems = groupByPassageId(changeList);
    // console.log("groupItems...",groupedItems);
    // console.log("changeList...",changeList);

    const similarData = (itemIdList, no) => {
        // console.log(tab);
        setSimilar(itemIdList);
        setTab(1);
        setNo(no);
    };

    return (
        <div className="view-que-list scroll-inner">
            {Object.keys(groupedItems).map((passageId) => (
                <React.Fragment key={passageId}>
                    {groupedItems[passageId].map((item, index) => (
                        <React.Fragment key={item.itemId}>
                            {index === 0 && (
                                <div className="view-que-box">
                                    <div className="que-top">
                                        <div className="title">
                                            <span className="num">
                                                {groupedItems[passageId].length - groupedItems[passageId].length + 1} ~ {groupedItems[passageId].length}
                                            </span>
                                        </div>
                                    </div>
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
                                </div>
                            )}
                            <div className="view-que-box">
                                <div className="que-top">
                                    <div className="title">
                                        <span className="num">{item.itemNo}</span>
                                        <div className="que-badge-group">
                                            <span className="que-badge">{item.difficultyName}</span>
                                            <span className="que-badge gray">
                                                {item.questionFormName === '5지 선택' ? '객관식' : '주관식'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="btn-wrap">
                                        <button className="btn-error"></button>
                                        <button className="btn-delete"></button>
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
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <button
                                        className="btn-similar-que btn-default"
                                        onClick={() => similarData([item.itemId], index)}
                                    >
                                        <i className="similar"></i>
                                        유사문제
                                    </button>
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