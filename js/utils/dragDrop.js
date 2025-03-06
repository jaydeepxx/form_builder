export function initializeDragDrop() {
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
        
        // Check if we're near the Add Question button
        const addQuestionButton = document.getElementById('add-question-button');
        if (addQuestionButton) {
            const buttonRect = addQuestionButton.getBoundingClientRect();
            
            // If we're in the area of the Add Question button, don't allow dropping
            if (e.clientY >= buttonRect.top - 20) {
                return; // Exit early - don't reposition
            }
        }
        
        const afterElement = getDragAfterElement(formContainer, e.clientY);
        const currentCard = document.querySelector('.dragging');
        
        if (afterElement == null) {
            // Only append if it's not the Add Question button
            if (addQuestionButton) {
                formContainer.insertBefore(currentCard, addQuestionButton);
            } else {
                formContainer.appendChild(currentCard);
            }
        } else {
            formContainer.insertBefore(currentCard, afterElement);
        }
    });
    
    formContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            draggedItem.setAttribute('draggable', 'false');
            
            // Check if we're near the Add Question button
            const addQuestionButton = document.getElementById('add-question-button');
            if (addQuestionButton) {
                const buttonRect = addQuestionButton.getBoundingClientRect();
                
                // If we're in the area of the Add Question button, don't allow dropping
                if (e.clientY >= buttonRect.top - 20) {
                    return; // Exit early - don't complete the drop
                }
            }
            
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
        // Get all draggable elements except the one being dragged
        const draggableElements = [...container.querySelectorAll('.questions-card:not(.dragging)')];
        
        // Add Question button - don't include it in positioning calculation
        const addQuestionButton = document.getElementById('add-question-button');
        
        return draggableElements.reduce((closest, child) => {
            // Skip if this is the Add Question button
            if (child === addQuestionButton) return closest;
            
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