import React from "react";

function DELLIST({itemIndex, item, addToDelList, delList, setDelList, setItemId, setModal, changeList, handleScrollToTop}) {

    const DelReList =()=> {

        if(changeList.length >= 100) {
            alert("최대 100개까지만 추가할 수 있습니다.");
            return;
        }

        addToDelList(item);
        setDelList(delList.filter(list => list.itemId !== item.itemId)); // 삭제 구현
        handleScrollToTop();

    }

    return <div className="view-que-box" key={item.itemId}>
        <div className="que-top">
            <div className="title">
                <span className="num">{item.index}</span>
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
                    <span className="que-badge gray">{item.questionFormName === '단답 유순형' ? '주관식' : '객관식'}</span>
                </div>
            </div>
            <div className="btn-wrap">
                <button className="btn-error" onClick={() => {
                    setModal(true);
                    setItemId(item.itemId);
                }}></button>
            </div>
        </div>
        <div className="view-que">
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
                    <div className="btn-wrap">
                        <button className="btn-default" onClick={DelReList}>
                            <i className="add-type02"></i>
                            추가
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="que-info-last">
            <p className="chapter">
                {item.mediumChapterName} > {item.mediumChapterName} > {item.smallChapterName} > {item.topicChapterName}
            </p>
        </div>
    </div>
}

export default DELLIST