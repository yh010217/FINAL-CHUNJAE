function DELETE() {
    return <div className="contents on">
        <div className="view-que-list scroll-inner">
            <div className="view-que-box">
                <div className="que-top">
                    <div className="title">
                        <span className="num">번호</span>
                        <div className="que-badge-group">
                            <span className="que-badge">난이도</span>
                            <span className="que-badge">뮨제유형</span>
                        </div>
                    </div>
                    <div className="btn-wrap">
                        <button className="btn-error"></button>
                    </div>
                </div>
                <div className="view-que">
                    <div className="que-content">
                        {/*<img src={} alt="지문"></img>*/}
                    </div>
                    <div>
                        {/*<img src={} alt="문제"></img>*/}
                    </div>
                    <div className="que-bottom">
                        <div className="data-area">
                            <div className="que-info">
                                <p className="answer">
                                    <span className="label">해설</span>
                                </p>
                                <div className="data-answer-area">
                                    {/*<img src={} alt="해설"></img>*/}
                                </div>
                            </div>
                        </div>
                        <div className="data-area type01">
                            <div className="que-info">
                                <p className="answer">
                                    <span className="label type01">정답</span>
                                </p>
                                <div className="data-answer-area">
                                    {/*<img src={} alt="정답"></img>*/}
                                </div>
                            </div>
                            <div className="btn-wrap">
                                <button className="btn-default">
                                    <i className="add-type02"></i>
                                    추가
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="que-info-last">
                    <p className="chapter">
                        단원명
                    </p>
                </div>
            </div>
        </div>
    </div>
}

export default DELETE;