import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/logo.svg';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-70 flex-col overflow-y-hidden bg-white duration-300 ease-linear  lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-10 lg:py-0 -mt-1 ">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className='w-29 h-21' />
        </NavLink>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear pt-4">
        {/* <!-- Sidebar Menu --> */}
        <nav className=" px-4 lg:px-3">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-2xl font-bold text-[#4BC500]">
              Discover
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              {/* <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="/"
                        className={`group relative flex items-center gap-2.5 rounded-lg  px-4 py-2 font-bold   text-black  duration-300 ease-in-out hover:bg-[#BAE8B3]   dark:hover:bg-meta-4 ${(pathname === '/' ||
                          pathname.includes('')) &&
                          'bg-[#BAE8B3]   dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                            fill=""
                          />
                          <path
                            d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                            fill=""
                          />
                          <path
                            d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                            fill=""
                          />
                        </svg>
                        Analytics

                      </NavLink>

                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 round rounded-lg  py-2 px-4 font-bold   text-black  duration-300 ease-in-out hover:bg-[#BAE8B3]   dark:hover:bg-meta-4 ${
                    (pathname === '/' || pathname.includes('dashboard')) &&
                    'bg-[#BAE8B3]   dark:bg-meta-4'
                  }`}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_967_1662"
                      style={{ maskType: 'alpha' }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="30"
                      height="30"
                    >
                      <rect width="30" height="30" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_967_1662)">
                      <path
                        d="M21.25 25C20.8958 25 20.599 24.8802 20.3594 24.6406C20.1198 24.401 20 24.1042 20 23.75V17.5C20 17.1458 20.1198 16.849 20.3594 16.6094C20.599 16.3698 20.8958 16.25 21.25 16.25H23.75C24.1042 16.25 24.401 16.3698 24.6406 16.6094C24.8802 16.849 25 17.1458 25 17.5V23.75C25 24.1042 24.8802 24.401 24.6406 24.6406C24.401 24.8802 24.1042 25 23.75 25H21.25ZM13.75 25C13.3958 25 13.099 24.8802 12.8594 24.6406C12.6198 24.401 12.5 24.1042 12.5 23.75V6.25C12.5 5.89583 12.6198 5.59896 12.8594 5.35938C13.099 5.11979 13.3958 5 13.75 5H16.25C16.6042 5 16.901 5.11979 17.1406 5.35938C17.3802 5.59896 17.5 5.89583 17.5 6.25V23.75C17.5 24.1042 17.3802 24.401 17.1406 24.6406C16.901 24.8802 16.6042 25 16.25 25H13.75ZM6.25 25C5.89583 25 5.59896 24.8802 5.35938 24.6406C5.11979 24.401 5 24.1042 5 23.75V12.5C5 12.1458 5.11979 11.849 5.35938 11.6094C5.59896 11.3698 5.89583 11.25 6.25 11.25H8.75C9.10417 11.25 9.40104 11.3698 9.64062 11.6094C9.88021 11.849 10 12.1458 10 12.5V23.75C10 24.1042 9.88021 24.401 9.64062 24.6406C9.40104 24.8802 9.10417 25 8.75 25H6.25Z"
                        fill="#1C1B1F"
                      />
                    </g>
                  </svg>
                  Analysis
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/QrGeneration"
                  className={`group relative flex items-center gap-2.5 rounded-lg  py-2 px-4 font-bold   text-black  duration-300 ease-in-out hover:bg-[#BAE8B3]   dark:hover:bg-meta-4 ${
                    pathname.includes('calendar') &&
                    'bg-[#BAE8B3]   dark:bg-meta-4'
                  }`}
                >
                  <svg
                    width="22"
                    height="21"
                    viewBox="0 0 22 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.75 9.5V2C0.75 1.64583 0.869792 1.34896 1.10938 1.10938C1.34896 0.869792 1.64583 0.75 2 0.75H9.5C9.85417 0.75 10.151 0.869792 10.3906 1.10938C10.6302 1.34896 10.75 1.64583 10.75 2V9.5C10.75 9.85417 10.6302 10.151 10.3906 10.3906C10.151 10.6302 9.85417 10.75 9.5 10.75H2C1.64583 10.75 1.34896 10.6302 1.10938 10.3906C0.869792 10.151 0.75 9.85417 0.75 9.5ZM3.25 8.25H8.25V3.25H3.25V8.25ZM0.75 22V14.5C0.75 14.1458 0.869792 13.849 1.10938 13.6094C1.34896 13.3698 1.64583 13.25 2 13.25H9.5C9.85417 13.25 10.151 13.3698 10.3906 13.6094C10.6302 13.849 10.75 14.1458 10.75 14.5V22C10.75 22.3542 10.6302 22.651 10.3906 22.8906C10.151 23.1302 9.85417 23.25 9.5 23.25H2C1.64583 23.25 1.34896 23.1302 1.10938 22.8906C0.869792 22.651 0.75 22.3542 0.75 22ZM3.25 20.75H8.25V15.75H3.25V20.75ZM13.25 9.5V2C13.25 1.64583 13.3698 1.34896 13.6094 1.10938C13.849 0.869792 14.1458 0.75 14.5 0.75H22C22.3542 0.75 22.651 0.869792 22.8906 1.10938C23.1302 1.34896 23.25 1.64583 23.25 2V9.5C23.25 9.85417 23.1302 10.151 22.8906 10.3906C22.651 10.6302 22.3542 10.75 22 10.75H14.5C14.1458 10.75 13.849 10.6302 13.6094 10.3906C13.3698 10.151 13.25 9.85417 13.25 9.5ZM15.75 8.25H20.75V3.25H15.75V8.25ZM20.75 23.25V20.75H23.25V23.25H20.75ZM13.25 15.75V13.25H15.75V15.75H13.25ZM15.75 18.25V15.75H18.25V18.25H15.75ZM13.25 20.75V18.25H15.75V20.75H13.25ZM15.75 23.25V20.75H18.25V23.25H15.75ZM18.25 20.75V18.25H20.75V20.75H18.25ZM18.25 15.75V13.25H20.75V15.75H18.25ZM20.75 18.25V15.75H23.25V18.25H20.75Z"
                      fill="#1C1B1F"
                    />
                  </svg>
                  QR code generate
                </NavLink>
              </li>
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Forms --> */}
              <li>
                <NavLink
                  to="/FeedbackAnalysis"
                  className={`group relative flex items-center gap-2.5 rounded-lg  py-2 px-4 font-bold   text-black  duration-300 ease-in-out hover:bg-[#BAE8B3]   dark:hover:bg-meta-4 ${
                    (pathname === '/forms' || pathname.includes('forms')) &&
                    'bg-[#BAE8B3]   dark:bg-meta-4'
                  }`}
                >
                  <svg
                    width="26"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.25 11.2502H21.75C21.3958 11.2502 21.099 11.1304 20.8594 10.8908C20.6198 10.6512 20.5 10.3543 20.5 10.0002C20.5 9.646 20.6198 9.34912 20.8594 9.10954C21.099 8.86996 21.3958 8.75016 21.75 8.75016H24.25C24.6042 8.75016 24.901 8.86996 25.1406 9.10954C25.3802 9.34912 25.5 9.646 25.5 10.0002C25.5 10.3543 25.3802 10.6512 25.1406 10.8908C24.901 11.1304 24.6042 11.2502 24.25 11.2502ZM18.75 16.0002C18.9583 15.7085 19.2292 15.5418 19.5625 15.5002C19.8958 15.4585 20.2083 15.5418 20.5 15.7502L22.5 17.2502C22.7917 17.4585 22.9583 17.7293 23 18.0627C23.0417 18.396 22.9583 18.7085 22.75 19.0002C22.5417 19.2918 22.2708 19.4585 21.9375 19.5002C21.6042 19.5418 21.2917 19.4585 21 19.2502L19 17.7502C18.7083 17.5418 18.5417 17.271 18.5 16.9377C18.4583 16.6043 18.5417 16.2918 18.75 16.0002ZM22.5 2.75016L20.5 4.25016C20.2083 4.4585 19.8958 4.54183 19.5625 4.50016C19.2292 4.4585 18.9583 4.29183 18.75 4.00016C18.5417 3.7085 18.4583 3.396 18.5 3.06266C18.5417 2.72933 18.7083 2.4585 19 2.25016L21 0.750163C21.2917 0.541829 21.6042 0.458496 21.9375 0.500163C22.2708 0.541829 22.5417 0.708496 22.75 1.00016C22.9583 1.29183 23.0417 1.60433 23 1.93766C22.9583 2.271 22.7917 2.54183 22.5 2.75016ZM4.25 13.7502H3C2.3125 13.7502 1.72396 13.5054 1.23438 13.0158C0.744792 12.5262 0.5 11.9377 0.5 11.2502V8.75016C0.5 8.06266 0.744792 7.47412 1.23438 6.98454C1.72396 6.49495 2.3125 6.25016 3 6.25016H8L12.3438 3.62516C12.7604 3.37516 13.1823 3.37516 13.6094 3.62516C14.0365 3.87516 14.25 4.23975 14.25 4.71891V15.2814C14.25 15.7606 14.0365 16.1252 13.6094 16.3752C13.1823 16.6252 12.7604 16.6252 12.3438 16.3752L8 13.7502H6.75V17.5002C6.75 17.8543 6.63021 18.1512 6.39062 18.3908C6.15104 18.6304 5.85417 18.7502 5.5 18.7502C5.14583 18.7502 4.84896 18.6304 4.60938 18.3908C4.36979 18.1512 4.25 17.8543 4.25 17.5002V13.7502ZM11.75 13.0627V6.93766L8.6875 8.75016H3V11.2502H8.6875L11.75 13.0627ZM15.5 14.1877V5.81266C16.0625 6.31266 16.5156 6.92204 16.8594 7.64079C17.2031 8.35954 17.375 9.146 17.375 10.0002C17.375 10.8543 17.2031 11.6408 16.8594 12.3595C16.5156 13.0783 16.0625 13.6877 15.5 14.1877Z"
                      fill="#1C1B1F"
                    />
                  </svg>
                  Automate campaign
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/FeedbackAnalysis"
                  className={`group relative flex items-center gap-2.5 rounded-lg  py-2 px-4 font-bold   text-black  duration-300 ease-in-out hover:bg-[#BAE8B3]   dark:hover:bg-meta-4 ${
                    (pathname === '/forms' || pathname.includes('forms')) &&
                    'bg-[#BAE8B3]   dark:bg-meta-4'
                  }`}
                >
                  <svg
                    width="26"
                    height="24"
                    viewBox="0 0 26 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.75 15.5H8.78125C8.94792 15.5 9.10938 15.4688 9.26562 15.4062C9.42188 15.3438 9.5625 15.25 9.6875 15.125L15.5625 9.25C15.75 9.0625 15.8906 8.84896 15.9844 8.60938C16.0781 8.36979 16.125 8.13542 16.125 7.90625C16.125 7.67708 16.0729 7.45313 15.9688 7.23438C15.8646 7.01563 15.7292 6.8125 15.5625 6.625L14.4375 5.4375C14.25 5.25 14.0417 5.10938 13.8125 5.01562C13.5833 4.92188 13.3438 4.875 13.0938 4.875C12.8646 4.875 12.6302 4.92188 12.3906 5.01562C12.151 5.10938 11.9375 5.25 11.75 5.4375L5.875 11.3125C5.75 11.4375 5.65625 11.5781 5.59375 11.7344C5.53125 11.8906 5.5 12.0521 5.5 12.2188V14.25C5.5 14.6042 5.61979 14.901 5.85938 15.1406C6.09896 15.3802 6.39583 15.5 6.75 15.5ZM7.375 13.625V12.4375L10.5313 9.28125L11.1563 9.84375L11.7188 10.4688L8.5625 13.625H7.375ZM11.1563 9.84375L11.7188 10.4688L10.5313 9.28125L11.1563 9.84375ZM11.9688 15.5H19.25C19.6042 15.5 19.901 15.3802 20.1406 15.1406C20.3802 14.901 20.5 14.6042 20.5 14.25C20.5 13.8958 20.3802 13.599 20.1406 13.3594C19.901 13.1198 19.6042 13 19.25 13H14.4688L11.9688 15.5ZM5.5 20.5L2.625 23.375C2.22917 23.7708 1.77604 23.8594 1.26562 23.6406C0.755208 23.4219 0.5 23.0313 0.5 22.4688V3C0.5 2.3125 0.744792 1.72396 1.23438 1.23438C1.72396 0.744792 2.3125 0.5 3 0.5H23C23.6875 0.5 24.276 0.744792 24.7656 1.23438C25.2552 1.72396 25.5 2.3125 25.5 3V18C25.5 18.6875 25.2552 19.276 24.7656 19.7656C24.276 20.2552 23.6875 20.5 23 20.5H5.5ZM4.4375 18H23V3H3V19.4062L4.4375 18Z"
                      fill="#1C1B1F"
                    />
                  </svg>
                  Feedback
                </NavLink>
              </li>
              {/* <!-- Menu Item Tables --> */}
              <li>
                <NavLink
                  to="/EditMenu"
                  className={`group relative flex items-center gap-2.5 rounded-lg  py-2 px-4 font-bold   text-black  duration-300 ease-in-out hover:bg-[#BAE8B3]   dark:hover:bg-meta-4 ${
                    pathname.includes('tables') &&
                    'bg-[#BAE8B3]   dark:bg-meta-4'
                  }`}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 6.75H18.25C18.6042 6.75 18.901 6.86979 19.1406 7.10938C19.3802 7.34896 19.5 7.64583 19.5 8C19.5 8.35417 19.3802 8.65104 19.1406 8.89062C18.901 9.13021 18.6042 9.25 18.25 9.25H9.5C9.14583 9.25 8.84896 9.13021 8.60938 8.89062C8.36979 8.65104 8.25 8.35417 8.25 8C8.25 7.64583 8.36979 7.34896 8.60938 7.10938C8.84896 6.86979 9.14583 6.75 9.5 6.75ZM9.5 10.5H18.25C18.6042 10.5 18.901 10.6198 19.1406 10.8594C19.3802 11.099 19.5 11.3958 19.5 11.75C19.5 12.1042 19.3802 12.401 19.1406 12.6406C18.901 12.8802 18.6042 13 18.25 13H9.5C9.14583 13 8.84896 12.8802 8.60938 12.6406C8.36979 12.401 8.25 12.1042 8.25 11.75C8.25 11.3958 8.36979 11.099 8.60938 10.8594C8.84896 10.6198 9.14583 10.5 9.5 10.5ZM4.5 25.5C3.45833 25.5 2.57292 25.1354 1.84375 24.4062C1.11458 23.6771 0.75 22.7917 0.75 21.75V19.25C0.75 18.8958 0.869792 18.599 1.10938 18.3594C1.34896 18.1198 1.64583 18 2 18H4.5V3C4.5 2.3125 4.74479 1.72396 5.23438 1.23438C5.72396 0.744792 6.3125 0.5 7 0.5H20.75C21.4375 0.5 22.026 0.744792 22.5156 1.23438C23.0052 1.72396 23.25 2.3125 23.25 3V10.5C23.25 10.8542 23.1302 11.151 22.8906 11.3906C22.651 11.6302 22.3542 11.75 22 11.75C21.6458 11.75 21.349 11.6302 21.1094 11.3906C20.8698 11.151 20.75 10.8542 20.75 10.5V3H7V18H10.75C11.1042 18 11.401 18.1198 11.6406 18.3594C11.8802 18.599 12 18.8958 12 19.25C12 19.6042 11.8802 19.901 11.6406 20.1406C11.401 20.3802 11.1042 20.5 10.75 20.5H3.25V21.75C3.25 22.1042 3.36979 22.401 3.60938 22.6406C3.84896 22.8802 4.14583 23 4.5 23H10.75C11.1042 23 11.401 23.1198 11.6406 23.3594C11.8802 23.599 12 23.8958 12 24.25C12 24.6042 11.8802 24.901 11.6406 25.1406C11.401 25.3802 11.1042 25.5 10.75 25.5H4.5ZM14.5 24.25V22.1875C14.5 22.0208 14.5312 21.8594 14.5938 21.7031C14.6562 21.5469 14.75 21.4062 14.875 21.2812L21.4062 14.7812C21.5938 14.5938 21.8021 14.4583 22.0312 14.375C22.2604 14.2917 22.4896 14.25 22.7188 14.25C22.9688 14.25 23.2083 14.2969 23.4375 14.3906C23.6667 14.4844 23.875 14.625 24.0625 14.8125L25.2188 15.9688C25.3854 16.1562 25.5156 16.3646 25.6094 16.5938C25.7031 16.8229 25.75 17.0521 25.75 17.2812C25.75 17.5104 25.7083 17.7448 25.625 17.9844C25.5417 18.224 25.4063 18.4375 25.2188 18.625L18.7188 25.125C18.5938 25.25 18.4531 25.3438 18.2969 25.4063C18.1406 25.4688 17.9792 25.5 17.8125 25.5H15.75C15.3958 25.5 15.099 25.3802 14.8594 25.1406C14.6198 24.901 14.5 24.6042 14.5 24.25ZM16.375 23.625H17.5625L21.3438 19.8125L20.7812 19.2188L20.1875 18.6562L16.375 22.4375V23.625ZM20.7812 19.2188L20.1875 18.6562L21.3438 19.8125L20.7812 19.2188Z"
                      fill="#1C1B1F"
                    />
                  </svg>
                  Edit Menu
                </NavLink>
              </li>
              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Settings --> */}
              <li>
                <NavLink
                  to="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-lg  py-2 px-4 font-bold   text-black  duration-300 ease-in-out hover:bg-[#BAE8B3]   dark:hover:bg-meta-4 ${
                    pathname.includes('settings') &&
                    'bg-[#BAE8B3]   dark:bg-meta-4'
                  }`}
                >
                  <svg
                    width="24"
                    height="26"
                    viewBox="0 0 24 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5312 25.5C9.96873 25.5 9.48435 25.3125 9.0781 24.9375C8.67185 24.5625 8.42706 24.1042 8.34373 23.5625L8.06248 21.5C7.79164 21.3958 7.53643 21.2708 7.29685 21.125C7.05727 20.9792 6.82289 20.8229 6.59373 20.6562L4.65623 21.4688C4.13539 21.6979 3.61456 21.7188 3.09373 21.5312C2.57289 21.3438 2.16664 21.0104 1.87498 20.5312L0.406226 17.9688C0.114559 17.4896 0.0312256 16.9792 0.156226 16.4375C0.281226 15.8958 0.562476 15.4479 0.999976 15.0938L2.65623 13.8438C2.63539 13.6979 2.62498 13.5573 2.62498 13.4219V12.5781C2.62498 12.4427 2.63539 12.3021 2.65623 12.1562L0.999976 10.9062C0.562476 10.5521 0.281226 10.1042 0.156226 9.5625C0.0312256 9.02083 0.114559 8.51042 0.406226 8.03125L1.87498 5.46875C2.16664 4.98958 2.57289 4.65625 3.09373 4.46875C3.61456 4.28125 4.13539 4.30208 4.65623 4.53125L6.59373 5.34375C6.82289 5.17708 7.06248 5.02083 7.31248 4.875C7.56248 4.72917 7.81248 4.60417 8.06248 4.5L8.34373 2.4375C8.42706 1.89583 8.67185 1.4375 9.0781 1.0625C9.48435 0.6875 9.96873 0.5 10.5312 0.5H13.4687C14.0312 0.5 14.5156 0.6875 14.9219 1.0625C15.3281 1.4375 15.5729 1.89583 15.6562 2.4375L15.9375 4.5C16.2083 4.60417 16.4635 4.72917 16.7031 4.875C16.9427 5.02083 17.1771 5.17708 17.4062 5.34375L19.3437 4.53125C19.8646 4.30208 20.3854 4.28125 20.9062 4.46875C21.4271 4.65625 21.8333 4.98958 22.125 5.46875L23.5937 8.03125C23.8854 8.51042 23.9687 9.02083 23.8437 9.5625C23.7187 10.1042 23.4375 10.5521 23 10.9062L21.3437 12.1562C21.3646 12.3021 21.375 12.4427 21.375 12.5781V13.4219C21.375 13.5573 21.3541 13.6979 21.3125 13.8438L22.9687 15.0938C23.4062 15.4479 23.6875 15.8958 23.8125 16.4375C23.9375 16.9792 23.8541 17.4896 23.5625 17.9688L22.0625 20.5312C21.7708 21.0104 21.3646 21.3438 20.8437 21.5312C20.3229 21.7188 19.8021 21.6979 19.2812 21.4688L17.4062 20.6562C17.1771 20.8229 16.9375 20.9792 16.6875 21.125C16.4375 21.2708 16.1875 21.3958 15.9375 21.5L15.6562 23.5625C15.5729 24.1042 15.3281 24.5625 14.9219 24.9375C14.5156 25.3125 14.0312 25.5 13.4687 25.5H10.5312ZM10.75 23H13.2187L13.6562 19.6875C14.3021 19.5208 14.901 19.276 15.4531 18.9531C16.0052 18.6302 16.5104 18.2396 16.9687 17.7812L20.0625 19.0625L21.2812 16.9375L18.5937 14.9063C18.6979 14.6146 18.7708 14.3073 18.8125 13.9844C18.8541 13.6615 18.875 13.3333 18.875 13C18.875 12.6667 18.8541 12.3385 18.8125 12.0156C18.7708 11.6927 18.6979 11.3854 18.5937 11.0938L21.2812 9.0625L20.0625 6.9375L16.9687 8.25C16.5104 7.77083 16.0052 7.36979 15.4531 7.04688C14.901 6.72396 14.3021 6.47917 13.6562 6.3125L13.25 3H10.7812L10.3437 6.3125C9.69789 6.47917 9.09893 6.72396 8.54685 7.04688C7.99477 7.36979 7.48956 7.76042 7.03123 8.21875L3.93748 6.9375L2.71873 9.0625L5.40623 11.0625C5.30206 11.375 5.22914 11.6875 5.18748 12C5.14581 12.3125 5.12498 12.6458 5.12498 13C5.12498 13.3333 5.14581 13.6563 5.18748 13.9688C5.22914 14.2813 5.30206 14.5938 5.40623 14.9063L2.71873 16.9375L3.93748 19.0625L7.03123 17.75C7.48956 18.2292 7.99477 18.6302 8.54685 18.9531C9.09893 19.276 9.69789 19.5208 10.3437 19.6875L10.75 23ZM12.0625 17.375C13.2708 17.375 14.3021 16.9479 15.1562 16.0938C16.0104 15.2396 16.4375 14.2083 16.4375 13C16.4375 11.7917 16.0104 10.7604 15.1562 9.90625C14.3021 9.05208 13.2708 8.625 12.0625 8.625C10.8333 8.625 9.79685 9.05208 8.9531 9.90625C8.10935 10.7604 7.68748 11.7917 7.68748 13C7.68748 14.2083 8.10935 15.2396 8.9531 16.0938C9.79685 16.9479 10.8333 17.375 12.0625 17.375Z"
                      fill="#1C1B1F"
                    />
                  </svg>
                  Settings
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
