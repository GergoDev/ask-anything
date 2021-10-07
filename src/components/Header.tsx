import { FC } from 'react';
import Logo from './Logo';
import { Menu, Avatar } from 'antd';
import StyledHeader from './styles/Header.styled';
import { Link } from 'react-router-dom';

const Header: FC = () => (
    <StyledHeader>
        <Logo />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
          <Menu.Item key="0"><Link to="/">All Questions</Link></Menu.Item>
          <Menu.Item key="1"><Link to="/registration">Registration</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
          {/* <Menu.Item key="3"><Link to="/profile">Profile</Link></Menu.Item> */}
          <Menu.Item key="4"><Link to="/new-question">New Question</Link></Menu.Item>
        </Menu>
        <div className="avatar">
          <span className="signed-in-user">Pisti</span>
          <Avatar 
            size={44}
            src="https://i.pravatar.cc/400?img=33"
            alt="Pisti" />
        </div>
    </StyledHeader>
)

export default Header;