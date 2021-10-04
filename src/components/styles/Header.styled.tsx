import 'antd/dist/antd.css';
import { Layout } from 'antd';
import styled from '@emotion/styled';

const { Header } = Layout;

export default styled(Header)({
    display: 'flex',
    '.ant-menu': {
        width: '80%'
    },
    '.ant-menu-title-content': {
        fontSize: '20px'
    },
    '.signed-in-user': {
        color: '#fff',
        marginRight: '10px',
        fontSize: '25px',
        fontWeight: 'bold'
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
