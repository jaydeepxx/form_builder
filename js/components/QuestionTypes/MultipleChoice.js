import { createElement } from '../../utils/createElement.js';
import { createInputOption, createAddOptionButton } from '../QuestionOptions.js';


export function createMultipleChoiceOptions(question, index, handlers) {
    const questionOptions = createElement('ul', { 
        classes: ['question-options'],
        attributes: {
            'id': `question-options-${index}`,
            'data-question-index': index
        }
    });
    
    question.options.forEach((option, optionIndex) => {
        const optionElement = createInputOption('radio', optionIndex + 1, {
            label: option.value,
            questionIndex: index,
            optionIndex: optionIndex,
            handlers
        });
        questionOptions.appendChild(optionElement);
    });
    
    // Add option button
    questionOptions.appendChild(createAddOptionButton('radio', {
        value: question.options.length + 1,
        questionIndex: index,
        handlers
    }));
    
    return questionOptions;
}