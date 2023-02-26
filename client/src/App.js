import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './components/user/user_dashboard/UserDashboard';
import UserLogin from './components/user/user_login/UserLogin';
import UserSignup from './components/user/user_signup/UserSignup';
import AdminLogin from './components/admin/admin_login/AdminLogin';
import AdminSignup from './components/admin/admin_signup/AdminSignup';
import AdminDashboard from './components/admin/admin_dashboard/AdminDashboard'
import MyOrders from './components/user/user_dashboard/my_orders/MyOrders';
import InvestorForm from './components/user/Investor_module/investorForm';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
           <Route path="/" element={<Navigate replace to="/user/login" />} />
           <Route path="/user/login" element={<UserLogin />} />
           <Route path="/user/signup" element={<UserSignup />} />
           <Route path="/user/dashboard" element={<Dashboard />} />           
           <Route path="/user/dashboard/myorders" element={<MyOrders />}  />       
           <Route path="/user/dashboard/investorForm" element={<InvestorForm />}  />   
               
           <Route path="/admin/login" element={<AdminLogin />} />           
           <Route path="/admin/signup" element={<AdminSignup />} />           
           <Route path="/admin/dashboard" element={<AdminDashboard />} />       
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
    );
}

export default App;