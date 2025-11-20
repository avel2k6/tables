// класс умеет сохранять выделение на странице и восстанавливать его
export default class CustomSelection {
    private selectionRanges: Range[];

    constructor() {
        // для сохранения области выделения документа
        this.selectionRanges = [];
    }

    // сохранение областей выделения
    // если выделение было задано и сохранено, вернет true
    saveSelection() {
        this.selectionRanges = [];
        // ищем выделение на странице
        const currentSelection = document.getSelection(); // текущее выделение
        for (let i = 0; i < currentSelection.rangeCount; i++) {
            // если выделение задано, сохраняем его
            this.selectionRanges[i] = currentSelection.getRangeAt(i);
        }

        // range может сохранить и кликнутый элемент(!?), и выделенное... а строка из selection - только выделенное
        return currentSelection.toString().length;
    }

    // восстановление выделения из сохраненного
    retrieveSelection() {
        const currentSelection = document.getSelection(); // текущее выделение

        currentSelection.removeAllRanges();
        // если было задано выделение, восстанавливаем его
        for (let i = 0; i < this.selectionRanges.length; i++) {
            currentSelection.addRange(this.selectionRanges[i]);
        }
    }
}
