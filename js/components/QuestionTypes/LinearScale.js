import { createElement } from '../../utils/createElement.js';


export function createLinearScaleOptions(question, index, handlers) {
    const linearScaleContainer = createElement('div', { 
        classes: ['scale-question-option'],
        attributes: {
            'id': `linear-scale-${index}`,
            'data-question-index': index
        }
    });
    
    const minSelect = createElement('select', { 
        classes: ['range-dropdown'],
        attributes: {
            'id': `linear-scale-min-${index}`,
            'data-question-index': index
        }
    });
    
    // Add options for min value (0 or 1)
    const minOptions = [0, 1];
    minOptions.forEach(value => {
        const option = createElement('option', {
            attributes: { 'value': value },
            text: value.toString()
        });
        if (value === question.options.min) {
            option.selected = true;
        }
        minSelect.appendChild(option);
    });
    
    const toLabel = createElement('span', { text: 'to' });
    
    const maxSelect = createElement('select', { 
        classes: ['range-dropdown'],
        attributes: {
            'id': `linear-scale-max-${index}`,
            'data-question-index': index
        }
    });
    
    // Add options for max value (2 to 10)
    for (let i = 2; i <= 10; i++) {
        const option = createElement('option', {
            attributes: { 'value': i },
            text: i.toString()
        });
        if (i === question.options.max) {
            option.selected = true;
        }
        maxSelect.appendChild(option);
    }
    
    linearScaleContainer.appendChild(minSelect);
    linearScaleContainer.appendChild(toLabel);
    linearScaleContainer.appendChild(maxSelect);
    
    return linearScaleContainer;
}