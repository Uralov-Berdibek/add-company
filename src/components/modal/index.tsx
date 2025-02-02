import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface CompanyModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  companyData?: { id?: string; name: string; count: number } | null | undefined;
}

const CompanyModal: React.FC<CompanyModalProps> = ({
  visible,
  onClose,
  onSuccess,
  companyData,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (companyData) {
      form.setFieldsValue({
        name: companyData.name,
        count: companyData.count,
      });
    } else {
      form.resetFields();
    }
  }, [companyData, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        message.error('Вы не авторизованы!');
        return;
      }

      const requestData = {
        id: companyData?.id,
        name: values.name,
        count: values.count,
      };

      if (companyData?.id) {
        // Обновление компании
        await axios.put(`${API_URL}/companies/update`, requestData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success('Компания успешно обновлена!');
      } else {
        // Создание новой компании
        await axios.post(`${API_URL}/companies/add`, requestData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success('Компания успешно добавлена!');
      }

      onSuccess();
      onClose();
    } catch (error) {
      message.error('Ошибка при обработке запроса.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={companyData ? 'Редактировать компанию' : 'Добавить компанию'}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          label='Название компании'
          name='name'
          rules={[{ required: true, message: 'Введите название компании' }]}
        >
          <Input placeholder='Введите название' />
        </Form.Item>

        <Form.Item
          label='Количество сотрудников'
          name='count'
          rules={[{ required: true, message: 'Введите количество сотрудников' }]}
        >
          <Input type='number' placeholder='Введите количество' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading} block>
            {companyData ? 'Сохранить изменения' : 'Добавить компанию'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CompanyModal;
