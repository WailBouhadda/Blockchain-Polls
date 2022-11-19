import './App.css';
import Head from './components/head/Head';
import Content from './components/content/Content';
import './css/bootstrap.min.css'
import { useState } from 'react';

function App() {


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

  const [polls, setPolls] = useState(
                JSON.parse(localStorage.getItem('pollsList')) ?
                (JSON.parse(localStorage.getItem('pollsList'))
                ):(
                    [{
                      id: 1,
                      question : 'Fill',
                      image : 'https://neilpatel.com/wp-content/uploads/fly-images/120099/AB-Testing4-1200x675-c.png',
                      results : [0,0,0],
                      options : ['Yes','No','Maybe'],
                      voted: true
                    }]
                )
                );

   /** ###########   Polls state ############## */


if(!localStorage.getItem('pollsList')){
    localStorage.setItem('pollsList',JSON.stringify(polls));
}

     /** ###########   new state ############## */


  const [newPoll, setNewPoll] = useState({
    id: 0,
    question : '',
    image : '',
    results : [0,0,0],
    options : ['','','']
  });

     /** ###########   new state ############## */


  const addPoll = (poll) => {

    const id = polls.length ? polls[polls.length - 1].id + 1 : 1;
    const myNewPoll = {id, question: poll.question, image: poll.image, results: poll.results, options: poll.options, voted: false};

    const listPolls = [...polls, myNewPoll];
    setPolls(listPolls);
    localStorage.setItem('pollsList',JSON.stringify(listPolls));

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


  const [pollSelected, setPollSelected] = useState()

    /** ###########   poll Selected state ############## */


  const handleSelectPoll = (id) => {

    const poll = polls.find(poll => poll.id === id);
    const selected = {id: poll.id, question: poll.question, image: poll.image, results: poll.results, options: poll.options, voted: poll.voted};

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


  const handleVote = (e) => {

    e.preventDefault();
    [].forEach.call(e.target.elements, function(ele) {
        if (ele.checked) {
          const index = polls.findIndex(poll => {
            return poll.id === pollSelected.id;
          });
          polls[index].results[ele.value] += 1;
          polls[index].voted = true;
          setPolls(polls);
          localStorage.setItem('pollsList',JSON.stringify(polls));
        }
    });
  }

  return (
    <div className="App">
      <Head 
        newPoll={newPoll}
        setNewPoll={setNewPoll}
        handleSubmit={handleSubmit}
      />
      <Content 
        polls={polls}
        setPolls={setPolls}
        handleSelectPoll={handleSelectPoll}
        pollSelected={pollSelected}
        handleVote={handleVote}
        chartCon={chartCon}
        setChartCon={setChartCon}
      />
    </div>
  );
}

export default App;
