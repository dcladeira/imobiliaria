import React, { useState } from "react";
import HomePageHeader from "../components/Header/HomePageHeader";

function HomePage({ apiUrl, setIsAdmin, showLogin, setShowLogin }) {
  return <div>

    <HomePageHeader apiUrl={apiUrl}/>


  </div>;
}

export default HomePage;

