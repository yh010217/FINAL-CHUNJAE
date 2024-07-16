import { useEffect, useState } from "react";
import axios from "axios";
import VIEWTOP from "./content/VIEWTOP";
import VIEWBOTTOM from "./content/VIEWBOTTOM";

function S2content() {
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        const List = async () => {
            try {

                /** 시험지 편집하기 **/
                /** STEP 0 api 20번 **/
                const url = '/api/item-img/exam-list/item-list'

                /** STEP 0 에서 넘겨주는 examIdList  **/
                const data = {
                    // 영어, 수학
                    // examIdList: ["1416", "1534"]
                    // 국어
                    examIdList: ["500"]
                    // examIdList: ["1534"]
                };

                /** 신규 시험지 만들기 **/
                /** STEP 1 -> STEP 2 api 5번 **/

                const response = await axios.post(url, data);
                // console.log(response.data.itemList);
                setItemList(response.data.itemList);

            } catch (error) {
                console.error('Error response api .... ', error)
            }
        };
        List();
    }, []);

    return (
        <div className="view-box">
            {/** 시험지 정보 / 과목 명칭(선생님 이름) / 재검색 / 출제범위 **/}
            <VIEWTOP itemList={itemList}/>
            {/** 문제 목록, 문제 요약, 유사, 삭제 **/}
            <VIEWBOTTOM itemList={itemList}/>
        </div>
    );
}

export default S2content;
