import React from 'react';

function S3tab({paper}) {
    // console.log(paper);
    const multipleChoiceForms = ['5지 선택', '단답 무순형', '자유 선지형'];

    return <>
        <div className="table">
            <div className="fix-head">
                <span>번호</span>
                <span>문제 유형</span>
                <span>문제 형태</span>
                <span>난이도</span>
            </div>

            <div className="tbody">
                <div className="scroll-inner">
                    {paper.map((item, index) => (
                        <React.Fragment key={item.itemId}>
                            <div className="col">
                                <span>{index+1}</span>
                                <span className="tit">
                            {item.largeChapterName} > {item.mediumChapterName} > {item.smallChapterName} > {item.topicChapterName}
                        </span>
                                <span>{multipleChoiceForms.includes(item.questionFormName) ? '객관식' : '주관식'}</span>
                                <span>{item.difficultyName}</span>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>

    </>
}

export default S3tab;