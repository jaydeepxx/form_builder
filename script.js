//for dropdown menu

document.querySelectorAll(".custom-select").forEach(select => {
    const selectBtn = select.querySelector(".select-btn");
    const options = select.querySelector(".options-type");
    const selectedOption = select.querySelector("#selected-option");

    const defaultSelected = select.querySelector(".option-type.selected");
    if (defaultSelected) {
        selectedOption.innerHTML = defaultSelected.innerHTML;
    }

    selectBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (options.style.display === "flex") {
            options.style.display = "none";
            return;
        }
        closeAllDropdowns();
        options.style.display = options.style.display === "flex" ? "none" : "flex";
    });

    select.querySelectorAll(".option-type").forEach(option => {
        option.addEventListener("click", () => {
            option.classList.add("selected");
            selectedOption.innerHTML = option.innerHTML;
            options.style.display = "none";
        });
    });
});

function closeAllDropdowns() {
    document.querySelectorAll(".options-type").forEach(opt => {
        opt.style.display = "none";
    });
}

document.addEventListener("click", () => {
    closeAllDropdowns();
});


//to expand the for description input

let textarea = document.querySelector(".form-description");

textarea.oninput = function () {
    textarea.style.height = "";
    textarea.style.height = textarea.scrollHeight + "px"
};