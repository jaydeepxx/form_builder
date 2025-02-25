// ---- Undo & Redo All Functions -----
let historyStack = [];
let currentHistoryIndex = -1;
const MAX_HISTORY_SIZE = 30;

function saveToHistory() {
    const formContainer = document.querySelector(".form-container");
    const clonedContainer = formContainer.cloneNode(true);
    

    formContainer.querySelectorAll('input[type="text"], textarea, select').forEach((input, index) => {
        const clonedInput = clonedContainer.querySelectorAll('input[type="text"], textarea, select')[index];
        if (clonedInput) {
            clonedInput.setAttribute('data-value', input.value);
        }
    });
    
    const currentState = clonedContainer.innerHTML;
    
    if (currentHistoryIndex < historyStack.length - 1) {
        historyStack = historyStack.slice(0, currentHistoryIndex + 1);
    }
    
    historyStack.push(currentState);
    currentHistoryIndex = historyStack.length - 1;
    
    if (historyStack.length > MAX_HISTORY_SIZE) {
        historyStack.shift();
        currentHistoryIndex--;
    }
    
    updateUndoRedoButtons();
}

function undo() {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        restoreState();
    }
}

function redo() {
    if (currentHistoryIndex < historyStack.length - 1) {
        currentHistoryIndex++;
        restoreState();
    }
}

function restoreState() {
    const formContainer = document.querySelector(".form-container");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    formContainer.innerHTML = historyStack[currentHistoryIndex];
    
    formContainer.querySelectorAll('input[type="text"], textarea, select').forEach(input => {
        const savedValue = input.getAttribute('data-value');
        if (savedValue !== null) {
            input.value = savedValue;
            input.removeAttribute('data-value');
        }
    });
    
    window.scrollTo(0, scrollTop);
    
    initializeFormFunctionality();
    
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    const undoButton = document.getElementById("undo-button");
    const redoButton = document.getElementById("redo-button");
    
    if (undoButton) {
        undoButton.disabled = currentHistoryIndex <= 0;
    }
    
    if (redoButton) {
        redoButton.disabled = currentHistoryIndex >= historyStack.length - 1;
    }
}

// Common elements creation functions
function createElement(tag, options = {}) {
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
    
    return element;
}

function createIconButton(icon, ariaLabel, classes = []) {
    const button = createElement('button', {
        classes: ['material-symbols-outlined', 'icon-button', ...classes],
        attributes: { 'aria-label': ariaLabel, 'type': 'button' },
        text: icon
    });
    
    return button;
}

function createInputOption(type, value, options = {}) {
    const option = createElement('li', { classes: ['option'] });
    
    let inputElement;
    
    switch (type) {
        case 'radio':
            inputElement = createElement('input', { 
                attributes: { type: 'radio', name: options.name || 'mcq' },
                disabled: true
            });
            break;
        case 'checkbox':
            inputElement = createElement('input', { 
                attributes: { type: 'checkbox', name: options.name || 'checkbox' },
                disabled: true
            });
            break;
        case 'number':
            inputElement = createElement('span', { 
                classes: ['option-label'],
                text: value + '.'
            });
            break;
        default:
            inputElement = createElement('span', { 
                classes: ['option-label'],
                text: value
            });
    }
    
    const optionInput = createElement('input', { 
        classes: ['option-input', 'label-medium'],
        attributes: { type: 'text' },
        value: options.label || `Option ${value}`
    });
    
    const closeIcon = createIconButton('close', 'remove-option');
    
    option.appendChild(inputElement);
    option.appendChild(optionInput);
    option.appendChild(closeIcon);
    
    return option;
}

