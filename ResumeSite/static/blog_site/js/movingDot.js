const dotCont = document.getElementById('moving-dot-container')
    // const dotBody = document.getElementById('moving-dot-surround')
const dotBody = document.getElementById('moving-dot-body')
const dotMove = e => {
    x = dotCont.offsetWidth - dotBody.offsetWidth
    y = dotCont.offsetHeight - dotBody.offsetHeight - 80
    newTop = Math.floor(Math.random() * y)
    newLeft = Math.floor(Math.random() * x)
    newTop < 80 ? '80px' : dotBody.style.top = newTop + 'px'
    dotBody.style.left = newLeft + 'px'
}

dotBody.addEventListener('click', (e) => {
    console.log('pog')
})

dotBody.addEventListener('mouseover', dotMove)

document.addEventListener('mousemove', (e) => {
    if (Math.abs(e.movementX) > 1 | Math.abs(e.movementY) > 1) {
        dotBody.addEventListener('mouseover', dotMove)
    } else {
        dotBody.removeEventListener('mouseover', dotMove)
    }
})