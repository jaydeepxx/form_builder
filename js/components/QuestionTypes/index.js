import { createMultipleChoiceOptions } from './MultipleChoice.js';
import { createCheckboxOptions } from './Checkbox.js';
import { createDropdownOptions } from './Dropdown.js';
import { createMultipleChoiceGridOptions } from './Grid.js';
import { createLinearScaleOptions } from './LinearScale.js';
import { createDateOptions } from './Date.js';
import { createTimeOptions } from './Time.js';
import { createRatingOptions } from './Rating.js';


export function createQuestionOptions(question, index, handlers) {
    switch (question.type) {
        case 'multipleChoice':
            return createMultipleChoiceOptions(question, index, handlers);
        case 'checkBoxes':
            return createCheckboxOptions(question, index, handlers);
        case 'dropDown':
            return createDropdownOptions(question, index, handlers);
        case 'multipleChoiceGrid':
            return createMultipleChoiceGridOptions(question, index, handlers);
        case 'linearScale':
            return createLinearScaleOptions(question, index, handlers);
        case 'date':
            return createDateOptions(question, index, handlers);
        case 'time':
            return createTimeOptions(question, index, handlers);
        case 'rating':
            return createRatingOptions(question, index, handlers);
        default:
            return null;
    }
}