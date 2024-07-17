import React, {useState, useEffect} from "react";
import innerDragHandleIcon from "../../../images/common/ico_move_type02.png";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

function SummaryList(props) {

    return <div key={props.passageId} className="col depth-02">
        <a>
            <span className="dragHandle drag-type01 ui-sortable-handle">
                <img src={innerDragHandleIcon} alt="inner drag handle"/>
            </span>
            <span>{props.itemNo}</span>
            <span className="tit">
                  <div className="txt">
                      {props.largeChapterName}
                      {props.mediumChapterName}
                      {props.smallChapterName}
                      {props.topicChapterName}
                  </div>
                  <div className="tooltip-wrap">
                    <button className="btn-tip"></button>
                  </div>
            </span>
            <span>{props.questionFormName === '5지 선택' ? '객관식' : '주관식'}</span>
            <span>{props.difficultyName}</span>
        </a>
    </div>

}

export default SummaryList;
