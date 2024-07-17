import React from "react";
import innerDragHandleIcon from "../../../images/common/ico_move_type02.png";

function SummaryList({
                         itemId,
                         itemNo,
                         difficultyName,
                         questionFormName,
                         largeChapterName,
                         mediumChapterName,
                         smallChapterName,
                         topicChapterName
                     }) {
    return (
        <div key={itemId} className="col depth-02">
            <a>
                <span className="dragHandle drag-type01 ui-sortable-handle">
                    <img src={innerDragHandleIcon} alt="inner drag handle"/>
                </span>
                <span>{itemNo}</span>
                <span className="tit">
                    <div className="txt">
                        {largeChapterName}
                        {mediumChapterName}
                        {smallChapterName}
                        {topicChapterName}
                    </div>
                    <div className="tooltip-wrap">
                        <button className="btn-tip"></button>
                    </div>
                </span>
                <span>{questionFormName === '5지 선택' ? '객관식' : '주관식'}</span>
                <span>{difficultyName}</span>
            </a>
        </div>
    );
}

export default SummaryList;
