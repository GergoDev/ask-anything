import { FC, useRef } from 'react';
import Breadcrumb from '../Breadcrumb';
import Result from '../Result';
import { Form, Input, InputNumber, Button, Card } from 'antd';
import { useMutation, gql } from '@apollo/client';

const SIGNUP_MUTATION = gql`
mutation SignupMutation(
    $name: String!
    $email: String!
    $password: String!
    $age: Int!
    $github: String!
    $introduction: String!
) {
signup(
    name: $name, 
    email: $email, 
    password: $password,
    age: $age,
    github: $github,
    introduction: $introduction) {
        user {
            name
        }
    }
}
`

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 24 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const Registration: FC = () => {
    const validData = useRef()

    const [signUp] = useMutation(SIGNUP_MUTATION, {
        variables: validData.current,
    });

    const onFinish = (values: any) => {
        validData.current = values.user
        signUp()
    };

    return (
        <>
            <Breadcrumb locationArray={['Home', 'New User Registration']} />
            <div className="site-layout-content">
            <Card className="registration-form-card">
                <h1>Registration</h1>
                {!validData.current ? <Form 
                                {...layout}
                                name="nest-messages"
                                onFinish={onFinish}
                                validateMessages={validateMessages}
                                labelCol={{ ...layout.labelCol }}
                                wrapperCol={{ ...layout.wrapperCol }}>
                        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                            <Input placeholder="Choose a Username" />
                        </Form.Item>
                        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' , required: true}]}>
                            <Input placeholder="Your Email Address" />
                        </Form.Item>
                        <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true}]} hasFeedback>
                            <Input.Password type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'password2']}
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue(['user', 'password']) === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password type="password" placeholder="Confirm Password" />
                        </Form.Item>
                        <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
                            <InputNumber placeholder="Age" />
                        </Form.Item>
                        <Form.Item name={['user', 'github']} label="Github">
                            <Input placeholder="Your GitHub Username" />
                        </Form.Item>
                        <Form.Item name={['user', 'introduction']} label="Introduction">
                            <Input.TextArea placeholder="Introduce Yourself" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: layout.labelCol.span }}>
                            <Button type="primary" size="large" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form> :
                <Result />}
            </Card>
            </div>
        </>
    );
};

export default Registration;
