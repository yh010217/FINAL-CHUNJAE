import YESLIST from "./YESLIST";
import NOLIST from "./NOLIST";

function SIMILAR({changeList, similar, no, addToChangeList, setRemove, remove, setModal, setItemId}) {
    return (

        /** 값이 있으면 YesList, 없으면 NoList 호출하기*/
        <>
            {similar ? (
                <YESLIST no={no}
                         similar={similar}
                         addToChangeList={addToChangeList}
                         setRemove={setRemove}
                         remove={remove}
                         setModal={setModal}
                         setItemId={setItemId}
                         changeList={changeList}
                />
            ) : (
                <NOLIST />
            )}
        </>
    );
}

export default SIMILAR;
