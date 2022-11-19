import React from 'react'
import Vote from './Vote'
import Results from './Results'
import { useState } from 'react'


const Pollsdetails = ({polls, setPolls, handleSelectPoll, pollSelected, handleVote, chartCon, setChartCon}) => {

    return (
    <div className='container pollsDetails'>
      {pollSelected ? 
        (
          pollSelected.voted === false ? 
          (
            
            <Vote
              polls = {polls}
              setPolls = {setPolls}
              pollSelected={pollSelected}
              handleVote={handleVote}
            />
          ):(
            <Results 
              polls = {polls}
              setPolls = {setPolls}
              pollSelected={pollSelected}
              handleVote={handleVote}
              chartCon={chartCon}
              setChartCon={setChartCon}
            />
          )
        ):(
          null
        )
      }
    </div>
  )
}

export default Pollsdetails