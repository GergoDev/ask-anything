import { FC, useEffect } from 'react';
import { Table } from 'antd';
import { Spin } from 'antd';
import Breadcrumb from '../../Breadcrumb';
import columns from './table_columns';
import { useQuery, gql } from '@apollo/client';

const FEED_QUERY = gql`
  query {
    feedQuestions {
      id
      key
      title
      message
      submissionTime
      view
      voteCount
    }
  }
`;

const AllQuestions: FC = () => {
    const { data, refetch } = useQuery(FEED_QUERY);
    
    useEffect(() => {refetch()})

    return (<>
      <Breadcrumb locationArray={['Home', 'All Questions']} />
      <div className="site-layout-content">
        {data ? <Table 
            columns={columns}
            dataSource={data.feedQuestions}
            bordered
            pagination= {{ 
                position: ['bottomCenter'],
                pageSize: 7
            }} /> :
            <div className="loading">
                <Spin tip="Loading..." />
            </div> }
      </div>
    </>)
};

export default AllQuestions;