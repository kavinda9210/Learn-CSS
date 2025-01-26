const elements = document.querySelector("ol");

const updateCustomProperties = () => {
    let index = 1;

    for (element of elements.children) {
        element.style.setProperty("--sibling-index", index);
        index++;
    }

    elements.style.setProperty("--sibling-count", elements.children.length);
};

updateCustomProperties();

const observer = new MutationObserver(updateCustomProperties);
const config = { attributes: false, childList: true, subtree: false };
observer.observe(elements, config);

// Add elements on slider input. For DEMO

const elementsInput = document.querySelector("#elements");
const elementsLabelValue = document.querySelector(
    "label[for='elements'] .value"
);

const createLiElement = (index) => {
    const newElement = document.createElement("li");
    newElement.innerText = index;

    return newElement;
};

elementsInput.addEventListener("input", (event) => {
    const elementsNumber = elements.children.length;
    const targetElementsNumber = parseInt(event.target.value);
    const difference = targetElementsNumber - elementsNumber;

    for (let i = 0; i < Math.abs(difference); i++) {
        // Add one element
        if (difference > 0) {
            const newElement = createLiElement(elementsNumber + i + 1);
            elements.appendChild(newElement);
        }

        // Remove last element
        if (difference < 0) {
            elements.children[elementsNumber - i - 1].remove();
        }
    }

    elementsLabelValue.innerHTML = targetElementsNumber;
});