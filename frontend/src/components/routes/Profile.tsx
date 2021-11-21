import { FC } from 'react';
import Breadcrumb from '../Breadcrumb';

const Profile: FC = () => (
    <>
        <Breadcrumb locationArray={['Home', 'Your Profile Page']} />
        <div className="site-layout-content">
            <div>Profile page</div>
        </div>
    </>
);

export default Profile;