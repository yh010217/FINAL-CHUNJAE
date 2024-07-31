import SIMLARLIST from "./SIMLARLIST";
import {useEffect, useState} from "react";
import axios from "axios";
import React from "react";

function YESLIST({no, similar, addToChangeList, setRemove, remove, setModal, setItemId, changeList}) {
    let [option, setOption] = useState(false);
    const [activeOption, setActiveOption] = useState('');
    const options = ['상', '중', '하'];
    const [view, setView] = useState('');

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

        setView(difficultyCode);
    };

    const simRemove = async (itemId) => {
        await setRemove(prevRemove => [...prevRemove, itemId]); // 두 개 이상 넣을 때 안 됨 => 함수형 업데이트 사용하기
    }


    /** 유사 문제 API 불러오기 */
    const [response, setResponse] = useState([])
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

    useEffect(() => {
        fetchData();
    }, [similar, remove]); // similar 값이나 remove 배열이 변경될 때마다 호출

    /** 그룹화 */
    const groupedData = response.reduce((acc, item, index) => {
        let groupKey = null;
        if(item.passageId !== null) {
            groupKey = item.passageId
        } else {
            groupKey = item.itemId
        }

        const groupIndex = acc.findIndex(group => group.groupKey === groupKey); // 기존 그룹 인덱스 확인
        if (groupIndex === -1) {
            acc.push({
                groupKey,
                items: [{...item, index: index + 1}]
            });
        } else {
            acc[groupIndex].items.push({...item, index: index + 1});
        }
        return acc;
    }, []);

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
            <>
                {insert ? (
                    <div key="no-data" className="view-que-list no-data" dangerouslySetInnerHTML={{ __html: insert }} />
                ) : (
                    <SIMLARLIST
                        groupedData={groupedData}
                        list={simRemove}
                        addToChangeList={addToChangeList}
                        view={view}
                        setModal={setModal}
                        setItemId={setItemId}
                        changeList={changeList}
                        no={no}
                    />
                )}
            </>
        </div>
    </>
}

export default YESLIST