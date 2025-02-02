import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import CompanyTable from '../components/table';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/sign-in', { replace: true });
    }
  }, [navigate]);

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <CompanyTable />
    </div>
  );
};

export default Dashboard;
