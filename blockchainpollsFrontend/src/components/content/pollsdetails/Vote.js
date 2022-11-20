import React from 'react'

function Vote({polls, setPolls, pollSelected, handleVote}) {

    const enableButton = () => {
        document.getElementById("subBtn").disabled = false;
    } 
    console.log(pollSelected.id)
    console.log(pollSelected.voted)
  return (
    <form className='form-check' onSubmit={(e) => (handleVote(e,pollSelected.id))}>  
        <h1 className='mb-5' >{pollSelected.question}</h1>
        {pollSelected.options.map(option => 
        (
            <div className='form-check m-2' onChange={enableButton} key={pollSelected.options.indexOf(option)}>
                <input className='form-check-input' type="radio" name="iput" id={option} value={pollSelected.options.indexOf(option)}  />
                <label className='form-check-label' htmlFor={option}>
                    {option}
                </label>
            </div>
        ))}
        <div className='d-flex justify-content-start m-2'>
            <button type="submit" disabled id='subBtn' className='btn btn-dark '>Vote</button>
        </div>
    </form>
  )
}

export default Vote