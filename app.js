const canvas = document.getElementById('jsCanvas');
let painting = false;
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
let filling = false;
const INITIAL__COLOR = '#2c2c2c'
const saveBtn = document.getElementById('jsSave');

canvas.width = 800;
canvas.height = 600;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL__COLOR;
ctx.fillStyle = INITIAL__COLOR;
ctx.lineWidth = '2.5';

function startPainting() {
    painting = true;
}
function stopPainting() {
    painting = false
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        ctx.lineTo(x, y);
        ctx.stroke()
    }
}

function onMouseDown(event) {
    painting = true;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = 'Fill'
    }else {
        filling = true
        mode.innerText = 'Paint'
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }   
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveBtn() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'paintJS[Export]';
    link.click();
}

if(canvas) {
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseleave', stopPainting);
canvas.addEventListener('click', handleCanvasClick);
canvas.addEventListener('contextmenu', handleCM);
}


Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if(range) {
    range.addEventListener('input', handleRangeChange);
}

if(mode) {
    mode.addEventListener('click', handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener('click', handleSaveBtn);
}