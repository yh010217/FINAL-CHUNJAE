import {useEffect, useState} from "react";
import dragHandleIcon from '../../../images/common/ico_move_type01.png';

function SUMMARY({initialChangeList = [], onChangeList}) {

    /** 바뀌는 리스트 저장 **/
    const [changeList, setChangeList] = useState(initialChangeList);
    /** 리스트 바꾸기 위한 state **/
    const [draggedItem, setDraggedItem] = useState(null);
    /** 객관식 주관식 개수 계산 **/
    const [multipleCount, setMultiple] = useState(0);
    const [subjectiveCount, setSubjective] = useState(0);

    useEffect(() => {
        const multipleCount = changeList.filter(item => item.questionFormName === '5지 선택').length;
        const subjectiveCount = changeList.filter(item => item.questionFormName === '단답 유순형').length;

        setMultiple(multipleCount);
        setSubjective(subjectiveCount);
    }, [changeList]);


    useEffect(() => {
        setChangeList(initialChangeList)
    }, [initialChangeList]);

    const handleDragStart = (e, index) => {
        setDraggedItem(changeList[index]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        /** Drop 이벤트에서 기본 동작 막기 **/
        e.preventDefault();
        const updatedItems = [...changeList];
        const draggedItemIndex = updatedItems.indexOf(draggedItem);
        updatedItems.splice(draggedItemIndex, 1);
        updatedItems.splice(index, 0, draggedItem);
        setChangeList(updatedItems);
        /** 상위 컴포넌트로 리스트 이동 **/
        onChangeList(updatedItems);
        setDraggedItem(null);
    };

    return <div className="contents on">
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
                        {changeList.map((item, index) => {
                            return <div key={item.itemId} className="col ui-sortable-helper">
                                {/** a 태그 클릭시 해당 문제로  **/}
                                <a href={'/'}>
                                    <span className={`dragHandle ui-sortable-handle ${item === draggedItem ? 'dragging' : ''}`}
                                          // className={`item ${item === draggedItem ? 'dragging' : ''}`}
                                          draggable="true"
                                          onDragStart={(e) => handleDragStart(e, index)}
                                          onDragOver={(e) => handleDragOver(e)}
                                          onDrop={(e) => handleDrop(e, index)}
                                    >

                                        <img src={dragHandleIcon} alt="drag handle"/>
                                    </span>
                                    {/** 최종은 index로 **/}
                                    {/*<span className="">{index+1}</span>*/}
                                    <span>{item.itemNo}</span>
                                    <span className="tit">
                                        <div className="txt">
                                            {item.largeChapterName}{item.mediumChapterName}{item.smallChapterName}{item.topicChapterName}
                                        </div>
                                        <div className="tooltip-wrap">
                                            <button className="btn-tip"></button>
                                        </div>
                                    </span>
                                    <span className="">{item.questionFormName === '5지 선택' ? '객관식' : '주관식'}</span>
                                    <span className="">{item.difficultyName}</span>
                                </a>
                            </div>
                        })};
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
}

export default SUMMARY;