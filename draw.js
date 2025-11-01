const gridContainer = document.querySelector("#grid");

function createPannels(size){
    gridContainer.style.gridTemplateColumns =`repeat(${size},1fr)`
    gridContainer.style.gridTemplateRows =`repeat(${size},1fr)`
    for(let i =0; i<size; i++){
        for(let j=0; j<size; j++){
            const pannel = document.createElement('div');
            gridContainer.appendChild(pannel);
            pannel.style.backgroundColor = 'white';
            pannel.style.border = 'solid 0.1px black'
            pannel.addEventListener('mouseenter',(event) =>{
                pannel.style.backgroundColor = 'black';
            })
        }
    }
};


createPannels(32);
