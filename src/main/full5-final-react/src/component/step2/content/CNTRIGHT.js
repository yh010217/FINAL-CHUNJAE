import React, {useState} from 'react';
import {useEffect} from "react";
import SUMMARY from "./SUMMARY";
import SIMILAR from "./SIMILAR";
import DELETE from "./DELETE";
import "../../../css/mycss.css"

function CNTRIGHT({initialChangeList, onChangeList, tab, setTab, similar, no, addToChangeList, setRemove, remove, delList, setDelList, addToDelList, setModal}) {

    // const [tab, setTab] = useState(0);
    const [changeList, setChangeList] = useState(initialChangeList);

    useEffect(() => {
        setChangeList(initialChangeList);
    }, [initialChangeList]);

    /** SUMMARY 에서 받아온 리스트 **/
    const handleChangeList = (newChangeList) => {
        // console.log('CNTRIGHT changeList:', newChangeList);
        setChangeList(newChangeList);
        onChangeList(newChangeList);
    };

    useEffect(()=>{
        setChangeList(initialChangeList);
    },[initialChangeList]);

    const renderContent = () => {
        switch (tab) {
            case 0:
                return <SUMMARY initialChangeList={changeList} onChangeList={handleChangeList}/>;
            case 1:
                return <SIMILAR changeList={changeList}
                                similar={similar}
                                no={no}
                                addToChangeList={addToChangeList}
                                setRemove={setRemove}
                                remove={remove}
                                setModal={setModal}
                                />;
            case 2:
                return <div className="change_margin"><DELETE changeList={changeList} delList={delList} addToDelList={addToDelList} setDelList={setDelList}/></div>

            default:
                return null;
        }
    };

    return (
        <div className="cnt-box type01">
            <div className="tab-wrap">
                <ul className="tab-menu-type01">
                    <li className={tab === 0 ? 'active' : ''}>
                        <a onClick={() => setTab(0)} className={tab === 0 ? 'active' : ''}>
                            문제지 요약
                        </a>
                    </li>
                    <li className={tab === 1 ? 'active' : ''}>
                        <a onClick={() => setTab(1)} className={tab === 1 ? 'active' : ''}>
                            유사 문제
                        </a>
                    </li>
                    <li className={tab === 2 ? 'active' : ''}>
                        <a onClick={() => setTab(2)} className={tab === 2 ? 'active' : ''}>
                            삭제 문항
                        </a>
                    </li>
                </ul>
                <div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default CNTRIGHT;
