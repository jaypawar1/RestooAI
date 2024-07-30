import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
interface Service {
  name: string;
}

interface CategoryItem {
  name: string;
  item: MenuItem[];
}

interface Category {
  name: string;
  item: MenuItem[];
}
type MenuItem = {
  name: string;
  logo: string;
  description: string;
  Price: string;
};
// Define the menu state type
interface Menu {
  RestorentName: string;
  logo: string;
  services: Service[];
  category: Category[];
  map: string;
  address: string;
  phone: string;
  email: string;
  insta: string;
}
const EditMenu = () => {
  const [menu, setMenu] = useState<Menu>({
    RestorentName: '',
    logo: '',
    services: [{ name: 'Dine-in' }],
    category: [
      {
        name: 'main course',
        item: [{ name: '', logo: '', description: '', Price: '' }],
      },
    ],
    map: '',
    address: '',
    phone: '',
    email: '',
    insta: '',
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setNewServiceName('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newServiceName.trim()) {
      setMenu((prevMenu) => ({
        ...prevMenu,
        services: [...prevMenu.services, { name: newServiceName }],
      }));
      handleClosePopup();
    }
  };
  const [check, setCheck] = useState<Boolean>(false);
  console.log(menu);
  const token = localStorage.getItem('token');

  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set(),
  );
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const response = await axios.get(`${url}/api/menu`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token!,
          },
        });
        if (!response.data.message) {
          setMenu(response.data);
          setCheck(true);
        }

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenu();
  }, []);

  const toggleServiceSelection = (serviceName: string) => {
    setSelectedServices((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(serviceName)) {
        updatedSelection.delete(serviceName);
      } else {
        updatedSelection.add(serviceName);
      }
      return updatedSelection;
    });
  };
  const ImagetoBase64 = (
    file: File | undefined,
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    });
  };

  const toggleCategorySelection = (categoryName: string) => {
    setSelectedCategories((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(categoryName)) {
        updatedSelection.delete(categoryName);
      } else {
        updatedSelection.add(categoryName);
      }
      return updatedSelection;
    });
  };

  const handleInputChange = (
    categoryIndex: number,
    itemIndex: number,
    field: keyof MenuItem,
    value: string,
  ) => {
    const updatedMenu = { ...menu };

    // Ensure value is converted to string if field expects a string
    if (
      typeof updatedMenu.category[categoryIndex].item[itemIndex][field] ===
      'string'
    ) {
      updatedMenu.category[categoryIndex].item[itemIndex][field] =
        updatedMenu.category[categoryIndex].item[itemIndex][field] = value;
    } else {
      // If value should be a number, handle accordingly
      updatedMenu.category[categoryIndex].item[itemIndex][field] = value as any;
    }

    setMenu(updatedMenu);
  };

  const handleFileChange = async (
    categoryIndex: number,
    itemIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    const base = await ImagetoBase64(file);
    if (base) {
      handleInputChange(categoryIndex, itemIndex, 'logo', base as string);
    }
  };
  const handleFileChanges = async (e: any) => {
    e.preventDefault();

    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const image = await ImagetoBase64(file);
      const updatedMenu = { ...menu };
      updatedMenu.logo = image as string;
      console.log(file);

      setMenu(updatedMenu);
      console.log(updatedMenu);
    }
  };
  const handleAddMoreItems = (category: string) => {
    const updatedMenu = { ...menu };
    const categoryIndex = updatedMenu.category.findIndex(
      (cat) => cat.name === category,
    );
    if (categoryIndex !== -1) {
      updatedMenu.category[categoryIndex].item.push({
        name: '',
        logo: '',
        description: '',
        Price: '',
      });
      setMenu(updatedMenu);
    }
  };
  const handleCreateMenu = async (menu: Menu) => {
    try {
      if (check) {
        const response = await axios.put(
          'http://localhost:5000/api/menu',
          menu,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: token!,
            },
          },
        );
        if (!response.data.message) {
          setMenu(response.data);
        }
        console.log(response.data);
      } else {
        const user = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token!,
          },
        });
        console.log(user);
        if (!user.data.menu) {
          const response = await axios.post(
            'http://localhost:5000/api/menu',
            menu,
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: token!,
              },
            },
          );
          if (!response.data.message) {
            setMenu(response.data);
          }
          console.log(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnsubmit = async (item: MenuItem[]) => {
    try {
      const user = await axios.get('http://localhost:5000/api/user', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token!,
        },
      });
      console.log(user);

      if (user.data.menu) {
        const response = await axios.put(
          'http://localhost:5000/api/menu',
          item,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: token!,
            },
          },
        );
        if (!response.data.message) {
          setMenu(response.data);
        }
        console.log(response.data);
      }
    } catch (error) {}
  };
  return (
    <>
      <DefaultLayout>
        <div className="w-full flex justify-between ">
          <div>
            <h1 className="text-black text-3xl font-semibold">
              Create your <span className="text-[#4BC500]">own menu</span>
            </h1>
          </div>
          <button className="text-white bg-[#4BC500] font-semibold px-4 py-2 text-xl rounded-lg shadow-lg ">
            POS integration
          </button>
        </div>
        <div className="  w-[60%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nemo,
          ratione omnis, quibusdam ea minima error, provident aperiam quam fuga
        </div>
        <div className="w-[70%] mt-8 ">
          <div className="flex gap-4">
            <div className="flex flex-col w-[60%] ">
              <label className="text-black font-semibold ">
                Restaurant Name
              </label>
              <input
                type="text"
                value={menu.RestorentName}
                onChange={(e) => {
                  e.preventDefault;
                  const updatedMenu = { ...menu };
                  updatedMenu.RestorentName = e.target.value;
                  setMenu(updatedMenu);
                }}
                placeholder="Titoes cafe and Bar ..."
                className="rounded-lg border text-lg font-medium border-slate-400 h-10 py-2 px-3 mt-1"
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-black font-semibold ">Logo image</label>
              <label
                htmlFor="file-upload"
                className="mt-1 first:custom-file-upload rounded-lg border border-slate-400 h-10 text-xl py-2 px-2 flex justify-between "
              >
                <div className="flex flex-row space-x-10">
                  <div className="text-sm"> Upload</div>
                  <div className=" m-auto  cursor-pointer">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_1125_2337"
                        style={{ maskType: 'alpha' }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="25"
                      >
                        <rect
                          x="-6.10352e-05"
                          width="15"
                          height="15"
                          fill="#D9D9D9"
                        />
                      </mask>
                      <g mask="url(#mask0_1125_2337)">
                        <path
                          d="M3.74994 12.5C3.40619 12.5 3.11192 12.3776 2.86713 12.1328C2.62233 11.888 2.49994 11.5938 2.49994 11.25V10C2.49994 9.82292 2.55983 9.67448 2.67963 9.55469C2.79942 9.4349 2.94786 9.375 3.12494 9.375C3.30202 9.375 3.45046 9.4349 3.57025 9.55469C3.69004 9.67448 3.74994 9.82292 3.74994 10V11.25H11.2499V10C11.2499 9.82292 11.3098 9.67448 11.4296 9.55469C11.5494 9.4349 11.6979 9.375 11.8749 9.375C12.052 9.375 12.2005 9.4349 12.3203 9.55469C12.44 9.67448 12.4999 9.82292 12.4999 10V11.25C12.4999 11.5938 12.3775 11.888 12.1328 12.1328C11.888 12.3776 11.5937 12.5 11.2499 12.5H3.74994ZM6.87494 4.90625L5.70306 6.07812C5.57806 6.20313 5.42963 6.26302 5.25775 6.25781C5.08588 6.2526 4.93744 6.1875 4.81244 6.0625C4.69786 5.9375 4.63796 5.79167 4.63275 5.625C4.62754 5.45833 4.68744 5.3125 4.81244 5.1875L7.06244 2.9375C7.12494 2.875 7.19265 2.83073 7.26556 2.80469C7.33848 2.77865 7.41661 2.76562 7.49994 2.76562C7.58327 2.76562 7.6614 2.77865 7.73431 2.80469C7.80723 2.83073 7.87494 2.875 7.93744 2.9375L10.1874 5.1875C10.3124 5.3125 10.3723 5.45833 10.3671 5.625C10.3619 5.79167 10.302 5.9375 10.1874 6.0625C10.0624 6.1875 9.914 6.2526 9.74213 6.25781C9.57025 6.26302 9.42181 6.20313 9.29681 6.07812L8.12494 4.90625V9.375C8.12494 9.55208 8.06504 9.70052 7.94525 9.82031C7.82546 9.9401 7.67702 10 7.49994 10C7.32286 10 7.17442 9.9401 7.05463 9.82031C6.93483 9.70052 6.87494 9.55208 6.87494 9.375V4.90625Z"
                          fill="#000000"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </label>
              <input
                onChange={handleFileChanges}
                id="file-upload"
                type="file"
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 w-[50%]">
      <label className="text-black font-semibold">
        Restaurant Other Service
      </label>
      <div className="mt-1 grid grid-cols-3">
        {menu.services.map((service, index) => (
          <div
            onClick={() => toggleServiceSelection(service.name)}
            key={index}
            className={`bg-[#BAE8B3] text-black text-lg font-medium rounded-lg h-10 w-40 py-1 text-center col-span-1 cursor-pointer shadow-2 drop-shadow-xl ${
              selectedServices.has(service.name) ? 'bg-[#BAE8B3]' : 'bg-white'
            }`}
          >
            {service.name}
          </div>
        ))}

        <div
          onClick={handleOpenPopup}
          className="text-black text-lg font-medium rounded-lg h-10 w-40 py-1 border cursor-pointer border-slate-300 text-center col-span-1 shadow-2 drop-shadow-xl flex justify-between px-4"
        >
          <div>Add Other</div>
          <div className="my-auto">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11V14C9 14.2833 9.09583 14.5208 9.2875 14.7125C9.47917 14.9042 9.71667 15 10 15C10.2833 15 10.5208 14.9042 10.7125 14.7125C10.9042 14.5208 11 14.2833 11 14V11H14C14.2833 11 14.5208 10.9042 14.7125 10.7125C14.9042 10.5208 15 10.2833 15 10C15 9.71667 14.9042 9.47917 14.7125 9.2875C14.5208 9.09583 14.2833 9 14 9H11V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V9H6C5.71667 9 5.47917 9.09583 5.2875 9.2875C5.09583 9.47917 5 9.71667 5 10C5 10.2833 5.09583 10.5208 5.2875 10.7125C5.47917 10.9042 5.71667 11 6 11H9ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                fill="#4BC500"
              />
            </svg>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[30%] h-fit">
            <div className="flex flex-col w-[100%]">
              <div className="flex flex-row items-center justify-between">
                <div className="text-xl font-semibold">
                  Create your own services
                </div>
                <button
                  onClick={handleClosePopup}
                  className="text-black font-bold"
                >
                  X
                </button>
              </div>
            </div>
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col justify-center"
            >
              <div className="flex flex-col gap-2">
                <label className="font-medium text-xl text-black mt-3">
                Enter the name of the new service
                </label>
                <input
                  type="text"
                  placeholder="Sector Name"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                />
              </div>
              <div className="flex w-full justify-around">
                <button
                  type="submit"
                  className="w-full mt-6 py-3 bg-[#4bc500] rounded-xl text-center text-white text-xl font-medium"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  
    <div className="mt-5 w-[50%]">
      <label className="text-black font-semibold">
        Create Your Item Categories 
      </label>
      <div className="mt-1 grid grid-cols-3">
        {menu.services.map((service, index) => (
          <div
            onClick={() => toggleServiceSelection(service.name)}
            key={index}
            className={`bg-[#BAE8B3] text-black text-lg font-medium rounded-lg h-10 w-40 py-1 text-center col-span-1 cursor-pointer shadow-2 drop-shadow-xl ${
              selectedServices.has(service.name) ? 'bg-[#BAE8B3]' : 'bg-white'
            }`}
          >
            {service.name}
          </div>
        ))}

        <div
          onClick={handleOpenPopup}
          className="text-black text-lg font-medium rounded-lg h-10 w-40 py-1 border cursor-pointer border-slate-300 text-center col-span-1 shadow-2 drop-shadow-xl flex justify-between px-4"
        >
          <div>Add Other</div>
          <div className="my-auto">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11V14C9 14.2833 9.09583 14.5208 9.2875 14.7125C9.47917 14.9042 9.71667 15 10 15C10.2833 15 10.5208 14.9042 10.7125 14.7125C10.9042 14.5208 11 14.2833 11 14V11H14C14.2833 11 14.5208 10.9042 14.7125 10.7125C14.9042 10.5208 15 10.2833 15 10C15 9.71667 14.9042 9.47917 14.7125 9.2875C14.5208 9.09583 14.2833 9 14 9H11V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V9H6C5.71667 9 5.47917 9.09583 5.2875 9.2875C5.09583 9.47917 5 9.71667 5 10C5 10.2833 5.09583 10.5208 5.2875 10.7125C5.47917 10.9042 5.71667 11 6 11H9ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                fill="#4BC500"
              />
            </svg>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[30%] h-fit">
            <div className="flex flex-col w-[100%]">
              <div className="flex flex-row items-center justify-between">
                <div className="text-xl font-semibold">
                  Create your own services
                </div>
                <button
                  onClick={handleClosePopup}
                  className="text-black font-bold"
                >
                  X
                </button>
              </div>
            </div>
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col justify-center"
            >
              <div className="flex flex-col gap-2">
                <label className="font-medium text-xl text-black mt-3">
                Enter the name of the new service
                </label>
                <input
                  type="text"
                  placeholder="Sector Name"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary"
                />
              </div>
              <div className="flex w-full justify-around">
                <button
                  type="submit"
                  className="w-full mt-6 py-3 bg-[#4bc500] rounded-xl text-center text-white text-xl font-medium"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
        <div className="mt-5 w-[60%] ">
          <label className="text-black font-semibold ">Add your Items</label>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cum
            vero earum reiciendis, praesentium numquam adipisci amet porro modi!
            Nobis.
          </div>
          <div className=" mt-4 ">
            {[...selectedCategories].map((category, catIndex) => (
              <div key={catIndex} className="mb-10">
                <div>
                  <label className="text-black font-medium text-xl mb-5">
                    {category}
                  </label>
                  {menu.category
                    .filter((cat) => cat.name === category)
                    .flatMap((cat) => cat.item)
                    .map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-[#BAE8B3] mt-5 w-full text-black text-lg font-medium rounded-xl py-4 px-4 text-center shadow-2 drop-shadow-xl mb-10"
                      >
                        <div className="flex flex-col mt-5">
                          <div className="flex justify-between gap-4">
                            <input
                              className="w-[60%] placeholder-black bg-transparent border-b-2 border-black pl-4 text-black"
                              type="text"
                              value={item.name}
                              onChange={(e) =>
                                handleInputChange(
                                  catIndex,
                                  itemIndex,
                                  'name',
                                  e.target.value,
                                )
                              }
                              placeholder="Name of your dish, Ex: Coffee"
                            />
                            <label
                              htmlFor={`file-upload-${itemIndex}`}
                              className="custom-file-upload w-[20%] rounded-xl border border-black h-12 text-xl py-2 px-2 flex justify-between cursor-pointer"
                            >
                              <div>Upload</div>
                              <div className="m-auto">
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3.74994 12.5C3.40619 12.5 3.11192 12.3776 2.86713 12.1328C2.62233 11.888 2.49994 11.5938 2.49994 11.25V10C2.49994 9.82292 2.55983 9.67448 2.67963 9.55469C2.79942 9.4349 2.94786 9.375 3.12494 9.375C3.30202 9.375 3.45046 9.4349 3.57025 9.55469C3.69004 9.67448 3.74994 9.82292 3.74994 10V11.25H11.2499V10C11.2499 9.82292 11.3098 9.67448 11.4296 9.55469C11.5494 9.4349 11.6979 9.375 11.8749 9.375C12.052 9.375 12.2005 9.4349 12.3203 9.55469C12.44 9.67448 12.4999 9.82292 12.4999 10V11.25C12.4999 11.5938 12.3775 11.888 12.1328 12.1328C11.888 12.3776 11.5937 12.5 11.2499 12.5H3.74994ZM6.87494 4.90625L5.70306 6.07812C5.57806 6.20313 5.42963 6.26302 5.25775 6.25781C5.08588 6.2526 4.93744 6.1875 4.81244 6.0625C4.69786 5.9375 4.63796 5.79167 4.63275 5.625C4.62754 5.45833 4.68744 5.3125 4.81244 5.1875L7.06244 2.9375C7.12494 2.875 7.19265 2.83073 7.26556 2.80469C7.33848 2.77865 7.41661 2.76562 7.49994 2.76562C7.58327 2.76562 7.6614 2.77865 7.73431 2.80469C7.80723 2.83073 7.87494 2.875 7.93744 2.9375L10.1874 5.1875C10.3124 5.3125 10.3723 5.45833 10.3671 5.625C10.3619 5.79167 10.302 5.9375 10.1874 6.0625C10.0624 6.1875 9.914 6.2526 9.74213 6.25781C9.57025 6.26302 9.42181 6.20313 9.29681 6.07812L8.12494 4.90625V9.375C8.12494 9.55208 8.06504 9.70052 7.94525 9.82031C7.82546 9.9401 7.67702 10 7.49994 10C7.32286 10 7.17442 9.9401 7.05463 9.82031C6.93483 9.70052 6.87494 9.55208 6.87494 9.375V4.90625Z"
                                    fill="#000000"
                                  />
                                </svg>
                              </div>
                            </label>
                            <input
                              id={`file-upload-${itemIndex}`}
                              type="file"
                              className="hidden"
                              onChange={(e) =>
                                handleFileChange(catIndex, itemIndex, e)
                              }
                            />
                            <input
                              type="number"
                              placeholder="Amount"
                              value={item.Price}
                              onChange={(e) =>
                                handleInputChange(
                                  catIndex,
                                  itemIndex,
                                  'Price',
                                  e.target.value,
                                )
                              }
                              className="rounded-xl border border-black h-12 text-xl py-2 px-2 w-[20%] bg-transparent placeholder-black"
                            />
                          </div>
                          <div className="mt-4">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) =>
                                handleInputChange(
                                  catIndex,
                                  itemIndex,
                                  'description',
                                  e.target.value,
                                )
                              }
                              placeholder="Description of your dish"
                              className="h-22 w-full bg-transparent text-start border-2 text-black border-black rounded-xl p-6 placeholder-black"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="mt-6">
                  <div
                    onClick={() => handleAddMoreItems(category)}
                    className="text-[#4BC500] underline mt-6 cursor-pointer"
                  >
                    Add more items
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      handleOnsubmit(menu.category[catIndex].item);
                    }}
                    className="text-white bg-[#4BC500] font-semibold px-3 py-2 text-xl rounded-xl"
                  >
                    Submit
                  </button>
                </div>
              </div>
            ))}
            <div className="flex flex-col w-[70%]  mt-3">
              <label className="text-black font-semibold  ">
                Restaurant address Google Maps link
              </label>
              <input
                type="text"
                value={menu.map}
                onChange={(e) => {
                  e.preventDefault();
                  const updatedMenu = { ...menu };
                  updatedMenu.map = e.target.value;
                  setMenu(updatedMenu);
                }}
                placeholder="Titoes Cafe and Bar"
                className="rounded-lg border text-lg font-medium border-black h-10 py-2 px-4 mb-3 "
              />
            </div>

            <div className="flex flex-col w-[70%] mt-2 ">
              <label className="text-black font-semibold ">
                Contact number
              </label>
              <input
                type="phone"
                value={menu.phone}
                onChange={(e) => {
                  e.preventDefault;
                  const updatedMenu = { ...menu };
                  updatedMenu.phone = e.target.value;
                  setMenu(updatedMenu);
                }}
                placeholder="Titoes cafe and Bar"
                className="rounded-lg border text-xl font-medium border-black h-10 py-2 px-4 mb-3"
              />
            </div>
            <div className="flex flex-col w-[70%] mt-2">
              <label className="text-black font-semibold">Email address</label>
              <input
                type="email"
                value={menu.email}
                onChange={(e) => {
                  e.preventDefault;
                  const updatedMenu = { ...menu };
                  updatedMenu.email = e.target.value;
                  setMenu(updatedMenu);
                }}
                placeholder="Titoes cafe and Bar"
                className="rounded-lg border text-xl font-medium border-black h-10 py-2 px-4 mb-3"
              />
            </div>
            <div className="flex flex-col w-[70%] mt-2">
              <label className="text-black font-semibold ">
                Contact address
              </label>
              <input
                type="address"
                value={menu.address}
                onChange={(e) => {
                  e.preventDefault;
                  const updatedMenu = { ...menu };
                  updatedMenu.address = e.target.value;
                  setMenu(updatedMenu);
                }}
                placeholder="Titoes cafe and Bar"
                className="rounded-lg border text-xl font-medium border-black h-10 py-2 px-4 mb-3"
              />
            </div>
            <div className="flex flex-col w-[70%] mt-2">
              <label className="text-black font-semibold ">
                Social media account
              </label>
              <input
                type="name"
                value={menu.insta}
                onChange={(e) => {
                  e.preventDefault;
                  const updatedMenu = { ...menu };
                  updatedMenu.insta = e.target.value;
                  setMenu(updatedMenu);
                }}
                placeholder="Titoes cafe and Bar"
                className="rounded-lg border text-xl font-medium border-black h-10 py-2 px-4 mb-3"
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => handleCreateMenu(menu)}
          className="text-white bg-[#4BC500] font-semibold px-6 py-2 text-lg rounded-lg mt-7 mx-20"
        >
          Create Your Own Menu App
        </button>
      </DefaultLayout>
    </>
  );
};

export default EditMenu;
