const clearHover = () => {
  const allElColors = elColorPicker.querySelectorAll(".color")
  allElColors.forEach(el => el.classList.remove("hovered"))
}

// color picker
elColorPicker!.addEventListener("mouseover", (e: MouseEvent) => {
  const target = e.target as HTMLElement

  // Remove hover effect from allElements
  clearHover()
  if (target.classList.contains("color-container")) {
    // add hover effect to that specific element
    target.querySelector(".color")?.classList.add("hovered")
  }
})

elColorPicker.addEventListener("mouseleave", () => {
  clearHover()
})

elColorPicker.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement

  if (target.classList.contains("color-container")) {
    // Remove active effect from allElements
    const allElColors = elColorPicker.querySelectorAll(".color")
    allElColors.forEach(el => el.classList.remove("active"))

    // add hover effect to that specific element
    const correspondingElColor = target.querySelector(
      ".color"
    ) as HTMLDivElement
    correspondingElColor.classList.add("active")

    const colorIndex = parseInt(correspondingElColor.classList[1].split("-")[1])
    currentColor = colorOptions[colorIndex]

    // change the color of btn
    elBtnSaveDrawing.style.color = currentColor.stringify()
    elBtnSaveDrawing.style.borderColor = currentColor.stringify()
  }
})
