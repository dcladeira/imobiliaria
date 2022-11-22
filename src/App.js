import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PropertiesDetails from "./components/Properties/PropertiesDetails";
import PropertiesList from "./components/Properties/PropertiesList";
import AddProperties from "./components/Properties/AddProperties";
import NavigationBar from "./components/NavigationBar/NavigationBar";

function App() {
  const apiURL = "https://ironrest.cyclic.app/properties/";

  const [body, setBody] = useState({
    code: "",
    title: "",
    description: "",
    type: "",
    transaction: "",
    state: "",
    city: "",
    neighborhood: "",
    address: "",
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    amenities: {
      swimming: false,
      concierge: false,
      gourmet: false,
      parking: false,
    },
    photos: [],
  });

  return (
    <div className="App">
      <NavigationBar apiURL={apiURL} body={body} setBody={setBody}/>
      <Routes>
        <Route
          path="/"
          element={
            <PropertiesList apiURL={apiURL} body={body} setBody={setBody} />
          }
        />
        <Route
          path="/properties/:id"
          element={
            <PropertiesDetails apiURL={apiURL} body={body} setBody={setBody} />
          }
        />
        <Route
          path="/cadastrar"
          element={
            <AddProperties apiURL={apiURL} body={body} setBody={setBody} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
