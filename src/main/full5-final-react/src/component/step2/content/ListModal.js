import React from 'react';

function ListModal({ open, onClose, data}) {
    if (!open) return null;

    return <>
        <div className="dim" style={{display:'block'}}></div>
        <div className="pop-wrap scope-type" data-pop="que-scope-pop" style={{display:'block'}}>
            <div className="pop-inner">
                <div className="pop-header" style={{justifyContent:'center'}}>
                    <span>과목</span>
                    <button type="button" onClick={onClose} className="pop-close"/>
                </div>
                <div className="pop-content scroll-inner" style={{overflow:'scroll'}}>
                    <div className="scope-wrap">
                        <ul>
                            {data[0].largeChapterName}
                            <li>
                                {data[0].mediumChapterName}
                                <span>{data[0].smallChapterName}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ListModal