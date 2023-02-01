// let age = document.getElementById('age');

// function showUser(surname, name) {
//     alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
// }
// showUser.apply(age, ['Есенин', 'Сергей']);

class Options {
    constructor(height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    createDiv() {
        let elem = document.createElement('div');
        document.body.appendChild(elem);
        elem.textContent = 'Hello World!';
        elem.style.cssText = `height: ${this.height}px; width:${this.width}px; background-color: ${this.bg}; font-size: ${this.fontSize}px; text-align: ${this.textAlign};`;
        // let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;// или так
        // elem.style.cssText = param;
    }
}

let newText = new Options(200, 300, 'red', 20, 'center');
newText.createDiv();