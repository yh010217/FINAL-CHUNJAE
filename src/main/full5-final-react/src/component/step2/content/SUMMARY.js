import React, { useEffect, useState, useMemo } from "react";
import outerDragHandleIcon from '../../../images/common/ico_move_type01.png';
import SummaryList from "./SummaryList";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function SUMMARY({ initialChangeList = [], onChangeList, groupData}) {
    const [changeList, setChangeList] = useState(initialChangeList);
    const [multipleCount, setMultipleCount] = useState(0);
    const [subjectiveCount, setSubjectiveCount] = useState(0);

    const multipleChoiceForms = useMemo(() => ['5지 선택', '단답 무순형', '자유 선지형'], []);
    const subjectiveForms = useMemo(() => ['단답 유순형', '서술형'], []);

    useEffect(() => {
        const multipleCount = changeList.filter(item => multipleChoiceForms.includes(item.questionFormName)).length;
        const subjectiveCount = changeList.filter(item => subjectiveForms.includes(item.questionFormName)).length;

        setMultipleCount(multipleCount);
        setSubjectiveCount(subjectiveCount);
    }, [changeList, multipleChoiceForms, subjectiveForms]);


    useEffect(() => {
        setChangeList(initialChangeList);
    }, [initialChangeList]);

    const handleChangeList = (newChangeList) => {
        setChangeList(newChangeList);
        onChangeList(newChangeList);
    };

    const handleDragEnd = (result) => {
        // console.log("Drag result:", result);
        const { source, destination, type } = result;

        // 드래그 작업이 완료되지 않았을 경우 처리하지 않음
        if (!destination) {
            return;
        }

        // 그룹의 순서 변경
        if (type === 'GROUP') {
            // console.log("source:", source);
            // console.log("destination:", destination);
            // console.log("type:", type);

            if (source.index === destination.index) {
                return;
            }

            const newGroupedData = Array.from(groupData);
            const [movedGroup] = newGroupedData.splice(source.index, 1);
            newGroupedData.splice(destination.index, 0, movedGroup);

            // 새로운 changeList 생성
            const newChangeList = newGroupedData.flatMap(group => group.items);

            // 상태 업데이트
            // setGroupedData(newGroupedData);
            setChangeList(newChangeList);
            handleChangeList(newChangeList);
        }
        // 아이템의 순서 변경
        else if (type === 'ITEM') {
            const sourceGroupIndex = parseInt(source.droppableId, 10);
            const destinationGroupIndex = parseInt(destination.droppableId, 10);

            // 동일한 그룹에서의 이동인지 확인
            if (sourceGroupIndex === destinationGroupIndex && source.index === destination.index) {
                return;
            }

            const newGroupedData = Array.from(groupData);
            const sourceGroup = newGroupedData[sourceGroupIndex];
            const destinationGroup = newGroupedData[destinationGroupIndex];

            // 다른 그룹으로 이동하는 것을 방지
            if (sourceGroup.groupKey !== destinationGroup.groupKey) {
                return;
            }

            // 아이템을 그룹 내에서만 이동하도록 제한
            const [movedItem] = sourceGroup.items.splice(source.index, 1);
            destinationGroup.items.splice(destination.index, 0, movedItem);

            // 새로운 changeList 생성
            const newChangeList = newGroupedData.flatMap(group => group.items);

            // 상태 업데이트
            setChangeList(newChangeList);
            handleChangeList(newChangeList);
        }
    };

    // console.log('changeList...', changeList)
    // console.log('groupedData...', groupedData)
    // console.log('groupedData...', groupData)

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
                                <span>순서</span>
                                <span>단원명</span>
                                <span>문제 형태</span>
                                <span>난이도</span>
                            </div>

                            <div className="tbody">
                                <div className="scroll-inner">
                                    <div className="test ui-sortable" id="table-1">
                                        {groupData.map((group, groupIndex) => (
                                            <Draggable
                                                key={group.groupKey.toString()}
                                                draggableId={group.groupKey.toString()}
                                                index={groupIndex}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={`depth-01 ui-sortable ${group.items.length === 1 ? 'single-item' : ''}`}
                                                    >
                                                        {group.groupKey !== null && (
                                                            <div className="drag-type02 dragHandle"
                                                                 {...provided.dragHandleProps}
                                                            >
                                                                <img src={outerDragHandleIcon} alt="outer drag handler img" />
                                                            </div>
                                                        )}
                                                        <Droppable droppableId={groupIndex.toString()} type="ITEM">
                                                            {(provided) => (
                                                                <div
                                                                    className="col-group"
                                                                    ref={provided.innerRef}
                                                                    {...provided.droppableProps}
                                                                >
                                                                    {group.items.map((item, itemIndex) => (
                                                                        <Draggable
                                                                            key={item.itemId}
                                                                            draggableId={'i'+item.itemId.toString()}
                                                                            index={itemIndex}
                                                                        >
                                                                            {(provided) => (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                >
                                                                                    <SummaryList
                                                                                        itemId={item.itemId}
                                                                                        index={item.index}
                                                                                        difficultyName={item.difficultyName}
                                                                                        questionFormName={item.questionFormName}
                                                                                        largeChapterName={item.largeChapterName}
                                                                                        mediumChapterName={item.mediumChapterName}
                                                                                        smallChapterName={item.smallChapterName}
                                                                                        topicChapterName={item.topicChapterName}
                                                                                        dragHandleProps={provided.dragHandleProps}
                                                                                        multipleChoiceForms={multipleChoiceForms}
                                                                                        subjectiveForms={subjectiveForms}
                                                                                        isSingleItem={group.items.length === 1}
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
