import {Link} from "react-router-dom";

function S2stepbtn({paramType, subjectId}){

    const handlePrevBtn = () => {
        if(paramType === 'new'){
            window.location.href = `/step1/select-chapter/${subjectId}`;
        }else if (paramType === 'edit'){
            window.location.href = `/step0/${subjectId}`;
        }
    }

    return <>
        {paramType === 'new' && (
            <button type="button" onClick={handlePrevBtn} className="btn-step">STEP 1 단원 선택</button>
        )}
        {paramType === 'edit' && (
            <button type="button" onClick={handlePrevBtn} className="btn-step">출제 방법 선택</button>
        )}
        <Link to="/step3"><button type="button" className="btn-step next">STEP 3 시험지 저장</button></Link>
    </>
}
export default S2stepbtn;