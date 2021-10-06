import { Button, Card, Form, Input } from 'antd';
import { FC, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Redirect } from 'react-router-dom';

const NewQuestion: FC = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    const onFinish = async () => {
        console.log('Success:', title, message);
        await fetch('http://localhost:5000/questions',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "key": 1,
                    "user_id": 1,
                    "user_name": "Zoli",
                    "by": "gergo@gmail.com",
                    "title": title,
                    message,
                    "submission_time": Date(),
                    "view": 0,
                    "vote": 0
                })
            }
        )
        setRedirect(true);
    };

    return (<>
        {redirect && <Redirect to="/" />}
        <Breadcrumb locationArray={['Home', 'Create a New Question']} />
        <div className="site-layout-content">
            <Card className="new-question-card">
                <h1>New Question</h1>
                <Form
                    name="new-question"
                    onFinish={onFinish}
                    autoComplete="off"
                    >
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please input the title of your question!' }]}
                    >
                        <Input 
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title} />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        rules={[{ required: true, message: 'Please input your question description!' }]}
                    >
                        <Input.TextArea
                            placeholder="Description"
                            rows={10} onChange={(e) => setMessage(e.target.value)}
                            value={message} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large">
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    </>);
    }

export default NewQuestion;