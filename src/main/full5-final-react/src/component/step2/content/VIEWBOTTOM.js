import CNTLEFT from "./CNTLEFT";
import CNTRIGHT from "./CNTRIGHT";
import {useEffect, useState} from "react";

function VIEWBOTTOM({itemList}){
    /** 바뀌는 리스트 만들기 **/
    const [changeList, setChangeList] = useState([]);
    const [similar, setSimilar] = useState(null); // similar itemIdList 뽑아오는 애
    const [tab, setTab] = useState(0); // 문제지 요약, 유사문제, 문제 삭제 관련 State
    const [no, setNo] = useState(0) // 해당하는 문제 번호 저장하기 (유사 번호)
    const [no2, setNo2] = useState(0);
    let [remove, setRemove] = useState(changeList.map(item => item.itemId)); // 유사 문제에서 지울 애들
    let [changeId, setChangeId] = useState(null);
    const [delList, setDelList] = useState([]); // 삭제한 애들 담는 곳

    useEffect(() => {
        setChangeList(itemList);
        setRemove(itemList.map(item => item.itemId)); // 왼쪽에 있는 문제 유사 문제에 뜨면 안 됨
    }, [itemList]);

    /** SUMMARY -> CNTRIGHT 에서 받아온 리스트 **/
    const handleChangeList = (newChangeList) => {
        // console.log('VIEWBOTTOM changeList:', newChangeList);
        setChangeList(newChangeList);
    };

    const groupByPassageId = (list) => {
        return list.reduce((grouped, item) => {
            const key = item.passageId;
            if (key) {
                (grouped[key] = grouped[key] || []).push(item);
            } else {
                (grouped['individual'] = grouped['individual'] || []).push(item);
            }
            return grouped;
        }, {});
    };

    let groupedItems = null;

    /** 클릭한 문제 아래 유사 문제 추가하기 */
    const addToChangeList = (itemToAdd) => {
        // passageId가 없는 경우 => 클릭한 문제 바로 아래 추가
        if (itemToAdd.passageId === null || itemToAdd.passageId === '') {
            setChangeList(prevList => {
                const index = prevList.findIndex(item => item.itemId === similar);
                if (index === -1) { // 값이 못 찾으면 가장 아래로 보내기
                    return [...prevList, itemToAdd];
                } else {
                    return [
                        ...prevList.slice(0, index + 1),
                        itemToAdd,
                        ...prevList.slice(index + 1)
                    ];
                }
            });
            // passageId가 있는 경우
        } else if (itemToAdd.passageId !== '') {
            if (changeId === itemToAdd.passageId) {
                // 마지막 지문 바로 아래에 추가되어야 함.
                console.log('추후 추가 예정~~^^');
            } else {
                // changeId가 itemToAdd의 passageId와 일치하지 않을 때
                setChangeList(prevList => {
                    const index = prevList.findIndex(item => item.itemNo === no2);
                    if (index === -1) { // 값이 못 찾으면 가장 아래로 보내기
                        return [...prevList, itemToAdd];
                    } else {
                        return [
                            ...prevList.slice(0, index + 1),
                            itemToAdd,
                            ...prevList.slice(index + 1)
                        ];
                    }
                });
            }
        }
    };

    /** 삭제하기 구현하기 */
    const removeList = (itemDelItem) => {
        setDelList(prevList => {
            const updatedList = [...prevList, itemDelItem];
            setChangeList(changeList.filter(item => item.itemId !== itemDelItem.itemId)); // 삭제 구현
            return updatedList;
        });
    };

    groupedItems = groupByPassageId(changeList);

    /** 삭제하기에서 추가 눌렀을 때 */
    const addToDelList = (itemReDelItem) => {
        const result = itemReDelItem.passageId;

        let shouldAddToChangeList = true;
        for (let key in groupedItems) {
            if (Number(key) === result) {
                let keyLen = groupedItems[result].length;
                console.log(keyLen, "key값 길이");
                setChangeList((prevList) => {
                    const index = prevList.findIndex(
                        (item) => item.passageId === Number(key)
                    );
                    console.log(index, "index 값");
                    return [
                        ...prevList.slice(0, index + keyLen),
                        itemReDelItem,
                        ...prevList.slice(index + keyLen),
                    ];
                });
                shouldAddToChangeList = false;
                break;
            }
        }

        if (shouldAddToChangeList) {
            setChangeList((prevList) => [...prevList, itemReDelItem]);
        }
    };


    return <div className="view-bottom type01">
            {/** 문제 목록 **/}
            <CNTLEFT changeList={changeList}
                     onChangeList={handleChangeList}
                     setSimilar={setSimilar}
                     setTab={setTab}
                     setNo={setNo}
                     setChangeId={setChangeId}
                     setNo2={setNo2}
                     groupedItems={groupedItems}
                     removeList={removeList}/>

            {/** 문제지 요약, 유사문제, 문제삭제 **/}
            <CNTRIGHT initialChangeList={changeList}
                      onChangeList={handleChangeList}
                      similar={similar}
                      tab={tab}
                      setTab={setTab}
                      no={no}
                      addToChangeList={addToChangeList}
                      remove={remove}
                      setRemove={setRemove}
                      delList={delList}
                      setDelList={setDelList}
                      addToDelList={addToDelList}
            />
        </div>
}
export default VIEWBOTTOM;