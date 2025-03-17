import { objectCopier } from '../utils/objectCopier.js';

export class QuestionManager {
    
    getQuestions(questions) {
        return questions;
    }

    addQuestion(questions, question) {
        const updatedQuestions = [...questions, question];
        return updatedQuestions;
    }

    deleteQuestion(questions, index) {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        return updatedQuestions;
    }

    copyQuestion(questions, index, generateUniqueId) {
        // Create a copy of the question using the objectCopier
        const questionCopy = objectCopier.copyQuestion(questions[index]);

        questionCopy.id = generateUniqueId();
        
        const updatedQuestions = [...questions];

        updatedQuestions.splice(index + 1, 0, questionCopy);
        return updatedQuestions;
    }

    changeQuestionType(questions, index, newType) {
        const currentQuestion = questions[index];
        
        // Create new question with default options for the new type
        const newQuestion = {
            id: currentQuestion.id,
            title: currentQuestion.title,
            type: newType,
            required: currentQuestion.required,
            options: this.getDefaultOptionsForType(newType)
        };
        
        const updatedQuestions = [...questions];
        updatedQuestions[index] = newQuestion;
        return updatedQuestions;
    }

    getDefaultOptionsForType(type) {
        switch(type) {
            case 'multipleChoice':
                return [{ value: 'Option 1' }];
            case 'checkBoxes':
                return [{ value: 'Option 1' }];
            case 'dropDown':
                return [{ value: 'Option 1' }];
            case 'multipleChoiceGrid':
                return {
                    rows: [{ value: 'Row 1' }],
                    columns: [{ value: 'Column 1' }]
                };
            case 'linearScale':
                return {
                    min: 1,
                    max: 5
                };
            case 'rating':
                return {
                    scale: 5
                };
            case 'date':
            case 'time':
            default:
                return [];
        }
    }

    addOptionToQuestion(questions, questionIndex, optionValue, isRow = false, isColumn = false) {
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];
        
        if (question.type === 'multipleChoiceGrid') {
            if (isRow) {
                question.options.rows.push({ value: optionValue });
            } else if (isColumn) {
                question.options.columns.push({ value: optionValue });
            }
        } else {
            question.options.push({ value: optionValue });
        }
        
        return updatedQuestions;
    }

    removeOptionFromQuestion(questions, questionIndex, optionIndex, isRow = false, isColumn = false) {
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];
        
        if (question.type === 'multipleChoiceGrid') {
            if (isRow) {
                question.options.rows.splice(optionIndex, 1);
            } else if (isColumn) {
                question.options.columns.splice(optionIndex, 1);
            }
        } else {
            question.options.splice(optionIndex, 1);
        }
        
        return updatedQuestions;
    }

    updateOptionValue(questions, questionIndex, optionIndex, newValue, isRow = false, isColumn = false) {
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];
        
        if (question.type === 'multipleChoiceGrid') {
            if (isRow) {
                question.options.rows[optionIndex].value = newValue;
            } else if (isColumn) {
                question.options.columns[optionIndex].value = newValue;
            }
        } else {
            question.options[optionIndex].value = newValue;
        }
        
        return updatedQuestions;
    }

    toggleQuestionRequired(questions, questionIndex) {
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];
        question.required = !question.required;
        return updatedQuestions;
    }

    updateQuestionTitle(questions, questionIndex, title) {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].title = title;
        return updatedQuestions;
    }

    moveQuestion(questions, oldIndex, newIndex) {
        if (oldIndex === newIndex) return questions;
        
        const updatedQuestions = [...questions];
        const question = updatedQuestions[oldIndex];
        updatedQuestions.splice(oldIndex, 1);
        updatedQuestions.splice(newIndex, 0, question);
        
        return updatedQuestions;
    }
}