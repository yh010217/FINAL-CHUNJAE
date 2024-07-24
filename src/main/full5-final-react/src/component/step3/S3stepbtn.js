import {Link } from 'react-router-dom';
import axios from "axios";
import {useState} from "react";
function S3stepbtn(){

    const [loading, setLoading] = useState(false);

    const handleSavePdf = () => {
        setLoading(true);

        const dataToSend = {
            // 전송할 데이터
            data : 'abcdefg'
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // CORS 요청에 필요한 옵션
        };

        axios.post('http://localhost:8080/save', dataToSend, config)
            .then(response => {
                console.log('PDF 생성 요청 완료:', response.data);
                // 서버에서 PDF 생성 완료 후 페이지 4로 이동 처리
                window.location.href = '/page4'; // 페이지 4로 이동
            })
            .catch(error => {
                console.error('PDF 생성 요청 오류:', error);
                setLoading(false);
                // 오류 처리
            });
    };

    const loadingFn = () => {
        window.location.href = '/step2';
    }

    return <>
        <Link to="/step2"><button className="btn-step">STEP 2 문항 편집</button></Link>
        <Link><button onClick={handleSavePdf} className="btn-step next">시험지 저장하기</button></Link>
        {loading && (
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
        )}
    </>
}
export default S3stepbtn;