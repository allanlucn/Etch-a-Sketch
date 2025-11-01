const gridContainer = document.querySelector("#grid");

let size = 16;
gridContainer.style.gridTemplateColumns =`repeat(${size},1fr)`
gridContainer.style.gridTemplateRows =`repeat(${size},1fr)`
function createPannels(size){
    for(let i =0; i<size; i++){
        for(let j=0; j<size; j++){
            const pannel = document.createElement('div');
            gridContainer.appendChild(pannel);
            pannel.style.width = '100%';
            pannel.style.height = '100%';
            pannel.style.backgroundColor = 'white';
            pannel.style.border = 'solid 0.1px black'
        }
    }
};

createPannels(16);