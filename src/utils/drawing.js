export const drawing = (context, figuresData) => {

  figuresData.forEach((item) => {
    context.beginPath();
    if (item?.name === "square") {
      context.fillStyle = 'black';
      context.fillRect(item?.x, item?.y, item?.height, item?.width);
      context.fillStyle = 'blue';
      context.fillRect(item?.x + 1, item?.y + 1, item?.height - 2, item?.width - 2);
    } else if (item?.name === "circle") {
      context.fillStyle = 'green';
      context.arc(item?.x, item?.y, item?.width / 2, 0, Math.PI * 2);
      context.fill();
    }
    context.stroke();
  });
}


export const calculateShifts = (name, squareCoords, circleCoords, event, canvasCoords) => {
  let shiftX = 0;
  let shiftY = 0;

  if (name === "square") {
    shiftX = squareCoords.x - event.clientX - canvasCoords.x;
    shiftY = squareCoords.y - event.clientY - canvasCoords.y;
  } else if (name === "circle") {
    shiftX = circleCoords.x + circleCoords.width / 2 - event.clientX - canvasCoords.x;
    shiftY = circleCoords.y + circleCoords.height / 2 - event.clientY - canvasCoords.y;
  }

  return {
    shiftX, shiftY
  }
}

export const isInside = (element, x, y) => {
  const { name, x: x1, y: y1, width, height } = element;

  if (name === 'square') {
    return x >= x1 && y >= y1 && x <= x1 + width && y <= y1 + height
  }

}