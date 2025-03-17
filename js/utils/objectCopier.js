
export const objectCopier = {

    copyFormData(data) {
        // Create a copy of the form data
        const dataCopy = {
            formTitle: data.formTitle,
            formDescription: data.formDescription,
            formHeadline: data.formHeadline,
            theme: data.theme,
            questions: []
        };

        // Copy each question
        for (let i = 0; i < data.questions.length; i++) {
            dataCopy.questions.push(this.copyQuestion(data.questions[i]));
        }

        return dataCopy;
    },

    copyQuestion(question) {
        const questionCopy = {
            id: question.id,
            title: question.title,
            type: question.type,
            required: question.required
        };

        // Handle different option types
        if (question.type === 'multipleChoiceGrid') {
            questionCopy.options = this.copyMultipleChoiceGridOptions(question.options);
        } else if (question.type === 'linearScale') {
            questionCopy.options = this.copyLinearScaleOptions(question.options);
        } else if (question.type === 'rating') {
            questionCopy.options = this.copyRatingOptions(question.options);
        } else {
            questionCopy.options = this.copySimpleOptions(question.options);
        }

        return questionCopy;
    },

    copyMultipleChoiceGridOptions(options) {
        const optionsCopy = {
            rows: [],
            columns: []
        };
        
        // Copy rows
        for (let i = 0; i < options.rows.length; i++) {
            optionsCopy.rows.push({
                value: options.rows[i].value
            });
        }
        
        // Copy columns
        for (let i = 0; i < options.columns.length; i++) {
            optionsCopy.columns.push({
                value: options.columns[i].value
            });
        }
        
        return optionsCopy;
    },

    copyLinearScaleOptions(options) {
        return {
            min: options.min,
            max: options.max
        };
    },

    copyRatingOptions(options) {
        return {
            scale: options.scale
        };
    },

    copySimpleOptions(options) {
        const optionsCopy = [];
        for (let i = 0; i < options.length; i++) {
            optionsCopy.push({
                value: options[i].value
            });
        }
        return optionsCopy;
    }
};

export default objectCopier;