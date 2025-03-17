import { createElement } from '../utils/createElement.js';
import { createDragHandle } from './common/DragHandle.js';
import { createQuestionHeader } from './QuestionHeader.js';
import { createQuestionOptions } from './QuestionTypes/index.js';
import { createQuestionActions } from './QuestionActions.js';

/**
 * Creates a complete question card
 * question - Question data
 * index - Question index
 * handlers - Event handlers
 */
export function createQuestionCard(question, index, handlers) {
    const questionCard = createElement('div', { 
        classes: ['questions-card'],
        attributes: { 
            'aria-label': question.type,
            'role': 'group',
            'data-question-id': question.id,
            'data-question-index': index,
            'data-required': question.required
        }
    });
    
    // Add drag handle
    const dragHandle = createDragHandle();
    questionCard.appendChild(dragHandle);
    
    // Add question header with embedded event listeners
    const questionHeader = createQuestionHeader(question, index, handlers);
    questionCard.appendChild(questionHeader);
    
    // Add question options based on type
    const optionsElement = createQuestionOptions(question, index, handlers);
    if (optionsElement) {
        questionCard.appendChild(optionsElement);
    }
    
    // Add question actions
    const questionActions = createQuestionActions(question, index, handlers);
    questionCard.appendChild(questionActions);
    
    return questionCard;
}