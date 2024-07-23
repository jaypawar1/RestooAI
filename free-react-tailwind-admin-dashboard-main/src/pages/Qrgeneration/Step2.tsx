import React, { useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';



interface Table {
  section: string;
  shortName: string;
  Table_no: string[];
}

const Step2 = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [table, setTable] = useState<Table | null>(null);
  console.log(phone);
  
  const qrValue = `https://wa.me/917709196986?text=Hello,%20I'd%20like%20to%20contact%20${name}%20regarding%20table%20${table?.Table_no[1]}`;


  useEffect(() => {
    async function getTable() {
      const token = localStorage.getItem('token');
      try {
      
        const response = await axios.get(`http://localhost:5000/api/table/${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        const res2 = await axios.get(`http://localhost:5000/api/business/`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
console.log(res2.data);

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

  return (
    <div>
      <DefaultLayout>
      <Breadcrumb pageName="Step 2" />
      <div
        ref={canvasRef}
        style={{
          display: 'inline-block',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid #ccc',
          margin: '20px',
        }}
      >
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>{name}</div>
        <QRCodeCanvas value={qrValue} size={256} />
        <div style={{ fontSize: '18px', marginTop: '10px' }}>{table?.Table_no[1]}</div>
      </div>
      <button onClick={downloadImage}>Download QR Code</button>
      </DefaultLayout>
    </div>
  );
};

export default Step2;
