import { FC } from 'react';
import StyledBreadcrumb from './styles/Breadcrumb.styled';
import { Breadcrumb as origBreadcrumb } from 'antd';

const Breadcrumb: FC = () => (
    <StyledBreadcrumb>
        <origBreadcrumb.Item>Home</origBreadcrumb.Item>
        <origBreadcrumb.Item>List</origBreadcrumb.Item>
        <origBreadcrumb.Item>App</origBreadcrumb.Item>
    </StyledBreadcrumb>
)

export default Breadcrumb;
