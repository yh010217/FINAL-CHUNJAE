import S2header from "./S2header";
import S2content from "./S2content";
import S2stepbtn from "./S2stepbtn";
import MODAL from "./content/MODAL";
import React from "react";
import {useState} from "react";
import {useParams} from "react-router-dom";

function STEP2({handlePaper}) {
    const [modal, setModal] = useState(false); // 신고 모달창 관련 이벤트
    const [itemId, setItemId] = useState('');
    const params = useParams();
    // console.log(params.type);

    /** 모달 관련 이벤트 */
    let block = {}; // display : block 로 만들기 위한 노력...
    if (modal === true) {
        block = {
            display: 'block'
        };
    }

    return <div id="wrap" className="full-pop-que">
        {/** 신고 페이지 */}
        <div className="dim" style={block}></div>
        {modal && <MODAL setModal={setModal} itemId={itemId}/>}

        <div className="full-pop-wrap">

            <div className="pop-header">
                <S2header/>
            </div>
            <div className="pop-content">
                <S2content
                    setModal={setModal}
                    setItemId={setItemId}
                    handlePaper={handlePaper}
                    paramType={params.type}
                    getData={params.getData}
                />
            </div>

            <div className="step-btn-wrap">
                <S2stepbtn/>
            </div>
        </div>
    </div>
}

export default STEP2;