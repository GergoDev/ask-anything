import { FC } from 'react';
import Breadcrumb from '../Breadcrumb';

const NewQuestion: FC = () => (
    <>
        <Breadcrumb locationArray={['Home', 'Create a New Question']} />
        <div className="site-layout-content">
            <div>New question page</div>
        </div>
    </>
);

export default NewQuestion;