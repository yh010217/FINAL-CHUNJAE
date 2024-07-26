
import ListModal from "./ListModal";
import {useState} from "react";

function VIEWTOP({itemList, onReSearch}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [chapterName, setChapterName] = useState([]); // 단원명 그룹화해서 담을 애

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = "unset";
    };
    // itemList에 있는 largeChapterName, mediumChapterName, smallChapterName 그룹화해서 하나만 뽑아와야 함

    /** 그룹화 */
    const groupedData = itemList.reduce((acc, item, index) => {
        let groupKey = null;
        if (item.examId !== null) {
            groupKey = item.examId;
        }

        const groupIndex = acc.findIndex(group => group.groupKey === groupKey);
        if (groupIndex === -1) {
            acc.push({
                groupKey,
                items: [{ ...item, index: index + 1 }]
            });
        } else {
            acc[groupIndex].items.push({ ...item, index: index + 1 });
        }

        return acc; // 여기서 acc를 반환해야 합니다.
    }, []); // 초기값을 빈 배열로 설정합니다.

    console.log(groupedData, "그룹화 값 확인하기")


    return <>
        <div className="view-top">
            <div className="paper-info">
                <span>수학</span>
                선생님 이름
            </div>

            {/** 신규 시험지 만들기시 활성화 / 선택한 시험지 선택시 비활성화 **/}
            <button className="btn-default btn-research" onClick={onReSearch}>
                <i className="research"></i>재검색
            </button>
            <button onClick={openModal} className="btn-default pop-btn">출제범위</button>
            <ListModal
                data={groupedData}
                open={modalOpen}
                onClose={closeModal}
            />

        </div>
    </>
}

export default VIEWTOP;