import React from 'react'

const Poll = ({polls, poll, handleSelectPoll, pollSelected, setPollSelected}) => {
    const index = polls.findIndex(po => {return po.id === poll.id});
  return (
    
    <div className='card mb-4' onClick={() => handleSelectPoll(polls[index].id)}>
        <div className='poll-img'>
            <img className='img-fluid' src={poll.image} />
        </div>
        <div className='card-body'>
            <p className='card-text text-truncate'>
                {poll.question}
            </p>
            <div className='d-flex justify-content-between'>
                <small className='text-muted'> Votes : {polls[index].results.reduce((accumulator, value) => {return accumulator + value; }, 0)}</small>
                {polls[index].voted && <small className='badge bg-success'>Voted</small>}
            </div>
        </div>
    </div>
  )
}

export default Poll