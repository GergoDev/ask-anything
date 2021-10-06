import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';
import Answers from '../Answers/Answers';
import { Card, Row, Col } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { QuestionInterface } from '../../interfaces/QuestionInterface';
import IconBar from '../IconBar';

const editHandler = () => console.log('edit clicked');
const deleteHandler = () => console.log('edit clicked');

const Question: FC = () => {
    const {id}: {id: string} = useParams();
    const [question, setQuestion] = useState<QuestionInterface>();

    const fetchQuestion = async (id: number) => {
        const res = await fetch(`http://localhost:5000/questions/${id}`);
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        const getData = async () => {
            const question = await fetchQuestion(parseInt(id));
            setQuestion(question);
        }
        getData();
    }, [id])

    return (
        <>
            <Breadcrumb locationArray={['Home', 'Question', 'How to set a custom ringtone on your Nokia 3310?']} />
            <div className="site-layout-content">  
                {question && <Card 
                                title={question.title}
                                className="question-card"
                                extra={<IconBar 
                                            className="question-icon-bar"
                                            editHandler={editHandler}
                                            deleteHandler={deleteHandler} />}>
                    <Row gutter={16} className="details">
                        <Col span={6}>
                            <Card size="small" title="Submitted at" bordered={true}>
                            {question.submission_time}
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card size="small" title="Author" bordered={true}>
                            {question.user_name}
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card size="small" title="View" bordered={true}>
                            {question.view}
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card 
                                size="small"
                                title="Vote"
                                bordered={true}
                                extra={<><a href="http://google.com">UP<CaretUpOutlined /></a><a href="http://google.com">DOWN<CaretDownOutlined /></a></>}>
                            {question.vote}
                            </Card>
                        </Col>
                    </Row>
                    <Card className="question-message">
                        <div dangerouslySetInnerHTML={{__html: question.message.replace(/(\r\n|\n\r|\r|\n)/g, '<br>')}}></div>
                    </Card>
                    <Answers question_id={id} />
                </Card>}
            </div>
        </>
    )
}

export default Question;
