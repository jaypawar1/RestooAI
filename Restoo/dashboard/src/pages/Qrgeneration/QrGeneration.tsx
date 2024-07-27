import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Outlet, useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';


interface Table {
  _id: string;
  shortName: string;
  section: string;
}

const QrGeneration: React.FC = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [sectorName, setSectorName] = useState<string>('');
  const [shortName, setShortName] = useState<string>('');
  const [tables, setTables] = useState<Table[]>([]);
  const [totalTables, setTotalTables] = useState<string>('');
  const [selectTable, setSelectTable] = useState<string | undefined>();
  const [restaurantName, setRestaurantName] = useState<string>('');
  const token = localStorage.getItem('token');

  const handleOpenPopup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const url =import.meta.env.VITE_SERVER_URL;
        const response = await axios.get(`${url}/api/table`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token!,
          },
        });

        setTables(response.data.tables);
        console.log(response.data.tables);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, [token]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url =import.meta.env.VITE_SERVER_URL;
      const response = await axios.post(
        `${url}/api/table`,
        {
          sector: sectorName,
          shortName: shortName,
          totalTables: totalTables,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token!,
          },
        }
      );
      console.log('Table created:', response.data);
      handleClosePopup();
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  const handleNextClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const url =import.meta.env.VITE_SERVER_URL;
      const response = await axios.put(
        `${url}/api/table/`,
        {
          tableId: selectTable,
          table_no: totalTables,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token!,
          },
        }
      );
      navigate(`/Step2/${selectTable}`);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };
