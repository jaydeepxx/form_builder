import { objectCopier } from '../utils/objectCopier.js';

export class HistoryManager {
    constructor() {
        this.historyStack = [];
        this.currentHistoryIndex = -1;
        this.MAX_HISTORY_SIZE = 30;
    }

    saveToHistory(currentData) {
        // If we're not at the end of the stack, truncate the future history
        if (this.currentHistoryIndex < this.historyStack.length - 1) {
            this.historyStack = this.historyStack.slice(0, this.currentHistoryIndex + 1);
        }

        // Create a copy of the current state using the objectCopier
        const currentState = objectCopier.copyFormData(currentData);

        this.historyStack.push(currentState);
        this.currentHistoryIndex = this.historyStack.length - 1;

        if (this.historyStack.length > this.MAX_HISTORY_SIZE) {
            this.historyStack.shift();
            this.currentHistoryIndex--;
        }

        // return currentState;
    }

    undo() {
        if (this.currentHistoryIndex > 0) {
            this.currentHistoryIndex--;
            // Return a copy of the state to restore to
            return {
                success: true,
                state: objectCopier.copyFormData(this.historyStack[this.currentHistoryIndex])
            };
        }
        return { success: false };
    }

    redo() {
        if (this.currentHistoryIndex < this.historyStack.length - 1) {
            this.currentHistoryIndex++;
            // Return a copy of the state to restore to
            return {
                success: true,
                state: objectCopier.copyFormData(this.historyStack[this.currentHistoryIndex])
            };
        }
        return { success: false };
    }

    getCurrentState() {
        if (this.currentHistoryIndex >= 0 && this.historyStack.length > 0) {
            return objectCopier.copyFormData(this.historyStack[this.currentHistoryIndex]);
        }
        return null;
    }

    canUndo() {
        return this.currentHistoryIndex > 0;
    }

    canRedo() {
        return this.currentHistoryIndex < this.historyStack.length - 1;
    }
}