import React from 'react'
import { useState } from 'react';
import Addpoll from './Addpoll'

const Head = ({newPoll, setNewPoll, handleSubmit}) => {

    const [show, setShow] = useState(false);
    return (
        <header className='mb-5'>
            <nav className='navbar bg-dark'>
                <div className='container-fluid'>
                    <a className='navbar-brand text-light' href="#">
                        Poll System
                    </a>
                    <button type="button" className='btn btn-light' onClick={() => setShow(!show)}>Add Poll</button>
                </div>
            </nav>
            <section className='jumpotron text-center p-5'>
                <h1>Blockchain Polls</h1>
            </section>
            {show && 
            <Addpoll 
                newPoll={newPoll}
                setNewPoll={setNewPoll}
                handleSubmit={handleSubmit}    
            /> }
        </header>
    )
}

export default Head