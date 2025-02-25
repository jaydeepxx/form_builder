// Controller.js - Handles user interaction
class FormController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.view.init();
        
        this.model.subscribe(data => {
            this.view.render({
                ...data,
                canUndo: this.model.canUndo(),
                canRedo: this.model.canRedo()
            });
        });
        
        this.view.bindEvents({
            // Form title and description
            formTitleChanged: this.handleFormTitleChanged.bind(this),
            formDescriptionChanged: this.handleFormDescriptionChanged.bind(this),
            
            // Theme management
            themeChanged: this.handleThemeChanged.bind(this),
            toggleThemePanel: this.handleToggleThemePanel.bind(this),
            
            // History management
            undo: this.handleUndo.bind(this),
            redo: this.handleRedo.bind(this),
            
            // Question management
            addQuestion: this.handleAddQuestion.bind(this),
            copyQuestion: this.handleCopyQuestion.bind(this),
            deleteQuestion: this.handleDeleteQuestion.bind(this),
            changeQuestionType: this.handleChangeQuestionType.bind(this),
            
            // Question options
            addOption: this.handleAddOption.bind(this),
            removeOption: this.handleRemoveOption.bind(this),
            updateOptionValue: this.handleUpdateOptionValue.bind(this),
            toggleRequired: this.handleToggleRequired.bind(this),
            updateQuestionTitle: this.handleUpdateQuestionTitle.bind(this),
            
            // Dropdown management
            toggleTypeDropdown: this.handleToggleTypeDropdown.bind(this),
            
            // Question reordering
            reorderQuestions: this.handleReorderQuestions.bind(this),
            
            // Preview mode - New handlers for preview functionality
            togglePreviewMode: this.handleTogglePreviewMode.bind(this),
            
            // Form actions
            clearForm: this.handleClearForm.bind(this),
        });
        
        this.initializeApp();
    }
    
    initializeApp() {
        this.model.initialize();
    }
    
    handleFormTitleChanged(event) {
        this.model.setFormTitle(event.target.value);
        // this.debouncedSaveToHistory();
    }
    
    handleFormDescriptionChanged(event) {
        this.model.setFormDescription(event.target.value);
        // this.debouncedSaveToHistory();
    }
    
    handleThemeChanged(theme) {
        this.model.setTheme(theme);
    }
    
    handleToggleThemePanel() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.style.display = themeToggle.style.display === 'none' ? 'flex' : 'none';
        }
    }
    
    handleTogglePreviewMode(isPreviewMode) {
        console.log('Preview mode toggled:', isPreviewMode);
        if (isPreviewMode) {
            this.model.saveToHistory();
        }
    }

    
    handleUndo() {
        this.model.undo();
    }
    
    handleRedo() {
        this.model.redo();
    }
    
    // Question management handlers
    handleAddQuestion() {
        const questionType = 'multipleChoice'; 
        const newQuestion = {
            id: this.model.generateUniqueId(),
            type: questionType,
            title: '',
            required: false,
            options: this.model.getDefaultOptionsForType(questionType)
        };
        
        this.model.addQuestion(newQuestion);
    }
    
    handleCopyQuestion(index) {
        this.model.copyQuestion(index);
    }
    
    handleDeleteQuestion(index) {
        this.model.deleteQuestion(index);
    }
    
    handleChangeQuestionType(index, newType) {
        this.model.changeQuestionType(index, newType);
        
        // Close the dropdown
        const dropdown = document.getElementById(`question-type-options-${index}`);
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    }
    
    // Option handlers
    handleAddOption(questionIndex, isRow, isColumn) {
        const question = this.model.getQuestions()[questionIndex];
        
        let defaultValue;
        let optionCount;
        
        if (question.type === 'multipleChoiceGrid') {
            if (isRow) {
                optionCount = question.options.rows.length + 1;
                defaultValue = `Row ${optionCount}`;
            } else if (isColumn) {
                optionCount = question.options.columns.length + 1;
                defaultValue = `Column ${optionCount}`;
            }
        } else {
            optionCount = question.options.length + 1;
            defaultValue = `Option ${optionCount}`;
        }
        
        this.model.addOptionToQuestion(questionIndex, defaultValue, isRow, isColumn);
    }
    
    handleRemoveOption(questionIndex, optionIndex, isRow, isColumn) {
        this.model.removeOptionFromQuestion(questionIndex, optionIndex, isRow, isColumn);
    }
    
    handleUpdateOptionValue(questionIndex, optionIndex, newValue, isRow, isColumn) {
        this.model.updateOptionValue(questionIndex, optionIndex, newValue, isRow, isColumn);
        // this.debouncedSaveToHistory();
    }
    
    handleToggleRequired(questionIndex) {
        this.model.toggleQuestionRequired(questionIndex);
    }
    
    handleUpdateQuestionTitle(questionIndex, title) {
        this.model.updateQuestionTitle(questionIndex, title);
        // this.debouncedSaveToHistory();
    }
    
    // Dropdown handlers
    handleToggleTypeDropdown(questionIndex) {
        const dropdown = document.getElementById(`question-type-options-${questionIndex}`);
        
        document.querySelectorAll('.options-type').forEach(options => {
            if (options.id !== `question-type-options-${questionIndex}`) {
                options.style.display = 'none';
            }
        });
        
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
        }
    }
    
    handleReorderQuestions(newOrder) {
        const currentQuestions = this.model.getQuestions();
        const reorderedQuestions = newOrder.map(index => currentQuestions[index]);
        
        this.model.data.questions = reorderedQuestions;
        this.model.notify();
        this.model.saveToHistory();
    }
    
    // Form action handlers
    handleClearForm() {
        if (confirm('Are you sure you want to clear the form? This action cannot be undone.')) {
            this.model.clearForm();
        }
    }

    
    // Create a debounced function for saving to history
    // debouncedSaveToHistory() {
    //     clearTimeout(this._saveHistoryTimeout);
    //     this._saveHistoryTimeout = setTimeout(() => {
    //         this.model.saveToHistory();
    //     }, 1000); // 1 second delay
    // }
}

export default FormController;