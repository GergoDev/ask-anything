import { Comment, List } from 'antd';
import IconBar from '../IconBar';
import { AnswerInterface } from '../../interfaces/AnswerInterface';
import moment from 'moment';

const AnswerList = ({ answers, deleteHandler }: {answers: AnswerInterface[], deleteHandler: Function}) => {
  return (<List
    dataSource={answers}
    header={`${answers.length} ${answers.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => {
      const alteredProps = {...props, datetime: moment(props.datetime).fromNow()};
      return (<Comment {...alteredProps} actions={[<IconBar 
      className="comment-icon-bar"
      editHandler={() => console.log(props)}
      deleteHandler={() => deleteHandler(props.id)} />]} />)}}
  />)
  };

export default AnswerList;