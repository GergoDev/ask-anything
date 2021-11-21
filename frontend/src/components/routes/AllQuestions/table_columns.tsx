import { Link } from 'react-router-dom';
import { QuestionInterface } from '../../../interfaces/QuestionInterface';
import moment from 'moment';

const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: {
          compare: (a: QuestionInterface, b: QuestionInterface) => {
              let x = a.title.toLowerCase();
              let y = b.title.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
          },
          multiple: 3,
      },
      render: (title: string, record: QuestionInterface) => <Link to={`/question/${record.id}`}>{title}</Link>,
      width: '550px',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      render: (msg: string) => msg.length > 500 ? `${msg.substring(0, 500)}...` : msg
    },
    {
      title: 'Submission Time',
      dataIndex: 'submissionTime',
      sorter: {
          compare: (a: QuestionInterface, b: QuestionInterface) => {
              let x = a.submissionTime.toLowerCase();
              let y = b.submissionTime.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
          }
      },
      render: (timestamp: number) => moment(timestamp, "x").fromNow(),
      width: '215px'
    },
    {
      title: 'View',
      dataIndex: 'view',
      sorter: {
          compare: (a: QuestionInterface, b: QuestionInterface) => a.view - b.view
      },
    },
    {
      title: 'Vote',
      dataIndex: 'voteCount',
      sorter: {
          compare: (a: QuestionInterface, b: QuestionInterface) => a.voteCount - b.voteCount
      },
    },
  ];

export default columns;
