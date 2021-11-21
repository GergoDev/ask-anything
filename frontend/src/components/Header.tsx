import { FC, useState, useContext, useEffect } from 'react';
import Logo from './Logo';
import { Menu, Avatar } from 'antd';
import StyledHeader from './styles/Header.styled';
import { Link, useHistory } from 'react-router-dom';
import LoginContext from '../loginContext';
import { LogoutOutlined } from '@ant-design/icons';

const Header: FC = () => {
    const [user, setUser] = useState({ name: '' })
    const history = useHistory()
    const authToken = localStorage.getItem("AUTH_TOKEN");
    const context = useContext(LoginContext)
    
    useEffect(() => setUser(context.loggedInUser), [context])

    const logoutHandler = () => {
      localStorage.removeItem("AUTH_TOKEN")
      context.setLoggedInUser({ name: '' })
      history.push('/')
    }

    return (
    <StyledHeader>
        <Logo />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
          <Menu.Item key="0"><Link to="/">All Questions</Link></Menu.Item>
          {!authToken && <Menu.Item key="1"><Link to="/registration">Registration</Link></Menu.Item>}
          {!authToken && <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>}
          {/* <Menu.Item key="3"><Link to="/profile">Profile</Link></Menu.Item> */}
          {authToken && <Menu.Item key="4"><Link to="/new-question">New Question</Link></Menu.Item>}
        </Menu>
        {authToken && <div className="avatar">
          <span className="signed-in-user"><span>Logged in as</span> {user.name}</span>
          <span className="logout-link" onClick={logoutHandler}> <LogoutOutlined />logout</span>
          <Avatar 
              size={44}
              src="https://i.pravatar.cc/400?img=33"
              alt="{user.name}" />
        </div>}
    </StyledHeader>)
}

export default Header;