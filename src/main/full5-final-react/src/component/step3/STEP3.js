import S3header from "./S3header";
import S3content from "./S3content";
import S3stepbtn from "./S3stepbtn";
import {useState} from "react";

function STEP2(){

    const [save, setSave] = useState('');

    return <div id="wrap" className="full-pop-que">
        <div className="full-pop-wrap">
            <div className="pop-header">
                <S3header/>
            </div>
            <div className="pop-content">
                <S3content
                    save={save}
                    setSave={setSave}
                />
            </div>
            <div className="step-btn-wrap">
                <S3stepbtn
                    save={save}
                />
            </div>
        </div>
    </div>
}
export default STEP2;