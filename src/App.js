import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import FurniturePage from "./pages/FurniturePage";
import DesignersPage from "./pages/DesignersPage";
import MyNavBar from "./components/MyNavBar";
import FurnitureDesignerList from "./components/FurnitureDesignerList";
import DesignerFurnitureList from "./components/DesignerFurnitureList";

function App() {

  return (
      <Router>
        <MyNavBar/>
        <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route path="/furniture" element={<FurniturePage/>}/>
            <Route path="/designers" element={<DesignersPage/>}/>
            <Route path="/furnituredesigner" element={<FurnitureDesignerList/>}/>
            <Route path="/designerfurniture" element={<DesignerFurnitureList/>}/>
        </Routes>
      </Router>
  );
}

export default App;
