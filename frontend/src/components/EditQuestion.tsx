import { Button, Card, Form, Input } from 'antd';
import { FC, useEffect } from 'react';
import { QuestionInterface } from '../interfaces/QuestionInterface';

type editQuestionProps = {
    question: QuestionInterface,
    editHandler: (values: any) => void
}

const EditQuestion: FC<editQuestionProps> = ({question, editHandler}) => {
    const [form] = Form.useForm();
    useEffect(() => form.setFieldsValue({title: question.title, message: question.message}), [question, form]);

    return (<Card className="edit-question-card">
                <Form
                    name="edit-question"
                    form={form}
                    onFinish={editHandler}
                    autoComplete="off"
                    >
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please input the title of your question!' }]}
                    >
                        <Input 
                            placeholder="Title" />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        rules={[{ required: true, message: 'Please input your question description!' }]}
                    >
                        <Input.TextArea
                            placeholder="Description"
                            rows={10} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large">
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </Card>);
    }

export default EditQuestion;
