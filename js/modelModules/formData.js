
export class FormData {
    constructor(
        formTitle = "Untitled form", 
        formDescription = "", 
        formHeadline = "Untitled form", 
        questions = [], 
        theme = "purple-theme"
    ) {
        this.formTitle = formTitle;
        this.formDescription = formDescription;
        this.formHeadline = formHeadline;
        this.questions = questions;
        this.theme = theme;
    }

    static fromObject(dataObj) {
        return new FormData(
            dataObj.formTitle,
            dataObj.formDescription,
            dataObj.formHeadline,
            dataObj.questions,
            dataObj.theme
        );
    }

    reset() {
        this.formTitle = "Untitled form";
        this.formDescription = "";
        this.formHeadline = "Untitled form";
        this.questions = [];
        this.theme = "purple-theme";
        return this;
    }


    toObject() {
        return {
            formTitle: this.formTitle,
            formDescription: this.formDescription,
            formHeadline: this.formHeadline,
            questions: this.questions,
            theme: this.theme
        };
    }

    
}