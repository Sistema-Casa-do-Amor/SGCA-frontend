import { Route, Routes } from 'react-router-dom';
import Patients from './pages/Patients';
import Layout from './components/Layout';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index path="/patients" element={<Patients />} />
      {/* <Route path="/patients" element={<Users />} /> */}
      {/* Adicione outras rotas aqui */}
      {/* <Route path="/patients/:id" element={<PatientDetails />} /> */}
      {/* <Route path="/patients/new" element={<NewPatient />} /> */}
      {/* Adicione outras rotas aqui */}
      {/* <Route path="/about" element={<About />} /> */}
    </Route>
  </Routes>
);

export default AppRoutes;