import { Route, Routes } from 'react-router-dom';
import Patients from './pages/Patients';
import Layout from './components/Layout';
import Users from './pages/Users';
import Register from './pages/Register';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index path="/patients" element={<Patients />} />
      <Route path="/users" element={<Users />} />
      <Route path='/patient/register' element={<Register />} />
    </Route>
  </Routes>
);

export default AppRoutes;