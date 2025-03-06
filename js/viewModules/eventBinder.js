export class EventBinder {
        
    //adding eventListeners to initial structure form elements
    bindAllEvents(handlers, elements,togglePreviewCallback) {
        this.bindFormEvents(handlers, elements);
        this.bindThemeEvents(handlers, elements);
        this.bindActionEvents(handlers, elements,togglePreviewCallback);
        this.bindDragEndEvent(handlers);
        this.bindKeyboardShortcuts(handlers)
    }
    
    bindFormEvents(handlers, elements) {
        // Bind events for form title and description
        if (elements.formTitle) {
            elements.formTitle.addEventListener('input', handlers.formTitleChanged);
        }
        
        if (elements.formDescription) {
            elements.formDescription.addEventListener('input', handlers.formDescriptionChanged);
        }
        
        if (elements.formHeadline) {
            elements.formHeadline.addEventListener('input', handlers.formHeadLineChanges);
        }
    }

     bindThemeEvents(handlers, elements) {
        // Theme buttons
        const darkThemeBtn = document.getElementById('dark-theme');
        const purpleThemeBtn = document.getElementById('purple-theme');
        const redThemeBtn = document.getElementById('red-theme');
        
        if (darkThemeBtn) {
            darkThemeBtn.addEventListener('click', () => handlers.themeChanged('dark-theme'));
        }
        
        if (purpleThemeBtn) {
            purpleThemeBtn.addEventListener('click', () => handlers.themeChanged('purple-theme'));
        }
        
        if (redThemeBtn) {
            redThemeBtn.addEventListener('click', () => handlers.themeChanged('red-theme'));
        }
        
        // Theme toggle button
        if (elements.themeToggleButton) {
            elements.themeToggleButton.addEventListener('click', handlers.toggleThemePanel);
        }
    }
    
    bindActionEvents(handlers, elements, togglePreviewCallback) {
        // Undo/redo buttons
        if (elements.undoButton) {
            elements.undoButton.addEventListener('click', handlers.undo);
        }
        
        if (elements.redoButton) {
            elements.redoButton.addEventListener('click', handlers.redo);
        }
        
        // Add question button
        if (elements.addQuestionButton) {
            elements.addQuestionButton.addEventListener('click', handlers.addQuestion);
        }
        
        // Clear form button
        if (elements.clearFormButton) {
            elements.clearFormButton.addEventListener('click', handlers.clearForm);
        }
        
        // Publish button
        if (elements.publishButton) {
            elements.publishButton.addEventListener('click', handlers.publishForm);
        }
        
        // Preview button
        if (elements.previewButton) {
            elements.previewButton.addEventListener('click', () => {
                // Call the toggle function provided by parent
                const isPreviewMode = togglePreviewCallback();
                
                // Notify handler about the toggle
                if (handlers.togglePreviewMode) {
                    handlers.togglePreviewMode(isPreviewMode);
                }
            });
        }
    }

    bindDragEndEvent(handlers) {
        document.addEventListener('drag-end', e => {
            handlers.reorderQuestions(e.detail.newOrder);
        });
    }

    bindKeyboardShortcuts(handlers) {

        document.addEventListener('keydown', (e) => {

            const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
          
          if (isInputActive && !['Tab', 'Escape'].includes(e.key)) {
            return;
          }
          
          if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
            e.preventDefault();
            if (handlers.undo) {
              handlers.undo();
            }
          }
          
          if ((e.key === 'y' && (e.ctrlKey || e.metaKey)) || 
              (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey)) {
            e.preventDefault(); 
            if (handlers.redo) {
              handlers.redo();
            }
          }
        });
      }
}