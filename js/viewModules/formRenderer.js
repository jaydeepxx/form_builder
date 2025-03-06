import { createQuestionCard } from '../components/QuestionCard.js';

export class FormRenderer {

    storeFocusInfo() {
        const activeElement = document.activeElement;
        return {
            activeElementId: activeElement ? activeElement.id : null,
            selectionStart: activeElement && activeElement.tagName === 'INPUT' ? activeElement.selectionStart : null,
            selectionEnd: activeElement && activeElement.tagName === 'INPUT' ? activeElement.selectionEnd : null
        };
    }
    
    restoreFocus(focusInfo, isPreviewMode) {
        if (!isPreviewMode && focusInfo.activeElementId) {
            const elementToFocus = document.getElementById(focusInfo.activeElementId);
            if (elementToFocus) {
                elementToFocus.focus();

                // Restore cursor position for inputs
                if (elementToFocus.tagName === 'INPUT' && 
                    focusInfo.selectionStart !== null && 
                    focusInfo.selectionEnd !== null) {
                    elementToFocus.setSelectionRange(focusInfo.selectionStart, focusInfo.selectionEnd);
                }
            }
        }
    }
    
    renderFormTitle(title, formTitleElement) {
        if (formTitleElement && title) {
            formTitleElement.value = title;
        }
    }

    renderFormHeadline(headline, formHeadlineElement) {
        if (formHeadlineElement && headline) {
            formHeadlineElement.value = headline;
        }
    }

    renderFormDescription(description, formDescriptionElement) {
        if (formDescriptionElement && description) {
            formDescriptionElement.value = description;
        }
    }

    renderQuestions(questions, handlers, formContainer) {
        // Save active element information
        const focusInfo = this.storeFocusInfo();

        // Get reference to the add question button
        const addQuestionButton = document.getElementById('add-question-button');
        if (!addQuestionButton) return;

        // Remove all existing question cards
        const questionCards = document.querySelectorAll('.questions-card');
        questionCards.forEach(card => card.remove());

        // Add each question card using the component function
        questions.forEach((question, index) => {
            const questionCard = createQuestionCard(question, index, handlers);
            formContainer.insertBefore(questionCard, addQuestionButton);
        });

        return true;

    }
}