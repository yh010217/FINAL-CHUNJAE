import {useEffect, useState} from "react";
import axios from "axios";
import VIEWTOP from "./content/VIEWTOP";
import VIEWBOTTOM from "./content/VIEWBOTTOM";

function S2content({setModal, setItemId, handlePaper, paramType, getData, getSubjectId}) {
    const [itemList, setItemList] = useState([]);
    const [subjectId, setSubjectId] = useState();

    const fetchItemList = async () => {
        try {

            let url ='';
            let getUrl = '';
            let data ={};
            if (paramType === 'edit') {

                //getUrl = 'http://10.41.1.61:8080/step0/examId'
                //getUrl = 'http://localhost:8080/step0/examId'
                getUrl = '/step0/examId'
                const responseGet = await axios.get(getUrl);
                let examId = responseGet.data.examIdList.map(item=>item);

                data = {
                    examIdList: examId
                };

                url = '/api/item-img/exam-list/item-list'
                const responsePost = await axios.post(url, data);

                let i = 1;
                let indexList = responsePost.data.itemList.map(item=>{

                    item.index = i;
                    i++;
                    return item;
                })
                setItemList(indexList);
                setSubjectId(getData);
                getSubjectId(getData);

            }else if(paramType === 'new'){
                url = 'http://10.41.1.61:8080/step1/step2-data/'+getData
                url = 'http://localhost:8080/step1/step2-data/'+getData
                url = '/step1/step2-data/'+getData

                const response = await axios.post(url, data);

                let i = 1;
                let indexList = response.data.itemList.map(item=>{

                    item.index = i;
                    i++;
                    return item;
                })
                setItemList(indexList);

                let subjectId = response.data.subjectId;
                setSubjectId(subjectId);
                getSubjectId(subjectId);

                console.log(subjectId);
            }else if(paramType == null){
                console.log('paramType is null');
            }

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
            <VIEWTOP itemList={itemList} onReSearch={handleItemList} paramType={paramType} subjectId={subjectId}/>
            {/** 문제 목록, 문제 요약, 유사, 삭제 **/}
            <VIEWBOTTOM itemList={itemList} setModal={setModal} setItemId={setItemId} handlePaper={handlePaper}/>
        </div>
    );
}

export default S2content;
