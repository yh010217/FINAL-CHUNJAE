import React from "react";
import innerDragHandleIcon from "../../../images/common/ico_move_type02.png";

function SummaryList({
                         itemId,
                         index,
                         difficultyName,
                         questionFormName,
                         largeChapterName,
                         mediumChapterName,
                         smallChapterName,
                         topicChapterName,
                         dragHandleProps,
                         multipleChoiceForms,
                         isSingleItem
                     }) {
    return (
        <div key={itemId} className="col depth-02">
            <a className="goIndex" href={"#" + index}>
                {isSingleItem ? ( // single-item일 때 처리
                    <>
                        <span
                            {...dragHandleProps}
                            className="dragHandle drag-type01 ui-sortable-handle"
                            style={{ visibility: 'hidden' }} // 드래그 핸들 숨기기
                        >
                            <img src={innerDragHandleIcon} alt="inner drag handle" />
                        </span>
                        <span>{index}</span>
                        <span className="tit">
                            <div className="txt">
                                {largeChapterName}
                                {mediumChapterName}
                                {smallChapterName}
                                {topicChapterName}
                            </div>
                            <div className="tooltip-wrap">
                                <button className="btn-tip"></button>
                                <div className="tooltip type01">
                                    <div className="tool-type01">
                                        {largeChapterName}
                                        {mediumChapterName}
                                        {smallChapterName}
                                        {topicChapterName}
                                    </div>
                                </div>
                            </div>
                        </span>
                        <span>{multipleChoiceForms.includes(questionFormName) ? '객관식' : '주관식'}</span>
                        <span>{difficultyName}</span>
                    </>
                ) : (
                    <>
                        <span
                            {...dragHandleProps}
                            className="dragHandle drag-type01 ui-sortable-handle"
                        >
                            <img src={innerDragHandleIcon} alt="inner drag handle" />
                        </span>
                        <span>{index}</span>
                        <span className="tit">
                            <div className="txt">
                                {largeChapterName}
                                {mediumChapterName}
                                {smallChapterName}
                                {topicChapterName}
                            </div>
                            <div className="tooltip-wrap">
                                <button className="btn-tip"></button>
                                <div className="tooltip type01">
                                    <div className="tool-type01">
                                        {largeChapterName}
                                        {mediumChapterName}
                                        {smallChapterName}
                                        {topicChapterName}
                                    </div>
                                </div>
                            </div>
                        </span>
                        <span>{multipleChoiceForms.includes(questionFormName) ? '객관식' : '주관식'}</span>
                        <span>{difficultyName}</span>
                    </>
                )}
            </a>
        </div>
    );
}

export default SummaryList;
