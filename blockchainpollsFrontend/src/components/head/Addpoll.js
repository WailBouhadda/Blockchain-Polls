import React from 'react'

const Addpoll = ({newPoll, setNewPoll, handleSubmit}) => {



  return (

    <form className='container p-3' onSubmit={handleSubmit}>
        <div className='mb-3 row'>
            <label htmlFor="question" className='col-sm-2 col-form-label'>Question :</label>
            <div className='col-sm-10'>
            <input type="text" placeholder='Question' required  className='form-control' id="question"
                value={newPoll.question}
                onChange={(e) => setNewPoll(newPoll => ({...newPoll,question: e.target.value}))}
            />
            </div>
        </div>
        <div className='mb-3 row'>
            <label htmlFor="image" className='col-sm-2 col-form-label'>Image :</label>
            <div className='col-sm-10'>
            <input type="text" className='form-control' id="image" placeholder='Img url'
                value={newPoll.image}
                onChange={(e) => setNewPoll(newPoll => ({...newPoll,image: e.target.value}))}
            />
            </div>
        </div>
        <div className='mb-3 row'>
            <label htmlFor="option1" className='col-sm-2 col-form-label'>Options :</label>
            <div className='col-sm-10'>
            <input type="text" className='form-control' id="option1" placeholder='Option 1'  required
                value={newPoll.options[0]}
                onChange={(e) => setNewPoll(newPoll => ({...newPoll,options: [e.target.value, newPoll.options[1], newPoll.options[2]]}))}
            />
            </div>
        </div>
        <div className='mb-3 row'>
            <label htmlFor="option2" className='col-sm-2 col-form-label'></label>
            <div className='col-sm-10'>
            <input type="text" className='form-control' id="option2" placeholder='Option 2' required
                value={newPoll.options[1]}
                onChange={(e) => setNewPoll(newPoll => ({...newPoll,options: [newPoll.options[0], e.target.value, newPoll.options[2]]}))}
            />
            </div>
        </div>
        <div className='mb-3 row'>
            <label htmlFor="option3" className='col-sm-2 col-form-label'></label>
            <div className='col-sm-10'>
            <input type="text" className='form-control' id="option3" placeholder='Option 3' required
                value={newPoll.options[2]}
                onChange={(e) => setNewPoll(newPoll => ({...newPoll,options: [newPoll.options[0], newPoll.options[1], e.target.value]}))}
            />
            </div>
        </div>
        <div className='d-flex justify-content-end'>
            <button type="submit" className='btn btn-dark '>Add</button>
        </div>
    </form>
  )
}

export default Addpoll;