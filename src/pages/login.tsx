import { Form, Input, Button, Card, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL;
const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(`${API_URL}/auths/sign-in`, values);

      const token = response.data;
      localStorage.setItem('authToken', token);

      message.success('Вход выполнен успешно!');

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Ошибка при входе. Пожалуйста, проверьте логин и пароль.');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-[url(/bg.jpg)] bg-bottom bg-no-repeat bg-cover'>
      <Card className='w-96 shadow-lg bg-white bg-opacity-90'>
        <Title level={2} className='text-center mb-6'>
          Вход
        </Title>
        <Form
          name='login_form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout='vertical'
        >
          <Form.Item
            label='Логин'
            name='login'
            rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
          >
            <Input
              prefix={<MailOutlined className='text-gray-500' />}
              placeholder='Введите логин'
              className='rounded-sm'
            />
          </Form.Item>

          <Form.Item
            label='Пароль'
            name='password'
            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className='text-gray-500' />}
              placeholder='Введите пароль'
              className='rounded-sm'
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Вход
            </Button>
          </Form.Item>

          <div className='text-center'>
            <Button type='link' href='/sign-up'>
              Если у вас нет аккаунта? зарегистрируйтесь.
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
