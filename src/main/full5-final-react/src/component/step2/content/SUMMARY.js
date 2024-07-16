import { useEffect, useState } from "react";
import outerDragHandleIcon from '../../../images/common/ico_move_type01.png';
import innerDragHandleIcon from '../../../images/common/ico_move_type02.png';

function SUMMARY({ initialChangeList = [], onChangeList }) {
    const [changeList, setChangeList] = useState(initialChangeList);
    const [draggedGroup, setDraggedGroup] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);
    const [multipleCount, setMultiple] = useState(0);
    const [subjectiveCount, setSubjective] = useState(0);

    useEffect(() => {
        const multipleCount = changeList.filter(item => item.questionFormName === '5지 선택').length;
        const subjectiveCount = changeList.filter(item => item.questionFormName === '단답 유순형').length;

        setMultiple(multipleCount);
        setSubjective(subjectiveCount);
    }, [changeList]);

    useEffect(() => {
        setChangeList(initialChangeList);
    }, [initialChangeList]);

    const handleDragStart = (e, item, isGroup) => {
        if (isGroup) {
            const group = changeList.filter(i => i.passageId === item.passageId);
            setDraggedGroup(group);
        } else {
            setDraggedItem(item);
        }
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        let updatedItems = [...changeList];

        if (draggedGroup) {
            const draggedItemsIndices = draggedGroup.map(item => updatedItems.indexOf(item));
            draggedItemsIndices.sort((a, b) => b - a).forEach(index => updatedItems.splice(index, 1));
            updatedItems.splice(index, 0, ...draggedGroup);
        } else if (draggedItem) {
            const draggedIndex = updatedItems.indexOf(draggedItem);
            updatedItems.splice(draggedIndex, 1);
            updatedItems.splice(index, 0, draggedItem);
        }

        setChangeList(updatedItems);
        onChangeList(updatedItems);
        setDraggedGroup(null);
        setDraggedItem(null);
    };

    return (
        <div className="contents on">
            <div className="table half-type no-passage">
                <div className="fix-head">
                    <span>이동</span>
                    <span>번호</span>
                    <span>단원명</span>
                    <span>문제 형태</span>
                    <span>난이도</span>
                </div>

                <div className="tbody">
                    <div className="scroll-inner">
                        <div className="test ui-sortable" id="table-1">
                            {changeList.map((item, index) => (
                                <div key={item.itemId} className="col">
                                    {index === 0 || changeList[index - 1].passageId !== item.passageId ? (
                                        <div className="depth-01 ui-sortable">
                                            <div
                                                className={`dragHandle drag-type02 ${draggedGroup && draggedGroup.includes(item) ? 'dragging' : ''}`}
                                                draggable="true"
                                                onDragStart={(e) => handleDragStart(e, item, true)}
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleDrop(e, index)}
                                            >
                                                <img src={outerDragHandleIcon} alt='outer drag handle' />
                                            </div>
                                            <div className="col-group">
                                                <div className="col depth-02">
                                                    <span>{item.itemNo}</span>
                                                    <span className="tit">
                                                        <div className="txt">
                                                            <p>{item.passageId}</p>
                                                            {item.largeChapterName}{item.mediumChapterName}{item.smallChapterName}{item.topicChapterName}
                                                        </div>
                                                        <div className="tooltip-wrap">
                                                            <button className="btn-tip"></button>
                                                        </div>
                                                    </span>
                                                    <span>{item.questionFormName === '5지 선택' ? '객관식' : '주관식'}</span>
                                                    <span>{item.difficultyName}</span>
                                                </div>
                                                {changeList.filter(i => i.passageId === item.passageId).map((groupItem, groupIndex) => (
                                                    <div key={groupItem.itemId} className="col depth-02">
                                                        <span
                                                            className={`dragHandle drag-type01 ${draggedItem === groupItem ? 'dragging' : ''}`}
                                                            draggable="true"
                                                            onDragStart={(e) => handleDragStart(e, groupItem, false)}
                                                            onDragOver={handleDragOver}
                                                            onDrop={(e) => handleDrop(e, groupIndex)}
                                                        >
                                                            <img src={innerDragHandleIcon} alt="inner drag handle" />
                                                        </span>
                                                        <span>{groupItem.itemNo}</span>
                                                        <span className="tit">
                                                            <div className="txt">
                                                                <p>{groupItem.passageId}</p>
                                                                {groupItem.largeChapterName}{groupItem.mediumChapterName}{groupItem.smallChapterName}{groupItem.topicChapterName}
                                                            </div>
                                                            <div className="tooltip-wrap">
                                                                <button className="btn-tip"></button>
                                                            </div>
                                                        </span>
                                                        <span>{groupItem.questionFormName === '5지 선택' ? '객관식' : '주관식'}</span>
                                                        <span>{groupItem.difficultyName}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom-box">
                <div className="que-badge-group">
                    <div className="que-badge-wrap">
                        <span className="que-badge gray">객관식</span>
                        <span className="num">{multipleCount}</span>
                    </div>
                    <div className="que-badge-wrap">
                        <span className="que-badge gray">주관식</span>
                        <span className="num">{subjectiveCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SUMMARY;
