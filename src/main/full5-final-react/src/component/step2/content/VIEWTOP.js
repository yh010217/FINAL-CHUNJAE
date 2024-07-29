import ListModal from "./ListModal";
import {useEffect, useState} from "react";
import axios from "axios";

function VIEWTOP({itemList, onReSearch, paramType, subjectId}) {

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
                <button className="btn-default btn-research" onClick={onReSearch}>
                    <i className="research"></i>재검색
                </button>
                <button onClick={openModal} className="btn-default pop-btn">출제범위</button>
                <ListModal data={itemList} open={modalOpen} onClose={closeModal}/>
            </div>
        </>
    );
}

export default VIEWTOP;