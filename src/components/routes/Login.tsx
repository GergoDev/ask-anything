import { FC } from 'react';
import Breadcrumb from '../Breadcrumb';

const Login: FC = () => (
    <>
        <Breadcrumb locationArray={['Home', 'Login with your credentials']} />
        <div className="site-layout-content">
            <div>Login page</div>
        </div>
    </>
);

export default Login;