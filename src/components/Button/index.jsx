import { StyledButton } from './index.styles';

export const Button = ({ children, onClick }) => {
    return (
        <StyledButton onClick={onClick}>{children}</StyledButton>
    )
}