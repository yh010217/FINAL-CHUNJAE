import S3topform from "./S3topform";
import S3typeform from "./S3typeform";
import S3tab from "./S3tab";

function S3viewbottom({paper, onChangeTitle}) {
    return <>
        <div className="top-form">
            <S3topform onChangeTitle={onChangeTitle}/>
        </div>

        <div className="type-form">
            <S3typeform paper={paper}/>
        </div>

        <div className="tab-list-type01">
            <S3tab paper={paper}/>
        </div>
    </>
}

export default S3viewbottom