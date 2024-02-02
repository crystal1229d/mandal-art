import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import userEvent from '@testing-library/user-event'
import { MandalartPage } from './index.jsx'
    
const renderComponent = () => {
    render(
        <RecoilRoot>
            <MandalartPage />
        </RecoilRoot>
    )

    const title = screen.getByText('Mandalart');
    const exportToImageButton = screen.getByText('이미지로 저장');
    const showExampleButton = screen.getByText('예시');
    const resetButton = screen.getByText('초기화');

    const mainGoal = screen.getByPlaceholderText('최종목표');
    const subGoal1 = screen.getByTestId('4_0');
    const subGoal2 = screen.getByTestId('4_1');
    const subGoal3 = screen.getByTestId('4_2');
    const subGoal4 = screen.getByTestId('4_3');
    const subGoal5 = screen.getByTestId('4_4');
    const subGoal6 = screen.getByTestId('4_5');
    const subGoal7 = screen.getByTestId('4_6');
    const subGoal8 = screen.getByTestId('4_7');
    const practice1_1 = screen.getByTestId('1_1');
    const practice0_4 = screen.getByTestId('0_4');

    return {
        title, 
        exportToImageButton, 
        showExampleButton, 
        resetButton, 
        mainGoal, 
        subGoal1,
        subGoal2,
        subGoal3,
        subGoal4,
        subGoal5,
        subGoal6,
        subGoal7,
        subGoal8,
        practice1_1, 
        practice0_4, 
    }
}

describe('만다라트 페이지', () => {
    describe('컴포넌트 렌더링', () => {
        test('만다라트 테이블이 렌더링되는가', () => {
            const {
                mainGoal, 
                subGoal1,
                subGoal2,
                subGoal3,
                subGoal4,
                subGoal5,
                subGoal6,
                subGoal7,
                subGoal8,
                practice1_1, 
            } = renderComponent();

            expect(mainGoal).toBeInTheDocument();
            expect(subGoal1).toBeInTheDocument();
            expect(subGoal2).toBeInTheDocument();
            expect(subGoal3).toBeInTheDocument();
            expect(subGoal4).toBeInTheDocument();
            expect(subGoal5).toBeInTheDocument();
            expect(subGoal6).toBeInTheDocument();
            expect(subGoal7).toBeInTheDocument();
            expect(subGoal8).toBeInTheDocument();
            expect(practice1_1).toBeInTheDocument();
        })

        test('타이틀 로고와 버튼이 렌더링되는가', () => {
            const {
                title,
                exportToImageButton,
                showExampleButton,
                resetButton,
            } = renderComponent();

            expect(title).toBeInTheDocument();
            expect(exportToImageButton).toBeInTheDocument();
            expect(showExampleButton).toBeInTheDocument();
            expect(resetButton).toBeInTheDocument();
        })    
    })

    describe('상호작용에 대한 액션', () => {
        test('해당하는 Sub테이블의 목표는 Sub테이블에서 직접 입력이 불가능하다', async () => {
            const { subGoal1, practice0_4 } = renderComponent();
            expect(subGoal1).toBeInTheDocument()
            expect(practice0_4).toBeInTheDocument()

            await userEvent.type(practice0_4, '건강')
            expect(subGoal1.value).toBe('')
            expect(practice0_4.value).toBe('')
        })

        test('중앙 테이블에서 Sub목표 입력 시, 해당하는 Sub테이블의 목표도 자동으로 입력된다', async () => {
            const { mainGoal, subGoal1, practice1_1, practice0_4, } = renderComponent();
            expect(mainGoal).toBeInTheDocument()
            expect(subGoal1).toBeInTheDocument()
            expect(practice1_1).toBeInTheDocument()
            expect(practice0_4).toBeInTheDocument()

            await userEvent.type(mainGoal, '2024목표')
            await userEvent.type(subGoal1, '건강')
            await userEvent.type(practice1_1, '유산소30분')

            expect(subGoal1.value).toBe('건강')
            expect(practice0_4.value).toBe('건강')
        })

        test('만다라트가 초기화된다', async () => {
            const { resetButton, mainGoal, subGoal1, practice1_1, } = renderComponent();
            expect(resetButton).toBeInTheDocument()
            expect(mainGoal).toBeInTheDocument()
            expect(subGoal1).toBeInTheDocument()
            expect(practice1_1).toBeInTheDocument()

            await userEvent.type(mainGoal, '2024목표')
            await userEvent.type(subGoal1, '건강')
            await userEvent.type(practice1_1, '유산소30분')

            await userEvent.click(resetButton);
            expect(mainGoal.value).toBe('')
            expect(subGoal1.value).toBe('')        
            expect(practice1_1.value).toBe('')           
        })

        const htmlToImage = require('html-to-image')
        test('만다라트를 이미지 파일로 저장할 수 있다', async () => {
            // const downloadButton = screen.getByTestId('btn-download');
            // expect(downloadButton).toBeInTheDocument()
            const { exportToImageButton } = renderComponent()
            expect(exportToImageButton).toBeInTheDocument()
            const spiedToPng = jest.spyOn(htmlToImage, 'toPng')

            await userEvent.click(exportToImageButton)
            expect(spiedToPng).toHaveBeenCalledTimes(1)
        })

        test('예시를 모달에서 볼 수 있다', async () => {
            const { showExampleButton } = renderComponent()
            expect(showExampleButton).toBeInTheDocument()

            await userEvent.click(showExampleButton)
            const example_image = screen.queryByAltText('maldalart example')
            expect(example_image).toBeInTheDocument()
        })
        
        afterEach(() => {
            jest.resetAllMocks()
        })

    })
})