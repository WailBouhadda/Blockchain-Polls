import React from 'react'
import Pollslist from './pollslist/Pollslist'
import Pollsdetails from './pollsdetails/Pollsdetails'
import '../../index.css'
const Content = ({polls, setPolls, handleSelectPoll, pollSelected, setPollSelected, handleVote,  chartCon, setChartCon, isLoading, setIsLoading}) => {
  
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
       
        />
        <Pollsdetails 
          polls = {polls}
          setPolls = {setPolls}
          handleSelectPoll={handleSelectPoll}
          pollSelected={pollSelected}
          handleVote={handleVote}
          chartCon={chartCon}
          setChartCon={setChartCon}
        />
    </div>
  )
}

export default Content