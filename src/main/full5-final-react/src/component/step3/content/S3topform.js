import {useState} from "react";

function S3topform({onChangeTitle}){

    const [title, setTitle] = useState('');

    const saveTitle = (e) => {
        setTitle(e.target.value);
        onChangeTitle(e.target.value);
        // console.log(e.target.value);
    };

    return <>
        <div className="left-wrap">
            <span>시험지명</span>
            <div className="search-wrap">
                <div className="search-box">
                    <input type="text"
                           placeholder="시험지명을 입력해주세요.(최대 20자)"
                           className="search"
                           value={title}
                           onChange={saveTitle}
                    />
                </div>
            </div>
        </div>
    </>
}

export default S3topform;