import React, { useEffect, useState } from "react";
import outerDragHandleIcon from '../../../images/common/ico_move_type01.png';
import SummaryList from "./SummaryList";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function SUMMARY({ initialChangeList = [], onChangeList }) {
    const [changeList, setChangeList] = useState(initialChangeList);
    const [groupedData, setGroupedData] = useState([]);
    const [multipleCount, setMultiple] = useState(0);
    const [subjectiveCount, setSubjective] = useState(0);

    useEffect(() => {
        const grouped = changeList.reduce((acc, item) => {
            const groupKey = item.passageId || item.itemId;
            const existingGroupIndex = acc.findIndex(group => group.groupKey === groupKey);
            if (existingGroupIndex === -1) {
                acc.push({
                    groupKey,
                    items: [item]
                });
            } else {
                acc[existingGroupIndex].items.push(item);
            }
            return acc;
        }, []);

        setGroupedData(grouped);

        const multipleCount = changeList.filter(item => item.questionFormName === '5지 선택').length;
        const subjectiveCount = changeList.filter(item => item.questionFormName === '단답 유순형').length;
        const m_fc = changeList.filter(item => item.questionFormName === '자유 선지형').length;
        const m_s = changeList.filter(item => item.questionFormName === '단답 무순형').length;

        setMultiple(multipleCount + m_fc + m_s);
        setSubjective(subjectiveCount);
    }, [changeList]);

    useEffect(() => {
        setChangeList(initialChangeList);
    }, [initialChangeList]);

    const handleChangeList = (newChangeList) => {
        setChangeList(newChangeList);
        onChangeList(newChangeList);
    };

    const handleDragEnd = (result) => {
        const { source, destination, type } = result;

        if (!destination) return;

        if (type === 'GROUP') {
            if (source.index === destination.index) return;

            const newGroupedData = Array.from(groupedData);
            const [movedGroup] = newGroupedData.splice(source.index, 1);
            newGroupedData.splice(destination.index, 0, movedGroup);

            const newChangeList = newGroupedData.flatMap(group => group.items);
            setChangeList(newChangeList);
            handleChangeList(newChangeList);

            setGroupedData(newGroupedData);
        } else if (type === 'ITEM') {
            const sourceGroupIndex = parseInt(source.droppableId, 10);
            const destinationGroupIndex = parseInt(destination.droppableId, 10);

            if (sourceGroupIndex === destinationGroupIndex && source.index === destination.index) return;

            const newGroupedData = Array.from(groupedData);
            const sourceGroup = newGroupedData[sourceGroupIndex];
            const destinationGroup = newGroupedData[destinationGroupIndex];

            const [movedItem] = sourceGroup.items.splice(source.index, 1);
            destinationGroup.items.splice(destination.index, 0, movedItem);

            const newChangeList = newGroupedData.flatMap(group => group.items);
            setChangeList(newChangeList);
            handleChangeList(newChangeList);

            setGroupedData(newGroupedData);
        }
    };

    return (
        <div className="contents on">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable" type="GROUP">
                    {(provided) => (
                        <div
                            className="table half-type"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
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
                                        {groupedData.map((group, groupIndex) => (
                                            <Draggable
                                                key={group.groupKey.toString()}
                                                draggableId={group.groupKey.toString()}
                                                index={groupIndex}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className="depth-01 ui-sortable"
                                                    >
                                                        <div className="drag-type02 dragHandle"
                                                             {...provided.dragHandleProps}
                                                        >
                                                            <img src={outerDragHandleIcon} alt="outer drag handler img" />
                                                        </div>
                                                        <Droppable droppableId={groupIndex.toString()} type="ITEM">
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    className={`col-group ${snapshot.isDraggingOver ? 'draggingOver' : ''}`}
                                                                    ref={provided.innerRef}
                                                                    {...provided.droppableProps}
                                                                >
                                                                    {group.items.map((item, itemIndex) => (
                                                                        <Draggable
                                                                            key={item.itemId}
                                                                            draggableId={item.itemId.toString()}
                                                                            index={itemIndex}
                                                                        >
                                                                            {(provided) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                >
                                                                                    <SummaryList
                                                                                        itemId={item.itemId}
                                                                                        itemNo={item.itemNo}
                                                                                        difficultyName={item.difficultyName}
                                                                                        questionFormName={item.questionFormName}
                                                                                        largeChapterName={item.largeChapterName}
                                                                                        mediumChapterName={item.mediumChapterName}
                                                                                        smallChapterName={item.smallChapterName}
                                                                                        topicChapterName={item.topicChapterName}
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    ))}
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

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
