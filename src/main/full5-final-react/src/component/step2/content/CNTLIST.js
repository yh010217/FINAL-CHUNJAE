
import React, {useEffect} from 'react';

function CNTLIST({changeList, setSimilar, setTab, setNo, viewType, tab, setChangeId, setNo2, groupedItems, removeList}) {


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

    return (
        <div className="view-que-list scroll-inner">

            {changeList.map((item, index) => {
                const passageId = item.passageId && (groupedItems[item.passageId] || []).length > 0 ? item.passageId : 'individual';
                // const passageId = item.passageId !== undefined ? item.passageId : 'individual';
                const isFirstItemInGroup = passageId !== 'individual' && groupedItems[passageId]?.[0]?.itemId === item.itemId;

                return (
                    <React.Fragment key={item.itemId}>
                        {isFirstItemInGroup && (
                            <div className="view-que-box">
                                <div className="que-top">
                                    <div className="title">
                                        <span className="num">
                                            {groupedItems[passageId].length-(groupedItems[passageId].length-1)} ~ {groupedItems[passageId].length}
                                        </span>
                                    </div>
                                </div>
                                <div className="view-que">
                                    <div className="que-content">
                                        <p className="txt">※</p>
                                    </div>
                                    <div className="que-bottom">
                                        <div className="passage-area">
                                            <img src={groupedItems[passageId][0].passageUrl} alt="지문"></img>
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
                                        <span
                                            className="que-badge gray">{item.questionFormName === '5지 선택' ? '객관식' : '주관식'}</span>
                                    </div>
                                </div>

                                <div className="btn-wrap">
                                    <button className="btn-error">
                                    </button>
                                    <button className="btn-delete"
                                        onClick={() => deletePage(item)}
                                    ></button>
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
                                                <button
                                                    className="btn-similar-que btn-default"
                                                    onClick={() => similarData(item.itemId, index)}
                                                >
                                                    <i className="similar"></i>
                                                    유사문제
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {viewType === '문제만 보기' &&(
                                    <div className="que-bottom">

                                            <div className="data-area type01">

                                                <button
                                                    className="btn-similar-que btn-default"
                                                    onClick={() => similarData(item.itemId, index)}
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
                );
            })}
        </div>
    );
}

export default CNTLIST;