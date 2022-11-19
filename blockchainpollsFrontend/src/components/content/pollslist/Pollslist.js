import React from 'react'
import { NavItem } from 'react-bootstrap'
import Poll from './Poll'


const Pollslist = ({polls, setPolls, handleSelectPoll}) => {
  return (
      <div className='container  w-50'>

        {polls.map((poll) => (
          
          <Poll
              poll={poll}
              key={poll.id}
              handleSelectPoll={handleSelectPoll}
          />

        ))}
     
      </div>

  )
}

export default Pollslist