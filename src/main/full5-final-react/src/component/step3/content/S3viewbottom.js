import S3topform from "./S3topform";
import S3typeform from "./S3typeform";
import S3tab from "./S3tab";

function S3viewbottom({setSave, save}) {
    return <>
        <div className="top-form">
            <S3topform
                save={save}
                setSave={setSave}
            />
        </div>

        <div className="type-form">
            <S3typeform/>
        </div>

        <div className="tab-list-type01">
            <S3tab/>
        </div>
    </>
}

export default S3viewbottom