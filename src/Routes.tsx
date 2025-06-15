import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Users from './pages/Users';
import CompanionRegisterPage from './pages/CompanionRegister';
import Patients from './pages/Patients';
import RegisterPage from './pages/PatientRegister';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index path="/patients" element={<Patients />} />
      <Route path="/users" element={<Users />} />
      <Route path='/patient/register' element={<RegisterPage />} />
      <Route path='/patient/companion-register' element={<CompanionRegisterPage />}></Route>
    </Route>
  </Routes>
);

export default AppRoutes;