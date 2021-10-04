import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';
import Comments from '../Comments';
import { Card, Row, Col } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { DataItem } from '../../interfaces/DataItem';
import data from '../../mock_data';

const Question: FC = () => {
    const {id}: {id: string} = useParams();
    const [question, setQuestion] = useState<DataItem>();

    const loadData = (id: string) => {
        return data.filter((question) => question.question_id === parseInt(id))[0];
    }

    useEffect(() => {
        const question = loadData(id);
        setQuestion(question);
    }, [id]);

    return (
        <>
            <Breadcrumb locationArray={['Home', 'Question', 'How to set a custom ringtone on your Nokia 3310?']} />
            <div className="site-layout-content">  
                {question && <Card title={question.title} className="question-card">
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
                            <Card size="small" title="Vote" bordered={true} extra={<><a href="http://google.com"><CaretUpOutlined /></a><a href="http://google.com"><CaretDownOutlined /></a></>}>
                            {question.vote}
                            </Card>
                        </Col>
                    </Row>
                    <Card className="question-message">
                        <div dangerouslySetInnerHTML={{__html: question.message.replace(/(\r\n|\n\r|\r|\n)/g, '<br>')}}></div>
                    </Card>
                    <Comments />
                </Card>}
            </div>
        </>
    )
}

export default Question;
