import './App.css';
import Head from './components/head/Head';
import Content from './components/content/Content';
import './css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import requests from './requests';

function App() {




  const API_URL = 'http://localhost:3500/polls';
  const [fetchErr, setFetchErr] = useState(null);

  const [polls, setPolls] = useState([]);
  const [pollSelected, setPollSelected] = useState()

  const [isLoading, setIsLoading] = useState(true);
  

  const [newPoll, setNewPoll] = useState({
    id: 0,
    question : '',
    image : '',
    results : [0,0,0],
    options : ['','','']
  });



  /** ###########   Chart state ############## */

  const [chartCon, setChartCon] = useState(
    {
      series: [{
          data: []
        }],
        options: {
          chart: {
            height: 350,
            type: 'bar',
            events: {
              click: function(chart, w, e) {
                // console.log(chart, w, e)
              }
            }
          },
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: [],
            labels: {
              style: {
                fontSize: '12px'
              }
            }
          }
        },
  }

  )

    /** ###########   Chart state ############## */


     /** ###########   Polls state ############## */

   /** ###########   Polls state ############## */

    useEffect(() => {

      const fetchpolls = async () => {
        try{
            const response = await fetch(API_URL);
            if(!response.ok) throw Error('Did not recieve the data ');
            const listPolls = await response.json();
            setPolls(listPolls);
            setFetchErr(null);
        }catch(err){
          setFetchErr(err.message);
        }finally{
          setIsLoading(false);
        }

      }

      setTimeout(() => {
        fetchpolls();
      }, 1000)

      
    }, [])

     /** ###########   new state ############## */


  
     /** ###########   new state ############## */


  const addPoll = async (poll) => {

    const id = polls.length ? polls[polls.length - 1].id + 1 : 1;
    const myNewPoll = {id, question: poll.question, image: poll.image, results: poll.results, options: poll.options, voted: false};

    const listPolls = [...polls, myNewPoll];
    setPolls(listPolls);

    const postPoll = {
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(myNewPoll)
    }
    const result = await requests(API_URL, postPoll);
    if (result) setFetchErr(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newPoll) return;
    addPoll(newPoll);
    setNewPoll(newPoll => ({
                      ...newPoll,
                      id: 0,
                    question : '',
                    image : '',
                    results : [0,0,0],
                    options : ['','',''],
                    voted : false  
                    }));
  }

     /** ###########   poll Selected state ############## */



    /** ###########   poll Selected state ############## */


  const handleSelectPoll = (id) => {

    const poll = polls.find(poll => poll.id === id);
    const selected = {id: id, question: poll.question, image: poll.image, results: poll.results, options: poll.options, voted: poll.voted};

    const newChart = {
                        series: [{
                            data: selected.results
                          }],
                          options: {
                            chart: {
                              height: 350,
                              type: 'bar',
                              events: {
                                click: function(chart, w, e) {
                                  // console.log(chart, w, e)
                                }
                              }
                            },
                            plotOptions: {
                              bar: {
                                columnWidth: '45%',
                                distributed: true,
                              }
                            },
                            dataLabels: {
                              enabled: false
                            },
                            legend: {
                              show: false
                            },
                            xaxis: {
                              categories: selected.options,
                              labels: {
                                style: {
                                  fontSize: '12px'
                                }
                              }
                            }
                          },
                    }

    
    setPollSelected(selected);
    setChartCon(newChart);
    
  }


  const handleVote =  (e) => {
    
    [].forEach.call(e.target.elements, async function(ele) {
        if (ele.checked) {
          const index = polls.findIndex(poll => {
            return poll.id === pollSelected.id;
          });
          const Upolls = [...polls];
          const Uselected ={...pollSelected};

          Upolls[index].results[ele.value] += 1;
          Upolls[index].voted = true;

          Uselected.voted = true;
          setPollSelected(Uselected);
          setPolls(Upolls);
          
        const updatePoll = {
          method: 'PATCH',
          headers:{
            'Content-type': 'application/json'
          },
          body: JSON.stringify(Upolls[index])
        }
  
        const updateURL = `${API_URL}/${Upolls[index].id}`;
  
        const result = await requests(updateURL, updatePoll);
        if (result) setFetchErr(result);

        }

      });
      e.preventDefault();

  }

  return (
    <div className="App">
      <Head 
        newPoll={newPoll}
        setNewPoll={setNewPoll}
        handleSubmit={handleSubmit}
      />
      {fetchErr && <p style={{color : 'red', textAlign: 'center'}}>{`Error : ${fetchErr}`}</p>}

      {!fetchErr && <Content 
        polls={polls}
        setPolls={setPolls}
        handleSelectPoll={handleSelectPoll}
        pollSelected={pollSelected}
        setPollSelected={setPollSelected}
        handleVote={handleVote}
        chartCon={chartCon}
        setChartCon={setChartCon}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      }
    </div>
  );
}

export default App;