function createAddOptionButton(type, options = {}) {
    const addOption = createElement('li', { classes: ['option', 'add-option-button'] });
    
    let inputElement;
    
    switch (type) {
        case 'radio':
            inputElement = createElement('input', { 
                attributes: { type: 'radio', name: options.name || 'mcq' },
                disabled: true
            });
            break;
        case 'checkbox':
            inputElement = createElement('input', { 
                attributes: { type: 'checkbox', name: options.name || 'checkbox' },
                disabled: true
            });
            break;
        case 'number':
            inputElement = createElement('span', { 
                classes: ['option-label'],
                text: options.value ? options.value + '.' : '1.'
            });
            break;
        default:
            inputElement = createElement('span');
    }
    
    const addOptionButton = createElement('button', {
        classes: ['add-option-button', 'label-small'],
        attributes: { type: 'button' },
        text: options.text || 'Add option'
    });
    
    addOption.appendChild(inputElement);
    addOption.appendChild(addOptionButton);
    
    return addOption;
}

// Options creator for different question types
const OPTION_CREATORS = {
    multipleChoice: {
        createOptions: () => {
            const questionOptions = createElement('ul', { classes: ['question-options'] });
            questionOptions.appendChild(createInputOption('radio', 1));
            questionOptions.appendChild(createAddOptionButton('radio'));
            return questionOptions;
        },
        addOptionFunction: addRadioOption
    },
    checkBoxes: {
        createOptions: () => {
            const questionOptions = createElement('ul', { classes: ['question-options'] });
            questionOptions.appendChild(createInputOption('checkbox', 1));
            questionOptions.appendChild(createAddOptionButton('checkbox'));
            return questionOptions;
        },
        addOptionFunction: addCheckboxOption
    },
    dropDown: {
        createOptions: () => {
            const questionOptions = createElement('ol', { classes: ['question-options'] });
            questionOptions.appendChild(createInputOption('number', 1, { label: 'Option 1' }));
            questionOptions.appendChild(createAddOptionButton('number', { 
                value: 2, 
                text: 'Add option' 
            }));
            return questionOptions;
        },
        addOptionFunction: addDropdownOption
    },
    multipleChoiceGrid: {
        createOptions: () => {
            const gridContainer = createElement('div', { classes: ['grid-container'] });
            
            // Create Rows
            const gridRows = createElement('ul', { classes: ['grid-rows'] });
            const rowHeading = createElement('span', { 
                classes: ['row-heading'],
                text: 'Rows'
            });
            
            gridRows.appendChild(rowHeading);
            gridRows.appendChild(createInputOption('number', 1, { label: 'Row 1' }));
            gridRows.appendChild(createAddOptionButton('number', { 
                value: 2, 
                text: 'Add row' 
            }));
            
            // Create Columns
            const gridColumns = createElement('ul', { classes: ['grid-columns'] });
            const columnHeading = createElement('span', { 
                classes: ['column-heading'],
                text: 'Columns'
            });
            
            gridColumns.appendChild(columnHeading);
            gridColumns.appendChild(createInputOption('radio', 1, { label: 'Column 1' }));
            gridColumns.appendChild(createAddOptionButton('radio', { 
                name: 'multipleChoiceGrid', 
                text: 'Add column' 
            }));
            
            gridContainer.appendChild(gridRows);
            gridContainer.appendChild(gridColumns);
            
            return gridContainer;
        },
        addOptionFunction: (params) => {
            if (params.rowOrGrid === '.grid-rows') {
                return addDropdownOption(params);
            } else {
                return addRadioOption(params);
            }
        }
    },
    date: {
        createOptions: () => {
            const questionOptions = createElement('div', { classes: ['question-options'] });
            const dateContainer = createElement('label', { 
                classes: ['input-date'],
                text: 'Month, day, year'
            });
            
            const dateIcon = createElement('span', { 
                classes: ['material-symbols-outlined'],
                text: 'event'
            });
            
            const dateInput = createElement('input', { 
                attributes: { type: 'date' },
                disabled: true,
                hidden: true
            });
            
            dateContainer.appendChild(dateIcon);
            dateContainer.appendChild(dateInput);
            questionOptions.appendChild(dateContainer);
            
            return questionOptions;
        }
    },
    time: {
        createOptions: () => {
            const questionOptions = createElement('div', { classes: ['question-options'] });
            const timeContainer = createElement('label', { 
                classes: ['input-time'],
                text: 'Time'
            });
            
            const timeIcon = createElement('span', { 
                classes: ['material-symbols-outlined'],
                text: 'access_time'
            });
            
            const timeInput = createElement('input', { 
                attributes: { type: 'time' },
                disabled: true,
                hidden: true
            });
            
            timeContainer.appendChild(timeIcon);
            timeContainer.appendChild(timeInput);
            questionOptions.appendChild(timeContainer);
            
            return questionOptions;
        }
    },
    linearScale: {
        createOptions: () => {
            const linearScaleContainer = createElement('div', { classes: ['scale-question-option'] });
            
            const minSelect = createElement('select', { classes: ['range-dropdown'] });
            minSelect.innerHTML = `
                <option value="0">0</option>
                <option value="1">1</option>
            `;
            
            const toLabel = createElement('span', { text: 'to' });
            
            const maxSelect = createElement('select', { classes: ['range-dropdown'] });
            maxSelect.innerHTML = `
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            `;
            
            linearScaleContainer.appendChild(minSelect);
            linearScaleContainer.appendChild(toLabel);
            linearScaleContainer.appendChild(maxSelect);
            
            return linearScaleContainer;
        }
    },
    rating: {
        createOptions: () => {
            const container = createElement('div');
            
            const ratingScaleContainer = createElement('div', { classes: ['scale-question-option'] });
            
            const ratingRange = createElement('select', { classes: ['range-dropdown'] });
            ratingRange.innerHTML = `
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            `;
            
            const ratingItem = createElement('select', { classes: ['range-dropdown'] });
            
            ratingScaleContainer.appendChild(ratingRange);
            ratingScaleContainer.appendChild(ratingItem);
            
            const ratingContainer = createElement('div', { classes: ['rating-container'] });
            
            for (let i = 1; i <= 5; i++) {
                const ratingItem = createElement('div', { classes: ['rating-item'] });
                
                const ratingLabel = createElement('span', { text: `${i}` });
                
                const starLabel = createElement('label', { 
                    classes: ['material-symbols-outlined', 'star-icon'],
                    text: 'star'
                });
                
                const starInput = createElement('input', { 
                    attributes: { type: 'radio' },
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
    }
};

function createTypeDropdown(selectedType) {
    const customSelect = createElement('div', { classes: ['custom-select'] });
    
    const selectBtn = createElement('div', { classes: ['select-button'] });
    const selectedOption = createElement('span', { 
        classes: ['selected-option'],
        text: 'Select Option' 
    });
    
    const arrowIcon = createElement('i', { 
        classes: ['material-symbols-outlined'],
        text: 'arrow_drop_down'
    });
    
    selectBtn.appendChild(selectedOption);
    selectBtn.appendChild(arrowIcon);
    
    const optionsType = createElement('div', { classes: ['options-type'] });
    
    const questionTypes = [
        { value: 'multipleChoice', icon: 'radio_button_checked', label: 'Multiple choice' },
        { value: 'checkBoxes', icon: 'check_box', label: 'Checkboxes' },
        { value: 'dropDown', icon: 'arrow_drop_down_circle', label: 'Dropdown' },
        { value: 'multipleChoiceGrid', icon: 'apps', label: 'Multiple choice grid' },
        { value: 'linearScale', icon: 'linear_scale', label: 'Linear scale' },
        { value: 'date', icon: 'event', label: 'Date' },
        { value: 'time', icon: 'access_time', label: 'Time' },
        { value: 'rating', icon: 'star', label: 'Rating' }
    ];
    
    questionTypes.forEach(type => {
        const optionType = createElement('div', { 
            classes: type.value === selectedType ? ['option-type', 'selected'] : ['option-type'],
            attributes: { 'data-value': type.value }
        });
        
        const icon = createElement('i', { 
            classes: ['material-symbols-outlined'],
            text: type.icon
        });
        
        const typeLabel = createElement('span', { text: type.label });
        
        optionType.appendChild(icon);
        optionType.appendChild(typeLabel);
        
        optionsType.appendChild(optionType);
    });
    
    customSelect.appendChild(selectBtn);
    customSelect.appendChild(optionsType);
    
    return customSelect;
}

function createQuestionHeader(questionType) {
    const questionHeader = createElement('div', { classes: ['question-header'] });
    
    const questionInput = createElement('input', { 
        classes: ['question-input', 'label-large'],
        attributes: { 
            type: 'text', 
            placeholder: 'Question',
            'aria-label': 'Question Heading' 
        }
    });
    
    const questionImageLabel = createElement('label', { 
        classes: ['material-symbols-outlined', 'upload-icon'],
        text: 'image'
    });
    
    const questionImageLabelInput = createElement('input', { 
        classes: ['image-upload'],
        attributes: { type: 'file' }
    });
    
    questionImageLabel.appendChild(questionImageLabelInput);
    
    questionHeader.appendChild(questionInput);
    questionHeader.appendChild(questionImageLabel);
    questionHeader.appendChild(createTypeDropdown(questionType));
    
    return questionHeader;
}

function createQuestionActions() {
    const questionActions = createElement('div', { classes: ['question-actions'] });
    
    const copyIcon = createIconButton('content_copy', 'copy-question-button');
    const deleteIcon = createIconButton('delete', 'delete-question-button');
    
    const horLine = createElement('div', { classes: ['hor-line'] });
    
    const requiredToggle = createElement('label', { 
        classes: ['required-option'],
        attributes: { 'aria-label': 'required-option' }
    });
    
    const requiredLabel = createElement('span', { 
        classes: ['required'],
        text: 'Required'
    });
    
    const requiredCheckbox = createElement('input', { 
        classes: ['required-toggle'],
        attributes: { type: 'checkbox' }
    });
    
    requiredToggle.appendChild(requiredLabel);
    requiredToggle.appendChild(requiredCheckbox);
    
    questionActions.appendChild(copyIcon);
    questionActions.appendChild(deleteIcon);
    questionActions.appendChild(horLine);
    questionActions.appendChild(requiredToggle);
    
    return questionActions;
}

function createQuestionCard(questionType) {
    // console.log(questionType);
    const questionCard = createElement('div', { 
        classes: ['questions-card'],
        attributes: { 
            'aria-label': questionType,
            'role': 'group'
        }
    });
    
    // question drag icon
    questionCard.appendChild(createDragHandle());
    
    // question header
    questionCard.appendChild(createQuestionHeader(questionType));
    
    // question options
    if (OPTION_CREATORS[questionType]) {
        questionCard.appendChild(OPTION_CREATORS[questionType].createOptions());
    }
    
    // question actions
    questionCard.appendChild(createQuestionActions());
    
    return questionCard;
}

// Option functions
function addRadioOption() {
    return createElement('input', { 
        attributes: { type: 'radio', name: 'mcq' },
        disabled: true
    });
}

function addCheckboxOption() {
    return createElement('input', { 
        attributes: { type: 'checkbox', name: 'checkbox' },
        disabled: true
    });
}

function addDropdownOption({questionCard, rowOrGrid}) {
    const addOption = questionCard.querySelector(".add-option-button").querySelector(".option-label");
    const optionCounter = rowOrGrid == null 
        ? questionCard.querySelector(".question-options").children.length 
        : questionCard.querySelector(rowOrGrid).children.length - 1;
    
    const dropDownInput = createElement('span', { 
        classes: ['option-label'],
        text: `${(optionCounter - 1 )+1}.`
    });
    
    addOption.textContent = `${optionCounter+1}.`;
    return dropDownInput;
}


const OPTION_HANDLER = {
    multipleChoice: addRadioOption,
    checkBoxes: addCheckboxOption,
    dropDown: addDropdownOption,
    multipleChoiceGridRow: addDropdownOption,
    multipleChoiceGridColumn: addRadioOption
};

// Function to add a new option to a question
function addOption({questionCard, questionType, rowOrGrid}) {
    const questionOptions = questionType == "multipleChoiceGrid" 
        ? questionCard.querySelector(rowOrGrid) 
        : questionCard.querySelector(".question-options");
    
    const effectiveType = questionType === "multipleChoiceGrid" 
        ? rowOrGrid == ".grid-rows" ? "multipleChoiceGridRow" : "multipleChoiceGridColumn" 
        : questionType;
    
    if (questionOptions) {
        const option = createElement('li', { classes: ['option'] });
        

        const handler = OPTION_HANDLER[effectiveType];
        // console.log(handler);
        const questionTypeIcon = handler({questionCard, rowOrGrid});
        

        if (rowOrGrid === ".grid-rows") {
            defaultValue = `Row ${questionOptions.children.length - 1}`;
          } else if (rowOrGrid === ".grid-columns") {
            defaultValue = `Column ${questionOptions.children.length - 1}`;
          } else {
            defaultValue = `Option ${questionOptions.children.length}`;
          }

        const optionInput = createElement('input', { 
            classes: ['option-input', 'label-medium'],
            attributes: { type: 'text' },
            value: defaultValue
        });
        
        const closeIcon = createIconButton('close', 'remove-option');
        
        option.appendChild(questionTypeIcon);
        option.appendChild(optionInput);
        option.appendChild(closeIcon);
        
        const addOptionBtn = rowOrGrid === null 
            ? questionCard.querySelector('.add-option-button') 
            : questionCard.querySelector(`${rowOrGrid} .add-option-button`);
        
        if (addOptionBtn) {
            questionOptions.insertBefore(option, addOptionBtn);
        }
    }
    saveToHistory();
}


// Question Add, Copy, Delete functions
function addQuestionCard(questionType = 'multipleChoice') {
    const formContent = document.querySelector('.form-container');
    const newQuestionCard = createQuestionCard(questionType);
    const addQuestionBtn = document.getElementById("add-question-button")
    formContent.insertBefore(newQuestionCard,addQuestionBtn);
    initializeFormFunctionality();
    saveToHistory();
}

function copyQuestionCard(questionCard) {
    const clonedCard = questionCard.cloneNode(true);
    const formContent = document.querySelector('.form-container');
    formContent.insertBefore(clonedCard, questionCard.nextSibling);
    initializeFormFunctionality();
    saveToHistory();
}

function deleteQuestionCard(questionCard) {
    questionCard.remove();
    saveToHistory();
}

function replaceQuestionCard({questionCard, questionType}) {
    const newQuestionCard = createQuestionCard(questionType);
    questionCard.replaceWith(newQuestionCard);
    initializeFormFunctionality();
    saveToHistory();
}

// theme change function

function applyTheme(themeId) {
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

// drag & drop functions

function createDragHandle() {
    const dragHandle = createElement('div', {
        classes: ['drag-handle'],
        attributes: {
            'aria-label': 'Drag to reorder'
        }
    });
    
    const dragIcon = createElement('span', {
        classes: ['material-symbols-outlined', 'drag-icon'],
        text: 'drag_indicator'
    });
    
    dragHandle.appendChild(dragIcon);
    // console.log(dragHandle.innerHTML);
    return dragHandle;
}

function initializeDragDrop() {
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
        
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });

    formContainer.addEventListener('dragover', handleDragOver);
    formContainer.addEventListener('drop', handleDrop);

    function handleDragStart(e) {
        draggedItem = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        this.classList.add('dragging');
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        this.setAttribute('draggable', 'false');
        draggedItem = null;
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const afterElement = getDragAfterElement(formContainer, e.clientY);
        const currentCard = document.querySelector('.dragging');
        if (afterElement == null) {
            formContainer.appendChild(currentCard);
        } else {
            formContainer.insertBefore(currentCard, afterElement);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            draggedItem.setAttribute('draggable', 'false');
        }
    }

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

// Dropdown function

function initializeDropdowns() {
    document.querySelectorAll('.select-button').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });
    
    document.querySelectorAll('.option-type').forEach(option => {
        const newOption = option.cloneNode(true);
        option.parentNode.replaceChild(newOption, option);
    });

    document.querySelectorAll('.custom-select').forEach(select => {
        const selectBtn = select.querySelector('.select-button');
        const options = select.querySelector('.options-type');
        const selectedOption = select.querySelector('.selected-option');
    
        const defaultSelected = select.querySelector('.option-type.selected');
        if (defaultSelected) {
            selectedOption.innerHTML = defaultSelected.innerHTML;
        }
    
        selectBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            if (options.style.display === 'flex') {
                options.style.display = 'none';
                return;
            }
            closeAllDropdowns();
            options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
        });
    
        select.querySelectorAll('.option-type').forEach(option => {
            option.addEventListener('click', () => {
                const questionType = option.getAttribute('data-value');
                const questionCard = option.closest('.questions-card');
                
                select.querySelectorAll('.option-type').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                option.classList.add('selected');
                selectedOption.innerHTML = option.innerHTML;
                options.style.display = 'none';
                replaceQuestionCard({questionCard, questionType});
            });
        });
    });
    
    function closeAllDropdowns() {
        document.querySelectorAll('.options-type').forEach(opt => {
            opt.style.display = 'none';
        });
    }
}

