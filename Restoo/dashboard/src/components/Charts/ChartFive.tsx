import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  chart: {
    height: 350,
    type: 'line',
    width: '100%',
  },
  forecastDataPoints: {
    count: 10,
  },
  stroke: {
    width: 5,
    curve: 'smooth',
  },
  colors: ['#00FF00'], 
  xaxis: {
    type: 'datetime',
    categories: [
      '1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000',
      '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000',
      '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001',
      '4/11/2001', '5/11/2001', '6/11/2001'
    ],
    tickAmount: 10,
    labels: {
      formatter: function(value, timestamp, opts) {
        return opts.dateFormatter(new Date(timestamp), 'dd MMM');
      }
    }
  },
  title: {
    text: 'Rating Breakdown',
    align: 'left',
    style: {
      fontSize: '16px',
      color: '#666'
    }
  },
  fill: {
    gradient: {
      shade: 'dark',
      shadeIntensity: 1,
      type: 'horizontal',
    }
  }
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartFive: React.FC = () => {
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Sales',
        data: [10, 20, 30, 40, 20, 10, 20, 20, 10, 20, 30, 40, 20, 10, 20],
      },
    ],
  });

  return (
    <div className="col-span-6 rounded-xl shadow-3 border border-stroke bg-white px-5 pt-7.5 pb-5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="line"
            height={350}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartFive;
