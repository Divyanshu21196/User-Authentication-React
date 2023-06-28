import './App.css';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { PrivateRoute } from './component/PrivateRoute';
import { Home } from './Home/Home';
import { AccountLayout } from './account';

function App() {
  return (
    <div className="container">
        <Routes>
            {/* private */}
              <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            {/* public */}
              <Route path="account/*" element={<AccountLayout />} />
              <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
  );
}

export default App;
