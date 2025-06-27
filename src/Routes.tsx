import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Users from './pages/Users';
import CompanionRegisterPage from './pages/CompanionRegister';
import Patients from './pages/Patients';
import PatientRegisterPage from './pages/PatientRegister';
import UserRegisterPage from './pages/UserRegister';
import LoginPage from './pages/Login';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    {/* TODO: PrivateRoute verificará se o usuário está logado antes de renderizar o Layout */}
    {/* <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}> */}

    <Route path="/" element={<Layout />}>
      <Route index path="/patients" element={<Patients />} />
      <Route path="/users" element={<Users />} />
      <Route path='/patient/register' element={<PatientRegisterPage />} />
      <Route path='/patient/companion-register' element={<CompanionRegisterPage />} />
      <Route path="/user/register" element={<UserRegisterPage />} />
    </Route>

    {/* adicionar uma rota de fallback para 404 */}
    {/* <Route path="*" element={<NotFoundPage />} /> */}
  </Routes>
);

export default AppRoutes;