import React from 'react'
import { NavItem } from 'react-bootstrap'
import Poll from './Poll'


const Pollslist = ({polls, setPolls, handleSelectPoll, pollSelected, setPollSelected, isLoading, voter, setVoter}) => {
  return (
      <div className='container  w-50'>
        {isLoading && <p>Is Loading ...</p>}

        {!isLoading && polls.map((poll) => (
          <Poll
              poll={poll}
              polls={polls}
              key={poll.id}
              handleSelectPoll={handleSelectPoll}
              pollSelected={pollSelected}
              setPollSelected={setPollSelected}
              voter={voter}
              setVoter={setVoter}

          />

        ))}
     
      </div>

  )
}

export default Pollslist