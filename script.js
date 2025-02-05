document.querySelectorAll(".custom-select").forEach(select => {
    console.log(select)
    const selectBtn = select.querySelector(".select-btn");
    const options = select.querySelector(".options-type");
    const selectedOption = select.querySelector("#selected-option");

    const defaultSelected = select.querySelector(".option-type.selected");
    console.log(defaultSelected);
    if (defaultSelected) {
        selectedOption.innerHTML = defaultSelected.innerHTML;
    }

    selectBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        // closeAllDropdowns();
        // console.log("selectbtn");
        if(options.style.display === "flex")
        {
            // options.style.display = "none";
            closeAllDropdowns();
            return;
        }
        closeAllDropdowns();
        options.style.display = options.style.display === "flex" ? "none" : "flex";
    });

    select.querySelectorAll(".option-type").forEach(option => {
        option.addEventListener("click", () => {
            // select.querySelectorAll(".option-type").forEach(opt => opt.classList.remove("selected"));
            option.classList.add("selected");
            selectedOption.innerHTML = option.innerHTML;
            options.style.display = "none";
        });
    });
});

function closeAllDropdowns() {
    // options.style.display = "none";
    document.querySelectorAll(".options-type").forEach(opt => {
        opt.style.display = "none";
    });
}

document.addEventListener("click", () => {
    closeAllDropdowns();
});
