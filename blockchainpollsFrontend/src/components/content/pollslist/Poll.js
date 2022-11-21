import React from 'react'

const Poll = ({polls, poll, handleSelectPoll, voter, setVoter}) => {

    
  return (
    
    <div className='card mb-4' onClick={() => handleSelectPoll(polls[poll.id].id)}>
        <div className='poll-img'>
            <img className='img-fluid' src={poll.image} />
        </div>
        <div className='card-body'>
            <p className='card-text text-truncate'>
                {poll.question}
            </p>
            <div className='d-flex justify-content-between'>
                <small className='text-muted'> Votes : {polls[poll.id].results.reduce((accumulator, value) => {return accumulator + value; }, 0)}</small>
                {voter.votedPolls !== undefined && voter.votedPolls.length && voter.votedPolls.find(votedId => votedId === poll.id) !== undefined && <small className='badge bg-success'>Voted</small>}
            </div>
        </div>
    </div>
  )
}

export default Poll