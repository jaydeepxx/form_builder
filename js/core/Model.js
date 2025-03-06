import { QuestionManager } from "../modelModules/questionManager.js";
import { HistoryManager } from "../modelModules/historyManager.js";
import { ObserverManager } from "../modelModules/observerManager.js";
import { objectCopier } from "../utils/objectCopier.js";
import { FormData } from "../modelModules/formData.js";

class FormModel {
  constructor() {
    // Initialize with the FormData class instead of a plain object
    this.formData = new FormData();

    this.observerManager = new ObserverManager();
    this.historyManager = new HistoryManager();
    this.questionManager = new QuestionManager();
  }

  subscribe(listener) {
    this.observerManager.subscribe(listener);
  }

  notify() {
    this.observerManager.notify(this.formData);
  }

  getFormData() {
    return this.formData;
  }

  updateForm(updates) {

    Object.keys(updates).forEach(key => {
      if (key in this.formData) {
        this.formData[key] = updates[key];
      }
    });
    
    this.notify();
    
    if (updates.questions || updates.formTitle || updates.formDescription) {
      this.saveToHistory();
    }
  }

  // Question facade methods
  getQuestions() {
    return this.questionManager.getQuestions(this.formData.questions);
  }

  addQuestion(question) {
    // Update the questions array
    this.formData.questions = this.questionManager.addQuestion(
      this.formData.questions,
      question
    );
    
    this.saveToHistory();
    this.notify();
  }

  deleteQuestion(index) {
    this.formData.questions = this.questionManager.deleteQuestion(
      this.formData.questions,
      index
    );
    
    this.saveToHistory();
    this.notify();
  }

  copyQuestion(index) {
    this.formData.questions = this.questionManager.copyQuestion(
      this.formData.questions,
      index,
      () => this.generateUniqueId()
    );
    
    this.saveToHistory();
    this.notify();
  }

  changeQuestionType(index, newType) {
    this.formData.questions = this.questionManager.changeQuestionType(
      this.formData.questions,
      index,
      newType
    );
    
    this.saveToHistory();
    this.notify();
  }

  getDefaultOptionsForType(type) {
    return this.questionManager.getDefaultOptionsForType(type);
  }

  addOptionToQuestion(questionIndex, optionValue, isRow, isColumn) {
    this.formData.questions = this.questionManager.addOptionToQuestion(
      this.formData.questions,
      questionIndex,
      optionValue,
      isRow,
      isColumn
    );
    
    this.saveToHistory();
    this.notify();
  }

  removeOptionFromQuestion(questionIndex, optionIndex, isRow, isColumn) {
    this.formData.questions = this.questionManager.removeOptionFromQuestion(
      this.formData.questions,
      questionIndex,
      optionIndex,
      isRow,
      isColumn
    );
    
    this.saveToHistory();
    this.notify();
  }

  updateOptionValue(questionIndex, optionIndex, newValue, isRow, isColumn) {
    this.formData.questions = this.questionManager.updateOptionValue(
      this.formData.questions,
      questionIndex,
      optionIndex,
      newValue,
      isRow,
      isColumn
    );
    
    this.notify();
  }

  toggleQuestionRequired(questionIndex) {
    this.formData.questions = this.questionManager.toggleQuestionRequired(
      this.formData.questions,
      questionIndex
    );
    
    this.saveToHistory();
    this.notify();
  }

  updateQuestionTitle(questionIndex, title) {
    this.formData.questions = this.questionManager.updateQuestionTitle(
      this.formData.questions,
      questionIndex,
      title
    );
    
    this.notify();
  }

  moveQuestion(oldIndex, newIndex) {
    this.formData.questions = this.questionManager.moveQuestion(
      this.formData.questions,
      oldIndex,
      newIndex
    );
    
    this.saveToHistory();
    this.notify();
  }

  // History facade methods
  saveToHistory() {
    this.historyManager.saveToHistory(this.formData.toObject());
  }

  undo() {
    const result = this.historyManager.undo();
    if (result.success) {
      this.formData = FormData.fromObject(result.state);
      this.notify();
      return true;
    }
    return false;
  }

  redo() {
    const result = this.historyManager.redo();
    if (result.success) {
      this.formData = FormData.fromObject(result.state);
      this.notify();
      return true;
    }
    return false;
  }

  canUndo() {
    return this.historyManager.canUndo();
  }

  canRedo() {
    return this.historyManager.canRedo();
  }

  // Utility method
  generateUniqueId() {
    return "q" + Date.now() + Math.floor(Math.random() * 1000);
  }

  // Initialize with default question
  initialize() {
    // Create a default question
    const defaultQuestion = {
      id: this.generateUniqueId(),
      type: "multipleChoice",
      title: "",
      required: false,
      options: [{ value: "Option 1" }],
    };

    this.formData.questions = [defaultQuestion];
    this.saveToHistory();
    this.notify();
  }

  // Clear form data
  clearForm() {
    // Reset the FormData instance
    this.formData.reset();

    // Add one default question
    const defaultQuestion = {
      id: this.generateUniqueId(),
      type: "multipleChoice",
      title: "",
      required: false,
      options: [{ value: "Option 1" }],
    };

    this.formData.questions.push(defaultQuestion);

    this.notify();
    this.saveToHistory();
  }
}

export default FormModel;