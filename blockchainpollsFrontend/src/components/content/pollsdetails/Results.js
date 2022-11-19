import React from 'react'
import Chart from "react-apexcharts";
import { useState } from 'react';

const Results = ({polls, setPolls, pollSelected, handleVote, chartCon, setChartCon}) => {


  return (
    <div id='poll-results'>
        <h1 className='mb-5'>{pollSelected.question}</h1>
        <Chart
              options={chartCon.options}
              series={chartCon.series}
              type="bar"
              width="80%"
            />
    </div>
  )
}

export default Results