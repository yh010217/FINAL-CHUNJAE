import React, {useState} from 'react';
import CNTLIST from "./CNTLIST";
import CNTBOTTOM from "./CNTBOTTOM";

function CNTLEFT({changeList, onChangeList, setSimilar, tab, setTab, setNo}) {

    return <>
        <div className="cnt-box">
            <div className="cnt-top">
                <span className="title">문제 목록</span>
                {/** 수정필요 **/}
                <div className="right-area">
                    <div className="select-wrap">
                        <button className="select-btn">문제만 보기</button>
                        <ul className="select-list">
                            <li><a>문제+정답 보기</a></li>
                            <li><a>문제+해설+정답 보기</a></li>
                        </ul>
                    </div>
                    <div className="select-wrap">
                        <button className="select-btn">사용자 정렬</button>
                        <ul className="select-list">
                            <li><a>단원순</a></li>
                            <li><a>난이도순</a></li>
                            <li><a>문제 형태순</a></li>
                        </ul>
                    </div>
                </div>

            </div>
            <CNTLIST changeList={changeList} onChangeList={onChangeList} setSimilar={setSimilar} tab={tab}
                     setTab={setTab}
                     setNo={setNo}/>
            <CNTBOTTOM changeList={changeList}/>
        </div>
    </>
}

export default CNTLEFT;
