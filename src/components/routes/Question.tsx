import { FC, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';
import Answers from '../Answers/Answers';
import { Card, Row, Col, Modal } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { QuestionInterface } from '../../interfaces/QuestionInterface';
import IconBar from '../IconBar';
import EditQuestion from '../EditQuestion';

const { confirm } = Modal;

const Question: FC = () => {
    const {id}: {id: string} = useParams();
    const [question, setQuestion] = useState<QuestionInterface>();
    const [redirect, setRedirect] = useState("");
    const [edit, setEdit] = useState(false);

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
    }, [id, edit])
    
    const editHandler = async (values: any) => {
        const updatedQuestion = {
            ...question,
            title: values.title,
            message: values.message,
        }
        await fetch(`http://localhost:5000/questions/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(updatedQuestion)
            })
        setEdit(false);
    }

    const deleteHandler = async () => {
        await fetch(`http://localhost:5000/questions/${id}`,
            {method: 'DELETE'});
        setRedirect("/");
    }

    function showDeleteConfirm() {
        confirm({
          title: 'Delete this question?',
          icon: <ExclamationCircleOutlined />,
          content: 'Are you sure you want to delete this question?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteHandler();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    return (
        <>
            {redirect && <Redirect to={redirect} />}
            <Breadcrumb locationArray={['Home', 'Question', question ? question.title : '']} />
            <div className="site-layout-content">  
                {question && <Card 
                                title={question.title}
                                className="question-card"
                                extra={<IconBar 
                                            className="question-icon-bar"
                                            editHandler={() => setEdit(true)}
                                            deleteHandler={showDeleteConfirm} />}>
                    {edit && <EditQuestion question={question} editHandler={editHandler} />}
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
