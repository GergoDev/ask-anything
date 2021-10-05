import { Comment, Avatar } from 'antd';
import React from 'react';
import AnswerList from './AnswerList';
import Editor from './Editor';
import { AnswerInterface } from '../../interfaces/AnswerInterface';
import { NewAnswerInterface } from '../../interfaces/NewAnswerInterface';

class Answers extends React.Component<{question_id: string}> {  
  state = {
    answers: [],
    submitting: false,
    value: '',
  };

  fetchAnswers = async () => {
    const res = await fetch(`http://localhost:5000/answers`);
    const data = await res.json();
    return data;
  }

  addAnswer = async (answer: NewAnswerInterface) => {
    const res = await fetch('http://localhost:5000/answers',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(answer)
      })
    const newAnswer = await res.json();
    this.setState({
      submitting: false,
      value: '',
      answers: [...this.state.answers, newAnswer],
    });
  }

  deleteAnswer = async (answerId: number) => {
    await fetch(`http://localhost:5000/answers/${answerId}`, {method: 'DELETE'});
    this.setState({
      submitting: false,
      value: '',
      answers: [...this.state.answers.filter((answer: AnswerInterface) => answer.id !== answerId)],
    });
  }

  componentDidMount() {
      const getAnswers = async () => {
        const answers = await this.fetchAnswers();
        const filteredAnswers = answers.filter((answer: NewAnswerInterface) => answer.question_id === parseInt(this.props.question_id));
        this.setState({ answers: [...filteredAnswers] });
      }
      getAnswers();
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.addAnswer({
        author: 'Pisti',
        user_id: 1,
        question_id: 20,
        avatar: 'https://i.pravatar.cc/400?img=33',
        content: this.state.value,
        datetime: Date(),
      })
    }, 1000);
  };

  handleChange = (e: { target: { value: string; }; }) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { answers, submitting, value } = this.state;

    return (
      <div className="comment-section">
        <h2>Answers</h2>
        {answers.length > 0 && <AnswerList 
          answers={answers}
          deleteHandler={this.deleteAnswer} />}
        <Comment
          avatar={
            <Avatar
              src="https://i.pravatar.cc/400?img=33"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}

export default Answers;