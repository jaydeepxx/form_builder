import { createElement } from '../utils/createElement.js';
import { createIconButton } from './common/IconButton.js';


export function createInputOption(type, value, options = {}) {
    const option = createElement('li', { 
        classes: ['option'],
        attributes: {
            'id': options.isRow 
                ? `row-option-${options.questionIndex}-${options.optionIndex}`
                : options.isColumn
                    ? `column-option-${options.questionIndex}-${options.optionIndex}`
                    : `option-${options.questionIndex}-${options.optionIndex}`,
            'data-question-index': options.questionIndex,
            'data-option-index': options.optionIndex,
            'data-is-row': options.isRow ? 'true' : 'false',
            'data-is-column': options.isColumn ? 'true' : 'false'
        }
    });
    
    let inputElement;
    
    switch (type) {
        case 'radio':
            inputElement = createElement('input', { 
                attributes: { 
                    'type': 'radio', 
                    'name': options.name || `mcq-${options.questionIndex}`,
                    'id': `radio-${options.questionIndex}-${options.optionIndex}`
                },
                disabled: true
            });
            break;
        case 'checkbox':
            inputElement = createElement('input', { 
                attributes: { 
                    'type': 'checkbox', 
                    'name': options.name || `checkbox-${options.questionIndex}`,
                    'id': `checkbox-${options.questionIndex}-${options.optionIndex}`
                },
                disabled: true
            });
            break;
        case 'number':
            inputElement = createElement('span', { 
                classes: ['option-label'],
                text: value + '.'
            });
            break;
        default:
            inputElement = createElement('span', { 
                classes: ['option-label'],
                text: value
            });
    }
    
    // Input field for option text
    const optionInput = createElement('input', { 
        classes: ['option-input', 'label-medium'],
        attributes: { 
            'type': 'text',
            'id': options.isRow
                ? `row-input-${options.questionIndex}-${options.optionIndex}`
                : options.isColumn
                    ? `column-input-${options.questionIndex}-${options.optionIndex}`
                    : `option-input-${options.questionIndex}-${options.optionIndex}`,
            'data-question-index': options.questionIndex,
            'data-option-index': options.optionIndex,
            'data-is-row': options.isRow ? 'true' : 'false',
            'data-is-column': options.isColumn ? 'true' : 'false'
        },
        value: options.label !== undefined ? options.label : '' 
    });
    
    // Add input event listener directly using closure
    if (options.handlers) {
        optionInput.addEventListener('input', (e) => {
            options.handlers.updateOptionValue(
                options.questionIndex, 
                options.optionIndex, 
                e.target.value, 
                options.isRow, 
                options.isColumn
            );
        });
    }
    
    const closeIcon = createIconButton('close', 'Remove option', [], {
        'id': options.isRow
            ? `remove-row-${options.questionIndex}-${options.optionIndex}`
            : options.isColumn
                ? `remove-column-${options.questionIndex}-${options.optionIndex}`
                : `remove-option-${options.questionIndex}-${options.optionIndex}`,
        'data-question-index': options.questionIndex,
        'data-option-index': options.optionIndex,
        'data-is-row': options.isRow ? 'true' : 'false',
        'data-is-column': options.isColumn ? 'true' : 'false',
        'aria-label': 'remove-option'
    });
    
    // Add click event listener directly using closure
    if (options.handlers) {
        closeIcon.addEventListener('click', () => {
            options.handlers.removeOption(
                options.questionIndex, 
                options.optionIndex, 
                options.isRow, 
                options.isColumn
            );
        });
    }
    
    option.appendChild(inputElement);
    option.appendChild(optionInput);
    option.appendChild(closeIcon);
    
    return option;
}

/**
 * Creates an "add option" button for question options
 * @param {string} type - Input type
 * @param {Object} options - Button options
 * @returns {HTMLElement} Add option button element
 */
export function createAddOptionButton(type, options = {}) {
    const addOption = createElement('li', { 
        classes: ['option', 'add-option-button'],
        attributes: {
            'id': options.isRow
                ? `add-row-button-${options.questionIndex}`
                : options.isColumn
                    ? `add-column-button-${options.questionIndex}`
                    : `add-option-button-${options.questionIndex}`,
            'data-question-index': options.questionIndex,
            'data-is-row': options.isRow ? 'true' : 'false',
            'data-is-column': options.isColumn ? 'true' : 'false'
        }
    });
    
    let inputElement;
    
    switch (type) {
        case 'radio':
            inputElement = createElement('input', { 
                attributes: { 
                    'type': 'radio', 
                    'name': options.name || `mcq-${options.questionIndex}`
                },
                disabled: true
            });
            break;
        case 'checkbox':
            inputElement = createElement('input', { 
                attributes: { 
                    'type': 'checkbox', 
                    'name': options.name || `checkbox-${options.questionIndex}`
                },
                disabled: true
            });
            break;
        case 'number':
            inputElement = createElement('span', { 
                classes: ['option-label'],
                text: options.value ? options.value + '.' : '1.'
            });
            break;
        default:
            inputElement = createElement('span');
    }
    
    const addOptionButton = createElement('button', {
        classes: ['add-option-button', 'label-small'],
        attributes: { 
            'type': 'button',
            'id': options.isRow
                ? `add-row-${options.questionIndex}`
                : options.isColumn
                    ? `add-column-${options.questionIndex}`
                    : `add-option-${options.questionIndex}`,
            'data-question-index': options.questionIndex,
            'data-is-row': options.isRow ? 'true' : 'false',
            'data-is-column': options.isColumn ? 'true' : 'false'
        },
        text: options.isRow 
            ? 'Add row' 
            : options.isColumn
                ? 'Add column'
                : 'Add option'
    });
    
    // Add click event listener directly using closure
    if (options.handlers) {
        addOptionButton.addEventListener('click', () => {
            options.handlers.addOption(
                options.questionIndex, 
                options.isRow, 
                options.isColumn
            );
        });
    }
    
    addOption.appendChild(inputElement);
    addOption.appendChild(addOptionButton);
    
    return addOption;
}