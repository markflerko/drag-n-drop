export const drawing = (context, figuresData) => {

  figuresData.forEach((item) => {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    if (item?.name === "square") {
      context.rect(item?.x, item?.y, item?.width, item?.height);
      context.stroke();
      context.fillStyle = 'blue';
      context.fillRect(item?.x, item?.y, item?.width, item?.height);
    } else if (item?.name === "circle") {
      context.fillStyle = 'green';
      context.arc(item?.x, item?.y, item?.height / 2, 0, Math.PI * 2);
      context.fill();
      context.stroke();
    }
    if (item?.selected) {
      context.strokeStyle = 'orangered';
      context.lineWidth = 3;
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

  if (name === 'circle') {
    let r = height / 2;
    return x >= x1 - r && x <= x1 + r && y >= y1 - r && y <= y1 + r
  }

}

export const select = (element, array) => {
  let index = null;
  let clearedArray = array.map((item, i) => {
    if (item.id === element.id) {
      index = i
      item.selected = true
    } else {
      item.selected = false;
    }
    return item;
  });

  clearedArray.push(clearedArray.splice(index, 1)[0])
  console.log(array);
  console.log(clearedArray);
  return clearedArray;
}

export const move = (element, array, shiftX, shiftY) => {
  let movedArray = array.map((item) => {
    if(item.id === element.id) {
      return {
        ...element,
        x: shiftX + element.shiftX,
        y: shiftY + element.shiftY,
      }
    }
    return item
  })

  return movedArray;
}