// Event listeners for all functions

function initializeEventListeners() {

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-option-button')) {
            // console.log("add-option");
            
            const questionCard = event.target.closest('.questions-card');
            if (questionCard) {
                const questionType = questionCard.querySelector('.option-type.selected').getAttribute('data-value');
                let rowOrGrid = null;
                if (questionType === 'multipleChoiceGrid') {
                    if (event.target.closest('.grid-columns') === null) {
                        rowOrGrid = '.grid-rows';
                    } else {
                        rowOrGrid = '.grid-columns';
                    }
                }
                addOption({questionCard, questionType, rowOrGrid});
            }
        }

        else if(event.target.ariaLabel === "remove-option"){
            // console.log("remove-option");
            const option = event.target.closest(".option");
            if(option){
                option.remove();
            }
            saveToHistory();
        }
        else if(event.target.ariaLabel === "copy-question-button"){
            // console.log("Copy icon!");
            const questionCard = event.target.closest(".questions-card");
            // console.log(questionCard);
            if(questionCard){
                copyQuestionCard(questionCard);
            }
        }
        else if (event.target.ariaLabel === "delete-question-button") {
            // console.log("Delete icon!");
            const questionCard = event.target.closest(".questions-card");
            if (questionCard) {
                deleteQuestionCard(questionCard);
            }
        }
        else if (event.target.id == 'add-question-button') {
            // console.log("hi");
            const questionType = "multipleChoice"; // Default to MCQ
            addQuestionCard(questionType);
            // event.stopPropagation();
        }
        else if (['dark-theme', 'purple-theme', 'red-theme'].includes(event.target.id)) {
            applyTheme(event.target.id);
        }
        else if(event.target.id === "undo-button"){
            undo();
        }
        else if(event.target.id === "redo-button"){
            redo();
        }
        else if(event.target.id === "theme-icon-button"){
            // console.log(event);
            const themeBox = document.querySelector(".theme-toggle");
            themeBox.style.display === "none" ? themeBox.style.display = "flex" : themeBox.style.display = "none";
        }
        if (!event.target.closest('.custom-select')) {
            document.querySelectorAll('.options-type').forEach(opt => {
                opt.style.display = 'none';
            });
        }
    });
}

function initializeFormFunctionality() {
    initializeDropdowns();
    initializeDragDrop();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeFormFunctionality();
    initializeEventListeners();
    saveToHistory();
});
