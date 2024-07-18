import React from "react";
import DELLIST from "./DELLIST";

function DELETE({delList, setDelList, addToDelList}) {

    /** 그룹화 */
    const groupedData = delList.reduce((acc, item) => {
        if (!acc[item.passageId]) {
            acc[item.passageId] = {
                passageUrl: item.passageUrl,
                items: []
            };
        }
        acc[item.passageId].items.push(item);
        return acc;
    }, {});

    // console.log(groupedData, "그룹화 확인") 확인함

    return <div className="view-que-list scroll-inner">
        {Object.values(groupedData).map((group, index) => (
            <React.Fragment key={group.passageId}>
                {group.passageUrl && (
                    <div className="view-que-box">
                        <div className="que-top">
                            <div className="title">
                                {group.items.length > 1 ? (
                                    <span className="num">지문 {group.items[0].itemNo}~{group.items[group.items.length - 1].itemNo}</span>
                                ) : (
                                    <span className="num">지문 {group.items[0].itemNo}</span>
                                )}
                            </div>
                        </div>
                        <div className="view-que">
                            <img src={group.passageUrl} alt="지문입니다..." />
                        </div>
                    </div>
                )}
                {group.items.map(item => (
                    <DELLIST
                        key={item.itemId}
                        item={item}
                        addToDelList={addToDelList}
                        setDelList={setDelList}
                        delList={delList}
                    />
                ))}
            </React.Fragment>
        ))}
    </div>
}

export default DELETE;