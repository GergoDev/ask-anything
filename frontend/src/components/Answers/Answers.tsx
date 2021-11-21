import { Comment, Avatar } from 'antd';
import { useState, useEffect } from 'react';
import AnswerList from './AnswerList';
import Editor from './Editor';
import { AnswerInterface } from '../../interfaces/AnswerInterface';
import { gql, useMutation } from '@apollo/client'

const POST_ANSWER_MUTATION = gql`
mutation postAnswerMutation(
  $questionId: ID!
  $content: String!
  $avatar: String!
){
  postAnswer(
    questionId: $questionId,
    content: $content,
    avatar: $avatar) {
      id
      key
      author
      content
      avatar
      datetime
    }
}
`

const DELETE_ANSWER_MUTATION = gql`
mutation deleteAnswerMutation($id: ID!){
  deleteAnswer(id: $id) {
    id
  }
}
`

type propTypes = {
  questionId: string,
  answersProp: AnswerInterface[],
}

const Answers = ({questionId, answersProp}: propTypes) => {
  const [answers, setAnswers] = useState<AnswerInterface[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState("")

  useEffect(() => {
    setAnswers([...answersProp])
  }, [answersProp])

  const [deleteAnswerMutation] = useMutation(DELETE_ANSWER_MUTATION, {
    onCompleted: (res) => setAnswers(answers.filter((answer) => answer.id !== res.deleteAnswer.id))
  })

  const deleteAnswerHandler = (answerId: number) => {
    deleteAnswerMutation({ variables: { id: answerId } })
  }

  const handleChange = (e: { target: { value: string; }; }) => {
    setValue(e.target.value)
  }

  const [postAnswerMutation] = useMutation(POST_ANSWER_MUTATION, {
    variables: {
      questionId,
      content: value,
      avatar: "https://i.pravatar.cc/400?img=12",
    },
    onCompleted: (res) => {
      setAnswers([...answers, res.postAnswer])
      setValue("")
      setSubmitting(false)
    }
  })

  const handleSubmit = () => {
    if(!value)
      return
    
    setSubmitting(true)

    setTimeout(() => {
      postAnswerMutation()
    }, 1000)
  }

  return (
    <div className="comment-section">
      <h2>Answers</h2>
      {answers.length > 0 && <AnswerList 
        answers={answers}
        deleteHandler={deleteAnswerHandler} />}
      <Comment
        avatar={
          <Avatar
            src="https://i.pravatar.cc/400?img=33"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  );
}

export default Answers;