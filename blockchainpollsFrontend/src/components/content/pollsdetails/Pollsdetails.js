import React from 'react'
import Vote from './Vote'
import Results from './Results'
import { useState } from 'react'


const Pollsdetails = ({polls, setPolls, handleSelectPoll, pollSelected, handleVote, chartCon, setChartCon, voter, setVoter}) => {


    return (
    <div className='container h-100 ml-4'>
      {pollSelected ? 
        (
          
          voter.votedPolls !== undefined && voter.votedPolls.length && voter.votedPolls.find(votedId => votedId === pollSelected.id) !== undefined ? 
          (
            
            <Results 
            polls = {polls}
            setPolls = {setPolls}
            pollSelected={pollSelected}
            handleVote={handleVote}
            chartCon={chartCon}
            setChartCon={setChartCon}
          />
        
          ):(
            <Vote
            polls = {polls}
            setPolls = {setPolls}
            pollSelected={pollSelected}
            handleVote={handleVote}
            
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