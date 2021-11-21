import 'antd/dist/antd.css';
import { Layout } from 'antd';
import styled from '@emotion/styled';

const { Header } = Layout;

export default styled(Header)({
    display: 'flex',
    '.ant-menu': {
        minWidth: '45%'
    },
    '.ant-menu-title-content': {
        fontSize: '20px'
    },
    '.signed-in-user': {
        color: '#fff',
        marginRight: '5px',
        fontSize: '17px',
        fontWeight: 'bold',
        'span': {
            color: '#999797'
        }
    },
    '.logout-link': {
        color: 'red',
        cursor: 'pointer',
        marginRight: '5px',
    },
    '.avatar': {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        '.ant-avatar-circle': {
            backgroundColor: '#fff'
        }
    }
})
