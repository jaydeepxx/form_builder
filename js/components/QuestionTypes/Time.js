import { createElement } from '../../utils/createElement.js';

export function createTimeOptions(question, index, handlers) {
    const questionOptions = createElement('div', { 
        classes: ['question-options'],
        attributes: {
            'id': `time-options-${index}`,
            'data-question-index': index
        }
    });
    
    const timeContainer = createElement('label', { 
        classes: ['input-time'],
        text: 'Time'
    });
    
    const timeIcon = createElement('span', { 
        classes: ['material-symbols-outlined'],
        text: 'access_time'
    });
    
    const timeInput = createElement('input', { 
        attributes: { 
            'type': 'time',
            'id': `time-input-${index}`,
            'data-question-index': index
        },
        disabled: true,
        hidden: true
    });
    
    timeContainer.appendChild(timeIcon);
    timeContainer.appendChild(timeInput);
    questionOptions.appendChild(timeContainer);
    
    return questionOptions;
}