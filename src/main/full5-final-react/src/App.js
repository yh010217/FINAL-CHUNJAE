import "./css/common.css"
import "./css/font.css"
import "./css/reset.css"
import {useState} from "react";
import STEP2 from "./component/step2/STEP2";
import STEP3 from "./component/step3/STEP3";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function App() {

    /** STEP 0, 1 에서 REST GET 받아오기 **/

    /** STEP 2 만든 시험지 저장하는 곳 **/
    let [paper, setPaper] = useState([]);

    const handlePaper = (newPaper) => {
        // console.log(newPaper);
        setPaper(newPaper);
    }

    return <>
        <BrowserRouter>
            <Routes>
                {/** STEP 2 **/}
                <Route path={'/step2'} element={<STEP2 handlePaper={handlePaper}/>}></Route>
                {/** STEP 3 **/}
                <Route path={'/step3'} element={<STEP3 paper={paper}/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
}

export default App;
