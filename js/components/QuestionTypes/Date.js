import { createElement } from '../../utils/createElement.js';

export function createDateOptions(question, index, handlers) {
    const questionOptions = createElement('div', { 
        classes: ['question-options'],
        attributes: {
            'id': `date-options-${index}`,
            'data-question-index': index
        }
    });
    
    const dateContainer = createElement('label', { 
        classes: ['input-date'],
        text: 'Month, day, year'
    });
    
    const dateIcon = createElement('span', { 
        classes: ['material-symbols-outlined'],
        text: 'event'
    });
    
    const dateInput = createElement('input', { 
        attributes: { 
            'type': 'date',
            'id': `date-input-${index}`,
            'data-question-index': index
        },
        disabled: true,
        hidden: true
    });
    
    dateContainer.appendChild(dateIcon);
    dateContainer.appendChild(dateInput);
    questionOptions.appendChild(dateContainer);
    
    return questionOptions;
}