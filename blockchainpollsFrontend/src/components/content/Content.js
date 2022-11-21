import React from 'react'
import Pollslist from './pollslist/Pollslist'
import Pollsdetails from './pollsdetails/Pollsdetails'
import '../../index.css'
const Content = ({polls, setPolls, handleSelectPoll, pollSelected, setPollSelected, handleVote,  chartCon, setChartCon, isLoading, setIsLoading, voter, setVoter}) => {
  
  return (
    <div className='d-flex mt-5'>
        <Pollslist 
          polls = {polls}
          setPolls = {setPolls}
          handleSelectPoll={handleSelectPoll}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          pollSelected={pollSelected}
          setPollSelected={setPollSelected}
          voter={voter}
          setVoter={setVoter}
       
        />
        <Pollsdetails 
          polls = {polls}
          setPolls = {setPolls}
          handleSelectPoll={handleSelectPoll}
          pollSelected={pollSelected}
          handleVote={handleVote}
          chartCon={chartCon}
          setChartCon={setChartCon}
          voter={voter}
          setVoter={setVoter}
        />
    </div>
  )
}

export default Content