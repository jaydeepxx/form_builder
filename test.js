document.querySelectorAll(".custom-select").forEach(select => {
    const selectBtn = select.querySelector(".select-btn");
    const options = select.querySelector(".options-type");
    const selectedOption = select.querySelector("#selected-option");

    // Set default selected option
    const defaultSelected = select.querySelector(".option-type.selected");
    if (defaultSelected) {
        selectedOption.innerHTML = defaultSelected.innerHTML;
    }

    selectBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        closeAllDropdowns();
        options.style.display = options.style.display === "flex" ? "none" : "flex";
    });

    select.querySelectorAll(".option-type").forEach(option => {
        option.addEventListener("click", () => {
            // Remove selected class from all options
            select.querySelectorAll(".option-type").forEach(opt => opt.classList.remove("selected"));
            
            // Mark clicked option as selected
            option.classList.add("selected");
            
            // Update selected text
            selectedOption.innerHTML = option.innerHTML;
            
            // Close dropdown
            options.style.display = "none";
        });
    });
});

// Function to close all dropdowns when clicking outside
function closeAllDropdowns() {
    document.querySelectorAll(".options-type").forEach(opt => {
        opt.style.display = "none";
    });
}

// Close dropdown when clicking outside
document.addEventListener("click", () => {
    closeAllDropdowns();
});
