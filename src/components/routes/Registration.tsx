import { FC } from 'react';
import Breadcrumb from '../Breadcrumb';

const Registration: FC = () => (
    <>
        <Breadcrumb locationArray={['Home', 'New User Registration']} />
        <div className="site-layout-content">
            <div>Registration page</div>
        </div>
    </>
);

export default Registration;