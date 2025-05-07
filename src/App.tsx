import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <AppRoutes />
    </Router>
  );
}

export default App;
