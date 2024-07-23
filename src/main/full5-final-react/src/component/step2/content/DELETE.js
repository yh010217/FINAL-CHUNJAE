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

    /** 한 번에 지우기 */
    const allDelList = (group) => {
        console.log(group, "얘부터 다시 확인하기")
        const itemIds = group.items.map(item => item.itemId);
        const newDelList = delList.filter(list => !itemIds.includes(list.itemId));
        setDelList(newDelList); // 클릭하면 한 번에 리스트에서 삭제

        // 문제 다시 추가하기
        group.items.forEach(item => addToDelList(item))
    }
    
    return (
        <div className="view-que-list scroll-inner">
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
                                <div className="que-bottom">
                                    <div className="data-area">
                                        <button className="btn-default" onClick={() => allDelList(group)}>
                                            <i className="add-type02"></i>
                                            전체 추가
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {group.items.map((item, itemIndex) => (
                        <DELLIST
                            itemIndex={itemIndex}
                            item={item}
                            addToDelList={addToDelList}
                            setDelList={setDelList}
                            delList={delList}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );

}

export default DELETE;