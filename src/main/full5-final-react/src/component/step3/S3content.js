import S3viewtop from "./content/S3viewtop";
import S3viewbottom from "./content/S3viewbottom";

function S3content({paper, subjectId, onChangeTitle}) {
    return <div className="view-box">

        <div className="view-top">
            <S3viewtop paper={paper} subjectId={subjectId}/>
        </div>

        <div className="view-bottom type02 scroll-inner">
            <S3viewbottom paper={paper} onChangeTitle={onChangeTitle}/>
        </div>

    </div>
}

export default S3content;