import React from "react";
import DELLIST from "./DELLIST";
import NoDel from "./NoDel";
import YesDel from "./YesDel";

function DELETE({changeList ,delList, setDelList, addToDelList, setModal, setItemId}) {

    /** 그룹화 */
    const groupedData = delList.reduce((acc, item, index) => {
        let groupKey = null;
        if(item.passageId !== null) {
            groupKey = item.passageId
        } else {
            groupKey = item.itemId
        }

        const groupIndex = acc.findIndex(group => group.groupKey === groupKey); // 기존 그룹 인덱스 확인
        if (groupIndex === -1) {
            acc.push({
                groupKey,
                items: [{...item, index: index + 1}]
            });
        } else {
            acc[groupIndex].items.push({...item, index: index + 1});
        }
        return acc;
    }, []);


    return (
        <>
            {delList.length > 0 ?
                <YesDel
                    delList={delList}
                    setDelList={setDelList}
                    addToDelList={addToDelList}
                    setModal={setModal}
                    setItemId={setItemId}
                    groupedData={groupedData}
                    changeList={changeList}
                /> :
                <NoDel/>
            }
        </>
    );

}

export default DELETE;