import { FC, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';
import { Card, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useMutation, gql } from '@apollo/client';
import LoginContext from '../../loginContext';

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token,
      user {
        name
      }
    }
  }
`;

const Login: FC = () => {
    const [details, setDetails] = useState<{email?: string, password?: string}>({})
    const history = useHistory();
    const context = useContext(LoginContext)

    const [login] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: details.email,
            password: details.password
        },
        onCompleted: ({ login }) => {
            context.setLoggedInUser(login.user)
            localStorage.setItem("AUTH_TOKEN", login.token);
            history.push('/');
        },
        onError: (err) => message.error(err.message)
    });

    const onFinish = (values: any) => {
        setDetails({
            email: values.email,
            password: values.password
        })
        login()
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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
