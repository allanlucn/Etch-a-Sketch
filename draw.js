const gridContainer = document.querySelector("#grid");
const clearButton = document.querySelector("#clearButton");
const rainbowMode = document.querySelector("#rainbowMode");
const eraserMode = document.querySelector("#eraserMode");
const canvasSizeButton = document.querySelector("#canvasSize");
const gridLines = document.querySelector("#gridLines");

gridContainer.addEventListener("dragstart", (event) => {
    event.preventDefault(); 
});

let mouseDown = false;

rainbowMode.addEventListener("change", () => {
    if(rainbowMode.checked) {
        eraserMode.checked = false;
    }
});

eraserMode.addEventListener("change", () => {
    if(eraserMode.checked) {
        rainbowMode.checked = false;
    }
});

gridLines.addEventListener("change", () => {
    const pannels = gridContainer.querySelectorAll('.pannel');
    pannels.forEach(pannel => {
        if(gridLines.checked) {
            pannel.style.border = 'solid 0.1px black';
        } else {
            pannel.style.border = 'none';
        }
    });
});

gridContainer.addEventListener("mousedown", () => {
    mouseDown = true;
});

gridContainer.addEventListener("mouseup", () => {
    mouseDown = false;
});

gridContainer.addEventListener("mouseleave", () => {
    mouseDown = false;
});

gridContainer.addEventListener("touchstart", () => {
    mouseDown = true;
});

gridContainer.addEventListener("touchend", () => {
    mouseDown = false;
});

function randomColor(){
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

function createPannels(size){
    for(let i =0; i<size; i++){
        const coluna = document.createElement('div');
        coluna.classList.add('coluna');
        for(let j=0; j<size; j++){
            const pannel = document.createElement('div');
            pannel.classList.add('pannel');
            coluna.appendChild(pannel);
            
            const handleDraw = (event) => {
                if(mouseDown){
                    if(rainbowMode.checked){
                        pannel.style.backgroundColor = randomColor();
                    } else if(eraserMode.checked){
                        pannel.style.backgroundColor = 'white';
                    } else {
                        pannel.style.backgroundColor = document.querySelector("#colorPicker").value;
                    }
                }
            };
            
            pannel.addEventListener('mouseenter', handleDraw);
            pannel.addEventListener('touchmove', (event) => {
                event.preventDefault();
                const touch = event.touches[0];
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                if(element && element.classList.contains('pannel') && mouseDown){
                    if(rainbowMode.checked){
                        element.style.backgroundColor = randomColor();
                    } else if(eraserMode.checked){
                        element.style.backgroundColor = 'white';
                    } else {
                        element.style.backgroundColor = document.querySelector("#colorPicker").value;
                    }
                }
            });
            pannel.addEventListener('touchstart', handleDraw);
        }
        gridContainer.appendChild(coluna);
    }
}

clearButton.addEventListener("click", () => {
    const pannels = gridContainer.querySelectorAll('.pannel'); 
    pannels.forEach(pannel => {
        pannel.style.backgroundColor = 'white';
    });
});

canvasSizeButton.addEventListener("click", () => {
    let newSize = prompt("Digite o tamanho da moldura (max 100):");
    newSize = parseInt(newSize);
    if(newSize > 0 && newSize <= 100){
        gridContainer.innerHTML = '';
        createPannels(newSize);
    } else {
        alert("Tamanho inválido. Por favor, insira um número entre 1 e 100.");
    }
});

createPannels(32);