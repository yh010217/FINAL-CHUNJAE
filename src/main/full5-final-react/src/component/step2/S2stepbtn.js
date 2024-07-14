import {Link} from "react-router-dom";

function S2stepbtn(){
    return <>
        <button type="button" className="btn-step">STEP 1 단원 선택</button>
        <Link to="/step3"><button type="button" className="btn-step next">STEP 3 시험지 저장</button></Link>
    </>
}
export default S2stepbtn;