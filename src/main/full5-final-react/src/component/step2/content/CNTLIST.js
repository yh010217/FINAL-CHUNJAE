function CNTLIST({ changeList, setSimilar, setTab, tab, setNo}) {

    const similarData = (itemIdList, no) => {
        console.log(tab)
        setSimilar(itemIdList);
        setTab(1);
        setNo(no);
    };

    return (
        <div className="view-que-list scroll-inner">
            {changeList.map((item) => (
                <div key={item.itemId} className="view-que-box">
                    <div className="que-top">
                        <div className="title">
                            <span className="num">{item.itemNo}</span>
                            <div className="que-badge-group">
                                <span className="que-badge">{item.difficultyName}</span>
                                <span className="que-badge">{item.questionFormName === '5지 선택' ? '객관식':'주관식'}</span>
                            </div>
                        </div>
                        <div className="btn-wrap">
                            <button className="btn-error"></button>
                            <button className="btn-delete"></button>

                        </div>
                    </div>
                    <div className="view-que">
                        <div className="que-content">
                            <img src={item.passageUrl} alt="지문"></img>
                        </div>
                        <div>
                            <img src={item.questionUrl} alt="문제"></img>
                        </div>
                        <div className="que-bottom">
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
                            <div className="data-area type01">
                                <div className="que-info">
                                    <p className="answer">
                                        <span className="label type01">정답</span>
                                    </p>
                                    <div className="data-answer-area">
                                        <img src={item.answerUrl} alt="정답"></img>
                                    </div>
                                </div>
                                <button className="btn-similar-que btn-default" onClick={() => similarData(item.itemId, item.itemNo)}>
                                    <i className="similar"></i>
                                    유사문제
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="que-info-last">
                        <p className="chapter">
                            {item.largeChapterName} > {item.mediumChapterName} > {item.smallChapterName} > {item.topicChapterName}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CNTLIST;
