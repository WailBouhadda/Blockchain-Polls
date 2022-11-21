import './App.css';
import Head from './components/head/Head';
import Content from './components/content/Content';
import './css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import requests from './requests';
import Web3 from 'web3';
import { init, call, executeTransaction, selectedaccount } from './Blockchain/web3Client';
import { creatPoll, vote, getPolls, normalizePoll, normalizeVoter } from './pollService';

function App() {


  useEffect(() => {
    init();
  }, [])



  /*####### */


  const [voter, setVoter] = useState({});

  const [fetchErr, setFetchErr] = useState(null);

  const [polls, setPolls] = useState([]);
  const [pollSelected, setPollSelected] = useState();

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


    useEffect(() => {

      const fetchvoters = async () => {
        try{
            let voter = await call("getVoter", selectedaccount);
            const voterNormalized = normalizeVoter(voter);
            setVoter(voterNormalized);
            setFetchErr(null);
          
        }catch(err){
            setFetchErr(err.message);
        }finally{
            setIsLoading(false);
        }
      }
      fetchvoters();
      
    }, [])
  
     /** ###########   Polls state ############## */

   /** ###########   Polls state ############## */

    useEffect(() => {

      const fetchpolls = async () => {
        try{
            
            let totalPolls = await call("getTotalPolls");
            let voter = await call("getVoter", selectedaccount);
            let pollsList = [];
            for(let i = 0; i < totalPolls; i++){
              let poll = await call("getPoll", i);
              const pollnormalized = normalizePoll(poll);
              pollsList.push(pollnormalized);
              
            }
            const voterNormalized = normalizeVoter(voter);
            setVoter(voterNormalized);
            setPolls(pollsList);
            setFetchErr(null);

        }catch(err){
          setFetchErr(err.message);
        }finally{
          setIsLoading(false);
        }

      }
        fetchpolls();
      
    }, [])

     /** ###########   new state ############## */


  
     /** ###########   new state ############## */


  const addPoll = async (poll) => {

    const id = polls.length ? polls[polls.length - 1].id + 1 : 1;
    const myNewPoll = {id, question: poll.question, image: poll.image, results: poll.results, options: poll.options, voted: false};
    creatPoll(myNewPoll);
    const listPolls = [...polls, myNewPoll];
    setPolls(listPolls);

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
                    options : ['','',''] 
                    }));
  }

     /** ###########   poll Selected state ############## */



    /** ###########   poll Selected state ############## */


  const handleSelectPoll = (id) => {

    const poll = polls.find(poll => poll.id === id);
    const selected = {id: id, question: poll.question, image: poll.image, results: poll.results, options: poll.options};

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
    
    e.preventDefault();
    [].forEach.call(e.target.elements, async function(ele) {
        if (ele.checked) {
          vote(pollSelected.id, parseInt(ele.value));

          const Upolls = [...polls];
          const Uselected ={...pollSelected};
          const Uvoter = {...voter};
          Uvoter.votedPolls.push(pollSelected.id);

          Upolls[pollSelected.id].results[ele.value] += 1;
          setVoter(Uvoter);
          setPollSelected(Uselected);
          setPolls(Upolls);
       /*    
        const updatePoll = {
          method: 'PATCH',
          headers:{
            'Content-type': 'application/json'
          },
          body: JSON.stringify(Upolls[pollSelected.id])
        }
  
        const updateURL = `${API_URL}/${pollSelected.id}`;
  
        const result = await requests(updateURL, updatePoll);
        if (result) setFetchErr(result);


        const updateVoter = {
          method: 'PATCH',
          headers:{
            'Content-type': 'application/json'
          },
          body: JSON.stringify(Uvoter)
        }
  
        const updateURLV = `${API_URLV}/${voter.id}`;
  
        const result1 = await requests(updateURLV, updateVoter);
        if (result1) setFetchErr(result1);
 */
        }

      });

  }

  return (
    <div className="App d-flex flex-column h-100">
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
        voter={voter}
        setVoter={setVoter}
      />
      }
    </div>
  );
}

export default App;
