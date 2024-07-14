import React, {useState, useEffect} from 'react';

function CNTBOTTOM({changeList}) {
    const [upperCount, setUpperCount] = useState(0);
    const [middleCount, setMiddleCount] = useState(0);
    const [lowerCount, setLowerCount] = useState(0);

    useEffect(() => {
        /** 상중하 개수 계산 **/
        const upperCount = changeList.filter(item => item.difficultyName === '상').length;
        const middleCount = changeList.filter(item => item.difficultyName === '중').length;
        const lowerCount = changeList.filter(item => item.difficultyName === '하').length;

        setUpperCount(upperCount);
        setMiddleCount(middleCount);
        setLowerCount(lowerCount);
    }, [changeList]);

    return <div className="bottom-box">
        <div className="que-badge-group type01">
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
        <p className="total-num">총<span>{changeList.length}</span>문제</p>
    </div>

}

export default CNTBOTTOM;
