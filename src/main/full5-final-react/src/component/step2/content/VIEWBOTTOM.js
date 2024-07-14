import CNTLEFT from "./CNTLEFT";
import CNTRIGHT from "./CNTRIGHT";
import {useEffect, useState} from "react";

function VIEWBOTTOM({itemList}){
    /** 바뀌는 리스트 만들기 **/
    const [changeList, setChangeList] = useState([]);
    const [similar, setSimilar] = useState(null); // similar itemIdList 뽑아오는 애
    const [tab, setTab] = useState(0); // 문제지 요약, 유사문제, 문제 삭제 관련 State
    const [no, setNo] = useState(0) // 해당하는 문제 번호 저장하기 (유사 번호)


    useEffect(() => {
        setChangeList(itemList);
    }, [itemList]);

    /** SUMMARY -> CNTRIGHT 에서 받아온 리스트 **/
    const handleChangeList = (newChangeList) => {
        // console.log('VIEWBOTTOM changeList:', newChangeList);
        // console.log(typeof(newChangeList));
        setChangeList(newChangeList);
    };

    useEffect(()=>{

    },[changeList]);

    return <div className="view-bottom type01">
            {/** 문제 목록 **/}
            <CNTLEFT changeList={changeList} onChangeList={handleChangeList} setSimilar={setSimilar} setTab={setTab} setNo={setNo}/>
            {/** 문제지 요약, 유사문제, 문제삭제 **/}
            <CNTRIGHT initialChangeList={changeList} onChangeList={handleChangeList} similar={similar} tab={tab} setTab={setTab} no={no}/>
        </div>
}
export default VIEWBOTTOM;