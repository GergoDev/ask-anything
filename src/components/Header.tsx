import { FC } from 'react';
import Logo from './Logo';
import { Menu } from 'antd';
import StyledHeader from './styles/Header.styled';

const Header: FC = () => (
    <StyledHeader>
        <Logo />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
          <Menu.Item key="0">Home</Menu.Item>
          <Menu.Item key="1">Register</Menu.Item>
          <Menu.Item key="2">Login</Menu.Item>
          <Menu.Item key="3">All Questions</Menu.Item>
          <Menu.Item key="4">Tags</Menu.Item>
        </Menu>    
    </StyledHeader>
)

export default Header;