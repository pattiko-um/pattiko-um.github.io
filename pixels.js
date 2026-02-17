// This script will create a pixel canvas and allow the user to choose a color and draw pixels by clicking the mouse on a grid.

// Get the canvas element and its context
const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');

// Set the size of each pixel
const pixelSize = 32;

// Create a grid of pixels
function drawGrid() {
    ctx.strokeStyle = '#ccc';
    for (let x = 0; x < canvas.width; x += pixelSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += pixelSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Draw the initial grid
drawGrid();

// Add an event listener for mouse clicks on the canvas
canvas.addEventListener('click', function(event) {
    // Get the mouse position    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;


    // Calculate the pixel coordinates
    const pixelX = Math.floor(x / pixelSize) * pixelSize;
    const pixelY = Math.floor(y / pixelSize) * pixelSize;

    // Get the selected color from the color picker
    const colorPicker = document.getElementById('colorPicker');
    const selectedColor = colorPicker.value;

    // Draw a filled rectangle at the pixel coordinates with the selected color
    ctx.fillStyle = selectedColor;
    ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
});

// A function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
}

// Add an event listener for the clear canvas button
const clearButton = document.getElementById('clearCanvas');
clearButton.addEventListener('click', clearCanvas);

// A double-click event listener to clear selected pixel
canvas.addEventListener('dblclick', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const pixelX = Math.floor(x / pixelSize) * pixelSize;
    const pixelY = Math.floor(y / pixelSize) * pixelSize;
    
    ctx.clearRect(pixelX, pixelY, pixelSize, pixelSize);
    ctx.strokeStyle = '#ccc';
    ctx.strokeRect(pixelX, pixelY, pixelSize, pixelSize);
});