import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { toPng } from 'html-to-image'

import { MANDALART_INITIAL_STATE, mandalartState } from '../../state/mandalart'
import { Input } from '../../components/Input'
import { Modal } from '../../components/Modal'
import { Button } from '../../components/Button'
// import { BackgroundWithStars } from '../components/BackgroundWithStars'
import mandalaExampleImg from '../../../src/assets/images/mandala_example_02.png';
import {
    ModalBody,
    StyledButtonWrapper,
    StyledCenteredWrapper,
    StyledContentsWrapper,
    StyledMandalaTable,
    StyledMandalaTableCell,
    StyledMandalaTableWrapper,
    StyledTitle
} from './index.styles'

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
