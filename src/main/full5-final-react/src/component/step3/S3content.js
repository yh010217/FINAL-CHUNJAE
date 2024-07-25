import S3viewtop from "./content/S3viewtop";
import S3viewbottom from "./content/S3viewbottom";

function S3content({setSave, save}) {

    return <div className="view-box">

        <div className="view-top">
            <S3viewtop/>
        </div>

        <div className="view-bottom type02 scroll-inner">
            <S3viewbottom
                save={save}
                setSave={setSave}
            />
        </div>

    </div>
}

export default S3content;