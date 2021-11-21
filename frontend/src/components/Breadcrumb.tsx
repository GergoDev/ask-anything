import { FC } from 'react';
import StyledBreadcrumb from './styles/Breadcrumb.styled';
import { Breadcrumb as origBreadcrumb } from 'antd';

const Breadcrumb: FC<{locationArray: string[] | undefined}> = ({locationArray}) => {
    return (<StyledBreadcrumb>
                {locationArray && locationArray.map((part: string, index: number) => (
                    <origBreadcrumb.Item key={index}>{part}</origBreadcrumb.Item>
                ))}
            </StyledBreadcrumb>)
}

export default Breadcrumb;
