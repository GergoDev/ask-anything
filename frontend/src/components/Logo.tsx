import { FC } from 'react';
import { Link } from 'react-router-dom';
import StyledLogo from './styles/Logo.styled';

const Logo: FC = () => (
    <StyledLogo><Link to="/">Ask Anything</Link></StyledLogo>
);

export default Logo;