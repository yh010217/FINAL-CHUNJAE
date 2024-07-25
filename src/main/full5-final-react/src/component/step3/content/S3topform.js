function S3topform({setSave, save}){

    const saveName =(event)=> {
        setSave(event.target.value)
    }

    return <>
        <div className="left-wrap">
            <span>시험지명</span>
            <div className="search-wrap">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="시험지명을 입력해주세요.(최대 20자)"
                        className="search"
                        value={save}
                        onChange={saveName}
                    />
                </div>
            </div>
        </div>
    </>
}

export default S3topform;