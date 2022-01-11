import Pay from "./Pay";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

const App = ()=>{
    return(
        <Router>
            <Routes>
            <Route path="/pay" element={<Pay />} />
                <Route path="/success">
                    <Success/>
                </Route> 
            </Routes>
        </Router>
    );
};
export default App;