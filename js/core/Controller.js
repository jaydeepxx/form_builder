// Controller.js - Handles user interaction
class FormController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.init();

        this.model.subscribe((formData) => {
            this.view.render({
                ...formData,
                canUndo: this.model.canUndo(),
                canRedo: this.model.canRedo(),
            });
        });

        //here it basically binds all the view handler
        this.view.bindEvents({
            // Form title and description
            formTitleChanged: this.handleFormTitleChanged.bind(this),
            formHeadLineChanges: this.handleFormHeadlineChanged.bind(this),
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

            // Preview mode
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
        this.model.updateForm({ formTitle: event.target.value });
    }

    handleFormHeadlineChanged(event) {
        this.model.updateForm({ formHeadline: event.target.value });
    }

    handleFormDescriptionChanged(event) {
        this.model.updateForm({ formDescription: event.target.value });
    }

    handleToggleThemePanel() {
        const themeToggle = document.getElementById("theme-toggle");

        if (themeToggle) {
            themeToggle.style.display =
                themeToggle.style.display === "flex" ? "none" : "flex";
        }
    }

    handleThemeChanged(theme) {
        this.model.updateForm({ theme: theme });

        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) {
            themeToggle.style.display = "none";
        }
    }

    handleTogglePreviewMode(isPreviewMode) {
        // console.log("Preview mode toggled:", isPreviewMode);
        isPreviewMode === true ? this.model.saveToHistory() : this.model.notify();    
    }

    handleUndo() {
        this.model.undo();
    }

    handleRedo() {
        this.model.redo();
    }

    // Question management handlers
    handleAddQuestion() {
        const questionType = "multipleChoice";
        const newQuestion = {
            id: this.model.generateUniqueId(),
            type: questionType,
            title: "",
            required: false,
            options: this.model.getDefaultOptionsForType(questionType),
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
            dropdown.style.display = "none";
        }
    }

    // Option handlers
    handleAddOption(questionIndex, isRow, isColumn) {
        const question = this.model.getQuestions()[questionIndex];

        let defaultValue;
        let optionCount;

        if (question.type === "multipleChoiceGrid") {
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

        this.model.addOptionToQuestion(
            questionIndex,
            defaultValue,
            isRow,
            isColumn
        );
    }

    handleRemoveOption(questionIndex, optionIndex, isRow, isColumn) {
        this.model.removeOptionFromQuestion(
            questionIndex,
            optionIndex,
            isRow,
            isColumn
        );
    }

    handleUpdateOptionValue(
        questionIndex,
        optionIndex,
        newValue,
        isRow,
        isColumn
    ) {
        this.model.updateOptionValue(
            questionIndex,
            optionIndex,
            newValue,
            isRow,
            isColumn
        );
    }

    handleToggleRequired(questionIndex) {
        this.model.toggleQuestionRequired(questionIndex);
    }

    handleUpdateQuestionTitle(questionIndex, title) {
        this.model.updateQuestionTitle(questionIndex, title);
    }

    // Dropdown handlers
    handleToggleTypeDropdown(questionIndex) {
        const dropdown = document.getElementById(
            `question-type-options-${questionIndex}`
        );

        document.querySelectorAll(".options-type").forEach((options) => {
            if (options.id !== `question-type-options-${questionIndex}`) {
                options.style.display = "none";
            }
        });

        if (dropdown) {
            dropdown.style.display =
                dropdown.style.display === "flex" ? "none" : "flex";
        }
    }

    handleReorderQuestions(newOrder) {
        const currentQuestions = this.model.getQuestions();
        const reorderedQuestions = newOrder.map((index) => currentQuestions[index]);

        // Update questions array directly using updateForm method
        this.model.updateForm({ questions: reorderedQuestions });
        this.model.saveToHistory();
    }

    // Form action handlers
    handleClearForm() {
        if (
            confirm(
                "Are you sure you want to clear the form? This action cannot be undone."
            )
        ) {
            this.model.clearForm();
        }
    }
}

export default FormController;