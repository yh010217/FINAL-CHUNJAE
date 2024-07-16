import React, { useEffect, useState, useMemo } from "react";
import outerDragHandleIcon from '../../../images/common/ico_move_type01.png';
import SummaryList from "./SummaryList";

function SUMMARY({ initialChangeList = [], onChangeList }) {
    const [changeList, setChangeList] = useState(initialChangeList);
    const [draggedItem, setDraggedItem] = useState(null);
    const [multipleCount, setMultiple] = useState(0);
    const [subjectiveCount, setSubjective] = useState(0);

    useEffect(() => {
        const multipleCount = changeList.filter(item => item.questionFormName === '5지 선택').length;
        const subjectiveCount = changeList.filter(item => item.questionFormName === '단답 유순형').length;
        setMultiple(multipleCount);
        setSubjective(subjectiveCount);
    }, [changeList]);

    // 초기 리스트 변경 시 상태 업데이트
    useEffect(() => {
        setChangeList(initialChangeList);
    }, [initialChangeList]);

    // 드래그 시작 시 상태 업데이트
    const handleDragStart = (e, item) => {
        setDraggedItem(item);
    };

    // 드래그 오버 시 기본 동작 막기
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // 드롭 시 아이템 이동 처리
    const handleDrop = (e, passageId) => {
        e.preventDefault();
        const updatedItems = [...changeList];
        const draggedIndex = updatedItems.indexOf(draggedItem);
        updatedItems.splice(draggedIndex, 1);

        const targetIndex = updatedItems.findIndex(
            (item) => item.passageId === passageId
        );
        updatedItems.splice(targetIndex + 1, 0, draggedItem);

        setChangeList(updatedItems);
        onChangeList(updatedItems);
        setDraggedItem(null);
    };

    /** SummaryList 에서 받아온 리스트 **/
    const handleChangeList = (newChangeList) => {
        // console.log('SUMMARY changeList:', newChangeList);
        setChangeList(newChangeList);
        onChangeList(newChangeList);
    };


    // passageId로 그룹화
    const groupByPassageId = (list) => {
        return list.reduce((grouped, item, index) => {
            const key = item.passageId || `individual_${index}`;
            (grouped[key] = grouped[key] || []).push(item);
            return grouped;
        }, {});
    };
    const groupedItems = useMemo(() => groupByPassageId(changeList), [changeList]);
    // console.log(groupedItems);

    return (
        <div className="contents on">
            <div className="table half-type ">
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
                            {Object.keys(groupedItems).map((passageId, index) => (
                                <React.Fragment key={passageId}>
                                    <div className="depth-01 ui-sortable">
                                        <div
                                            className="dragHandle drag-type02"
                                            draggable="true"
                                            onDragStart={(e) => handleDragStart(e, groupedItems[passageId])}
                                            onDragOver={(e) => handleDragOver(e)}
                                            onDrop={(e) => handleDrop(e, passageId)}
                                        >
                                            <img src={outerDragHandleIcon} alt="outer drag handler img" />
                                        </div>
                                        <div className="col-group">
                                            <SummaryList
                                                key={`${passageId}-${index}`}
                                                initialChangeList={initialChangeList}
                                                onChangeList={handleChangeList}
                                                groupedItems={groupedItems}
                                                passageId={passageId}
                                            />
                                        </div>
                                    </div>
                                </React.Fragment>
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
