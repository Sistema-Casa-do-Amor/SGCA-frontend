import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Users from './pages/Users';
import CompanionRegisterPage from './pages/CompanionRegister';
import Patients from './pages/Patients';
import PatientRegisterPage from './pages/PatientRegister';
import UserRegisterPage from './pages/UserRegister';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    <Route
      path="/"
      element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }
    >
      <Route index element={<Patients />} />
      <Route path="patients" element={<Patients />} />
      <Route path="users" element={<Users />} />
      <Route path="patient/register" element={<PatientRegisterPage />} />
      <Route path="patient/companion-register" element={<CompanionRegisterPage />} />
      <Route path="user/register" element={<UserRegisterPage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
