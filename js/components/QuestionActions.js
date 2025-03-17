import { createElement } from '../utils/createElement.js';
import { createIconButton } from './common/IconButton.js';

export function createQuestionActions(question, index, handlers) {
    const questionActions = createElement('div', { 
        classes: ['question-actions'],
        attributes: {
            'id': `question-actions-${index}`,
            'data-question-index': index
        }
    });
    
    // Create copy button
    const copyIcon = createIconButton('content_copy', 'Copy question', 
        ['copy-question-button'], {
            'id': `copy-question-${index}`,
            'data-question-index': index
        });
    
    // Add click handler directly using closure
    if (handlers) {
        copyIcon.addEventListener('click', () => {
            handlers.copyQuestion(index);
        });
    }
    
    // Create delete button
    const deleteIcon = createIconButton('delete', 'Delete question', 
        ['delete-question-button'], {
            'id': `delete-question-${index}`,
            'data-question-index': index
        });
    
    // Add click handler directly using closure
    if (handlers) {
        deleteIcon.addEventListener('click', () => {
            handlers.deleteQuestion(index);
        });
    }
    
    const horLine = createElement('div', { classes: ['hor-line'] });
    
    // Create required toggle
    const requiredToggle = createElement('label', { 
        classes: ['required-option'],
        attributes: { 
            'aria-label': 'Required option',
            'id': `required-toggle-label-${index}`,
            'data-question-index': index
        }
    });
    
    const requiredLabel = createElement('span', { 
        classes: ['required'],
        text: 'Required'
    });
    
    const requiredCheckbox = createElement('input', { 
        classes: ['required-toggle'],
        attributes: { 
            'type': 'checkbox',
            'id': `required-toggle-${index}`,
            'data-question-index': index
        }
    });
    
    if (question.required) {
        requiredCheckbox.checked = true;
    }
    
    // Add change handler directly using closure
    if (handlers) {
        requiredCheckbox.addEventListener('change', () => {
            handlers.toggleRequired(index);
        });
    }
    
    requiredToggle.appendChild(requiredLabel);
    requiredToggle.appendChild(requiredCheckbox);
    
    questionActions.appendChild(copyIcon);
    questionActions.appendChild(deleteIcon);
    questionActions.appendChild(horLine);
    questionActions.appendChild(requiredToggle);
    
    return questionActions;
}