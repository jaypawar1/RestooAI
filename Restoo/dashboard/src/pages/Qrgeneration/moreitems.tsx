import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';

interface Table {
  _id: string;
  Restorent: string;
  section: string;
  shortName: string;
  Table_no: string[];
}

const MoreItemsPage: React.FC = () => {
  const canvasRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [table, setTable] = useState<Table[] | null>(null);
  console.log(table);

  useEffect(() => {
    async function getTable() {
      const token = localStorage.getItem('token');
      const url = import.meta.env.VITE_SERVER_URL;
      try {
        const response = await axios.get(`${url}/api/table`, {
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

        console.log('Response data:', response.data); // Debug log to inspect response data

        // Check if response.data has a tables property and it's an array
        const tablesArray = Array.isArray(response.data.tables) ? response.data.tables : [];

        setTable(tablesArray);
        setName(res2.data.display_name);
        setPhone(res2.data.contact);
      } catch (error) {
        console.error('Error fetching table or business data:', error);
      }
    }

    getTable();
  }, []);

  const downloadQRCode = async (itemId: string, item: string) => {
    const canvas = canvasRefs.current.get(itemId);
    if (canvas) {
      await html2canvas(canvas).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `QRCode_${item}.png`;
        link.click();
      });
    }
  };

  return (
    <DefaultLayout>
      <div className="mt-3 gap-4">
        {table ? (
          table.map((items, index) => (
            items.Table_no.length > 0 && (
              <React.Fragment key={index}>
                <div>{items.section}</div>
                <div className='grid grid-cols-5 gap-5 mt-3 '>
                  {items.Table_no.map((item, subIndex) => {
                    const itemId = `${items._id}-${subIndex}`;
                    return (
                      <div
                        key={itemId}
                        className="bg-slate-500 p-14 shadow-md rounded-md text-white col-span-1"
                        ref={(el) => {
                          if (el) {
                            canvasRefs.current.set(itemId, el);
                          }
                        }}
                      >
                        <div className="text-2xl mb-2">{name}</div>
                        <QRCodeCanvas value={`https://wa.me/917709196986?text=Hello,%20I'd%20like%20to%20contact%20${name}%20regarding%20table%20${item}`} size={156} className='' />
                        <div className="text-xl mt-2">
                          {item}
                        </div>
                        <button onClick={() => downloadQRCode(itemId, item)}>Download QR Code</button>
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            )
          ))
        ) : (
          <div>No items available</div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default MoreItemsPage;
