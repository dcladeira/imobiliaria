import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginModal from "./components/Modal/LoginModal";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import AddProperties from "./components/Properties/AddProperties";
import Properties from "./components/Properties/PropertiesList";
import HomePage from "./pages/HomePage";

function App() {
  const apiUrl = "https://ironrest.cyclic.app/properties/";
  const [isAdmin,setIsAdmin] = useState(false)
  const [showLogin, setShowLogin] = useState(false);


  return (
    <div className="App">
      <NavigationBar isAdmin={isAdmin} setShowLogin={setShowLogin}/>
      <LoginModal  showLogin={showLogin} setShowLogin={setShowLogin} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
      <Routes>
        <Route path="/" element={<HomePage apiUrl={apiUrl}/>} />
        <Route path="/properties" element={<Properties apiUrl={apiUrl}/>} />
        <Route path="/add-properties" element={<AddProperties apiUrl={apiUrl}/>} />
        <Route path="/add-properties" element={<AddProperties apiUrl={apiUrl}/>} />
        <Route path="/add-properties" element={<AddProperties apiUrl={apiUrl}/>} />
      </Routes>
    </div>
  );
}

export default App;
