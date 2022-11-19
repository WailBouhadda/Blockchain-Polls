import React from 'react'
import Pollslist from './pollslist/Pollslist'
import Pollsdetails from './pollsdetails/Pollsdetails'
import '../../index.css'
const Content = ({polls, setPolls, handleSelectPoll, pollSelected, handleVote,  chartCon, setChartCon}) => {
  
  return (
    <div className='d-flex mt-5'>
        <Pollslist 
          polls = {polls}
          setPolls = {setPolls}
          handleSelectPoll={handleSelectPoll}
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