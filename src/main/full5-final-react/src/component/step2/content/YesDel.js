import React, {useRef} from "react";
import DELLIST from "./DELLIST";

function YesDel({delList, setDelList, addToDelList, setModal, setItemId, groupedData, changeList}) {
    const topRef = useRef(null);

    /** 한 번에 지우기 */
    const allDelList = (group) => {

        const itemIds = group.items.map(item => item.itemId);
        const totalItemsToAdd = group.items.length + changeList.length;

        if (totalItemsToAdd > 100) {
            alert("최대 100개까지만 추가할 수 있습니다.");
            return; // 추가를 중단
        }

        // delList에서 삭제할 아이템을 필터링
        const newDelList = delList.filter(list => !itemIds.includes(list.itemId));
        setDelList(newDelList); // 클릭하면 한 번에 리스트에서 삭제

        // 문제 다시 추가하기
        group.items.forEach(item => addToDelList(item));
        handleScrollToTop(); // 최상단 이동
    };


    // 함수: 클릭 시 스크롤 이동
    const handleScrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="view-que-list scroll-inner">
            <div ref={topRef} /> {/* 최상단 스크롤 이동을 위한 빈 div */}

            {Object.values(groupedData).map((group, index) => {
                const passageId = group.items.map(item => item.passageId);
                const passageUrl = group.items.map(item => item.passageUrl);
                console.log(group, "test");

                return (
                        <React.Fragment key={group.index}>
                            {group.items.map((item, itemIndex) => (
                                <React.Fragment key={item.itemId}>
                                    {itemIndex === 0 && (
                                        <>
                                            {item.passageUrl && item.passageUrl !== 'null' && (
                                                <div className="view-que-box">
                                                    <div className="que-top">
                                                        <div className="title">
                                                            <span className="num">
                                                                {group.items.length > 1 ? (
                                                                    <span className="num">지문 {item.index} ~ {(group.items.length + item.index) - 1}</span>
                                                                ) : (
                                                                    <span className="num">지문 {item.index}</span>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="view-que">
                                                        <img src={passageUrl[0]} alt="지문입니다..." />
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
                                        </>
                                    )}
                                    <DELLIST
                                        key={item.itemId} // 반드시 key prop을 추가해야 함
                                        itemIndex={itemIndex}
                                        item={item}
                                        addToDelList={addToDelList}
                                        setDelList={setDelList}
                                        delList={delList}
                                        setModal={setModal}
                                        setItemId={setItemId}
                                        changeList={changeList}
                                        handleScrollToTop={handleScrollToTop}
                                    />
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                );
            })}
        </div>
    );

}

export default YesDel