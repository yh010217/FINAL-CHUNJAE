import React, {useState} from 'react';

function ListModal({ open, onClose, data }) {

    if (!open) return null;
    console.log(data, "그룹화 제대로 했따")

    return (
        <>
            <div className="dim" style={{ display: 'block' }}></div>
            <div className="pop-wrap scope-type" data-pop="que-scope-pop" style={{ display: 'block' }}>
                <div className="pop-inner">
                    <div className="pop-header" style={{ justifyContent: 'center' }}>
                        <span>과목</span>
                        <button type="button" onClick={onClose} className="pop-close" />
                    </div>
                    <div className="pop-content scroll-inner" style={{ overflow: 'scroll' }}>
                        <div className="scope-wrap">
                            {data.map((item, index) => (
                                <ul key={index}>
                                    <h3>{item.largeChapterName}</h3> {/* 대단원 이름 출력 */}
                                    <li>
                                        <h4>{item.mediumChapterName}</h4> {/* 중단원 이름 출력 */}
                                        {Object.entries(item.smallChapters)
                                            .sort((a, b) => a[0].localeCompare(b[0])) // 1번부터 출력되게 고정
                                            .map(([smallChapterName, smallItems]) => (
                                                <span key={smallChapterName}> {/* key를 span에 설정 */}
                                                    <React.Fragment>
                                                        {smallChapterName}
                                                    </React.Fragment>
                                                </span>
                                            ))}
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListModal