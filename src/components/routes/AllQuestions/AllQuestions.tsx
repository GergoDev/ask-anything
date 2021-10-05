import { FC, useState, useEffect } from 'react';
import { Table } from 'antd';
import Breadcrumb from '../../Breadcrumb';
import columns from './table_columns';

const AllQuestions: FC = () => {
    const [questions, setQuestions] = useState();

    const fetchData = async () => {
        const res = await fetch(`http://localhost:5000/questions`);
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        const getQuestions = async () => {
            const data = await fetchData();
            setQuestions(data);
        }
        getQuestions();
    }, [])

    return (<>
      <Breadcrumb locationArray={['Home', 'All Questions']} />
      <div className="site-layout-content">
        <Table 
            columns={columns}
            dataSource={questions}
            bordered
            pagination= {{ 
                position: ['bottomCenter'],
                pageSize: 1
            }} />
      </div>
    </>)
};

export default AllQuestions;