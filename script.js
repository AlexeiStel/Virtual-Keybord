const div = document.createElement('div');
const input = document.createElement('textarea');
input.type = "text";
input.className = 'input';
input.id = 'input';
input.setAttribute('autofocus', 'autofocus');
document.body.append(div);
document.body.append(input);

let langKeyBoard = {
                ru : [
                            ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
                            ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 'Backslash', "Delete"], 
                            ["CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э",  "Enter"], 
                            ["ShiftLeft", 'IntlBackslash', "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "ArrowUp", "ShiftRight"],
                            ["ControlLeft", "Meta", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]
                        ], 
               ru_shift : [
                            ["Ё", "!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace"],
                            ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "/", "Delete"], 
                            ["CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э",  "Enter"], 
                            ["ShiftLeft", "/", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",","ArrowUp", "ShiftRight"],
                            ["ControlLeft", "Meta", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]
                        ],                      
                eng :   [
                            ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
                            ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", 'Backslash', "Delete"], 
                            ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",  "Enter"], 
                            ["ShiftLeft", "IntlBackslash", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/","ArrowUp", "ShiftRight"],
                            ["ControlLeft", "Meta", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]
                        ],
               eng_shift : [
                            ["~", "!", '@', "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace"],
                            ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "|", "Delete"], 
                            ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"',  "Enter"], 
                            ["ShiftLeft", "|", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "ArrowUp", "ShiftRight"],
                            ["ControlLeft", "Meta", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]
               ]
                          };

let value = localStorage.getItem('layout') ? localStorage.getItem('layout') : 'eng';

const keyboard = document.createElement('div');
    keyboard.className = 'keyboard';
    keyboard.id = 'keyboard-id';
    document.body.append(keyboard);
const text = document.createElement('div');
    text.className = 'text';
    text.innerHTML = 'Переключение языка: левый Shift + левый Alt. Операционная система: Windows.';
    document.body.append(text);     
function createKeyBoard(langKeyBoard) {
    for (let row of langKeyBoard[value]) {
        for (let key of row) {
            keyboard.append(createKeyBlock(key));
        }
     }
}

