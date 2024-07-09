// Elementos
const $select = document.querySelector("#select")
const $play = document.querySelector("#play")
const $save = document.querySelector("#save")
const $delete = document.querySelector("#delete")
const $letter = document.querySelector("#letter")
const $link = document.querySelector("#link")
const $slide = document.querySelector("#slide")
const $buttons = document.querySelector(".buttons")
const $video = document.querySelector("#video")
const $audio = document.querySelector("audio")
const $file = document.querySelector("#file")

let isValidSong = false

// Slide
let letterSlide = []
let currentSlidePosition = 0
let slideActiveted = false
localStorage.removeItem("letter") 

// Letras Salvas
const url = 'http://localhost:3001/'
let letras;

function createOption(pos, data) {
    const option = document.createElement("option")
    option.value = pos
    option.innerHTML = data[pos].titulo
    $select.appendChild(option)
}// Disponibiliza as letras no select
function formateLetra(pos,data) {
    let letra = `${data[pos].titulo}\n`
    data[pos].letra.map(el => {
        letra += `${el}\n`
        return 
    })
    return letra
}// Formata a letra juntando o título à letra
async function getAllLetras() {
    const result = await fetch('http://localhost:3001/letra')
    letras = await result.json()

    for(let position in letras) {
        createOption(position,letras)
        const letra = formateLetra(position,letras)
        letras[position].letra = letra
    }
}// Busca as letras
getAllLetras()
function fillLetter() {
    let pos = $select.value;
    if(pos) {
        $letter.value = letras[pos].letra
    }
    else {
        $letter.value = ""
    }
}// Preenche o textarea quando seleciona o select

function alterHide() {
    $slide.classList.toggle('hide')
    $letter.classList.toggle('hide')
    $buttons.classList.toggle('hide')
}// Usado para alterar entre a página home e a de slide

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
}// Formata letra para usar no slide
 
function play() {       
    alterHide()
    slideActiveted = true
    letterSlide = formatSlideLetter()
    renderizar()
    apresentation()
}// Muda a página, ativa a apresentação, formata as letras, renderiza e põe para apresentar

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
}// Valida como o play será chamado, se tem áudio ou só letra

function renderizar() {
    let letter = letterSlide[currentSlidePosition]
    $slide.innerHTML = letter
    localStorage.setItem("letter",letter)
}// Passa a letra atual conforme a posição atual e lança no localStorage para o painel de apresentação

function backSlide() {
    if(slideActiveted) {
        localStorage.removeItem("letter")
        letterSlide = []
        currentSlidePosition = 0
        slideActiveted = false
        $audio.pause()
        $audio.currentTime = 0
        $video.innerHTML = ""
        alterHide()
    }
}// Limpa os campos e volta pra página home se slide estiver ativado

const $corpo = document.querySelector('body')
$corpo.addEventListener('keydown', e => {
    const keyCode = e.keyCode

    switch(keyCode) {
        case 37: 
            if(currentSlidePosition > 0) {
                currentSlidePosition--
                renderizar()
            } // Volta um slide <-
            break 
        case 39:
            if(currentSlidePosition < letterSlide.length - 1) {
                currentSlidePosition++
                renderizar()
            }// Adianta um slide ->
            break 
        case 27:
            backSlide() // Reseta os dados e volta para o início
            break
    }
})// Funções do teclado

function carregarArquivo() {
    const file = $file.files[0]
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
}// Seleciona áudio

function salvarLetra() {
    if($letter.value.replace(/\s+/g, '')) {
        if($select.value) {
            if(confirm('Deseja atualizar ' + letras[$select.value].titulo) + '?') {
                const dados = {
                    titulo: $letter.value.split('\n')[0],
                    letra: [...$letter.value.split('\n')].slice(1),
                    id: letras[$select.value].id
                }
                const opcoes = {
                    method: 'PUT', // Método HTTP
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(dados) 
                };
                    fetch(`${url}letra`, opcoes)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na atualização do recurso');
                    }
                    location.reload();
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
            }
        }// Update
        else {
            fetch(`${url}letra`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: $letter.value.split('\n')[0],
                    letra: [...$letter.value.split('\n')].slice(1)
                })
            })
            .then(response => location.reload())
            .catch(error => console.error('Error:', error));    
        }// Create
    }
}// Salva ou atualiza a letra

function deletarLetra() {
    if($select.value) {
        const opcoes = {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`${url}letra/${letras[$select.value].id}`, opcoes)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na exclusão do recurso');
            }
            location.reload();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }
}

$letter.addEventListener("change", () => {
    $save.disabled = $letter.value.replace(/\s+/g, '') ? false : true;
})
$select.addEventListener("change", () => {
    $save.disabled = $select.value ? false : true;
})// Habilita ou não o btn de salvar
$select.addEventListener("change", () => {
    $delete.disabled = $select.value ? false : true;
})// Habilita ou não o btn de delete

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