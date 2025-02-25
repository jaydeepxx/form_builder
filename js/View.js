
class FormView {
    constructor() {
        this.elements = {};
        this.questionTypes = [
            { value: 'multipleChoice', icon: 'radio_button_checked', label: 'Multiple choice' },
            { value: 'checkBoxes', icon: 'check_box', label: 'Checkboxes' },
            { value: 'dropDown', icon: 'arrow_drop_down_circle', label: 'Dropdown' },
            { value: 'multipleChoiceGrid', icon: 'apps', label: 'Multiple choice grid' },
            { value: 'linearScale', icon: 'linear_scale', label: 'Linear scale' },
            { value: 'date', icon: 'event', label: 'Date' },
            { value: 'time', icon: 'access_time', label: 'Time' },
            { value: 'rating', icon: 'star', label: 'Rating' }
        ];
        
        // Preview mode flag
        this.isPreviewMode = false;
    }

    // Initialize view and cache DOM elements
    init() {
        // Root container
        this.elements.root = document.getElementById('root');
        
        // Create the initial structure
        this.createInitialStructure();
        
        this.elements.formContainer = document.getElementById('form-container');
        this.elements.formTitle = document.getElementById('form-title');
        this.elements.formHeadline = document.getElementById('form-headline');
        this.elements.formDescription = document.getElementById('form-description');
        this.elements.undoButton = document.getElementById('undo-button');
        this.elements.redoButton = document.getElementById('redo-button');
        this.elements.themeToggleButton = document.getElementById('theme-icon-button');
        this.elements.themeToggleContainer = document.getElementById('theme-toggle');
        this.elements.addQuestionButton = document.getElementById('add-question-button');
        this.elements.clearFormButton = document.getElementById('clear-form-button');
        this.elements.publishButton = document.getElementById('publish-button');
        this.elements.previewButton = document.getElementById('preview-button');
    }

    createInitialStructure() {
        // Clear any existing content
        this.elements.root.innerHTML = '';
        
        // Create header
        const header = this.createElement('header', { classes: ['form-header'] });
        
        // Header left section
        const headerLeft = this.createElement('div', { classes: ['form-header-left'] });
        const formIcon = this.createElement('img', { 
            classes: ['form-icon'],
            attributes: {
                'src': 'assets/form-icon.svg',
                'alt': 'form-icon'
            }
        });
        const formHeadline = this.createElement('input', {
            classes: ['form-headline'],
            attributes: {
                'type': 'text',
                'value': 'Untitled form',
                'id': 'form-headline'
            }
        });
        
        headerLeft.appendChild(formIcon);
        headerLeft.appendChild(formHeadline);
        
        // Header right section
        const headerRight = this.createElement('ul', { classes: ['form-header-right'] });
        
        // Preview button - Added for preview functionality
        const previewLi = this.createElement('li');
        const previewButton = this.createElement('button', {
            classes: ['preview-button'],
            attributes: {
                'id': 'preview-button',
                'aria-label': 'Preview Form'
            },
            text: 'Preview'
        });
        previewLi.appendChild(previewButton);
        
        // Theme switcher
        const themeSwitcherLi = this.createElement('li', { classes: ['theme-switcher'] });
        const themeButton = this.createElement('button', {
            classes: ['material-symbols-outlined', 'icon-button'],
            attributes: {
                'id': 'theme-icon-button',
                'aria-label': 'Change theme'
            },
            text: 'palette'
        });
        
        const themeToggle = this.createElement('div', {
            classes: ['theme-toggle'],
            attributes: {
                'id': 'theme-toggle',
                'style': 'display: none;'
            }
        });
        
        const darkTheme = this.createElement('div', { attributes: { 'id': 'dark-theme-button' } });
        const purpleTheme = this.createElement('div', { attributes: { 'id': 'purple-theme-button' } });
        const redTheme = this.createElement('div', { attributes: { 'id': 'red-theme-button' } });
        
        themeToggle.appendChild(darkTheme);
        themeToggle.appendChild(purpleTheme);
        themeToggle.appendChild(redTheme);
        
        themeSwitcherLi.appendChild(themeButton);
        themeSwitcherLi.appendChild(themeToggle);
        
        // Undo button
        const undoLi = this.createElement('li');
        const undoButton = this.createElement('button', {
            classes: ['material-symbols-outlined', 'icon-button'],
            attributes: {
                'id': 'undo-button',
                'aria-label': 'Undo'
            },
            text: 'undo'
        });
        undoLi.appendChild(undoButton);
        
        // Redo button
        const redoLi = this.createElement('li');
        const redoButton = this.createElement('button', {
            classes: ['material-symbols-outlined', 'icon-button'],
            attributes: {
                'id': 'redo-button',
                'aria-label': 'Redo'
            },
            text: 'redo'
        });
        redoLi.appendChild(redoButton);
        
        // Clear form button
        const clearLi = this.createElement('li');
        const clearButton = this.createElement('button', {
            classes: ['clear-button'],
            attributes: {
                'id': 'clear-form-button',
                'aria-label': 'Clear Form'
            },
            text: 'Clear form'
        });
        clearLi.appendChild(clearButton);
        
        // Publish button
        const publishLi = this.createElement('li');
        const publishButton = this.createElement('button', {
            classes: ['publish-button'],
            attributes: {
                'id': 'publish-button',
                'aria-label': 'Publish Form'
            },
            text: 'Publish'
        });
        publishLi.appendChild(publishButton);
        
        // Add the preview button first in header right
        headerRight.appendChild(previewLi);
        headerRight.appendChild(themeSwitcherLi);
        headerRight.appendChild(undoLi);
        headerRight.appendChild(redoLi);
        headerRight.appendChild(clearLi);
        headerRight.appendChild(publishLi);
        
        header.appendChild(headerLeft);
        header.appendChild(headerRight);
        
        // Create main content
        const main = this.createElement('main', { classes: ['form-content'] });
        
        // Create form container
        const formContainer = this.createElement('form', {
            classes: ['form-container'],
            attributes: { 'id': 'form-container' }
        });
        
        // Form header section
        const formHeaderSection = this.createElement('section', { classes: ['form-content-header'] });
        
        const formTitle = this.createElement('input', {
            classes: ['form-title-input', 'label-title'],
            attributes: {
                'type': 'text',
                'value': 'Untitled form',
                'id': 'form-title'
            }
        });
        
        // Toolbar
        const toolbar = this.createElement('ul', { classes: ['toolbar'] });
        
        const toolbarItems = [
            { icon: 'format_bold' },
            { icon: 'format_italic' },
            { icon: 'format_underlined' },
            { icon: 'format_clear' }
        ];
        
        toolbarItems.forEach(item => {
            const li = this.createElement('li');
            const button = this.createElement('button', {
                classes: ['material-symbols-outlined'],
                attributes: { 'type': 'button' },
                text: item.icon
            });
            li.appendChild(button);
            toolbar.appendChild(li);
        });
        
        const formDescription = this.createElement('textarea', {
            classes: ['form-description', 'label-description'],
            attributes: {
                'name': 'form-description',
                'id': 'form-description',
                'placeholder': 'Form description'
            }
        });
        
        formHeaderSection.appendChild(formTitle);
        formHeaderSection.appendChild(toolbar);
        formHeaderSection.appendChild(formDescription);
        
        // Add question button
        const addQuestionButton = this.createElement('button', {
            attributes: {
                'type': 'button',
                'id': 'add-question-button'
            },
            text: 'Add Question'
        });
        
        formContainer.appendChild(formHeaderSection);
        formContainer.appendChild(addQuestionButton);
        
        main.appendChild(formContainer);
        
        this.elements.root.appendChild(header);
        this.elements.root.appendChild(main);
    }

