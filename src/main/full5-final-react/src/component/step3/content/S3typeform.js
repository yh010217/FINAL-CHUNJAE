function S3typeform(){

    return <>
        <div className="left-wrap">
            <span className="tit">난이도</span>
            <div className="que-badge-group">
                <div className="que-badge-wrap">
                    <span className="que-badge purple">하</span>
                    <span className="num">갯수</span>
                </div>
                <div className="que-badge-wrap">
                    <span className="que-badge green">중</span>
                    <span className="num">갯수</span>
                </div>
                <div className="que-badge-wrap">
                    <span className="que-badge yellow">상</span>
                    <span className="num">갯수</span>
                </div>
            </div>
        </div>

        <div className="right-wrap">
            <span className="tit">문제 형태</span>
            <div className="que-badge-group">
                <div className="que-badge-wrap">
                    <span className="que-badge gray">객관식</span>
                    <span className="num">숫자</span>
                </div>
                <div className="que-badge-wrap">
                    <span className="que-badge gray">주관식</span>
                    <span className="num">숫자</span>
                </div>
            </div>
        </div>
    </>
}

export default S3typeform;