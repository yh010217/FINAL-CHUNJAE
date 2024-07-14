import {Link} from "react-router-dom";

function S3stepbtn(){
    return <>
        <Link to="/step2"><button className="btn-step">STEP 2 문항 편집</button></Link>
        <Link><button className="btn-step next">시험지 저장하기</button></Link>
    </>
}
export default S3stepbtn;