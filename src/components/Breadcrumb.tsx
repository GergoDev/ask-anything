import { FC } from 'react';
import StyledBreadcrumb from './styles/Breadcrumb.styled';
import { Breadcrumb as origBreadcumb } from 'antd';

const Breadcrumb: FC = () => (
    <StyledBreadcrumb>
        <origBreadcumb.Item>Home</origBreadcumb.Item>
        <origBreadcumb.Item>List</origBreadcumb.Item>
        <origBreadcumb.Item>App</origBreadcumb.Item>
    </StyledBreadcrumb>
)

export default Breadcrumb;
