import React, { useState, useEffect } from "react";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import NavBarComponent from "./components/NavBarComponent";

function GenerosPage() {
 
  return (
    <div>
      <HeaderComponent />
      <NavBarComponent />
      <FooterComponent />
    </div>
  );
}

export default GenerosPage;
