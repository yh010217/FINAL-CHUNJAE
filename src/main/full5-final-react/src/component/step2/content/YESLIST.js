import SIMLARLIST from "./SIMLARLIST";
import { useEffect, useState } from "react";
import axios from "axios";

function YESLIST({no, similar}) {
    let [option, setOption] = useState(false);
    const [activeOption, setActiveOption] = useState('');
    const options = ['상', '중', '하'];

    const toggleMenu = () => {
        setOption(!option);
    };
    const handleOptionClick = (option) => {
        setActiveOption(option);
        setOption(false);
    };

    const [response, setResponse] = useState([]);

    /** 유사 문제 API 불러오기 */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = '/api/item-img/similar-list';
                const data = {
                    itemIdList: [similar]
                };
                const response = await axios.post(url, data);
                setResponse(response.data.itemList);
            } catch (error) {
                console.error('API 호출 오류:', error);
            }
        };

        fetchData();
    }, [similar]); // similar 값이 변경될 때마다 호출

    return <>
        <div className="contents on">
            <div className="cnt-top">
                <span className="title">{no}번 유사문제</span>
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
            <div className="view-que-list scroll-inner">
                {response.map((item) => (
                    <SIMLARLIST itemId={item.itemId} itemNo={item.itemNo} difficultyName={item.difficultyName} questionFormName={item.questionFormName} questionUrl={item.questionUrl} explainUrl={item.explainUrl} answerUrl={item.answerUrl} largeChapterName={item.largeChapterName} mediumChapterName={item.mediumChapterName} smallChapterName={item.smallChapterName} topicChapterName={item.topicChapterName}/>
                ))}
            </div>
        </div>
    </>
}

export default YESLIST