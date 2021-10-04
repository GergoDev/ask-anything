import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import React, { ChangeEventHandler, MouseEventHandler } from 'react';

const { TextArea } = Input;

interface AnswerType {
    author: string,
    avatar: string,
    content: JSX.Element,
    datetime: Date
}

const AnswerList = ({ answers }: {answers: AnswerType[]}) => (
  <List
    dataSource={answers}
    header={`${answers.length} ${answers.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }: {onChange: ChangeEventHandler<HTMLTextAreaElement>, onSubmit: MouseEventHandler<HTMLElement>, submitting: boolean, value: string}) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Answer
      </Button>
    </Form.Item>
  </>
);

class Comments extends React.Component {
  state = {
    answers: [],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        answers: [
          ...this.state.answers,
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
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
        {answers.length > 0 && <AnswerList answers={answers} />}
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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

export default Comments;