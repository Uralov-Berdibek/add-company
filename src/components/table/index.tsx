import React, { useEffect, useState } from 'react';
import { Table, Dropdown, MenuProps, Button, Spin, message, Modal } from 'antd';
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import CompanyModal from '../modal';

interface Company {
  key: string;
  id: string;
  name: string;
  count: number;
}

const API_URL = import.meta.env.VITE_API_URL;

const CompanyTable: React.FC = () => {
  const [data, setData] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        message.error('Авторизация не выполнена. Пожалуйста, войдите в систему.');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/companies/get-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedData = response.data.map((company: any, index: number) => ({
        key: String(index + 1),
        id: company.id,
        name: company.name,
        employees: `${company.count} человек`,
      }));

      setData(formattedData);
    } catch (error) {
      message.error('Ошибка при загрузке данных');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (company: Company) => {
    setSelectedCompany(company);
    setModalVisible(true);
  };

  const showDeleteConfirm = (company: Company) => {
    Modal.confirm({
      title: 'Вы хотите удалить?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Да',
      cancelText: 'Нет',
      okType: 'danger',
      centered: true,
      okButtonProps: { style: { backgroundColor: 'red', borderColor: 'red', order: 1 } },
      cancelButtonProps: {},
      onOk: async () => {
        try {
          const token = localStorage.getItem('authToken');

          if (!token) {
            message.error('Вы не авторизованы!');
            return;
          }

          await axios.delete(`${API_URL}/companies/delete/by-id`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            data: JSON.stringify(company.id),
          });

          message.success('Компания успешно удалена!');
          fetchCompanies();
        } catch (error: any) {
          console.error('Delete Error:', error);
          if (error.response?.status === 400) {
            message.error('Ошибка: неверный запрос. Проверьте ID.');
          } else if (error.response?.status === 415) {
            message.error('Ошибка 415: Неподдерживаемый формат данных.');
          } else {
            message.error('Ошибка при удалении компании');
          }
        }
      },
      onCancel() {
        console.log('Отмена удаления');
      },
    });
  };

  const menuItems = (company: Company): MenuProps['items'] => [
    {
      key: 'edit',
      label: (
        <span>
          <EditOutlined /> Изменить
        </span>
      ),
      onClick: () => openEditModal(company),
    },
    {
      key: 'delete',
      label: (
        <span style={{ color: 'red' }}>
          <DeleteOutlined /> Удалить
        </span>
      ),
      onClick: () => showDeleteConfirm(company),
      danger: true,
    },
  ];

  const columns = [
    {
      title: 'Название компании',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Количество сотрудников',
      dataIndex: 'employees',
      key: 'employees',
    },
    {
      key: 'actions',
      render: (record: Company) => (
        <Dropdown menu={{ items: menuItems(record) }} trigger={['click']}>
          <Button type='text' icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className='p-4'>
      {loading ? (
        <Spin size='large' />
      ) : (
        <div>
          <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} bordered />
          <CompanyModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSuccess={fetchCompanies}
            companyData={selectedCompany}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyTable;
