import { createElement } from '../../utils/createElement.js';


export function createIconButton(icon, ariaLabel, classes = [], attributes = {}, onClick = null) {
    const buttonAttributes = { 
        'aria-label': ariaLabel, 
        'type': 'button',
        ...attributes
    };
    
    const button = createElement('button', {
        classes: ['material-symbols-outlined', 'icon-button', ...classes],
        attributes: buttonAttributes,
        text: icon
    });
    
    if (onClick) {
        button.addEventListener('click', onClick);
    }
    
    return button;
}