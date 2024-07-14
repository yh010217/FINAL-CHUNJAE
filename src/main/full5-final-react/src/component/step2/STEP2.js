import S2header from "./S2header";
import S2content from "./S2content";
import S2stepbtn from "./S2stepbtn";

function STEP2(){

    return <div id="wrap" className="full-pop-que">
        <div className="full-pop-wrap">
            <div className="pop-header">
                <S2header/>
            </div>
            <div className="pop-content">
                <S2content/>
            </div>
            <div className="step-btn-wrap">
                <S2stepbtn/>
            </div>
        </div>
    </div>
}
export default STEP2;