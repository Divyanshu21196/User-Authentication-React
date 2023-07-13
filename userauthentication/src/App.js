import './App.css';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { PrivateRoute } from './component/PrivateRoute';
import { Home } from './Home/Home';
import { AccountLayout } from './account';
import EmployeeForm from './Home/EmployeeForm';


function App() {
  return (
    <div className="container">
        <Routes>
            {/* private */}
              <Route element={<PrivateRoute />}>
              <Route path="/employe" element={<Home />} />
              <Route path="/employe/add" element={<EmployeeForm />} />
              <Route path="/employe/edit/:id" element={<EmployeeForm />} />
            </Route>
            {/* public */}
              <Route path="account/*" element={<AccountLayout />} />
              <Route path="*" element={<Navigate to="/account/login" />} />
        </Routes>
      </div>
  );
}

export default App;
