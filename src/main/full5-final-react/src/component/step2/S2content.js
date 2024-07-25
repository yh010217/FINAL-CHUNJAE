import { useEffect, useState } from "react";
import axios from "axios";
import VIEWTOP from "./content/VIEWTOP";
import VIEWBOTTOM from "./content/VIEWBOTTOM";

function S2content({setModal, setItemId, handlePaper }) {
    const [itemList, setItemList] = useState([]);

    const fetchItemList = async () => {
        try {

            /** 시험지 편집하기 **/
            /** STEP 0 api 20번 **/
            const url = '/api/item-img/exam-list/item-list'

            /** STEP 0 에서 넘겨주는 examIdList  **/
            const data = {
                // 영어
                // examIdList: ["1416"]
                // 국어
                // examIdList: ["503"]
                // 수학
                // examIdList: ["1534"]
                // ?
                // examIdList: ["356"]
                // 세계사
                 // examIdList: ["545"]
                examIdList: ["1416", "503", "1534", "356", "545", "666"]
            };

            /** 신규 시험지 만들기 **/
            /** STEP 1 -> STEP 2 api 5번 **/

            const response = await axios.post(url, data);
            // console.log(response.data.itemList);
            let i = 1;
            let indexList = response.data.itemList.map(item=>{

                item.index = i;
                i++;
                return item;
            })
            setItemList(indexList);

            // setItemList(response.data.itemList);

        } catch (error) {
            console.error('Error response api .... ', error)
        }
    };

    useEffect(() => {
        fetchItemList();
    }, []);

    /** 재검색 기능 핸들러 (신규 시험지인 경우에만) **/
    const handleItemList = () => {
        fetchItemList();
    };

    return (
        <div className="view-box">
            {/** 시험지 정보 / 과목 명칭(선생님 이름) / 재검색 / 출제범위 **/}
            <VIEWTOP itemList={itemList} onReSearch={handleItemList}/>
            {/** 문제 목록, 문제 요약, 유사, 삭제 **/}
            <VIEWBOTTOM itemList={itemList} setModal={setModal} setItemId={setItemId} handlePaper={handlePaper}/>
        </div>
    );
}

export default S2content;
