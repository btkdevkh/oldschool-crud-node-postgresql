const createForm = document.getElementById('create-form')
const addBtn = document.getElementById('add-btn')

// Add
addBtn.addEventListener('click', () => addRemoveClass(createForm, 'd-none', true))

function addRemoveClass(el, className, isRemoved = false) {
  if(isRemoved) {
    el.classList.remove(`${className}`)
  } else {
    el.classList.add(`${className}`)
  }
}
