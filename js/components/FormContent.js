import { createElement } from '../utils/createElement.js';

export function createFormContent() {
    const main = createElement('main', { classes: ['form-content'] });
    
    // Create form container
    const formContainer = createElement('form', {
        classes: ['form-container'],
        attributes: { 'id': 'form-container' }
    });
    
    // Form header section
    const formHeaderSection = createElement('section', { classes: ['form-content-header'] });
    
    const formTitle = createElement('input', {
        classes: ['form-title-input', 'label-title'],
        attributes: {
            'type': 'text',
            'value': 'Untitled form',
            'id': 'form-headline'
        }
    });
    
    // Toolbar
    const toolbar = createElement('ul', { classes: ['toolbar'] });
    
    const toolbarItems = [
        { icon: 'format_bold' },
        { icon: 'format_italic' },
        { icon: 'format_underlined' },
        { icon: 'format_clear' }
    ];
    
    toolbarItems.forEach(item => {
        const li = createElement('li');
        const button = createElement('button', {
            classes: ['material-symbols-outlined'],
            attributes: { 'type': 'button' },
            text: item.icon
        });
        li.appendChild(button);
        toolbar.appendChild(li);
    });
    
    const formDescription = createElement('textarea', {
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
    const addQuestionButton = createElement('button', {
        attributes: {
            'type': 'button',
            'id': 'add-question-button'
        },
        text: 'Add Question'
    });
    
    formContainer.appendChild(formHeaderSection);
    formContainer.appendChild(addQuestionButton);
    
    main.appendChild(formContainer);
    
    return main;
}