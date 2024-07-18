import React, {useEffect, useState} from 'react';
import CNTLIST from "./CNTLIST";
import CNTBOTTOM from "./CNTBOTTOM";

function CNTLEFT({changeList, onChangeList, setSimilar, tab, setTab, setNo, setChangeId, setNo2, groupedItems, groupedData, removeList}) {

    const [sortList1, setSortList1] = useState(false);
    const [sortList2, setSortList2] = useState(false);
    const [viewType, setViewType] = useState('문제만 보기');

    const toggleList1 = () => {
        setSortList1(!sortList1);
    };
    const toggleList2 = () => {
        setSortList2(!sortList2);
    };
    const handleViewType = (type) => {
        setViewType(type);
        setSortList1(false);
    };


    return <div className="cnt-box">

        <div className="cnt-top">
            <span className="title">문제 목록</span>
            <div className="right-area">
                <div className="select-wrap">
                    <button className="select-btn" onClick={toggleList1}>{viewType}</button>
                    {sortList1 && (
                        <ul className="select-list">
                            <li><a onClick={()=>handleViewType('문제만 보기')}>문제만 보기</a></li>
                            <li><a onClick={()=>handleViewType('문제+정답 보기')}>문제+정답 보기</a></li>
                            <li><a onClick={()=>handleViewType('문제+해설+정답 보기')}>문제+해설+정답 보기</a></li>
                        </ul>
                    )}
                </div>
                <div className="select-wrap">
                    <button className="select-btn" onClick={toggleList2}>사용자 정렬</button>
                    {sortList2 && (
                        <ul className="select-list">
                            <li><a>단원순</a></li>
                            <li><a>난이도순</a></li>
                            <li><a>문제 형태순</a></li>
                        </ul>
                    )}
                </div>
            </div>
        </div>

        <CNTLIST changeList={changeList}
                 onChangeList={onChangeList}
                 setSimilar={setSimilar}
                 tab={tab}
                 setTab={setTab}
                 setNo={setNo}
                 viewType={viewType}
                 setChangeId={setChangeId}
                 setNo2={setNo2}
                 groupedItems={groupedItems}
                 groupedData={groupedData}
                 removeList={removeList}
        />
        <CNTBOTTOM changeList={changeList}/>
    </div>
}

export default CNTLEFT;
