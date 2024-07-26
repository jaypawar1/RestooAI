import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className=" rounded-xl border border-stroke bg-white py-5 px-5 shadow-default dark:border-strokedark dark:bg-boxdark flex items-center gap-5">
      <div className="flex items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>
      <div className=" flex flex-col items-start justify-around">
        <span className="text-l text-black font-medium  mb-3">{title}</span>
        <div className='mb-3'>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
        </div>
        <span
          className={`flex items-center gap-1 text-sm font-medium ${levelUp && 'text-meta-3'
            } ${levelDown && 'text-meta-5'} `}
        >
          {rate}
        </span>
      </div>
      <div>


      </div>
    </div>
  );
};

export default CardDataStats;
