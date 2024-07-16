import CNTLEFT from "./CNTLEFT";
import CNTRIGHT from "./CNTRIGHT";
import {useEffect, useState} from "react";

function VIEWBOTTOM({itemList}){
    /** 바뀌는 리스트 만들기 **/
    const [changeList, setChangeList] = useState([]);
    const [similar, setSimilar] = useState(null); // similar itemIdList 뽑아오는 애
    const [tab, setTab] = useState(0); // 문제지 요약, 유사문제, 문제 삭제 관련 State
    const [no, setNo] = useState(0) // 해당하는 문제 번호 저장하기 (유사 번호)
    let [remove, setRemove] = useState(changeList.map(item => item.itemId)); // 유사 문제에서 지울 애들

    useEffect(() => {
        setChangeList(itemList);
        setRemove(itemList.map(item => item.itemId)); // 왼쪽에 있는 문제 유사 문제에 뜨면 안 됨
    }, [itemList]);

    /** SUMMARY -> CNTRIGHT 에서 받아온 리스트 **/
    const handleChangeList = (newChangeList) => {
        // console.log('VIEWBOTTOM changeList:', newChangeList);
        // console.log(typeof(newChangeList));
        setChangeList(newChangeList);
    };

    /** 클릭한 문제 아래 유사 문제 추가하기 */
    const addToChangeList = (itemToAdd) => {
        setChangeList(prevList => {
            const index = prevList.findIndex(item => item.itemId === similar);
            if (index === -1) { // 값을 못 찾으면 가장 아래로 보내기
                return [...prevList, itemToAdd];
            } else {
                return [
                    ...prevList.slice(0, index + 1), // ...prevList.slice(0, index) 이렇게 하면 교체 됨
                    itemToAdd,
                    ...prevList.slice(index + 1)
                ];
            }
        });
    };

    const ChangeList =(itemToAdd)=> {
        setChangeList(prevList => {
            const index = prevList.findIndex(item => item.itemId === similar);
            if (index === -1) {
                return [...prevList, itemToAdd];
            } else {
                return [
                    ...prevList.slice(0, index),
                    itemToAdd,
                    ...prevList.slice(index + 1)
                ];
            }
        });
    };

    useEffect(()=>{

    },[changeList]);

    return <div className="view-bottom type01">
            {/** 문제 목록 **/}
            <CNTLEFT changeList={changeList} onChangeList={handleChangeList} setSimilar={setSimilar} setTab={setTab} setNo={setNo}/>
            {/** 문제지 요약, 유사문제, 문제삭제 **/}
            <CNTRIGHT initialChangeList={changeList} onChangeList={handleChangeList} similar={similar} tab={tab} setTab={setTab} no={no} addToChangeList={addToChangeList} remove={remove} setRemove={setRemove} ChangeList={ChangeList}/>
        </div>
}
export default VIEWBOTTOM;