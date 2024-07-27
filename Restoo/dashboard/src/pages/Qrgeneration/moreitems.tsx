import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

interface Item {
  shortName: string;
  section: string;
}

const MoreItemsPage: React.FC = () => {
  // Generate up to 15 items dynamically
  const items: Item[] = Array.from({ length: 15 }, (_, index) => ({
    shortName: `Item ${index + 1}`,
    section: `Section ${index + 1}`,
  }));

  return (
    <DefaultLayout>
       <div>
      

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="bg-slate-500 p-14 shadow-md rounded-md text-white"
            >
              <div className="font-bold">{item.shortName} :</div>
              <div className="text-sm">{item.section}</div>
            </div>
          ))
        ) : (
          <div>No items available</div>
        )}
      </div>
    </div>
    </DefaultLayout>
   
  );
};

export default MoreItemsPage;
