import S3header from "./S3header";
import S3content from "./S3content";
import S3stepbtn from "./S3stepbtn";

function STEP3({paper}){

    return <div id="wrap" className="full-pop-que">
        <div className="full-pop-wrap">
            <div className="pop-header">
                <S3header/>
            </div>
            <div className="pop-content">
                <S3content paper={paper}/>
            </div>
            <div className="step-btn-wrap">
                <S3stepbtn/>
            </div>
        </div>
    </div>
}
export default STEP3;