    // Main render method
    render(data) {
        // Store currently focused element before updating
        const activeElement = document.activeElement;
        const activeElementId = activeElement ? activeElement.id : null;
        const selectionStart = activeElement && activeElement.tagName === 'INPUT' ? activeElement.selectionStart : null;
        const selectionEnd = activeElement && activeElement.tagName === 'INPUT' ? activeElement.selectionEnd : null;
        
        // Render each part of the UI
        this.renderFormTitle(data.formTitle);
        this.renderFormDescription(data.formDescription);
        this.renderQuestions(data.questions);
        this.applyTheme(data.theme);
        this.updateUndoRedoButtons(data);
        
        // Update preview mode elements
        this.updatePreviewModeElements();
        
        // Restore focus after rendering (only in edit mode)
        if (!this.isPreviewMode && activeElementId) {
            const elementToFocus = document.getElementById(activeElementId);
            if (elementToFocus) {
                elementToFocus.focus();
                
                // Restore cursor position for inputs
                if (elementToFocus.tagName === 'INPUT' && selectionStart !== null && selectionEnd !== null) {
                    elementToFocus.setSelectionRange(selectionStart, selectionEnd);
                }
            }
        }
    }
    
    // Toggle preview mode
    togglePreviewMode() {
        this.isPreviewMode = !this.isPreviewMode;
        
        // Update preview button text
        const previewButton = document.getElementById('preview-button');
        if (previewButton) {
            previewButton.textContent = this.isPreviewMode ? 'Edit' : 'Preview';
        }
        
        // Update form container class for CSS styling
        if (this.elements.formContainer) {
            if (this.isPreviewMode) {
                this.elements.formContainer.classList.add('preview-mode');
            } else {
                this.elements.formContainer.classList.remove('preview-mode');
            }
        }
        
        // Update display of preview/edit elements
        this.updatePreviewModeElements();
    }
    
