import styled from 'styled-components';

export const StyledInputWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content: center;

    input {
        width: 100%;
        font-size: 0.8rem;
        font-weight: ${(props) => props.fontWeight || '600'};
        text-align: center;
        outline: 0;
        border: none;
        overflow: auto;

        background: transparent;
        color: ${(props) => props.color || 'black'};

        cursor: pointer;
        transition: width 300ms ease;

        &::placeholder {
            color: ${(props) => props.color || '#A9A9A9'}; 
            opacity: 0.8;
        }

        &:focus {
            outline: 0;
            color: ${(props) => props.color || 'black'};

            &::placeholder {
                color: transparent;
            }
        }
    }
`;