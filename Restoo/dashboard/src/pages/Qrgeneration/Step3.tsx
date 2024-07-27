import React, { useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';

interface Table {
  section: string;
  shortName: string;
  Table_no: string[];
}

const Step3 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [table, setTable] = useState<Table | null>(null);

  const qrValue = `https://wa.me/917709196986?text=Hello,%20I'd%20like%20to%20contact%20${name}%20regarding%20table%20${table?.Table_no[1]}`;

  useEffect(() => {
    async function getTable() {
      const token = localStorage.getItem('token');
      const url = import.meta.env.VITE_SERVER_URL;
      try {
        const response = await axios.get(`${url}/api/table/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        const res2 = await axios.get(`${url}/api/business/`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        setTable(response.data.table);
        setName(res2.data.display_name);
        setPhone(res2.data.contact);
      } catch (error) {
        console.error('Error fetching table or business data:', error);
      }
    }

    getTable();
  }, [id]);

  const downloadImage = () => {
    if (canvasRef.current) {
      html2canvas(canvasRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `QRCode.png`;
        link.click();
      });
    }
  };
  const handleBackClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = import.meta.env.VITE_SERVER_URL;
      const response = await axios.put(
        `${url}/api/table/`,
        {
          tableId: id,
          table_no: table?.Table_no,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token!,
          },
        }
      );
      navigate(`/Step2/${id}`);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  return (
    <div>
      <DefaultLayout>
        <div className="mb-5">
          <h1 className="text-black text-2xl font-extrabold mb-4">
            Hello! Let's Generate table{' '}
            <span className="text-[#4BC500]">QR code</span> in 3 steps.
          </h1>
          <div className="font-semibold text-lg text-black">
            Explanation text
          </div>
        </div>
        <Breadcrumb pageName="Step 3 :" />
        <div className="flex flex-row justify-between items-start m-5">
          <div
            ref={canvasRef}
            className="inline-block p-6 text-center border border-gray-300"
          >
            <div className="text-2xl mb-2">{name}</div>
            <QRCodeCanvas value={qrValue} size={156} className="ml-5" />
            <div className="text-xl mt-2">{table?.Table_no[1]}</div>
          </div>
        </div>

        <button
          onClick={downloadImage}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Download QR Code
        </button>
        <div className="flex items-center gap-5 mt-6">
          <button onClick={handleBackClick} className="px-9 py-3 bg-gray-500 border border-black text-black rounded">
            Back
          </button>
          <button className="px-9 py-3 bg-green-500 text-white rounded">
            Next
          </button>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Step3;
