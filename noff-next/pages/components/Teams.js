import React from "react";
import Champ from "./Champ.js";
import "@/styles/Teams.css";

function Teams() {
  return (
    <div className="team-wrapper">
        <ul className="blue-team">
            <Champ/>
            <Champ/>
            <Champ/>
            <Champ/>
            <Champ/>
        </ul>
        <ul className="red-team">
            <Champ/>
            <Champ/>
            <Champ/>
            <Champ/>
            <Champ/>
        </ul>
    </div>
  )
}

export default Teams