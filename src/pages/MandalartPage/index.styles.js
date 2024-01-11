import { Grid } from '@mui/material';
import styled from 'styled-components';

export const StyledCenteredWrapper = styled.div`
    width: 100vw;
    min-width: 1000px;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    overflow: hidden auto;

    background: rgb(44,43,50);
    background: linear-gradient(180deg, rgba(44,43,50,1) 10%, rgba(51,48,98,1) 25%, rgba(124,81,129,1) 56%, rgba(254,204,150,0.9234287464985994) 95%, rgba(246,96,56,0.9570421918767507) 100%);
`;

export const StyledContentsWrapper = styled.div`
    margin: 40px 0px;
    padding: 15px 30px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    backdrop-filter: blur(15px) saturate(180%);
    -webkit-backdrop-filter: blur(15px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.50);
`;

export const StyledTitle = styled.h2`
    color: #2C2B32;
    font-size: 2.5rem;
    font-weight: 900;
    text-align: center;
    letter-spacing: 0.7rem;
    margin: 20px 0px;
`;

export const StyledButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 20px;
`;

export const StyledMandalaTableWrapper = styled(Grid)`
    width: 800px; 
    height: 800px;
    padding: 5px;

    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 6px;
`;

export const StyledMandalaTable = styled(Grid)`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);

    border: none;
    outline: none;
`;

export const StyledMandalaTableCell = styled(Grid)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #F3F3ED;

    border: 0.8px solid #C3C3C3;
`;

export const ModalBody = styled.div`
    width: 100%;
    height: 100%;
    padding: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;

    border-radius: 8px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    overflow: hidden;

    img {
        max-width: 100%;
        height: 90%;
    }
`;