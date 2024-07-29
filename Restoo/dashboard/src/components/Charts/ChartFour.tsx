import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
    width: 300,  
    height: 300, 
  },
  colors: ['#16A34A', '#EF4444'],
  labels: ['Positive Feedback', 'Negative feedback'],
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 400,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartFour: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [70, 30],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [70, 30],
    }));
  };
  handleReset;

  return (
    <div className="sm:px-6 col-span-8 rounded-xl px-4 pb-4 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5 bg-white">
    

      <div className="mb-5">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-3 flex flex-col items-center justify-center gap-y-3 ">
        <div className="sm:w-3/4 w-full px-6">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-green-400"></span>
            <p className="flex w-full justify-between text-sm font-medium text-green-400 dark:text-white">
              <span>70%</span>
              <span>Positive Feedback</span>
            </p>
          </div>
        </div>
        <div className="sm:w-3/4 w-full px-6">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-red-600"></span>
            <p className="flex w-full justify-between text-sm font-medium text-red-600 dark:text-white">
              <span>30%</span>
              <span>Negative Feedback</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartFour;
