import React from 'react'
import Chart from "react-apexcharts";
import { useState } from 'react';

const Results = ({polls, setPolls, pollSelected, handleVote, chartCon, setChartCon}) => {

  console.log(pollSelected.id)
    console.log(pollSelected.voted)
  return (
    <div id='poll-results'>
        <h1 className='mb-1 ms-4'>{pollSelected.question}</h1>
        <Chart
              options={chartCon.options}
              series={chartCon.series}
              type="bar"
              height="90%"
            />
    </div>
  )
}

export default Results