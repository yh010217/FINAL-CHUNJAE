import {Link} from 'react-router-dom';
function S3stepbtn({save}){

    let save_name = save; // 시험지 저장명

    return <>
        <Link to="/step2"><button className="btn-step">STEP 2 문항 편집</button></Link>
        {/*<Link><button onClick={handleSavePdf} className="btn-step next">시험지 저장하기</button></Link>*/}
        <form action="http://localhost:8080/save" method="post">
            <input type="hidden" name="saveName" value={save_name}/>
            {/*<input type="hidden" name="paperData" value={itemList}/>*/}
            <button className="btn-step next">시험지 저장하기</button>
        </form>
    </>
}
export default S3stepbtn;


/*
* 시험지 저장 이름
* 시험지 제목
* 시험지 데이터(이미지 등)
*
* */