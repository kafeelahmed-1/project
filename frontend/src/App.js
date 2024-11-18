import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
// import MaterialTableComponent from "./table";
import CustomTable1 from "./newtable";

// import CustomTable from "./service";

function App() {
  return (
    <div className="App">

      
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CustomizedTables" element={<CustomTable1 />} />{" "}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
