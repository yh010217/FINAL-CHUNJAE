
import React from 'react';

function CNTLIST({ changeList, setSimilar, setTab, setNo, viewType, tab }) {

    const groupByPassageId = (list) => {
        return list.reduce((grouped, item) => {
            const key = item.passageId;
            if (key) {
                (grouped[key] = grouped[key] || []).push(item);
            } else {
                (grouped['individual'] = grouped['individual'] || []).push(item);
            }
            return grouped;
        }, {});
    };

    const groupedItems = groupByPassageId(changeList);

    const similarData = (itemIdList, no) => {
        console.log(tab);
        setSimilar(itemIdList);
        setTab(1);
        setNo(no);
    };

    return (
        <div className="view-que-list scroll-inner">

            {changeList.map((item, index) => {
                const passageId = item.passageId && (groupedItems[item.passageId] || []).length > 1 ? item.passageId : 'individual';
                const isFirstItemInGroup = passageId !== 'individual' && groupedItems[passageId]?.[0]?.itemId === item.itemId;

                return (
                    <React.Fragment key={item.itemId}>
                        {isFirstItemInGroup && (
                            <div className="view-que-box">
                                <div className="que-top">
                                    <div className="title">
                                        <span className="num">
                                            {groupedItems[passageId][0].itemNo} ~ {groupedItems[passageId][groupedItems[passageId].length - 1].itemNo}
                                        </span>
                                    </div>
                                </div>
                                <div className="que-content">
                                    <img src={groupedItems[passageId][0].passageUrl} alt="지문"></img>
                                </div>
                            </div>
                        )}
                        <div className="view-que-box">
                            <div className="que-top">
                                <div className="title">
                                    <span className="num">{item.itemNo}</span>
                                    <div className="que-badge-group">
                                        <span className="que-badge">{item.difficultyName}</span>
                                        <span className="que-badge gray">{item.questionFormName === '5지 선택' ? '객관식' : '주관식'}</span>
                                    </div>
                                </div>

                                <div className="btn-wrap">
                                    <button className="btn-error"></button>
                                    <button className="btn-delete"></button>
                                </div>
                            </div>
                            <div className="view-que">
                                <div>
                                    <img src={item.questionUrl} alt="문제"></img>
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
                                                        <img src={item.explainUrl} alt="해설"></img>
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
                                                        <img src={item.answerUrl} alt="정답"></img>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <button
                                    className="btn-similar-que btn-default"
                                    onClick={() => similarData(item.itemId, index)}
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
                );
            })}
        </div>
    );
}

export default CNTLIST;
