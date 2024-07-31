import ListModal from "./ListModal";
import {useEffect, useState} from "react";
import axios from "axios";

function VIEWTOP({itemList, subjectId}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [response, setResponse] = useState('');

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = "unset";
    };

    /** 그룹화 */
    const groupedData = itemList.reduce((acc, item, index) => {
        let groupKey = null;
        let largeChapterName = null;
        let mediumChapterName = null;

        if (item.examId !== null) {
            groupKey = item.examId;
            largeChapterName = item.largeChapterName;
            mediumChapterName = item.mediumChapterName;
        }

        const groupIndex = acc.findIndex(group => group.groupKey === groupKey);

        if (groupIndex === -1) {
            acc.push({
                groupKey,
                largeChapterName,
                mediumChapterName,
                smallChapters: {} // 소단원 그룹화 초기화
            });
        }

        const currentGroup = acc[groupIndex === -1 ? acc.length - 1 : groupIndex];

        const smallChapterName = item.smallChapterName || '기타'; // 소단원이 없으면 '기타'로 설정

        if (!currentGroup.smallChapters[smallChapterName]) {
            currentGroup.smallChapters[smallChapterName] = []; // 소단원 배열 초기화
        }

        currentGroup.smallChapters[smallChapterName].push({ ...item, index: index + 1 });

        return acc;
    }, []); // 초기값을 빈 배열로 설정

    const handleSubject = async () => {
        try {
            const url = '/api/chapter/chapter-list';

            const data = {
                subjectId: subjectId
            };

            const respData = await axios.post(url, data);

            let subjectName = respData.data.chapterList.map(item => item.subjectName);
            setResponse(subjectName[0] || '');


        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    };

    /** 재검색 기능 핸들러 **/
    const handleResearch = () => {
        window.location.reload();
    };

    useEffect(() => {
        handleSubject()
    }, [subjectId])

    return (
        <>
            <div className="view-top">
                <div className="paper-info">
                    <span>{response}</span>
                </div>

                {/** 신규 시험지 만들기시 활성화 / 선택한 시험지 선택시 비활성화 **/}
                <button className="btn-default btn-research" onClick={handleResearch}>
                    <i className="research"></i>재검색
                </button>
                <button onClick={openModal} className="btn-default pop-btn">출제범위</button>
                <ListModal data={groupedData} open={modalOpen} onClose={closeModal}/>
            </div>
        </>
    );
}

export default VIEWTOP;