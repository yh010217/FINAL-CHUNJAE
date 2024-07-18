
import React, {useEffect} from 'react';

function CNTLIST({changeList, setSimilar, setTab, setNo, viewType, userSort, tab, setChangeId, setNo2, groupedItems, removeList}) {

    const similarData = (itemIdList, no, passageId, no2) => {
        setSimilar(itemIdList); // itemId 얻어오기
        setTab(1); // 탭 1로 이동
        setNo(no); // no 뽑아오기 => 유사문제에서 출력
        setChangeId(passageId) // 해당하는 passageId
        setNo2(no2) // 뽑아오기
    };

    /** 삭제하기 버튼 누르기 */
    const deletePage = (item) => {
        setTab(2); // 삭제하기 탭으로 이동

        /*const itemDelItem = { // 옮길 애들...
            itemId: item.itemId,
            itemNo: item.itemNo,
            difficultyName: item.difficultyName,
            questionFormName: item.questionFormName,
            questionUrl: item.questionUrl,
            explainUrl: item.explainUrl,
            answerUrl: item.answerUrl,
            mediumChapterName: item.mediumChapterName,
            smallChapterName: item.smallChapterName,
            topicChapterName: item.topicChapterName,
            passageId: item.passageId,
            passageUrl: item.passageUrl
        }*/

        removeList(item);
    }

    // 객관식, 주관식 구분
    const multipleChoiceForms = ['5지 선택', '단답 무순형', '자유 선지형'];

    // 단원순 정렬
    const sortByChapter=(list)=>{
        return list.sort((a,b)=>{
            if(a.largeChapterName !== b.largeChapterName){
                return a.largeChapterName.localeCompare(b.largeChapterName);
            }else if(a.mediumChapterName !== b.mediumChapterName){
                return a.mediumChapterName.localeCompare(b.mediumChapterName);
            }else if(a.smallChapterName !== b.smallChapterName){
                return a.smallChapterName.localeCompare(b.smallChapterName);
            }else {
                return a.topicChapterName.localeCompare(b.topicChapterName)
            }
        });
    };
    // 난이도순 정렬
    const sortByDifficulty=(list)=>{
        return list.sort((a,b)=>{
            return a.difficultyName.localeCompare(b.difficultyName);
        });
    };
    // 문제 형태순 정렬
    const sortByQuestionForm=(list)=>{
        return list.sort((a,b)=>{
            if (multipleChoiceForms.includes(a.questionFormName)
                && !multipleChoiceForms.includes(b.questionFormName)){
                return -1;
            }else if(!multipleChoiceForms.includes(a.questionFormName)
                && multipleChoiceForms.includes(b.questionFormName)){
                return 1;
            }else{
                return 0;
            }
        });
    };
    // 정렬된 리스트
    const getSortedList=()=>{
        let sortedList = [...changeList];

        switch (userSort){
            case '단원순':
                sortedList = sortByChapter(sortedList);
                break;
            case '난이도순' :
                sortedList = sortByDifficulty(sortedList);
                break;
            case '문제 형태순' :
                sortedList = sortByQuestionForm(sortedList);
                break;
            default:
                sortedList = changeList;
                break;
        }
        // setChangeList
        return sortedList;
    }

    const sortedList = getSortedList();

    return (
        <div className="view-que-list scroll-inner">

            {sortedList.map((item, index) => {
                const passageId = item.passageId && (groupedItems[item.passageId] || []).length > 0 ? item.passageId : 'individual';
                const isFirstItemInGroup = passageId !== 'individual' && groupedItems[passageId]?.[0]?.itemId === item.itemId;
                // console.log(passageId);

                return (
                    <React.Fragment key={item.itemId}>
                        {isFirstItemInGroup && (
                            <div className="view-que-box">
                                <div className="que-top">
                                    <div className="title">
                                        <span className="num">
                                            {groupedItems[passageId].length-(groupedItems[passageId].length-1)} ~ {groupedItems[passageId].length}
                                        </span>
                                    </div>
                                </div>
                                <div className="view-que">
                                    <div className="que-content">
                                        <p className="txt">※</p>
                                    </div>
                                    <div className="que-bottom">
                                        <div className="passage-area">
                                            <img src={groupedItems[passageId][0].passageUrl} alt="지문"></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="view-que-box">
                            <div className="que-top">
                                <div className="title">
                                    <span className="num">{item.itemNo}</span>
                                    <div className="que-badge-group">
                                        <span className="que-badge">{item.difficultyName}</span>
                                        <span className="que-badge gray">
                                            {multipleChoiceForms.includes(item.questionFormName) ? '객관식' : '주관식'}
                                        </span>
                                    </div>
                                </div>

                                <div className="btn-wrap">
                                    <button className="btn-error">
                                    </button>
                                    <button className="btn-delete"
                                        onClick={() => deletePage(item)}
                                    ></button>
                                </div>
                            </div>
                            <div className="view-que">
                                <div>
                                    <img src={item.questionUrl} alt="문제"></img>
                                </div>
                                {viewType !== '문제만 보기' && (
                                    <div className="que-bottom">
                                        {viewType === '문제+해설+정답 보기' && (
                                            <div className="data-area">
                                                <div className="que-info">
                                                    <p className="answer">
                                                        <span className="label">해설</span>
                                                    </p>
                                                    <div className="data-answer-area">
                                                        <img src={item.explainUrl} alt="해설"></img>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {(viewType === '문제+해설+정답 보기' || viewType === '문제+정답 보기') && (
                                            <div className="data-area type01">
                                                <div className="que-info">
                                                    <p className="answer">
                                                        <span className="label type01">정답</span>
                                                    </p>
                                                    <div className="data-answer-area">
                                                        <img src={item.answerUrl} alt="정답"></img>
                                                    </div>
                                                </div>
                                                <button
                                                    className="btn-similar-que btn-default"
                                                    onClick={() => similarData(item.itemId, index)}
                                                >
                                                    <i className="similar"></i>
                                                    유사문제
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {viewType === '문제만 보기' &&(
                                    <div className="que-bottom">

                                            <div className="data-area type01">

                                                <button
                                                    className="btn-similar-que btn-default"
                                                    onClick={() => similarData(item.itemId, index)}
                                                >
                                                    <i className="similar"></i>
                                                    유사문제
                                                </button>
                                            </div>
                                    </div>
                                )}
                            </div>
                            <div className="que-info-last">
                                <p className="chapter">
                                    {item.largeChapterName} > {item.mediumChapterName} > {item.smallChapterName} > {item.topicChapterName}
                                </p>
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default CNTLIST;