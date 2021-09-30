import { FC } from 'react';
import Logo from './Logo';
import { Menu } from 'antd';
import StyledHeader from './styles/Header.styled';
import { Link } from 'react-router-dom';

const Header: FC = () => (
    <StyledHeader>
        <Logo />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
          <Menu.Item key="0"><Link to="/">All Questions</Link></Menu.Item>
          <Menu.Item key="1"><Link to="/registration">Registration</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/profile">Profile</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/new-question">New Question</Link></Menu.Item>
        </Menu>    
    </StyledHeader>
)

export default Header;