import {useEffect, useState, useMemo} from "react";

function S3typeform({paper}){
    const [upperCount, setUpperCount] = useState(0);
    const [middleCount, setMiddleCount] = useState(0);
    const [lowerCount, setLowerCount] = useState(0);
    const [multipleCount, setMultipleCount] = useState(0);
    const [subjectiveCount, setSubjectiveCount] = useState(0);

    const multipleChoiceForms = useMemo(() => ['5지 선택', '단답 무순형', '자유 선지형'], []);
    const subjectiveForms = useMemo(() => ['단답 유순형', '서술형'], []);

    useEffect(() => {
        /** 상중하 개수 계산 **/
        const upperCount = paper.filter(item => item.difficultyName === '상').length;
        const middleCount = paper.filter(item => item.difficultyName === '중').length;
        const lowerCount = paper.filter(item => item.difficultyName === '하').length;

        const multipleCount = paper.filter(item => multipleChoiceForms.includes(item.questionFormName)).length;
        const subjectiveCount = paper.filter(item => subjectiveForms.includes(item.questionFormName)).length;

        setMultipleCount(multipleCount);
        setSubjectiveCount(subjectiveCount);

        setUpperCount(upperCount);
        setMiddleCount(middleCount);
        setLowerCount(lowerCount);
    }, [paper]);

    return <>
        <div className="left-wrap">
            <span className="tit">난이도</span>
            <div className="que-badge-group">
                <div className="que-badge-wrap">
                    <span className="que-badge purple">하</span>
                    <span className="num">{lowerCount}</span>
                </div>
                <div className="que-badge-wrap">
                    <span className="que-badge green">중</span>
                    <span className="num">{middleCount}</span>
                </div>
                <div className="que-badge-wrap">
                    <span className="que-badge yellow">상</span>
                    <span className="num">{upperCount}</span>
                </div>
            </div>
        </div>

        <div className="right-wrap">
            <span className="tit">문제 형태</span>
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
    </>
}

export default S3typeform;