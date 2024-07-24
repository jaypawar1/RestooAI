import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import QrGeneration from './pages/Qrgeneration/QrGeneration';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Step2 from './pages/Qrgeneration/Step2';

import RestooAI from './pages/signup/page1';
import Onbording1 from './pages/signup/onbordingStart';
import WhatsAppOnboard from './pages/signup/WhatsAppLink';
import WhatsAppForm from './pages/signup/WhatsAppForm';
import Login from './pages/login/login';
import FeedbackAnalysis from './pages/FeedBack/feedbackAnalysis';
import EditFeedBack from './pages/FeedBack/editFeedBack';
import MenuNoti from './pages/menunot';
import EditMenu from './pages/EditMenu/editMenu';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const publicRoutes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RestooAI />} />
      <Route path="auth/signin" element={<SignIn />} />
      <Route path="auth/signup" element={<SignUp />} />
    </Routes>
  );



  const privateRoutes = (

      <Routes>
         <Route path="/onboarding" element={<Onbording1 />} />
    <Route path="/whatsappform" element={<WhatsAppForm />} />
    <Route path="/whatsapponboard" element={<WhatsAppOnboard />} />
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/QrGeneration"
          element={
            <>
              <PageTitle title="QrGeneration | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <QrGeneration />
            </>
          }
        />
        <Route
          path="/Step2/:id"
          element={
            <>
              <PageTitle title="QrGeneration | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Step2 />
            </>
          }
        />
         <Route
          path="/notifi"
          element={
            <>
              <PageTitle title="QrGeneration | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <MenuNoti/>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route path='/FeedbackAnalysis' element={
          <>
            <PageTitle title='' />
            <FeedbackAnalysis />
          </>
        } />
        <Route path='/EditFeedback' element={
          <>
            <PageTitle title='' />
            <EditFeedBack />
          </>
        } />
        <Route
          path="/EditMenu"
          element={
            <>
              <PageTitle title="Edit Menu | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <EditMenu />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
      </Routes>
  );

  return loading ? (
    <Loader />
  ) : (

      !token ? (
        publicRoutes
      ) : (
        <>
          {privateRoutes}
        </>
      )

  );
}

export default App;
