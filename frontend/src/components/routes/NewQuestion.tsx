import { Button, Card, Form, Input } from 'antd';
import { FC, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const POST_QUESTION_MUTATION = gql`
mutation postQuestionMutation(
    $title: String!
    $message: String!){
    postQuestion(title: $title, message: $message) {
        id
    }
}
`

const NewQuestion: FC = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory()

    const [postQuestionMutation] = useMutation(POST_QUESTION_MUTATION, {
        variables: {title, message},
        onCompleted: (res) => history.push(`/question/${res.postQuestion.id}`)
    })

    return (<>
        <Breadcrumb locationArray={['Home', 'Create a New Question']} />
        <div className="site-layout-content">
            <Card className="new-question-card">
                <h1>New Question</h1>
                <Form
                    name="new-question"
                    onFinish={postQuestionMutation}
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