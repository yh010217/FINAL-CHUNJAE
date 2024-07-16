function VIEWTOP({itemList}){
    return <>
        <div className="view-top">
            <div className="paper-info">
                <span>수학</span>
                선생님 이름
            </div>
            {/** 신규 시험지 만들기시 활성화 / 편집하기 선택시 비활성화 **/}
            <button className="btn-default btn-research">
                <i className="research"></i>재검색
            </button>
            <button className="btn-default pop-btn">출제 범위</button>
        </div>
    </>
}
export default VIEWTOP;