import React from 'react'
import { useState } from 'react'
import Match from './Match';

const [showMore, setShowMore] = useState(false);

function MatchOuter(props) {
  return (
    <div>
    <button> Here </button>
    <Match />
    </div>
  )
}

export default MatchOuter