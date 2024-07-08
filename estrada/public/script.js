const $select = document.querySelector("#select")
const $play = document.querySelector("#play")
const $letter = document.querySelector("#letter")
const $link = document.querySelector("#link")
const $slide = document.querySelector("#slide")
const $buttons = document.querySelector(".buttons")
const $video = document.querySelector("#video")
const $audio = document.querySelector("audio")
let isValidSong = false
let letterSlide = []
let currentSlidePosition = 0
let slideActiveted = false
localStorage.removeItem("letter") 
const endPoint = 'http://localhost:3001/'

function createOption(pos, data) {
    const option = document.createElement("option")
    option.value = pos
    option.innerHTML = data[pos].titulo
    $select.appendChild(option)
}
function formateLetra(pos,data) {
    let letra = `${data[pos].titulo}\n`
    data[pos].letra.map(el => {
        letra += `${el}\n`
        return 
    })
    return letra
}
let letrasSalvas = []
async function getAllLetras() {
    const result = await fetch('http://localhost:3001/letra')
    const letras = await result.json()

    for(let position in letras) {
        createOption(position,letras)
        const letra = formateLetra(position,letras)
        letrasSalvas.push(letra)
    }
}
getAllLetras()
function fillLetter() {
    if($select.value) {
        $letter.value = letrasSalvas[$select.value]
    }
    else {
        $letter.value = ""
    }
}

function alterHide() {
    $slide.classList.toggle('hide')
    $letter.classList.toggle('hide')
    $buttons.classList.toggle('hide')
}

function formatSlideLetter() {
    let res = []
    res = $letter.value.split('\n\n')
    res = res.map(p => p.split('\n'))
    const aux = res
    res = []
    aux.forEach(r => {
        r.forEach(element => {
            res.push(element)
        })
    })
    const last = res.length - 1
    !res[last] ? res[last] = 'Fim' : res.push('Fim')
    return res
}
 
function play() {       
    alterHide()
    slideActiveted = true
    letterSlide = formatSlideLetter()
    renderizar()
    apresentation()
}

function validFields() {
    if($letter.value.replace(/\s+/g, '') != '') {
        if(isValidSong) {
            play()
            $audio.play()                
        }// MP3
        else {
            play()
        }// Letter
    }
    else {
        alert('Sem letra!')
    }
}

function renderizar() {
    let letter = letterSlide[currentSlidePosition]
    $slide.innerHTML = letter
    localStorage.setItem("letter",letter)
}

function backSlide() {
    if(slideActiveted) {
        localStorage.removeItem("letter")
        isValidSong = false
        letterSlide = []
        currentSlidePosition = 0
        slideActiveted = false
        $audio.src = ""
        $video.innerHTML = ""
        alterHide()
    }
}

const $corpo = document.querySelector('body')
$corpo.addEventListener('keydown', e => {
    const keyCode = e.keyCode

    switch(keyCode) {
        case 37: 
            if(currentSlidePosition > 0) {
                currentSlidePosition--
                renderizar()
            } 
            break 
        case 39:
            if(currentSlidePosition < letterSlide.length - 1) {
                currentSlidePosition++
                renderizar()
            }
            break 
        case 27:
            backSlide()
            break
    }
})

const $file = document.querySelector("#file")
$file.addEventListener("change", () => {
    const file = $file.files[0]
    console.log(file)
    if(file) {
        const fileExtension = file.name.split('.')[1]

        const allowedExtensions = ['mp3']

        if(allowedExtensions.includes(fileExtension.toLowerCase())) {
            isValidSong = true
            const reader = new FileReader();
            reader.onload = function(event) {
                $audio.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
        else {
            isValidSong = false
            alert('Extensão deve ser mp3!')
        }
    }
    else {
        isValidSong = false
        alert('Nenhum arquivo selecionado')
    }
})

function salvarLetra() {
    if($letter.value.replace(/\s+/g, '') && isValidSong) {

    }
    else if($letter.value.replace(/\s+/g, '')) {
        fetch(`${endPoint}letra`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: $letter.value.split('\n')[0],
                letra: [...$letter.value.split('\n')].slice(1)
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        
    }
}

// SLIDE 
function apresentation(){
	window.open("./windows/windows.html","_blank","toolbar=yes,location=yes,directories=no, status=no, menubar=yes,scrollbars=yes, resizable=no,copyhistory=yes, width=500px,height=500px")
}
// CLOCK 
function clock(){
    window.open("./relogio/index.html","_blank","toolbar=yes,location=yes,directories=no, status=no, menubar=yes,scrollbars=yes, resizable=no,copyhistory=yes, width=500px,height=500px")
}
// TEMPORIZADOR 
function temp(){
    window.open("./temporizador/index.html","_blank","toolbar=yes,location=yes,directories=no, status=no, menubar=yes,scrollbars=yes, resizable=no,copyhistory=yes, width=500px,height=500px")
}