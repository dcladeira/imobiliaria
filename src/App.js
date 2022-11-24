import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginModal from "./components/Modal/LoginModal";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import AddProperties from "./components/Properties/AddProperties";
import HomePage from "./pages/HomePage";
import PropertiesDetails from "./components/Properties/PropertiesDetails";

function App() {
  const apiUrl = "https://ironrest.cyclic.app/properties/";
  const [isAdmin,setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="App">
      <NavigationBar isAdmin={isAdmin} setIsAdmin={setIsAdmin} setShowLogin={setShowLogin} apiUrl={apiUrl} />
      <LoginModal  showLogin={showLogin} setShowLogin={setShowLogin} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
      <Routes>
        <Route path="/" element={<HomePage apiUrl={apiUrl}/>} />
        <Route path="/properties/:id" element={<PropertiesDetails isAdmin={isAdmin} apiUrl={apiUrl} />}/>
        <Route path="/register" element={<AddProperties apiUrl={apiUrl}/>}/>
      </Routes>
    </div>
  );
}

export default App;
