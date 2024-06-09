import React, { useState } from 'react'
import axios from 'axios'

/**
 * Displays account information.
 */
function Account(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px'}}>
      <div>
        <h2>Rank: {props.state["rank"].join(' ')}</h2>
        <p>W/L: {props.state["wr"][0]}/{props.state["wr"][1]}</p>
        <p>Summoner ID: {props.state["sumId"]}</p>
        <p>PUUID: {props.state["puuid"]}</p>
        <p>Level: {props.state["level"]}</p>
        <p>Icon: {props.state["icon"]}</p>
      </div>
    </div>
  )
}

export default Account;