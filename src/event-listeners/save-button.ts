elBtnSaveDrawing?.addEventListener("click", () => {
  const link = document.createElement("a")
  const date: Date = new Date()
  console.log(date.toLocaleString())
  link.download = `drawing_${date.toLocaleString()}.png`
  link.href = canvas.toDataURL()
  link.click()
})
