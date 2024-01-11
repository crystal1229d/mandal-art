import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { Grid } from '@mui/material'
import { toPng } from 'html-to-image'

import { MANDALART_INITIAL_STATE, mandalartState } from '../state/mandalart'
import { Input } from '../components/Input'
import { Modal } from '../components/Modal'
import { Button } from '../components/Button'
// import { BackgroundWithStars } from '../components/BackgroundWithStars'
import mandalaExampleImg from '../../src/assets/images/mandala_example_02.png';

export const MandalartPage = () => {
    const [mandalart, setMandalart] = useRecoilState(mandalartState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const captureSection = useRef(null);

    const handleChangeInput = (e) => {
        const tableId = e.target.dataset.tableid;
        const cellId = e.target.dataset.cellid;

        setMandalart((prev) => {
            const newState = [...prev];

            const updatedCells = [...newState[tableId].cells];
            updatedCells[cellId] = e.target.value;
            newState[tableId] = {
                ...newState[tableId],
                cells: updatedCells,
            };

            if (tableId*1 === 4 && cellId*1 !== 4) {
                // 중앙테이블에서 서브목표 입력 시, 변두리테이블의 서브목표가 간접적으로 입력됨 
                const table4Cells = [...newState[cellId].cells];
                table4Cells[4] = e.target.value;

                newState[cellId] = {
                    ...newState[cellId],
                    cells: table4Cells,
                };
            }

            return newState;
        });

    }

    const exportToImage = () => {
        if (captureSection.current === null) {
            return 
        }

        toPng(captureSection.current)
            .then((url) => {
                let link = document.createElement('a');
                link.download = 'my_mandalart.png';
                link.href = url;
                link.click();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleCloseModal = () => setIsModalOpen(false)

    const resetMandalart = () => {
        setMandalart(MANDALART_INITIAL_STATE);
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalBody>  
                    <img src={mandalaExampleImg} alt='maldalart example' />
                </ModalBody>
            </Modal>  
                
            <StyledCenteredWrapper>

                {/* <BackgroundWithStars /> */}

                <StyledContentsWrapper>
                        <StyledTitle>Mandalart</StyledTitle>
                    <StyledButtonWrapper>
                        <Button onClick={exportToImage} data-testid='btn-download'>이미지로 저장</Button>
                        <Button onClick={() => setIsModalOpen(true)}>예시</Button>
                        <Button onClick={resetMandalart}>초기화</Button>
                    </StyledButtonWrapper>
                    <StyledMandalaTableWrapper ref={captureSection}>
                        {mandalart.map(({id, _, cells}) => (
                            <StyledMandalaTable key={id}>
                                {cells.map((cell, idx) => (
                                    id === 4
                                    ? (<StyledMandalaTableCell key={`${id}_${idx}`}>
                                            <Input
                                                testid={`${id}_${idx}`}
                                                tableid={id}
                                                cellid={idx}
                                                placeholder={idx === 4 ? `최종목표` : `목표 ${idx > 4 ? idx : idx + 1}`}
                                                onChangeInput={handleChangeInput}
                                                value={cell}
                                                disabled={false}
                                                color={idx === 4 ? '#F6605B' : '#7C5181'}
                                                fontWeight={900}
                                            />
                                        </StyledMandalaTableCell>)
                                    : (<StyledMandalaTableCell key={`${id}_${idx}`}>
                                            <Input
                                                testid={`${id}_${idx}`}
                                                tableid={id}
                                                cellid={idx}
                                                placeholder={idx === 4 ? `목표 ${id > 4 ? id : id + 1}` : ''}
                                                onChangeInput={handleChangeInput}
                                                value={cell}
                                                disabled={idx === 4 ? true : false}
                                                color={idx === 4 ? '#7C5181' : 'black'}
                                                fontWeight={idx === 4 ? '900' : '600'}
                                            />
                                        </StyledMandalaTableCell>)
                                ))}
                            </StyledMandalaTable>
                        ))}
                    </StyledMandalaTableWrapper>
                </StyledContentsWrapper>

            </StyledCenteredWrapper>  
        </>
    )
}

const StyledCenteredWrapper = styled.div`
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

const StyledContentsWrapper = styled.div`
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

const StyledTitle = styled.h2`
    color: #2C2B32;
    font-size: 2.5rem;
    font-weight: 900;
    text-align: center;
    letter-spacing: 0.7rem;
    margin: 20px 0px;
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 20px;
`;

const StyledMandalaTableWrapper = styled(Grid)`
    width: 900px; 
    height: 900px;
    padding: 5px;

    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 6px;
`;

const StyledMandalaTable = styled(Grid)`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);

    border: none;
    outline: none;
`;

const StyledMandalaTableCell = styled(Grid)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #F3F3ED;

    border: 0.8px solid #C3C3C3;
`;

const ModalBody = styled.div`
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