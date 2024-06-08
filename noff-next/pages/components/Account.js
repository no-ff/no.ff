import React, { useState } from 'react'
import axios from 'axios'

/**
 * Displays account information.
 */
function Account({ initialState }) {
  const [state, setState] = useState(
    initialState
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2>Rank: {state["rank"].join(' ')}</h2>
        <p>Win Rate: {state["wr"].join('% / ')}</p>
        <p>Summoner ID: {state["sumId"]}</p>
        <p>PUUID: {state["puuid"]}</p>
        <p>Level: {state["level"]}</p>
        <p>Icon: {state["icon"]}</p>
      </div>
    </div>
  )
}

export default Account;