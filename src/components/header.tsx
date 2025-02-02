import { Button, Tooltip } from 'antd';
import LogoutIcon from './icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CompanyModal from './modal';

const Header: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/sign-in');
  };

  const openCreateModal = () => {
    setSelectedCompany(null);
    setModalVisible(true);
  };

  return (
    <div className='bg-[#313131] flex justify-between items-center p-4'>
      <h1 className='text-2xl font-bold text-white'>Компании</h1>
      <div className='flex items-center gap-4'>
        <Tooltip title='Logout'>
          <Button
            type='text'
            icon={<LogoutIcon />}
            onClick={handleLogout}
            className='text-white hover:text-gray-300'
          />
        </Tooltip>
        <Button type='primary' onClick={openCreateModal}>
          Добавить компания
        </Button>

        <CompanyModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSuccess={() => console.log('Обновить список компаний!')}
          companyData={selectedCompany}
        />
      </div>
    </div>
  );
};

export default Header;
