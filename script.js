var drawButton = document.getElementById('drawButton')
var clearButton = document.getElementById('clearDrawButton')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

drawButton.addEventListener('click', () => {
  clearDraw()
  drawGraph()
})

clearButton.addEventListener('click', () => {
  clearInputs()
  clearDraw()
})

function clearInputs() {
  for (var i = 1; i < 6; i++) {
    document.getElementById(`data${i}X`).value = ''
    document.getElementById(`data${i}Y`).value = ''
  }
}

function clearDraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function formatData() {
  const graph = {
    inputX: document.getElementById('ejeX').value,
    inputY: document.getElementById('ejeY').value,
    data: [],
  }

  for (var i = 1; i < 6; i++) {
    const dataX = document.getElementById(`data${i}X`).value
    const dataY = document.getElementById(`data${i}Y`).value
    if (dataX && dataY) {
      graph.data.push({
        id: i,
        dataX,
        dataY,
      })
    }
  }

  if (graph.data.length < 2) {
    alert('Error: Necesita más de dos datos para realizar la grafica')
  } else {
    return graph
  }
}

function drawGraph() {
  const graph = formatData()
  const padding = 45
  const gridScale = 5

  var maxValue = 0
  for (var item in graph.data) {
    maxValue = Math.max(maxValue, graph.data[item]['dataY'])
  }

  var canvasHeight = canvas.height - padding * 2
  var canvasWidth = canvas.width - padding * 2

  var gridValue = 0
  while (gridValue <= maxValue) {
    var gridY = canvasHeight * (1 - gridValue / maxValue) + padding
    drawLine(0, gridY, canvas.width, gridY, "#eeeeee")
    gridValue+=gridScale
  }

  var barIndex = 0
  var numberOfBars = Object.keys(graph.data).length
  var barSize = canvasWidth / numberOfBars
  for (var item in graph.data) {
    var val = graph.data[item]['dataY']
    var barHeight = Math.round((canvasHeight * val) / maxValue)
    drawBar(padding + barIndex * barSize, canvas.height - barHeight - padding, barSize, barHeight)
    drawText(
      graph.data[item]['dataY'],
      padding + barIndex * barSize + 52,
      canvas.height - barHeight - padding,
      '#201E1E'
    )
    drawText(
      graph.data[item]['dataX'],
      padding + barIndex * barSize + 52,
      canvas.height - padding + 15,
      '#201E1E'
    )
    barIndex++
  }
  console.log(graph.inputX)
  drawText(graph.inputX, canvas.width / 2, canvas.height - 5, '#AAAAAA')
  drawTextVertical(graph.inputY, 20, 70, '#AAAAAA')
}

function drawLine(startX, startY, endX, endY, color) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.stroke()
  ctx.restore()
}

function drawText(text, cornerX, cornerY, color) {
  ctx.save()
  ctx.font = 'bold 14px Arial'
  ctx.textAlign = 'center'
  ctx.fillStyle = color
  ctx.fillText(text, cornerX, cornerY)
  ctx.restore()
}

function drawTextVertical(text, cornerX, cornerY, color) {
  ctx.save()
  console.log(cornerY)
  ctx.font = 'bold 14px Arial'
  ctx.textAlign = 'center'
  ctx.fillStyle = color
  for (var i = 0; i < text.length; i++) {
    ctx.fillText(text[i], cornerX, cornerY)
    cornerY += 15
  }
  ctx.restore()
}

function drawBar(cornerX, cornerY, width, height) {
  ctx.save()
  ctx.fillStyle = randomColorGenerator()
  ctx.fillRect(cornerX, cornerY, width, height)
  ctx.restore()
}

function randomColorGenerator() {
  return `hsl(
            ${360 * Math.random()},
            ${25 + 70 * Math.random()}%,
            ${75 + 1 * Math.random()}%
          )`
}
