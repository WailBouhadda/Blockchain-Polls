import React from 'react'

const Poll = ({poll, handleSelectPoll}) => {
  return (
    <div className='card mb-4' onClick={() => handleSelectPoll(poll.id)}>
        <div className='poll-img'>
            <img className='img-fluid' src={poll.image} />
        </div>
        <div className='card-body'>
            <p className='card-text text-truncate'>
                {poll.question}
            </p>
            <div className='d-flex justify-content-between'>
                <small className='text-muted'> Votes : {poll.results.reduce((accumulator, value) => {return accumulator + value; }, 0)}</small>
                {poll.voted ? <small className='badge bg-success'>Voted</small> : null}
            </div>
        </div>
    </div>
  )
}

export default Poll