    // Update elements based on preview mode
    updatePreviewModeElements() {
        // Show/hide edit-only elements
         const editOnlyElements = [
        '.drag-handle',
        '.question-actions',
        '.add-option-button',
        '#add-question-button',
        '.upload-icon',
        '.custom-select',
        '[aria-label="remove-option"]', 
        '.icon-button[aria-label="Remove option"]'
    ];
        
        editOnlyElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.style.display = this.isPreviewMode ? 'none' : '';
            });
        });
        
        // Disable/enable form inputs
        const formInputs = [
            'input[type="text"]',
            'textarea',
            'select',
            '.form-title-input',
            '.form-description',
            '.form-headline'
        ];
        
        formInputs.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.disabled = this.isPreviewMode;
                if (this.isPreviewMode) {
                    element.setAttribute('readonly', '');
                } else {
                    element.removeAttribute('readonly');
                }
            });
        });
        
        // Enable form controls in preview mode
        if (this.isPreviewMode) {
            document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
                input.disabled = false;
            });
            
            // Show date and time inputs
            document.querySelectorAll('input[type="date"], input[type="time"]').forEach(input => {
                input.disabled = false;
                input.hidden = false;
            });
            
            // Add a submit button in preview mode
            if (!document.getElementById('preview-submit-button')) {
                const submitButton = this.createElement('button', {
                    classes: ['preview-submit-button'],
                    attributes: {
                        'id': 'preview-submit-button',
                        'type': 'button'
                    },
                    text: 'Submit'
                });
                
                const formContainer = document.getElementById('form-container');
                if (formContainer) {
                    formContainer.appendChild(submitButton);
                }
            }
        } else {
            // Disable controls in edit mode
            document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
                input.disabled = true;
            });
            
            // Hide date and time inputs
            document.querySelectorAll('input[type="date"], input[type="time"]').forEach(input => {
                input.disabled = true;
                input.hidden = true;
            });
            
            // Remove submit button in edit mode
            const submitButton = document.getElementById('preview-submit-button');
            if (submitButton) {
                submitButton.remove();
            }
        }
    }

    // Render form title
    renderFormTitle(title) {
        if (this.elements.formTitle) {
            this.elements.formTitle.value = title;
        }
        
        if (this.elements.formHeadline) {
            this.elements.formHeadline.value = title;
        }
    }

    // Render form description
    renderFormDescription(description) {
        if (this.elements.formDescription) {
            this.elements.formDescription.value = description;
        }
    }

    // Render all questions
    renderQuestions(questions) {
        // Save active element information
        const activeElement = document.activeElement;
        const activeElementId = activeElement ? activeElement.id : null;
        const selectionStart = activeElement && activeElement.tagName === 'INPUT' ? activeElement.selectionStart : null;
        const selectionEnd = activeElement && activeElement.tagName === 'INPUT' ? activeElement.selectionEnd : null;
        
        const addQuestionButton = document.getElementById('add-question-button');
        if (!addQuestionButton) return;
        
        const questionCards = document.querySelectorAll('.questions-card');
        questionCards.forEach(card => card.remove());
        
        questions.forEach((question, index) => {
            const questionCard = this.createQuestionCard(question, index);
            this.elements.formContainer.insertBefore(questionCard, addQuestionButton);
        });
        
        this.initializeDragDrop();
        
        // Restore focus after rendering
        if (activeElementId) {
            const elementToFocus = document.getElementById(activeElementId);
            if (elementToFocus) {
                elementToFocus.focus();
                
                // Restore cursor position for inputs
                if (elementToFocus.tagName === 'INPUT' && selectionStart !== null && selectionEnd !== null) {
                    elementToFocus.setSelectionRange(selectionStart, selectionEnd);
                }
            }
        }
    }

    // Create a question card based on question type
    createQuestionCard(question, index) {
        const questionCard = this.createElement('div', { 
            classes: ['questions-card'],
            attributes: { 
                'aria-label': question.type,
                'role': 'group',
                'data-question-id': question.id,
                'data-question-index': index,
                'data-required': question.required // Add required attribute for styling in preview mode
            }
        });
        
        // Add drag handle
        questionCard.appendChild(this.createDragHandle());
        
        // Add question header
        questionCard.appendChild(this.createQuestionHeader(question, index));
        
        // Add question options based on type
        const optionsElement = this.createQuestionOptions(question, index);
        if (optionsElement) {
            questionCard.appendChild(optionsElement);
        }
        
        // Add question actions
        questionCard.appendChild(this.createQuestionActions(question, index));
        
        return questionCard;
    }

    // Create drag handle
    createDragHandle() {
        const dragHandle = this.createElement('div', {
            classes: ['drag-handle'],
            attributes: {
                'aria-label': 'Drag to reorder'
            }
        });
        
        const dragIcon = this.createElement('span', {
            classes: ['material-symbols-outlined', 'drag-icon'],
            text: 'drag_indicator'
        });
        
        dragHandle.appendChild(dragIcon);
        return dragHandle;
    }

    // Create question header
    createQuestionHeader(question, index) {
        const questionHeader = this.createElement('div', { classes: ['question-header'] });
        
        const questionInput = this.createElement('input', { 
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
        
        const questionImageLabel = this.createElement('label', { 
            classes: ['material-symbols-outlined', 'upload-icon'],
            text: 'image'
        });
        
        const questionImageInput = this.createElement('input', { 
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
        questionHeader.appendChild(this.createTypeDropdown(question.type, index));
        
        return questionHeader;
    }

    // Create type dropdown
    createTypeDropdown(selectedType, index) {
        const customSelect = this.createElement('div', { 
            classes: ['custom-select'],
            attributes: {
                'id': `question-type-dropdown-${index}`,
                'data-question-index': index
            }
        });
        
        const selectBtn = this.createElement('div', { 
            classes: ['select-button'],
            attributes: {
                'id': `question-type-button-${index}`,
                'data-question-index': index
            }
        });
        
        // Find the selected type to display
        const selectedOption = this.createElement('span', { 
            classes: ['selected-option']
        });
        
        // Get the icon and label for the selected type
        const selectedTypeData = this.questionTypes.find(type => type.value === selectedType);
        if (selectedTypeData) {
            const icon = this.createElement('i', { 
                classes: ['material-symbols-outlined'],
                text: selectedTypeData.icon
            });
            
            const typeLabel = this.createElement('span', { text: selectedTypeData.label });
            
            selectedOption.appendChild(icon);
            selectedOption.appendChild(typeLabel);
        }
        
        const arrowIcon = this.createElement('i', { 
            classes: ['material-symbols-outlined'],
            text: 'arrow_drop_down'
        });
        
        selectBtn.appendChild(selectedOption);
        selectBtn.appendChild(arrowIcon);
        
        const optionsType = this.createElement('div', { 
            classes: ['options-type'],
            attributes: {
                'id': `question-type-options-${index}`,
                'data-question-index': index,
                'style': 'display: none;'
            }
        });
        
        this.questionTypes.forEach(type => {
            const optionType = this.createElement('div', { 
                classes: type.value === selectedType ? ['option-type', 'selected'] : ['option-type'],
                attributes: { 
                    'data-value': type.value,
                    'id': `question-type-option-${index}-${type.value}`,
                    'data-question-index': index
                }
            });
            
            const icon = this.createElement('i', { 
                classes: ['material-symbols-outlined'],
                text: type.icon
            });
            
            const typeLabel = this.createElement('span', { text: type.label });
            
            optionType.appendChild(icon);
            optionType.appendChild(typeLabel);
            
            optionsType.appendChild(optionType);
        });
        
        customSelect.appendChild(selectBtn);
        customSelect.appendChild(optionsType);
        
        return customSelect;
    }

    // Create question options based on type
    createQuestionOptions(question, index) {
        switch (question.type) {
            case 'multipleChoice':
                return this.createMultipleChoiceOptions(question, index);
            case 'checkBoxes':
                return this.createCheckboxOptions(question, index);
            case 'dropDown':
                return this.createDropdownOptions(question, index);
            case 'multipleChoiceGrid':
                return this.createMultipleChoiceGridOptions(question, index);
            case 'linearScale':
                return this.createLinearScaleOptions(question, index);
            case 'date':
                return this.createDateOptions(question, index);
            case 'time':
                return this.createTimeOptions(question, index);
            case 'rating':
                return this.createRatingOptions(question, index);
            default:
                return null;
        }
    }

    // Create multiple choice options
    createMultipleChoiceOptions(question, index) {
        const questionOptions = this.createElement('ul', { 
            classes: ['question-options'],
            attributes: {
                'id': `question-options-${index}`,
                'data-question-index': index
            }
        });
        
        question.options.forEach((option, optionIndex) => {
            const optionElement = this.createInputOption('radio', optionIndex + 1, {
                label: option.value,
                questionIndex: index,
                optionIndex: optionIndex
            });
            questionOptions.appendChild(optionElement);
        });
        
        // Add option button
        questionOptions.appendChild(this.createAddOptionButton('radio', {
            value: question.options.length + 1,
            questionIndex: index
        }));
        
        return questionOptions;
    }

    // Create checkbox options
    createCheckboxOptions(question, index) {
        const questionOptions = this.createElement('ul', { 
            classes: ['question-options'],
            attributes: {
                'id': `question-options-${index}`,
                'data-question-index': index
            }
        });
        
        question.options.forEach((option, optionIndex) => {
            const optionElement = this.createInputOption('checkbox', optionIndex + 1, {
                label: option.value,
                questionIndex: index,
                optionIndex: optionIndex
            });
            questionOptions.appendChild(optionElement);
        });
        
        // Add option button
        questionOptions.appendChild(this.createAddOptionButton('checkbox', {
            value: question.options.length + 1,
            questionIndex: index
        }));
        
        return questionOptions;
    }

    // Create dropdown options
    createDropdownOptions(question, index) {
        const questionOptions = this.createElement('ol', { 
            classes: ['question-options'],
            attributes: {
                'id': `question-options-${index}`,
                'data-question-index': index
            }
        });
        
        question.options.forEach((option, optionIndex) => {
            const optionElement = this.createInputOption('number', optionIndex + 1, {
                label: option.value,
                questionIndex: index,
                optionIndex: optionIndex
            });
            questionOptions.appendChild(optionElement);
        });
        
        // Add option button
        questionOptions.appendChild(this.createAddOptionButton('number', {
            value: question.options.length + 1,
            questionIndex: index
        }));
        
        return questionOptions;
    }

    // Create multiple choice grid options
    createMultipleChoiceGridOptions(question, index) {
        const gridContainer = this.createElement('div', { 
            classes: ['grid-container'],
            attributes: {
                'id': `grid-container-${index}`,
                'data-question-index': index
            }
        });
        
        // Create Rows
        const gridRows = this.createElement('ul', { 
            classes: ['grid-rows'],
            attributes: {
                'id': `grid-rows-${index}`,
                'data-question-index': index
            }
        });
        
        const rowHeading = this.createElement('span', { 
            classes: ['row-heading'],
            text: 'Rows'
        });
        
        gridRows.appendChild(rowHeading);
        
        question.options.rows.forEach((row, rowIndex) => {
            const rowElement = this.createInputOption('number', rowIndex + 1, {
                label: row.value,
                questionIndex: index,
                optionIndex: rowIndex,
                isRow: true
            });
            gridRows.appendChild(rowElement);
        });
        
        // Add row button
        gridRows.appendChild(this.createAddOptionButton('number', {
            value: question.options.rows.length + 1,
            questionIndex: index,
            isRow: true
        }));
        
        // Create Columns
        const gridColumns = this.createElement('ul', { 
            classes: ['grid-columns'],
            attributes: {
                'id': `grid-columns-${index}`,
                'data-question-index': index
            }
        });
        
        const columnHeading = this.createElement('span', { 
            classes: ['column-heading'],
            text: 'Columns'
        });
        
        gridColumns.appendChild(columnHeading);
        
        question.options.columns.forEach((column, columnIndex) => {
            const columnElement = this.createInputOption('radio', columnIndex + 1, {
                label: column.value,
                questionIndex: index,
                optionIndex: columnIndex,
                isColumn: true,
                name: `multipleChoiceGrid-${index}`
            });
            gridColumns.appendChild(columnElement);
        });
        
        // Add column button
        gridColumns.appendChild(this.createAddOptionButton('radio', {
            value: question.options.columns.length + 1,
            questionIndex: index,
            isColumn: true,
            name: `multipleChoiceGrid-${index}`
        }));
        
        gridContainer.appendChild(gridRows);
        gridContainer.appendChild(gridColumns);
        
        return gridContainer;
    }

    // Create linear scale options
    createLinearScaleOptions(question, index) {
        const linearScaleContainer = this.createElement('div', { 
            classes: ['scale-question-option'],
            attributes: {
                'id': `linear-scale-${index}`,
                'data-question-index': index
            }
        });
        
        const minSelect = this.createElement('select', { 
            classes: ['range-dropdown'],
            attributes: {
                'id': `linear-scale-min-${index}`,
                'data-question-index': index
            }
        });
        
        // Add options for min value (0 or 1)
        const minOptions = [0, 1];
        minOptions.forEach(value => {
            const option = this.createElement('option', {
                attributes: { 'value': value },
                text: value.toString()
            });
            if (value === question.options.min) {
                option.selected = true;
            }
            minSelect.appendChild(option);
        });
        
        const toLabel = this.createElement('span', { text: 'to' });
        
        const maxSelect = this.createElement('select', { 
            classes: ['range-dropdown'],
            attributes: {
                'id': `linear-scale-max-${index}`,
                'data-question-index': index
            }
        });
        
        // Add options for max value (2 to 10)
        for (let i = 2; i <= 10; i++) {
            const option = this.createElement('option', {
                attributes: { 'value': i },
                text: i.toString()
            });
            if (i === question.options.max) {
                option.selected = true;
            }
            maxSelect.appendChild(option);
        }
        
        linearScaleContainer.appendChild(minSelect);
        linearScaleContainer.appendChild(toLabel);
        linearScaleContainer.appendChild(maxSelect);
        
        return linearScaleContainer;
    }

    // Create date options
    createDateOptions(question, index) {
        const questionOptions = this.createElement('div', { 
            classes: ['question-options'],
            attributes: {
                'id': `date-options-${index}`,
                'data-question-index': index
            }
        });
        
        const dateContainer = this.createElement('label', { 
            classes: ['input-date'],
            text: 'Month, day, year'
        });
        
        const dateIcon = this.createElement('span', { 
            classes: ['material-symbols-outlined'],
            text: 'event'
        });
        
        const dateInput = this.createElement('input', { 
            attributes: { 
                'type': 'date',
                'id': `date-input-${index}`,
                'data-question-index': index
            },
            disabled: true,
            hidden: true
        });
        
        dateContainer.appendChild(dateIcon);
        dateContainer.appendChild(dateInput);
        questionOptions.appendChild(dateContainer);
        
        return questionOptions;
    }

    // Create time options
    createTimeOptions(question, index) {
        const questionOptions = this.createElement('div', { 
            classes: ['question-options'],
            attributes: {
                'id': `time-options-${index}`,
                'data-question-index': index
            }
        });
        
        const timeContainer = this.createElement('label', { 
            classes: ['input-time'],
            text: 'Time'
        });
        
        const timeIcon = this.createElement('span', { 
            classes: ['material-symbols-outlined'],
            text: 'access_time'
        });
        
        const timeInput = this.createElement('input', { 
            attributes: { 
                'type': 'time',
                'id': `time-input-${index}`,
                'data-question-index': index
            },
            disabled: true,
            hidden: true
        });
        
        timeContainer.appendChild(timeIcon);
        timeContainer.appendChild(timeInput);
        questionOptions.appendChild(timeContainer);
        
        return questionOptions;
    }

    // Create rating options
    createRatingOptions(question, index) {
        const container = this.createElement('div', {
            attributes: {
                'id': `rating-container-wrapper-${index}`,
                'data-question-index': index
            }
        });
        
        const ratingScaleContainer = this.createElement('div', { 
            classes: ['scale-question-option'],
            attributes: {
                'id': `rating-scale-${index}`,
                'data-question-index': index
            }
        });
        
        const ratingRange = this.createElement('select', { 
            classes: ['range-dropdown'],
            attributes: {
                'id': `rating-range-${index}`,
                'data-question-index': index
            }
        });
        
        // Add options for rating scale (1 to 5)
        for (let i = 1; i <= 5; i++) {
            const option = this.createElement('option', {
                attributes: { 'value': i },
                text: i.toString()
            });
            if (i === question.options.scale) {
                option.selected = true;
            }
            ratingRange.appendChild(option);
        }
        
        ratingScaleContainer.appendChild(ratingRange);
        
        const ratingContainer = this.createElement('div', { 
            classes: ['rating-container'],
            attributes: {
                'id': `rating-stars-${index}`,
                'data-question-index': index
            }
        });
        
        // Create star rating items
        for (let i = 1; i <= question.options.scale; i++) {
            const ratingItem = this.createElement('div', { 
                classes: ['rating-item'],
                attributes: {
                    'id': `rating-item-${index}-${i}`,
                    'data-question-index': index,
                    'data-rating-value': i
                }
            });
            
            const ratingLabel = this.createElement('span', { text: `${i}` });
            
            const starLabel = this.createElement('label', { 
                classes: ['material-symbols-outlined', 'star-icon'],
                text: 'star'
            });
            
            const starInput = this.createElement('input', { 
                attributes: { 
                    'type': 'radio',
                    'name': `rating-${index}`,
                    'value': i,
                    'id': `rating-input-${index}-${i}`,
                    'data-question-index': index
                },
                disabled: true,
                hidden: true
            });
            
            starLabel.appendChild(starInput);
            ratingItem.appendChild(ratingLabel);
            ratingItem.appendChild(starLabel);
            
            ratingContainer.appendChild(ratingItem);
        }
        
        container.appendChild(ratingScaleContainer);
        container.appendChild(ratingContainer);
        
        return container;
    }

    // Create question actions
    createQuestionActions(question, index) {
        const questionActions = this.createElement('div', { 
            classes: ['question-actions'],
            attributes: {
                'id': `question-actions-${index}`,
                'data-question-index': index
            }
        });
        
        const copyIcon = this.createIconButton('content_copy', 'Copy question', 
            ['copy-question-button'], {
                'id': `copy-question-${index}`,
                'data-question-index': index
            });
        
        const deleteIcon = this.createIconButton('delete', 'Delete question', 
            ['delete-question-button'], {
                'id': `delete-question-${index}`,
                'data-question-index': index
            });
        
        const horLine = this.createElement('div', { classes: ['hor-line'] });
        
        const requiredToggle = this.createElement('label', { 
            classes: ['required-option'],
            attributes: { 
                'aria-label': 'Required option',
                'id': `required-toggle-label-${index}`,
                'data-question-index': index
            }
        });
        
        const requiredLabel = this.createElement('span', { 
            classes: ['required'],
            text: 'Required'
        });
        
        const requiredCheckbox = this.createElement('input', { 
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
        
        requiredToggle.appendChild(requiredLabel);
        requiredToggle.appendChild(requiredCheckbox);
        
        questionActions.appendChild(copyIcon);
        questionActions.appendChild(deleteIcon);
        questionActions.appendChild(horLine);
        questionActions.appendChild(requiredToggle);
        
        return questionActions;
    }

    // function to create an option
    createInputOption(type, value, options = {}) {
        const option = this.createElement('li', { 
            classes: ['option'],
            attributes: {
                'id': options.isRow 
                    ? `row-option-${options.questionIndex}-${options.optionIndex}`
                    : options.isColumn
                        ? `column-option-${options.questionIndex}-${options.optionIndex}`
                        : `option-${options.questionIndex}-${options.optionIndex}`,
                'data-question-index': options.questionIndex,
                'data-option-index': options.optionIndex,
                'data-is-row': options.isRow ? 'true' : 'false',
                'data-is-column': options.isColumn ? 'true' : 'false'
            }
        });
        
        let inputElement;
        
        switch (type) {
            case 'radio':
                inputElement = this.createElement('input', { 
                    attributes: { 
                        'type': 'radio', 
                        'name': options.name || `mcq-${options.questionIndex}`,
                        'id': `radio-${options.questionIndex}-${options.optionIndex}`
                    },
                    disabled: true
                });
                break;
            case 'checkbox':
                inputElement = this.createElement('input', { 
                    attributes: { 
                        'type': 'checkbox', 
                        'name': options.name || `checkbox-${options.questionIndex}`,
                        'id': `checkbox-${options.questionIndex}-${options.optionIndex}`
                    },
                    disabled: true
                });
                break;
            case 'number':
                inputElement = this.createElement('span', { 
                    classes: ['option-label'],
                    text: value + '.'
                });
                break;
            default:
                inputElement = this.createElement('span', { 
                    classes: ['option-label'],
                    text: value
                });
        }
        
        
        const optionInput = this.createElement('input', { 
            classes: ['option-input', 'label-medium'],
            attributes: { 
                'type': 'text',
                'id': options.isRow
                    ? `row-input-${options.questionIndex}-${options.optionIndex}`
                    : options.isColumn
                        ? `column-input-${options.questionIndex}-${options.optionIndex}`
                        : `option-input-${options.questionIndex}-${options.optionIndex}`,
                'data-question-index': options.questionIndex,
                'data-option-index': options.optionIndex,
                'data-is-row': options.isRow ? 'true' : 'false',
                'data-is-column': options.isColumn ? 'true' : 'false'
            },
            value: options.label !== undefined ? options.label : '' 
        });
        
        const closeIcon = this.createIconButton('close', 'Remove option', [], {
            'id': options.isRow
                ? `remove-row-${options.questionIndex}-${options.optionIndex}`
                : options.isColumn
                    ? `remove-column-${options.questionIndex}-${options.optionIndex}`
                    : `remove-option-${options.questionIndex}-${options.optionIndex}`,
            'data-question-index': options.questionIndex,
            'data-option-index': options.optionIndex,
            'data-is-row': options.isRow ? 'true' : 'false',
            'data-is-column': options.isColumn ? 'true' : 'false',
            'aria-label': 'remove-option'
        });
        
        option.appendChild(inputElement);
        option.appendChild(optionInput);
        option.appendChild(closeIcon);
        
        return option;
    }

    // function to create an add option button
    createAddOptionButton(type, options = {}) {
        const addOption = this.createElement('li', { 
            classes: ['option', 'add-option-button'],
            attributes: {
                'id': options.isRow
                    ? `add-row-button-${options.questionIndex}`
                    : options.isColumn
                        ? `add-column-button-${options.questionIndex}`
                        : `add-option-button-${options.questionIndex}`,
                'data-question-index': options.questionIndex,
                'data-is-row': options.isRow ? 'true' : 'false',
                'data-is-column': options.isColumn ? 'true' : 'false'
            }
        });
        
        let inputElement;
        
        switch (type) {
            case 'radio':
                inputElement = this.createElement('input', { 
                    attributes: { 
                        'type': 'radio', 
                        'name': options.name || `mcq-${options.questionIndex}`
                    },
                    disabled: true
                });
                break;
            case 'checkbox':
                inputElement = this.createElement('input', { 
                    attributes: { 
                        'type': 'checkbox', 
                        'name': options.name || `checkbox-${options.questionIndex}`
                    },
                    disabled: true
                });
                break;
            case 'number':
                inputElement = this.createElement('span', { 
                    classes: ['option-label'],
                    text: options.value ? options.value + '.' : '1.'
                });
                break;
            default:
                inputElement = this.createElement('span');
        }
        
        const addOptionButton = this.createElement('button', {
            classes: ['add-option-button', 'label-small'],
            attributes: { 
                'type': 'button',
                'id': options.isRow
                    ? `add-row-${options.questionIndex}`
                    : options.isColumn
                        ? `add-column-${options.questionIndex}`
                        : `add-option-${options.questionIndex}`,
                'data-question-index': options.questionIndex,
                'data-is-row': options.isRow ? 'true' : 'false',
                'data-is-column': options.isColumn ? 'true' : 'false'
            },
            text: options.isRow 
                ? 'Add row' 
                : options.isColumn
                    ? 'Add column'
                    : 'Add option'
        });
        
        addOption.appendChild(inputElement);
        addOption.appendChild(addOptionButton);
        
        return addOption;
    }

    // function to create an icon button
    createIconButton(icon, ariaLabel, classes = [], attributes = {}) {
        const buttonAttributes = { 
            'aria-label': ariaLabel, 
            'type': 'button',
            ...attributes
        };
        
        const button = this.createElement('button', {
            classes: ['material-symbols-outlined', 'icon-button', ...classes],
            attributes: buttonAttributes,
            text: icon
        });
        
        return button;
    }

    // function to create an element
    createElement(tag, options = {}) {
        const element = document.createElement(tag);
        
        if (options.classes) {
            element.classList.add(...options.classes);
        }
        
        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }
        
        if (options.text) {
            element.textContent = options.text;
        }
        
        if (options.html) {
            element.innerHTML = options.html;
        }
        
        if (options.value) {
            element.value = options.value;
        }
        
        if (options.disabled) {
            element.disabled = true;
        }

        if (options.hidden) {
            element.hidden = true;
        }
        
        if (options.selected) {
            element.selected = true;
        }

        if (options.checked) {
            element.checked = true;
        }
        
        return element;
    }

    // Apply theme to form
    applyTheme(themeId) {
        const themes = {
            'dark-theme': {
                backgroundColor: '#f0f0f0',
                borderColor: '#9e9e9e'
            },
            'purple-theme': {
                backgroundColor: '#f0ebf8',
                borderColor: '#673ab7'
            },
            'red-theme': {
                backgroundColor: '#fae3e1',
                borderColor: '#db4537'
            }
        };
        
        if (themes[themeId]) {
            document.body.style.backgroundColor = themes[themeId].backgroundColor;
            document.querySelector('.form-content-header').style.borderTop = `10px solid ${themes[themeId].borderColor}`;
        }
    }

    // Update undo/redo buttons
    updateUndoRedoButtons(data) {
        if (this.elements.undoButton) {
            this.elements.undoButton.disabled = !data.canUndo;
        }
        
        if (this.elements.redoButton) {
            this.elements.redoButton.disabled = !data.canRedo;
        }
    }

    // Initialize drag and drop functionality
    initializeDragDrop() {
        const formContainer = document.querySelector('.form-container');
        let draggedItem = null;

        document.querySelectorAll('.questions-card').forEach(card => {
            const dragHandle = card.querySelector('.drag-handle');
            if (dragHandle) {
                dragHandle.addEventListener('mousedown', () => {
                    card.setAttribute('draggable', 'true');
                });
                
                card.addEventListener('mouseup', () => {
                    card.setAttribute('draggable', 'false');
                });
                
                card.addEventListener('mouseleave', () => {
                    if (!draggedItem) {
                        card.setAttribute('draggable', 'false');
                    }
                });
            }
            
            card.addEventListener('dragstart', function(e) {
                draggedItem = this;
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', this.innerHTML);
                this.classList.add('dragging');
            });
            
            card.addEventListener('dragend', function(e) {
                this.classList.remove('dragging');
                this.setAttribute('draggable', 'false');
                draggedItem = null;
            });
        });

        formContainer.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            const afterElement = getDragAfterElement(formContainer, e.clientY);
            const currentCard = document.querySelector('.dragging');
            if (afterElement == null) {
                formContainer.appendChild(currentCard);
            } else {
                formContainer.insertBefore(currentCard, afterElement);
            }
        });

        formContainer.addEventListener('drop', function(e) {
            e.preventDefault();
            if (draggedItem) {
                draggedItem.classList.remove('dragging');
                draggedItem.setAttribute('draggable', 'false');
                
                const questionCards = document.querySelectorAll('.questions-card');
                const newOrder = [];
                questionCards.forEach(card => {
                    const index = parseInt(card.getAttribute('data-question-index'));
                    newOrder.push(index);
                });
                
                // Dispatch a custom event for the drag completion
                const dragEndEvent = new CustomEvent('drag-end', { 
                    detail: { 
                        newOrder: newOrder
                    } 
                });
                document.dispatchEvent(dragEndEvent);
            }
        });

        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.questions-card:not(.dragging)')];

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }
    }

    // Bind event handlers
    bindEvents(handlers) {        
        // Theme buttons
        const darkThemeBtn = document.getElementById('dark-theme-button');
        const purpleThemeBtn = document.getElementById('purple-theme-button');
        const redThemeBtn = document.getElementById('red-theme-button');
        
        if (darkThemeBtn) {
            darkThemeBtn.addEventListener('click', () => handlers.themeChanged('dark-theme'));
        }
        
        if (purpleThemeBtn) {
            purpleThemeBtn.addEventListener('click', () => handlers.themeChanged('purple-theme'));
        }
        
        if (redThemeBtn) {
            redThemeBtn.addEventListener('click', () => handlers.themeChanged('red-theme'));
        }
        
        // Undo/redo buttons
        if (this.elements.undoButton) {
            this.elements.undoButton.addEventListener('click', handlers.undo);
        }
        
        if (this.elements.redoButton) {
            this.elements.redoButton.addEventListener('click', handlers.redo);
        }
        
        // Theme toggle button
        if (this.elements.themeToggleButton) {
            this.elements.themeToggleButton.addEventListener('click', handlers.toggleThemePanel);
        }
        
        // Add question button
        if (this.elements.addQuestionButton) {
            this.elements.addQuestionButton.addEventListener('click', handlers.addQuestion);
        }
        
        // Clear form button
        if (this.elements.clearFormButton) {
            this.elements.clearFormButton.addEventListener('click', handlers.clearForm);
        }
        
        // Publish button
        if (this.elements.publishButton) {
            this.elements.publishButton.addEventListener('click', handlers.publishForm);
        }
        
        if (this.elements.previewButton) {
            this.elements.previewButton.addEventListener('click', () => {
                this.togglePreviewMode();
                // Optionally call a handler if you need controller logic
                if (handlers.togglePreviewMode) {
                    handlers.togglePreviewMode(this.isPreviewMode);
                }
            });
        }
        
        
        // Question-specific event delegation 
        document.addEventListener('click', e => {
            if ( e.target.textContent === 'close') {
                const button = e.target.closest('button');
                if (button) {
                    const questionIndex = parseInt(button.getAttribute('data-question-index'));
                    const optionIndex = parseInt(button.getAttribute('data-option-index'));
                    const isRow = button.getAttribute('data-is-row') === 'true';
                    const isColumn = button.getAttribute('data-is-column') === 'true';
                    handlers.removeOption(questionIndex, optionIndex, isRow, isColumn);
                }
                return;
            }
            
            // Type dropdown
            if (e.target.closest('.select-button')) {
                const selectButton = e.target.closest('.select-button');
                const questionIndex = parseInt(selectButton.getAttribute('data-question-index'));
                handlers.toggleTypeDropdown(questionIndex);
            }
            // Type option
            else if (e.target.closest('.option-type')) {
                const option = e.target.closest('.option-type');
                const questionIndex = parseInt(option.getAttribute('data-question-index'));
                const type = option.getAttribute('data-value');
                handlers.changeQuestionType(questionIndex, type);
            }
            // Copy question
            else if (e.target.closest('[id^="copy-question-"]')) {
                const button = e.target.closest('[id^="copy-question-"]');
                const questionIndex = parseInt(button.getAttribute('data-question-index'));
                handlers.copyQuestion(questionIndex);
            }
            // Delete question
            else if (e.target.closest('[id^="delete-question-"]')) {
                const button = e.target.closest('[id^="delete-question-"]');
                const questionIndex = parseInt(button.getAttribute('data-question-index'));
                handlers.deleteQuestion(questionIndex);
            }
            // Required toggle
            else if (e.target.closest('[id^="required-toggle-"]')) {
                const checkbox = e.target.closest('[id^="required-toggle-"]');
                const questionIndex = parseInt(checkbox.getAttribute('data-question-index'));
                handlers.toggleRequired(questionIndex);
            }
            // Add option button
            else if (e.target.closest('.add-option-button')) {
                const button = e.target.closest('.add-option-button');
                const questionIndex = parseInt(button.getAttribute('data-question-index'));
                const isRow = button.getAttribute('data-is-row') === 'true';
                const isColumn = button.getAttribute('data-is-column') === 'true';
                handlers.addOption(questionIndex, isRow, isColumn);
            }
            
            // Close all dropdowns when clicking outside
            if (!e.target.closest('.custom-select')) {
                document.querySelectorAll('.options-type').forEach(optionsList => {
                    optionsList.style.display = 'none';
                });
            }
        });

        // Question input changes
        document.addEventListener('input', e => {
            // Question title
            if (e.target.classList.contains('question-input')) {
                const questionIndex = parseInt(e.target.getAttribute('data-question-index'));
                handlers.updateQuestionTitle(questionIndex, e.target.value);
            }
            // Option input
            else if (e.target.classList.contains('option-input')) {
                const questionIndex = parseInt(e.target.getAttribute('data-question-index'));
                const optionIndex = parseInt(e.target.getAttribute('data-option-index'));
                const isRow = e.target.getAttribute('data-is-row') === 'true';
                const isColumn = e.target.getAttribute('data-is-column') === 'true';
                handlers.updateOptionValue(questionIndex, optionIndex, e.target.value, isRow, isColumn);
            }
        });

        // Listen for drag end events
        document.addEventListener('drag-end', e => {
            handlers.reorderQuestions(e.detail.newOrder);
        });

        // Form title and description (moved here to ensure elements exist)
        if (this.elements.formTitle) {
            this.elements.formTitle.addEventListener('input', handlers.formTitleChanged);
        }
        
        if (this.elements.formDescription) {
            this.elements.formDescription.addEventListener('input', handlers.formDescriptionChanged);
        }
        
        if (this.elements.formHeadline) {
            this.elements.formHeadline.addEventListener('input', handlers.formTitleChanged);
        }
    }
}

// Export the view class
export default FormView;