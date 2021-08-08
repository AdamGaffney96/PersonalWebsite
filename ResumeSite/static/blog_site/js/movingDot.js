const dotCont = document.getElementById('moving-dot-container')
    // const dotBody = document.getElementById('moving-dot-surround')
const dotBody = document.getElementById('moving-dot-body')

const dotMove = e => {
    x = dotCont.offsetWidth - dotBody.offsetWidth
    y = dotCont.offsetHeight - dotBody.offsetHeight - 130
    newTop = Math.floor(Math.random() * y)
    newLeft = Math.floor(Math.random() * x)
    newTop < 130 ? '130px' : dotBody.style.top = newTop + 'px'
    dotBody.style.left = newLeft + 'px'
}

dotBody.addEventListener('click', (e) => {
    x = dotCont.offsetWidth - dotBody.offsetWidth
    y = dotCont.offsetHeight - dotBody.offsetHeight - 130
    newTop = Math.floor(Math.random() * y)
    newLeft = Math.floor(Math.random() * x)
    if (!dotBody.classList.length) {
        dotBody.classList.add('clicked1')
        dotBody.style.backgroundColor = 'yellow'
        newTop < 130 ? '130px' : dotBody.style.top = newTop + 'px'
        dotBody.style.left = newLeft + 'px'
    } else if (dotBody.classList[0] == 'clicked1') {
        dotBody.classList.remove('clicked1')
        dotBody.classList.add('clicked2')
        dotBody.style.backgroundColor = 'orange'
        newTop < 130 ? '130px' : dotBody.style.top = newTop + 'px'
        dotBody.style.left = newLeft + 'px'
    } else if (dotBody.classList[0] == 'clicked2') {
        dotBody.classList.remove('clicked2')
        dotBody.classList.add('clicked3')
        dotBody.style.backgroundColor = 'red'
        newTop < 130 ? '130px' : dotBody.style.top = newTop + 'px'
        dotBody.style.left = newLeft + 'px'
    } else if (dotBody.classList[0] == 'clicked3') {
        dotBody.classList.remove('clicked3')
        dotBody.style.display = 'none'
        document.querySelector('.first-paragraph').innerHTML = 'Congratulations!'
    }
})

dotBody.addEventListener('mouseover', dotMove)

document.addEventListener('mousemove', (e) => {
    if (Math.abs(e.movementX) > 1 | Math.abs(e.movementY) > 1) {
        dotBody.addEventListener('mouseover', dotMove)
    } else {
        dotBody.removeEventListener('mouseover', dotMove)
    }
})