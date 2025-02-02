import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL;
const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post(`${API_URL}/auths/sign-up`, values);
      console.log('Registration successful:', response.data);
      message.success('Регистрация прошла успешно!');

      navigate('/sig-in');
    } catch (error) {
      console.error('Registration failed:', error);
      message.error('Ошибка при регистрации. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-[url(/bg.jpg)] bg-bottom bg-no-repeat bg-cover'>
      <Card className='w-96 shadow-lg'>
        <Title level={2} className='text-center'>
          Регистрация
        </Title>
        <Form
          name='register_form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout='vertical'
        >
          <Form.Item
            label='ФИО'
            name='fullName'
            rules={[{ required: true, message: 'Пожалуйста, введите ваше ФИО!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder='Введите ФИО' />
          </Form.Item>

          <Form.Item
            label='Логин'
            name='login'
            rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
          >
            <Input prefix={<MailOutlined />} placeholder='Введите логин' />
          </Form.Item>

          <Form.Item
            label='Пароль'
            name='password'
            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder='Введите пароль' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div className='text-center'>
            <Button type='link' href='/sign-in'>
              Уже есть аккаунт? Войти
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
