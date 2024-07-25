function S3header(){

    const handleClose=()=>{
        window.close();
    }

    return <>
        <ul className="title">
            <li>STEP 1 단원선택</li>
            <li>STEP 2 문항 편집</li>
            <li className="active">STEP 3 시험지 저장</li>
        </ul>
        <button type="button" onClick={handleClose} className="del-btn"></button>
    </>
}
export default S3header;