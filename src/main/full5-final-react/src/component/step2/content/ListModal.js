import React, {useState} from 'react';

function ListModal({ open, onClose, data }) {
    const [list, setList] = useState([]);

    if (!open) return null;

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
                                        <span>
                                            {Object.entries(item.smallChapters).map(([smallChapterName, smallItems]) => (
                                                <React.Fragment key={smallChapterName}> {/* 소단원 이름 출력 */}
                                                    {smallChapterName}
                                                </React.Fragment>
                                            ))}
                                        </span>
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