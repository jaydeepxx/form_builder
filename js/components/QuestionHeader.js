import { createElement } from '../utils/createElement.js';
import { createTypeDropdown } from './QuestionTypeDropdown.js';

export function createQuestionHeader(question, index, handlers) {
    const questionHeader = createElement('div', { classes: ['question-header'] });
    
    const questionInput = createElement('input', { 
        classes: ['question-input', 'label-large'],
        attributes: { 
            'type': 'text', 
            'placeholder': 'Question',
            'aria-label': 'Question Heading',
            'id': `question-title-${index}`,
            'data-question-index': index,
            'value': question.title
        }
    });
    
    // Add input event listener directly using closure
    if (handlers) {
        questionInput.addEventListener('input', (e) => {
            handlers.updateQuestionTitle(index, e.target.value);
        });
    }
    
    const questionImageLabel = createElement('label', { 
        classes: ['material-symbols-outlined', 'upload-icon'],
        text: 'image'
    });
    
    const questionImageInput = createElement('input', { 
        classes: ['image-upload'],
        attributes: { 
            'type': 'file',
            'id': `question-image-${index}`,
            'data-question-index': index
        }
    });
    
    questionImageLabel.appendChild(questionImageInput);
    
    questionHeader.appendChild(questionInput);
    questionHeader.appendChild(questionImageLabel);
    questionHeader.appendChild(createTypeDropdown(question.type, index, handlers));
    
    return questionHeader;
}