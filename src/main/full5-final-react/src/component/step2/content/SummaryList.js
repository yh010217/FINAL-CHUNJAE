import React, {useState, useEffect} from "react";
import innerDragHandleIcon from "../../../images/common/ico_move_type02.png";

function SummaryList({initialChangeList = [], onChangeList, groupedItems, passageId}) {
    const items = groupedItems[passageId] || [];

    const [changeList, setChangeList] = useState(initialChangeList);
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);

    useEffect(() => {
        setChangeList(initialChangeList);
    }, [initialChangeList]);

    const handleDragStart = (e, index) => {
        setDraggedItemIndex(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const updatedItems = [...changeList];
        const [removedItem] = updatedItems.splice(draggedItemIndex, 1);
        updatedItems.splice(index, 0, removedItem);
        setChangeList(updatedItems);
        onChangeList(updatedItems);
        setDraggedItemIndex(null);
    };

    return <>
        {items.map((item, index) => (
            <div key={item.itemId} className="col depth-02">
                <a>
                      <span
                          className={`dragHandle drag-type01 ui-sortable-handle ${index === draggedItemIndex ? 'dragging' : ''}`}
                          draggable="true"
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={(e) => handleDragOver(e)}
                          onDrop={(e) => handleDrop(e, index)}
                      >
                        <img src={innerDragHandleIcon} alt="inner drag handle"/>
                      </span>
                    <span>{item.itemNo}</span>
                    <span className="tit">
                          <div className="txt">
                              {item.largeChapterName}
                              {item.mediumChapterName}
                              {item.smallChapterName}
                              {item.topicChapterName}
                          </div>
                          <div className="tooltip-wrap">
                            <button className="btn-tip"></button>
                          </div>
                      </span>
                    <span>{item.questionFormName === '5지 선택' ? '객관식' : '주관식'}</span>
                    <span>{item.difficultyName}</span>
                </a>
            </div>
        ))}
    </>;
}

export default SummaryList;
