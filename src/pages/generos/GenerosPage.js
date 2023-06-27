import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./GenerosPage.css";
import Table from "../components/Table";


function GenerosPage() {
  return (
    <div>
      <Table type="generos"></Table>
    </div>
  );
}

export default GenerosPage;
