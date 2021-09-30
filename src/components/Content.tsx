import { FC } from 'react';
import StyledContent from './styles/Content.styled';

const Content: FC = ({children}) => (
    <StyledContent>{children}</StyledContent>
);

export default Content;