import React, { useState } from "react";
import HomePageHeader from "../components/Header/HomePageHeader";
import PropertiesList from "../components/Properties/PropertiesList";

function HomePage({ apiUrl, setIsAdmin, showLogin, setShowLogin }) {

const [filter, setFilter] = useState({
        city: "",
        state: "",
        type: "",
        transaction: "",
        bedrooms: "",
        bathrooms: "",
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

    <PropertiesList apiUrl={apiUrl} filter={filter} setFilter={setFilter} />


  </div>;
}

export default HomePage;

