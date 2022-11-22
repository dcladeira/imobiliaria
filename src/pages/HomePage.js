import React, { useState } from "react";
import HomePageHeader from "../components/Header/HomePageHeader";
import Properties from "../components/Properties/PropertiesList";

function HomePage({ apiUrl, setIsAdmin, showLogin, setShowLogin }) {

const [filter, setFilter] = useState({
        city: "",
        state: "",
        transaction: "venda",
        numberOfRooms: "",
        numberOfBathrooms: "",
        minValue: "0",
        maxValue: "",
        amenities:{
            "swimming": false,
            "concierge": false,
            "gourmet": false,
            "parking": false
        }
      });
    

  return <div>

    <HomePageHeader apiUrl={apiUrl} filter={filter} setFilter={setFilter}/>

    <Properties apiUrl={apiUrl} filter={filter} setFilter={setFilter} />


  </div>;
}

export default HomePage;

