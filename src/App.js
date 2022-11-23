import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginModal from "./components/Modal/LoginModal";
import NavigationBar from "./components/NavigationBar/NavigationBar";
// import AddProperties from "./components/Properties/AddProperties";
import PropertiesDetails from "./components/Properties/PropertiesDetails";
import PropertiesList from "./components/Properties/PropertiesList";
// import HomePage from "./pages/HomePage";

function App() {
  const apiUrl = "https://ironrest.cyclic.app/properties/";
  const [isAdmin,setIsAdmin] = useState(false)
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="App">
      <NavigationBar isAdmin={isAdmin} setShowLogin={setShowLogin} apiUrl={apiUrl} />
      <LoginModal  showLogin={showLogin} setShowLogin={setShowLogin} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
      <Routes>
      {/* Mantive o componente PropertiesList na raiz para teste, até que a HomePage fique pronta. */}
        <Route path="/" element={<PropertiesList apiUrl={apiUrl}/>}/>
        {/* <Route path="/" element={<HomePage apiUrl={apiUrl} body={body} setBody={setBody}/>} /> */}
        <Route path="/properties/:id" element={<PropertiesDetails isAdmin={isAdmin} apiUrl={apiUrl} />}/>
        {/* <Route path="/add-properties" element={<AddProperties apiUrl={apiUrl} body={body} setBody={setBody}/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
