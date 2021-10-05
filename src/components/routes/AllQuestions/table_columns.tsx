import { Link } from 'react-router-dom';
import { DataItem } from '../../../interfaces/DataItem';

const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: {
          compare: (a: DataItem, b: DataItem) => {
              let x = a.title.toLowerCase();
              let y = b.title.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
          },
          multiple: 3,
      },
      render: (title: string, record: DataItem) => <Link to={`/question/${record.id}`}>{title}</Link>,
      width: '550px',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      render: (msg: string) => `${msg.substring(0, 500)}...`
    },
    {
      title: 'Submission Time',
      dataIndex: 'submission_time',
      sorter: {
          compare: (a: DataItem, b: DataItem) => {
              let x = a.submission_time.toLowerCase();
              let y = b.submission_time.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
          }
      },
      width: '215px'
    },
    {
      title: 'View',
      dataIndex: 'view',
      sorter: {
          compare: (a: DataItem, b: DataItem) => a.view - b.view
      },
    },
    {
      title: 'Vote',
      dataIndex: 'vote',
      sorter: {
          compare: (a: DataItem, b: DataItem) => a.vote - b.vote
      },
    },
  ];

export default columns;