let capslock = false;
let shift = false;
let alt = false;
function createKeyBlock(keyValue) {
    let keyBlock = document.createElement('div');
        keyBlock.className = 'key';
        keyBlock.classList.add('simbol');
                if (keyValue === 'ArrowUp') {
                  keyBlock.innerHTML = "▲";
                } else if (keyValue == 'ArrowDown') {
                  keyBlock.innerHTML = "▼";
                } else if (keyValue == 'ArrowLeft') {
                  keyBlock.innerHTML = "◀";
                } else if (keyValue == 'ArrowRight') {
                  keyBlock.innerHTML = "▶";
                } else if (keyValue === 'Meta') {
                  keyBlock.innerHTML = 'Win';
                } else if (keyValue === 'ControlLeft' || keyValue === 'ControlRight') {
                  keyBlock.innerHTML = 'Ctrl';
                }  else if (keyValue === 'AltLeft' || keyValue === 'AltRight') {
                  keyBlock.innerHTML = 'Alt';
                } else if (keyValue === 'ShiftLeft' || keyValue === 'ShiftRight') {
                  keyBlock.innerHTML = 'Shift';
                } else if (keyValue === 'Backslash' || keyValue === 'IntlBackslash') {
                  keyBlock.innerHTML = '\\';
                } else
                  keyBlock.innerHTML = keyValue;
        if (keyValue === "Delete" || keyValue === "Tab") {
          keyBlock.classList.remove('long');
          keyBlock.classList.remove('simbol');
          keyBlock.classList.add('delete');
        } else if (keyValue === 'ArrowUp' || keyValue === 'ArrowDown'|| keyValue === 'ArrowLeft'|| keyValue === 'ArrowRight') {
          keyBlock.classList.add('arrow');
        }  else if (keyValue === "Meta" || keyValue === 'AltLeft' || keyValue === 'AltRight' || keyValue === 'ShiftRight' || keyValue === 'Backslash' || keyValue === 'IntlBackslash') {
          keyBlock.classList.remove('long');
          keyBlock.classList.add('win');
        } else if (keyValue.length > 5 || keyValue === "Enter") {
            keyBlock.classList.remove('simbol');
            keyBlock.classList.add('long');
            }else if (keyValue === "Space") {
                    keyBlock.classList.remove('long');
                    keyBlock.classList.remove('simbol');
                    keyBlock.classList.add('space');
            } else if (keyValue === "Shift") {
                    keyBlock.classList.remove('long');
                    keyBlock.classList.remove('simbol');
                    keyBlock.classList.add('shift-left');
            } 

            keyBlock.id = keyValue;
                keyBlock.addEventListener('mousedown', (event) => mouseDown(event));
                keyBlock.addEventListener('mouseup', (event) => mouseUp(event));
    return keyBlock; 
}

    function mouseDown(event) {  console.log(event.target.id);
        if (event.target.classList.contains('key')) {
          if (event.target.id === 'ArrowUp') {
           input.value += "▲";
          } else if (event.target.id === 'ArrowDown') {
            input.value += "▼";
          } else if (event.target.id === 'ArrowLeft') {
            input.value += "◀";
          } else if (event.target.id === 'ArrowRight') {
            input.value += "▶";
          } else if (event.target.id === 'Space') {
          input.value += ' ';
        } else if (event.target.id === 'Enter') {
          input.value += '\n';
        } else if (event.target.id === 'Tab') {
          input.value += '    ';
        }  else if (event.target.id === 'Backslash' || event.target.id === 'IntlBackslash') {
            input.value += '\\';
        } else if (event.target.id === 'Backspace') {
          Back();
        } else if (event.target.id === 'Delete') {
          Del();
        } 
          else if (event.target.id == "CapsLock") {
               if (capslock) {
                 capslock = false;
                 document.getElementById('CapsLock').classList.remove('caps');
        } else {
          capslock = true;
          document.getElementById('CapsLock').classList.add('caps');
        }
      } 
          else if (event.target.id == "ShiftLeft") { 
            if (shift) {
            document.getElementById('ShiftLeft').classList.remove('caps');
            shift = false;
            } else {
              document.getElementById('ShiftLeft').classList.add('caps');
              shift = true;     
            }
          }
          else if (event.target.id == "AltLeft") {
            if (alt) {
            document.getElementById('AltLeft').classList.remove('caps');
            alt = false;
            } else {
              document.getElementById('AltLeft').classList.add('caps');
              alt = true;     
            }
          }
          else if (shift && alt) {
            langChange();
            createKeyBoard(langKeyBoard);
            document.location.reload(true);
           }

          else if (capslock && shift) {
            input.value += event.target.id.toLowerCase();  
          } else if (capslock || shift) { 
            input.value += event.target.id.toUpperCase();
          }
          else if (event.target.id.length == 1) {
            input.value += event.target.id;
          }   
      }
    }

function Back() {
      input.setRangeText("", input.selectionStart, input.selectionEnd, "end");
          if (input.selectionStart === input.selectionEnd) {
              input.setRangeText("", input.selectionStart - 1, input.selectionEnd, "end");
    }
  }
function Del() {
     if (input.selectionStart === input.selectionEnd) {
      input.setRangeText("", input.selectionStart, input.selectionEnd + 1, "end")
    } else if (input.selectionStart != input.selectionEnd) {
      input.setRangeText("", input.selectionStart, input.selectionEnd, "end");
    }
  }

document.addEventListener('keydown', (event) => {
    console.log(event.key);
    document.querySelector('.input').focus();
    block = document.querySelectorAll('.key');
    for (let i = 0; i < block.length; i++) {
        if (event.key == block[i].id || event.code == block[i].id) {
        block[i].classList.add('active');
      } 
    }
    if (event.shiftKey && event.altKey) {
      langChange();
      }      
       document.location.reload(true);
    });
 
    document.addEventListener('keyup', () => {
      block = document.querySelectorAll('.key');
        for (let i = 0; i < block.length; i++) {
          block[i].classList.remove('active');
      }
  });
  window.addEventListener('unload',() => localStorage.setItem('content', [input].map((e) => e.value)));
  let content = localStorage.getItem('content');
  input.value = content;
  
  
function mouseUp(event) {
  if (event.target.classList.contains('key')) {
    event.target.classList.remove('active');
    }
}
function langChange() {
  block = document.querySelectorAll('.key');
  if (value == 'eng') {
    block.innerHTML = "";
    value = 'ru';
    localStorage.setItem('layout', 'ru');
    createKeyBoard(langKeyBoard);
  } else {
    block.innerHTML = "";
    value = 'eng';
    localStorage.setItem('layout', 'eng');
    createKeyBoard(langKeyBoard);}
};

createKeyBoard(langKeyBoard);