return (
    <>
      <DefaultLayout>
      <div className='mb-5'>
        <h1 className=' text-black text-3xl font-extrabold mb-4'>
          Hello! Let's Generate table <span className='text-[#4BC500]'>QR code</span> in 3 steps.
        </h1>
        <div className='font-semibold text-lg text-black'>Explanation text</div>
      </div>
      <div className='grid grid-cols-2 gap-10 '>
        <div>
          <div className='text-black font-semibold mb-1 '>Step 1:</div>
          <form className='gap-y-8 flex flex-col'>
            <div className='flex flex-col '>
              <label className="mb-3 block font-semibold text-black dark:text-white">
                Enter Restaurant name
              </label>
              <input
                type="text"
                placeholder="Name"
                className="w-[70%] rounded-lg border border-slate-500 bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>



            <div className='flex flex-col gap-2 -mt-3'>
              <div className='font-semibold  text-black'> Create your own section</div>
              <div className='grid grid-cols-3 gap-y-2 gap-x-3 w-fit'>
                {tables && tables.length > 0 ? (
                  tables.map((table, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-lg w-full h-10 p-3 flex justify-center items-center cursor-pointer ${selectTable === table._id ? 'border-blue-500' : 'border-[#4bc500]'
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectTable(table._id);
                      }}
                    >
                      <span className='  text-black font-bold'>{table.shortName} :</span>
                      <span className='text-sm text-black font-normal'>{table.section}</span>
                    </div>
                  ))
                ) : (
                  <div></div> // You can replace this with any placeholder or message you prefer
                )}
                <button
                  className='border-2 rounded-xl border-[#4bc500] w-full h-10 flex items-center justify-around'
                  onClick={handleOpenPopup}
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_666_1292" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                      <rect width="30" height="30" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_666_1292)">
                      <path d="M13.75 16.25V20C13.75 20.3542 13.8698 20.651 14.1094 20.8906C14.349 21.1302 14.6458 21.25 15 21.25C15.3542 21.25 15.651 21.1302 15.8906 20.8906C16.1302 20.651 16.25 20.3542 16.25 20V16.25H20C20.3542 16.25 20.651 16.1302 20.8906 15.8906C21.1302 15.651 21.25 15.3542 21.25 15C21.25 14.6458 21.1302 14.349 20.8906 14.1094C20.651 13.8698 20.3542 13.75 20 13.75H16.25V10C16.25 9.64583 16.1302 9.34896 15.8906 9.10938C15.651 8.86979 15.3542 8.75 15 8.75C14.6458 8.75 14.349 8.86979 14.1094 9.10938C13.8698 9.34896 13.75 9.64583 13.75 10V13.75H10C9.64583 13.75 9.34896 13.8698 9.10938 14.1094C8.86979 14.349 8.75 14.6458 8.75 15C8.75 15.3542 8.86979 15.651 9.10938 15.8906C9.34896 16.1302 9.64583 16.25 10 16.25H13.75ZM15 27.5C13.2708 27.5 11.6458 27.1719 10.125 26.5156C8.60417 25.8594 7.28125 24.9688 6.15625 23.8438C5.03125 22.7188 4.14063 21.3958 3.48438 19.875C2.82812 18.3542 2.5 16.7292 2.5 15C2.5 13.2708 2.82812 11.6458 3.48438 10.125C4.14063 8.60417 5.03125 7.28125 6.15625 6.15625C7.28125 5.03125 8.60417 4.14063 10.125 3.48438C11.6458 2.82812 13.2708 2.5 15 2.5C16.7292 2.5 18.3542 2.82812 19.875 3.48438C21.3958 4.14063 22.7188 5.03125 23.8438 6.15625C24.9688 7.28125 25.8594 8.60417 26.5156 10.125C27.1719 11.6458 27.5 13.2708 27.5 15C27.5 16.7292 27.1719 18.3542 26.5156 19.875C25.8594 21.3958 24.9688 22.7188 23.8438 23.8438C22.7188 24.9688 21.3958 25.8594 19.875 26.5156C18.3542 27.1719 16.7292 27.5 15 27.5ZM15 25C17.7917 25 20.1562 24.0312 22.0938 22.0938C24.0312 20.1562 25 17.7917 25 15C25 12.2083 24.0312 9.84375 22.0938 7.90625C20.1562 5.96875 17.7917 5 15 5C12.2083 5 9.84375 5.96875 7.90625 7.90625C5.96875 9.84375 5 12.2083 5 15C5 17.7917 5.96875 20.1562 7.90625 22.0938C9.84375 24.0312 12.2083 25 15 25Z" fill="#4BC500" />
                    </g>
                  </svg>

                </button>
              </div>
            </div>
            <div className='flex flex-col -mt-3'>
              <label className="mb-3 block font-semibold text-black dark:text-white">
                Enter total number of tables
              </label>
              <input
                type="number"
                placeholder="Ex : 23"
                value={totalTables}
                onChange={(e) => setTotalTables(e.target.value)}
                className="w-[70%] rounded-lg border border-slate-500 bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>
            <button
              className='w-[190px] h-[40px] bg-[#4bc500] rounded-xl text-center items-center justify-center text-white text-xl font-medium'
              onClick={handleNextClick}
            >
              Next
            </button>
          </form>
        </div>
        <div className='bg-graydark w-full h-full'></div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[30%] h-[50%]">
            <div className=' flex flex-col w-[100%]'>
              <div className='flex justify-end'>
                <button onClick={handleClosePopup} className=" top-2 right-2 text-black">X</button>
              </div>
              <div>Create your own sections </div>

            </div>
            <form onSubmit={handleFormSubmit} className='flex flex-col justify-center'>
              <div className='flex flex-col gap-4'>
                <label className="font-medium text-xl text-black">Enter Sector Name</label>
                <input
                  type="text"
                  placeholder="Sector Name"
                  value={sectorName}
                  onChange={(e) => setSectorName(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                />
              </div>
              <div className='flex flex-col gap-4 mt-4'>
                <label className="font-medium text-xl text-black">Enter Short Name</label>
                <input
                  type="text"
                  placeholder="Short Name"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                />
              </div>
              <div className='flex w-full justify-around'>
                <button type="submit" className=' w-[30%] mt-6 py-3 bg-[#4bc500] rounded-xl text-center text-white text-xl font-medium'>Submit</button>
              </div>

            </form>
          </div>
        </div>)}
        </DefaultLayout>
    </>
  );
};

export default QrGeneration;

