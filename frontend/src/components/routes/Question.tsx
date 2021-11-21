import { FC, useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';
import Answers from '../Answers/Answers';
import { Card, Row, Col, Modal, message } from 'antd';
import { LikeFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { QuestionInterface } from '../../interfaces/QuestionInterface';
import IconBar from '../IconBar';
import EditQuestion from '../EditQuestion';
import { gql, useQuery, useMutation } from '@apollo/client'
import moment from 'moment'

const { confirm } = Modal;

const FEED_QUESTION_QUERY = gql`
query feedQuestionQuery($id: ID!) {
    feedQuestion(id: $id) {
        title
        message
        submissionTime
        view
        voteCount
        answers {
            id
            key
            author
            content
            avatar
            datetime
        }
        user {
            name
        }
    }
}
`

const UPDATE_QUESTION_MUTATION = gql`
mutation updateQuestionMutation(
    $id: ID!
    $title: String!
    $message: String!) {
    updateQuestion(id: $id, title: $title, message: $message) {
        title
        message
    }
}
`

const DELETE_QUESTION_MUTATION = gql`
mutation deleteQuestionMutation($id: ID!){
    deleteQuestion(id: $id) {
      id
    }
  }
`

const ADD_VIEW_MUTATION = gql`
mutation addViewMutation($questionId: ID!){
    addView(questionId: $questionId) {
        view
    }
}
`

const VOTE_MUTATION = gql`
mutation voteMutation($questionId: ID!){
    vote(questionId: $questionId) {
        id
        question {
            voteCount
        }
    }
}
`

const Question: FC = () => {
    const {id}: {id: string} = useParams();
    const [question, setQuestion] = useState<QuestionInterface>();
    const [edit, setEdit] = useState(false);
    const history = useHistory();
    const viewCounted = useRef(false);

    useQuery(FEED_QUESTION_QUERY, {
        variables: { id: parseInt(id) },
        onCompleted: (res) => {
            setQuestion(res.feedQuestion)
        }
    })
    
    const [updateQuestion] = useMutation(UPDATE_QUESTION_MUTATION, {
        onCompleted: (res) => {
            setQuestion({...question, ...res.updateQuestion})
            setEdit(false)
        }
    })

    const editHandler = (values: any) => {
        updateQuestion({ variables: {
            id: id,
            title: values.title,
            message: values.message
        }})
    }

    const [deleteQuestion] = useMutation(DELETE_QUESTION_MUTATION, {
        onCompleted: () => history.push('/')
    })

    const deleteHandler = () => {
        deleteQuestion({ variables: { id: id } })
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

    const [addViewMutation] = useMutation(ADD_VIEW_MUTATION, {
        variables: { questionId: id },
        onCompleted: (res) => setQuestion({...question, ...res.addView})
    })

    useEffect(() => {
        if(!viewCounted.current && question) {
            addViewMutation()
            viewCounted.current = true
        } else {
            viewCounted.current = false
        }
    }, [addViewMutation, question])

    const [voteMutation] = useMutation(VOTE_MUTATION, {
        variables: { questionId: Number(id) },
        onCompleted: (res) => setQuestion({...question, ...res.vote.question}),
        onError: (err) => message.error(err.message)
    })

    return (
        <>
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
                            {moment(question.submissionTime, "x").fromNow()}
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card size="small" title="Author" bordered={true}>
                            {question.user.name}
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card size="small" title="Views" bordered={true}>
                            {question.view}
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card 
                                size="small"
                                title="Votes"
                                bordered={true}
                                extra={<span className="like-link" onClick={() => voteMutation()}><LikeFilled />LIKE</span>}>
                            {question.voteCount && question.voteCount}
                            </Card>
                        </Col>
                    </Row>
                    <Card className="question-message">
                        <div dangerouslySetInnerHTML={{__html: question.message.replace(/(\r\n|\n\r|\r|\n)/g, '<br>')}}></div>
                    </Card>
                    <Answers questionId={id} answersProp={question.answers} />
                </Card>}
            </div>
        </>
    )
}

export default Question;
