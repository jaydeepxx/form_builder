// Model.js - Handles data and business logic
class FormModel {
    constructor() {
        this.data = {
            formTitle: "Untitled form",
            formDescription: "",
            questions: [],
            theme: "purple-theme"
        };
        this.historyStack = [];
        this.currentHistoryIndex = -1;
        this.MAX_HISTORY_SIZE = 30;
        this.listeners = [];
    }

    // Observer pattern methods
    subscribe(listener) {
        this.listeners.push(listener);
    }

    notify() {
        this.listeners.forEach(listener => {
            // console.log(listener);
            listener(this.data)
        });
    }

    // Form data methods
    getFormTitle() {
        return this.data.formTitle;
    }

    setFormTitle(title) {
        this.data.formTitle = title;
        this.notify();
        // Note: No saveToHistory here, Controller handles it
    }

    getFormDescription() {
        return this.data.formDescription;
    }

    setFormDescription(description) {
        this.data.formDescription = description;
        this.notify();
        // Note: No saveToHistory here, Controller handles it
    }

    getTheme() {
        return this.data.theme;
    }

    setTheme(theme) {
        this.data.theme = theme;
        this.notify();
    }

    // Question methods
    getQuestions() {
        return this.data.questions;
    }

    addQuestion(question) {
        this.data.questions.push(question);
        this.notify();
        this.saveToHistory();
    }

    deleteQuestion(index) {
        this.data.questions.splice(index, 1);
        this.notify();
        this.saveToHistory();
    }

    copyQuestion(index) {
        const questionToCopy = JSON.parse(JSON.stringify(this.data.questions[index]));
        
        questionToCopy.id = this.generateUniqueId();
        
        // Insert the copy after the original
        this.data.questions.splice(index + 1, 0, questionToCopy);
        
        this.notify();
        this.saveToHistory();
    }

    updateQuestion(index, updatedQuestion) {
        this.data.questions[index] = updatedQuestion;
        this.notify();
        this.saveToHistory();
    }

    changeQuestionType(index, newType) {
        const currentQuestion = this.data.questions[index];
        
        // Create new question with default options for the new type
        const newQuestion = {
            id: currentQuestion.id,
            title: currentQuestion.title,
            type: newType,
            required: currentQuestion.required,
            options: this.getDefaultOptionsForType(newType)
        };
        
        this.data.questions[index] = newQuestion;
        this.notify();
        this.saveToHistory();
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

    addOptionToQuestion(questionIndex, optionValue, isRow = false, isColumn = false) {
        const question = this.data.questions[questionIndex];
        
        if (question.type === 'multipleChoiceGrid') {
            if (isRow) {
                question.options.rows.push({ value: optionValue });
            } else if (isColumn) {
                question.options.columns.push({ value: optionValue });
            }
        } else {
            question.options.push({ value: optionValue });
        }
        
        this.notify();
        this.saveToHistory();
    }

    removeOptionFromQuestion(questionIndex, optionIndex, isRow = false, isColumn = false) {
        const question = this.data.questions[questionIndex];
        
        if (question.type === 'multipleChoiceGrid') {
            if (isRow) {

                question.options.rows.splice(optionIndex, 1);

            } else if (isColumn) {

                question.options.columns.splice(optionIndex, 1);
                
            }
        } else {

            question.options.splice(optionIndex, 1);
            
        }
        
        this.notify();
        this.saveToHistory();
    }

    updateOptionValue(questionIndex, optionIndex, newValue, isRow = false, isColumn = false) {
        const question = this.data.questions[questionIndex];
        
        if (question.type === 'multipleChoiceGrid') {
            if (isRow) {
                question.options.rows[optionIndex].value = newValue;
            } else if (isColumn) {
                question.options.columns[optionIndex].value = newValue;
            }
        } else {
            question.options[optionIndex].value = newValue;
        }
        
        this.notify();
    }

    toggleQuestionRequired(questionIndex) {
        const question = this.data.questions[questionIndex];
        question.required = !question.required;
        this.notify();
        this.saveToHistory();
    }

    updateQuestionTitle(questionIndex, title) {
        this.data.questions[questionIndex].title = title;
        this.notify();
    }

    moveQuestion(oldIndex, newIndex) {
        if (oldIndex === newIndex) return;
        
        const question = this.data.questions[oldIndex];
        this.data.questions.splice(oldIndex, 1);
        this.data.questions.splice(newIndex, 0, question);
        
        this.notify();
        this.saveToHistory();
    }

    // History methods for undo/redo functionality
    saveToHistory() {
        // If we're not at the end of the stack, truncate the future history
        if (this.currentHistoryIndex < this.historyStack.length - 1) {
            this.historyStack = this.historyStack.slice(0, this.currentHistoryIndex + 1);
        }
        
        const currentState = JSON.parse(JSON.stringify(this.data));
        
        this.historyStack.push(currentState);
        this.currentHistoryIndex = this.historyStack.length - 1;
        
        if (this.historyStack.length > this.MAX_HISTORY_SIZE) {
            this.historyStack.shift();
            this.currentHistoryIndex--;
        }
    }

    undo() {
        if (this.currentHistoryIndex > 0) {
            this.currentHistoryIndex--;
            this.restoreState();
            return true;
        }
        return false;
    }

    redo() {
        if (this.currentHistoryIndex < this.historyStack.length - 1) {
            this.currentHistoryIndex++;
            this.restoreState();
            return true;
        }
        return false;
    }

    restoreState() {
        this.data = JSON.parse(JSON.stringify(this.historyStack[this.currentHistoryIndex]));
        this.notify();
    }

    canUndo() {
        return this.currentHistoryIndex > 0;
    }

    canRedo() {
        return this.currentHistoryIndex < this.historyStack.length - 1;
    }

    // Initialize with default question
    initialize() {
        // Create a default question
        const defaultQuestion = {
            id: this.generateUniqueId(),
            type: 'multipleChoice',
            title: '',
            required: false,
            options: [{ value: 'Option 1' }]
        };
        
        this.data.questions = [defaultQuestion];
        this.saveToHistory();
        this.notify();
    }

    generateUniqueId() {
        return 'q' + Date.now() + Math.floor(Math.random() * 1000);
    }

    // Clear form data
    clearForm() {
        this.data.formTitle = "Untitled form";
        this.data.formDescription = "";
        this.data.questions = [];
        
        // Add one default question
        const defaultQuestion = {
            id: this.generateUniqueId(),
            type: 'multipleChoice',
            title: '',
            required: false,
            options: [{ value: 'Option 1' }]
        };
        
        this.data.questions.push(defaultQuestion);
        
        this.notify();
        this.saveToHistory();
    }
}

// Export the model class
export default FormModel;