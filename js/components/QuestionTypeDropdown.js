import { createElement } from '../utils/createElement.js';


export function createTypeDropdown(selectedType, index, handlers) {
    // Question type definitions
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

    const customSelect = createElement('div', { 
        classes: ['custom-select'],
        attributes: {
            'id': `question-type-dropdown-${index}`,
            'data-question-index': index
        }
    });
    
    const selectBtn = createElement('div', { 
        classes: ['select-button'],
        attributes: {
            'id': `question-type-button-${index}`,
            'data-question-index': index
        }
    });
    
    // Add click event listener to toggle dropdown
    if (handlers) {
        selectBtn.addEventListener('click', () => {
            handlers.toggleTypeDropdown(index);
        });
    }
    
    // Find the selected type to display
    const selectedOption = createElement('span', { 
        classes: ['selected-option']
    });
    
    // Get the icon and label for the selected type
    const selectedTypeData = questionTypes.find(type => type.value === selectedType);
    if (selectedTypeData) {
        const icon = createElement('i', { 
            classes: ['material-symbols-outlined'],
            text: selectedTypeData.icon
        });
        
        const typeLabel = createElement('span', { text: selectedTypeData.label });
        
        selectedOption.appendChild(icon);
        selectedOption.appendChild(typeLabel);
    }
    
    const arrowIcon = createElement('i', { 
        classes: ['material-symbols-outlined'],
        text: 'arrow_drop_down'
    });
    
    selectBtn.appendChild(selectedOption);
    selectBtn.appendChild(arrowIcon);
    
    const optionsType = createElement('div', { 
        classes: ['options-type'],
        attributes: {
            'id': `question-type-options-${index}`,
            'data-question-index': index,
            'style': 'display: none;'
        }
    });
    
    questionTypes.forEach(type => {
        const optionType = createElement('div', { 
            classes: type.value === selectedType ? ['option-type', 'selected'] : ['option-type'],
            attributes: { 
                'data-value': type.value,
                'id': `question-type-option-${index}-${type.value}`,
                'data-question-index': index
            }
        });
        
        if (handlers) {
            optionType.addEventListener('click', () => {
                handlers.changeQuestionType(index, type.value);
            });
        }
        
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