import { createElement } from '../utils/createElement.js';


export function createFormHeader() {
    const header = createElement('header', { classes: ['form-header'] });
    
    // Header left section
    const headerLeft = createElement('div', { classes: ['form-header-left'] });
    const formIcon = createElement('img', { 
        classes: ['form-icon'],
        attributes: {
            'src': 'assets/form-icon.svg',
            'alt': 'form-icon'
        }
    });
    const formHeadline = createElement('input', {
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
    const headerRight = createElement('ul', { classes: ['form-header-right'] });
    
    // Preview button
    const previewLi = createElement('li');
    const previewButton = createElement('button', {
        classes: ['preview-button'],
        attributes: {
            'id': 'preview-button',
            'aria-label': 'Preview Form'
        },
        text: 'Preview'
    });
    previewLi.appendChild(previewButton);
    
    const themeSwitcherLi = createElement('li', { classes: ['theme-switcher'] });
    const themeButton = createElement('button', {
        classes: ['material-symbols-outlined', 'icon-button'],
        attributes: {
            'id': 'theme-icon-button',
            'aria-label': 'Change theme'
        },
        text: 'palette'
    });
    
    const themeToggle = createElement('div', {
        classes: ['theme-toggle'],
        attributes: {
            'id': 'theme-toggle'
            // No style attribute - your CSS will handle this
        }
    });
    
    // Create theme options with your IDs
    const darkTheme = createElement('div', { 
        attributes: { 
            'id': 'dark-theme'
            // No classes - your CSS handles the styling
        }
    });
    
    const purpleTheme = createElement('div', { 
        attributes: { 
            'id': 'purple-theme'
        }
    });
    
    const redTheme = createElement('div', { 
        attributes: { 
            'id': 'red-theme'
        }
    });
    
    themeToggle.appendChild(darkTheme);
    themeToggle.appendChild(purpleTheme);
    themeToggle.appendChild(redTheme);
    
    themeSwitcherLi.appendChild(themeButton);
    themeSwitcherLi.appendChild(themeToggle);
    
    // Undo button
    const undoLi = createElement('li');
    const undoButton = createElement('button', {
        classes: ['material-symbols-outlined', 'icon-button'],
        attributes: {
            'id': 'undo-button',
            'aria-label': 'Undo'
        },
        text: 'undo'
    });
    undoLi.appendChild(undoButton);
    
    // Redo button
    const redoLi = createElement('li');
    const redoButton = createElement('button', {
        classes: ['material-symbols-outlined', 'icon-button'],
        attributes: {
            'id': 'redo-button',
            'aria-label': 'Redo'
        },
        text: 'redo'
    });
    redoLi.appendChild(redoButton);
    
    // Clear form button
    const clearLi = createElement('li');
    const clearButton = createElement('button', {
        classes: ['clear-button'],
        attributes: {
            'id': 'clear-form-button',
            'aria-label': 'Clear Form'
        },
        text: 'Clear form'
    });
    clearLi.appendChild(clearButton);
    
    // Publish button
    const publishLi = createElement('li');
    const publishButton = createElement('button', {
        classes: ['publish-button'],
        attributes: {
            'id': 'publish-button',
            'aria-label': 'Publish Form'
        },
        text: 'Publish'
    });
    publishLi.appendChild(publishButton);
    
    // Add all buttons to header right
    headerRight.appendChild(previewLi);
    headerRight.appendChild(themeSwitcherLi);
    headerRight.appendChild(undoLi);
    headerRight.appendChild(redoLi);
    headerRight.appendChild(clearLi);
    headerRight.appendChild(publishLi);
    
    header.appendChild(headerLeft);
    header.appendChild(headerRight);
    
    return header;
}