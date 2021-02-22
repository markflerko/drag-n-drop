export const drawing = (context, figuresData) => {
  figuresData.map((item) => {
    if (item?.name === "square") {
      context.strokeRect(item?.x, item?.y, 150, 100);
    } else if (item?.name === "circle") {
      context.arc(item?.x, item?.y, 50, 0, Math.PI * 2);
      context.stroke();
      context.beginPath();
    }
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
