import "./css/common.css"
import "./css/font.css"
import "./css/reset.css"
import {useRef, useState} from "react";
import STEP2 from "./component/step2/STEP2";
import STEP3 from "./component/step3/STEP3";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function App() {

    /** subjectId 받아오기 **/
    const [subjectId, setSubjectId] = useState('');
    const paramType = useRef('');
    console.log(subjectId);
    const getSubjectId = (getId) => {
        setSubjectId(getId);
    }

    /** STEP 2 만든 시험지 저장 **/
    let [paper, setPaper] = useState([]);

    const handlePaper = (newPaper) => {
        // console.log(newPaper);
        setPaper(newPaper);
    }

    return <>
        <BrowserRouter>
            <Routes>
                {/** STEP 2 **/}
                <Route exact path={'/step2'}
                       element={<STEP2 handlePaper={handlePaper} getSubjectId={getSubjectId}/>}></Route>
                <Route exact path={'/step2/:type/:getData'}
                       element={
                    <STEP2
                           handlePaper={handlePaper}
                           getSubjectId={getSubjectId}
                           getParamType={paramType}
                           subjectId={subjectId}
                    />
                }>
                </Route>
                {/** STEP 3 **/}
                <Route path={'/step3'}
                       element={<STEP3 paper={paper} paramType={paramType} subjectId={subjectId}/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
}

export default App;
