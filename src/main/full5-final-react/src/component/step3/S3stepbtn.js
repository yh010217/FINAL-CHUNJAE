import {Link } from 'react-router-dom';
import axios from "axios";
import {useState, useEffect} from "react";
function S3stepbtn(){

    const [loading, setLoading] = useState(false);


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
                    examIdList: ["503"]
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

    let dataList = {
        name: '제목!',
        paper: itemList
    }

    console.log(dataList)


    const handleSavePdf = () => {
        const queryParams = new URLSearchParams(dataList).toString();
        window.location.href = `http://localhost:8080/save_paper?${queryParams}`;
        /*setLoading(true);

        const dataToSend = {
            // 전송할 데이터
            data : 'abcdefg'
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };

        axios.post('http://localhost:8080/save_paper', dataToSend, config)
            .then(response => {
                console.log('PDF 생성 요청 완료:', response.data);
                // 서버에서 PDF 생성 완료 후 페이지 4로 이동 처리
                // window.location.href = '/page4'; // 페이지 4로 이동
                window.location.href = response.data.redirectUrl;
            })
            .catch(error => {
                console.error('PDF 생성 요청 오류:', error);
                setLoading(false);
                // 오류 처리
            });*/
    };

    return <>
        <Link to="/step2"><button className="btn-step">STEP 2 문항 편집</button></Link>
        <Link><button onClick={handleSavePdf} className="btn-step next">시험지 저장하기</button></Link>
        {/*{loading && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                // backgroundColor: 'blue',
            }}>
                <iframe src="http://localhost:8080/loading"
                        style={{ width: '100%', height: '100%', border: 'none',
                            zIndex: 9999}} />
            </div>
        )}*/}
    </>
}
export default S3stepbtn;