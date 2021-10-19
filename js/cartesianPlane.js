const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
var pointSaved = []
ctx.lineWidth = 1
ctx.strokeStyle = '#000'

const addPointButton = document.getElementById('addPoint')
const clearPointsButton = document.getElementById('clearPoints')

addPointButton.addEventListener('click', () => {
  var pixels = 10
  const inputX = document.getElementById('inputx').value
  const inputY = document.getElementById('inputy').value

  if(!inputX || !inputY) return alert('Inserte numeros validos')
  pointSaved.push({x: inputX, y: inputY})

  clearDraw(20)

  if(inputX > 27 || inputY > 27){
    pixels = 1
    clearDraw(10)
  }
  if(inputX > 270 || inputY > 270){
    pixels = 0.5
    clearDraw(10)
  }
  if(inputX > 580 || inputY > 580){
    pixels = 0.1
    clearDraw(10)
  }

  if(inputX > 3000 || inputY > 3000) return alert('error: El limite de un input es 3000')

  reDrawPoints(pixels)

  openPoint(
    inputX,
    inputY,
    pixels
  )
})

clearPointsButton.addEventListener('click', () => {
  pointSaved.splice(0, pointSaved.length)
  clearInputs()
  clearDraw(20)
})

function reDrawPoints(pixels){
  if(pointSaved.length > 1) {
    for(var item in pointSaved){
      openPoint(
        pointSaved[item]['x'],
        pointSaved[item]['y'],
        pixels
      )
    }
  }
}

function clearInputs() {
  document.getElementById('inputx').value = ''
  document.getElementById('inputy').value = ''
}

function clearDraw(margin) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawPlane(margin)
}

function drawPlane(margin) {
  drawLinesSecondaryX(margin)
  drawLinesSecondaryY(margin)
  drawLineX(canvas.width / 2, canvas.height, '#000000')
  drawLineY(canvas.width, canvas.height / 2, '#000000')
}

function openPoint(cornerXOrigin, cornerYOrigin, pixels) {
  var cornerYPositive = true

  if (Math.sign(cornerYOrigin) == -1) {
    cornerYPositive = false
  }

  cornerX = parserNumberToPx(cornerXOrigin, pixels)
  cornerY = parserNumberToPx(Math.abs(cornerYOrigin), pixels)

  var cornerYNew
  var cornerXNew = canvas.width / 2 + cornerX

  if (cornerYPositive) {
    cornerYNew = canvas.height / 2 - cornerY
  } else if (!cornerYPositive) {
    cornerYNew = canvas.height / 2 + cornerY
  }

  console.log(cornerX, cornerYNew)

  drawPoint(
    cornerXNew,
    cornerYNew,
    `(${cornerXOrigin}, ${cornerYOrigin})`,
    randomColorGenerator(),
    5
  )
}

function drawLineX(canvasWidth, canvasHeight, color) {
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.moveTo(canvasWidth, 0)
  ctx.lineTo(canvasWidth, canvasHeight)
  ctx.stroke()
  ctx.closePath()
}

function drawLineY(canvasWidth, canvasHeight, color) {
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.moveTo(0, canvasHeight)
  ctx.lineTo(canvasWidth, canvasHeight)
  ctx.stroke()
  ctx.closePath()
}

function drawLinesSecondaryX(margin) {
  var x = 0
  for (var i = 0; i < canvas.width; i++) {
    drawLineX(x, canvas.height, '#D0D0D0')
    x += margin
  }
  drawLettersX()
}

function drawLinesSecondaryY(margin) {
  var y = 0
  for (var i = 0; i < canvas.height; i++) {
    drawLineY(canvas.width, y, '#D0D0D0')
    y += margin
  }

  drawLettersY()
}

function drawLettersX(){
  var letter =-30
  for(var i = 0; i < canvas.width; i+=20){
    if(letter != 0 && i != 0){
      drawText(letter, 0 + i, canvas.height/2 +15, "#000000")
    }
    letter +=2
  }
}

function drawLettersY(){
  var letter =-30
  for(var i = 0; i < canvas.height; i+=20){
    if(letter != 0 && i != 0 && letter !=2){
      drawText(letter, canvas.width/2 +15, 0 + i, "#000000")
    }
    letter +=2
  }
}


function drawText(text, cornerX, cornerY, color) {
  ctx.save()
  ctx.font = '12px Arial'
  ctx.textAlign = 'center'
  ctx.fillStyle = color
  ctx.fillText(text, cornerX, cornerY)
  ctx.restore()
}

function parserNumberToPx(number, pixels) {
  return (pixels * number) / 1
}

function drawPoint(x, y, label, color, size) {
  if (color == null) {
    color = '#000'
  }
  if (size == null) {
    size = 5
  }

  var pointX = Math.round(x)
  var pointY = Math.round(y)

  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(pointX, pointY, size, 0 * Math.PI, 2 * Math.PI)
  ctx.fill()

  if (label) {
    var textX = pointX
    var textY = Math.round(pointY - size - 3)

    ctx.font = 'Italic 14px Arial'
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.fillText(label, textX, textY)
  }
}

function randomColorGenerator() {
  return `hsl(
            ${360 * Math.random()},
            ${25 + 70 * Math.random()}%,
            ${30 + 1 * Math.random()}%
          )`
}

clearInputs()
clearDraw(20)
