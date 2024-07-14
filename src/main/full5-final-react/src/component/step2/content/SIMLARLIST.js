import {useState} from "react";

function SIMLARLIST(props) {

    /** 신고 관련 모달창 구현 */
    const [modal, setModal] = useState();

    const errorPage =()=> {

    }

    return <>
        <div key={props.itemId} className="view-que-box">
            <div className="que-top">
                <div className="title">
                    <span className="num">{props.itemNo}</span>
                    <div className="que-badge-group">
                        <span className="que-badge">{props.difficultyName}</span>
                        <span className="que-badge">{props.questionFormName}</span>
                    </div>
                </div>
                {/** 에러 페이지 */}
                <div className="btn-wrap">
                    <button className="btn-error" onClick={errorPage}></button>
                </div>
            </div>
            <div className="view-que">
                <div className="que-content">
                    {/*<img src={} alt="지문"></img>*/}
                </div>
                <div>
                    <img src={props.questionUrl} alt="문제"></img>
                </div>
                <div className="que-bottom">
                    <div className="data-area">
                        <div className="que-info">
                            <p className="answer">
                                <span className="label">해설</span>
                            </p>
                            <div className="data-answer-area">
                                <img src={props.explainUrl} alt="해설"></img>
                            </div>
                        </div>
                    </div>
                    <div className="data-area type01">
                        <div className="que-info">
                            <p className="answer">
                                <span className="label type01">정답</span>
                            </p>
                            <div className="data-answer-area">
                                <img src={props.answerUrl} alt="정답"></img>
                            </div>
                        </div>
                        <div className="btn-wrap">
                            <button className="btn-default">
                                <i className="add-type02"></i>
                                추가
                            </button>
                            <button className="btn-default">
                                <i className="replace"></i>
                                교체
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="que-info-last">
                <p className="chapter">
                    {props.mediumChapterName}>{props.mediumChapterName}>{props.smallChapterName}>{props.topicChapterName}
                </p>
            </div>
        </div>
    </>
}

export default SIMLARLIST;