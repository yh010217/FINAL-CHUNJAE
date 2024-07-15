import SIMLARLIST from "./SIMLARLIST";
import {useEffect, useState} from "react";
import axios from "axios";

export const groupedData = (response) => {
    return response.reduce((acc, item) => {
        const {passageId} = item;
        if (passageId !== undefined) {
            if (!acc[passageId]) {
                acc[passageId] = [item];
            } else {
                acc[passageId].push(item);
            }
        }
        return acc;
    }, {});
};

function YESLIST({no, similar, addToChangeList, setRemove, remove, ChangeList}) {
    let [option, setOption] = useState(false);
    const [activeOption, setActiveOption] = useState('');
    const options = ['상', '중', '하'];

    const toggleMenu = () => {
        setOption(!option);
    };

    const handleOptionClick = (option) => {
        let difficultyCode;
        switch (option) {
            case '상':
                difficultyCode = '01';
                break;
            case '중':
                difficultyCode = '02';
                break;
            case '하':
                difficultyCode = '03';
                break;
            default:
                difficultyCode = '';
        }
        setActiveOption(option);
        setOption(false);
    };

    const removeList =(itemId)=> {
        setRemove([...remove, itemId]); // spread 연산자를 사용하여 배열에 추가
    }

    /** 유사 문제 API 불러오기 */
    const [response, setResponse] = useState([]);
    const [insert, setInsert] = useState('')

    const fetchData = async () => {
        try {
            const url = '/api/item-img/similar-list';
            const data = {
                itemIdList: [similar]
            };

            if (remove.length > 0) {
                data.excludeCode = remove;
            }

            const response = await axios.post(url, data);
            setResponse(response.data.itemList);

            if (data.itemIdList.length === 1 && response.data.itemList.length === 0) {
                setInsert('<div>유사 문제가 없습니다.</div>');
            } else {
                setInsert('');
            }

        } catch (error) {
            console.error('API 호출 오류:', error);
        }
    };

    console.log(groupedData(response))

    useEffect(() => {
        fetchData();
    }, [similar, remove]); // similar 값이나 remove 배열이 변경될 때마다 호출

    return <>
        <div className="contents on">
            <div className="cnt-top">
                <span className="title">{no + 1}번 유사문제</span>
                <div className="right-area">
                    <div className="select-wrap">
                        <button onClick={toggleMenu} className={`select-btn ${option ? 'active' : ''}`}>
                            {activeOption || '난이도 선택'}
                        </button>
                        {option && (
                            <ul className="select-list">
                                {options.map((opt, index) => (
                                    <li key={index} onClick={() => handleOptionClick(opt)}>
                                        <a>{opt}</a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/** 리스트 */}
            <div>
                {insert ? (
                    <div className="view-que-list no-data" dangerouslySetInnerHTML={{ __html: insert }} />
                ) : (
                    <div className="view-que-list scroll-inner">
                        {response.map((item) => (
                            <SIMLARLIST
                                key={item.itemId}
                                itemId={item.itemId}
                                itemNo={item.itemNo}
                                difficultyName={item.difficultyName}
                                questionFormName={item.questionFormName}
                                questionUrl={item.questionUrl}
                                explainUrl={item.explainUrl}
                                answerUrl={item.answerUrl}
                                largeChapterName={item.largeChapterName}
                                mediumChapterName={item.mediumChapterName}
                                smallChapterName={item.smallChapterName}
                                topicChapterName={item.topicChapterName}
                                passageUrl={item.passageUrl}
                                passageId={item.passageId}
                                list={removeList}
                                addToChangeList={addToChangeList}
                                ChangeList={ChangeList}
                                response={response}
                                groupedData={groupedData}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    </>
}

export default YESLIST