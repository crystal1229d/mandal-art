import { useState } from 'react';
import { StyledInputWrapper } from './index.styles';

export const Input = ({
    placeholder,
    value,
    onChangeInput,
    tableid,
    cellid, 
    disabled, 
    color, 
    fontWeight, 
    testid
}) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleFocusOut = () => setIsFocus(false)
    const handleFocusOn = () => setIsFocus(true)
    const handleKeyDown = (e) => { 
        if (e.key === 'Tab') {
            e.preventDefault()
        }
    }
    const handlePaste = (e) => {
        // prevent pasting style 
        const pasted = { content: '' };

        if (window.clipboardData && window.clipboardData.getData) {
            pasted.content = window.clipboardData.getData('Text');
        } else if (e.clipboardData && e.clipboardData.getData) {
            pasted.content = e.clipboardData.getData('text/plain');
        }

        e.target.textContent = pasted.content;
        e.preventDefault();
  };

    return (
        <StyledInputWrapper color={color} fontWeight={fontWeight}>
            <input
                data-testid={testid}
                data-tableid={tableid}
                data-cellid={cellid}
                type='text'
                placeholder={placeholder}
                onFocus={handleFocusOn}
                onBlur={handleFocusOut}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onChange={onChangeInput}
                value={value}
                maxLength='8'
                disabled={disabled}
            />
        </StyledInputWrapper>
    )
}