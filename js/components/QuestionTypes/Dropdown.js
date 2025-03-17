import { createElement } from '../../utils/createElement.js';
import { createInputOption, createAddOptionButton } from '../QuestionOptions.js';


export function createDropdownOptions(question, index, handlers) {
    const questionOptions = createElement('ol', { 
        classes: ['question-options'],
        attributes: {
            'id': `question-options-${index}`,
            'data-question-index': index
        }
    });
    
    question.options.forEach((option, optionIndex) => {
        const optionElement = createInputOption('number', optionIndex + 1, {
            label: option.value,
            questionIndex: index,
            optionIndex: optionIndex,
            handlers
        });
        questionOptions.appendChild(optionElement);
    });
    
    // Add option button
    const addOptionButton = createAddOptionButton('number', {
        value: question.options.length + 1,
        questionIndex: index,
        handlers
    });
    questionOptions.appendChild(addOptionButton);
    
    return questionOptions;
}