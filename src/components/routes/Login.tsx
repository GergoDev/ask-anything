import { FC } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Card, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login: FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (<>
        <Breadcrumb locationArray={['Home', 'Login with your credentials']} />
        <div className="site-layout-content">
            <Card className="login-form-card">
                <h1>Login</h1>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    >
                    <Form.Item
                        name="email"
                        rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large">
                        Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    </>);
}

export default Login;
