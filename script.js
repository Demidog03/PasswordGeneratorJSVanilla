/**Getting value of slider*/
const lengthSlider = document.querySelector('.pass-length input')
const options = document.querySelectorAll('.option input')
let passwordInput = document.querySelector('.input-box input')
let passIndicator = document.querySelector('.pass-indicator')
let generateBtn = document.querySelector('.generate-btn')
let copyIcon = document.querySelector('.input-box span')
let copyHint = document.querySelector('.input-box .copyHint')

const characters = {
    lowercase:'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!"#$%&’()*+,-./\:;<=>?@[]^_{|}~'
}


/**Updating the slider (length of password)*/
const updateSlider = ()=>{
    // console.log(lengthSlider.value)
    document.querySelector('.pass-length span').innerHTML = lengthSlider.value //showing value in span
   updatePassIndicator()
}




/**Generation of random password on click*/
const generatePassword = () => {
    let staticPassword = ''
    let randomPassword = ''
    let excludeDuplicate = false;
    let passLength = lengthSlider.value

    options.forEach(option => {
        if(option.checked) { //if checkbox is selected
            //if checkbox id is not duplicate and do not 'spaces'
            if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
            staticPassword += characters[option.id]
            }
            //if checkbox id is 'spaces'
            else if(option.id==='spaces'){
                staticPassword +=` ${staticPassword} `
            }
            else if(option.id === 'exc-duplicate'){
                excludeDuplicate = true
            }

        }
    })

    for (let i=0; i < passLength; i++){
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
        /**'Math.floor()' returns largest number that less or equal to given number*/
        /**Math.floor(5.05) = 5*/
        //if 'exludeDuplicate' option is selected check random char for duplicates
        //if it is not add char
        //if it is do i-- and try loop until if it is not duplicate
        if(excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == ' ' ? randomPassword += randomChar : i--
        }
        else{
            randomPassword += randomChar
        }
    }
    console.log(randomPassword)

    passwordInput.value = randomPassword
}

/**Updating the password indicators id */
const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? 'weak' : lengthSlider.value <= 16 ? 'medium' : 'strong'
}

/**Copying password by pressing copy icon*/
const copyPassword = ()=>{
    navigator.clipboard.writeText(passwordInput.value) //passes text to the system clipboard
    copyIcon.innerHTML = 'check'
    copyIcon.style.color = 'green'
    copyHint.style.opacity = 1
    copyHint.style.animation = 'append-animate 0.5s ease-in-out'
    setTimeout(()=>{
        copyIcon.innerHTML = 'copy_all'
        copyIcon.style.opacity = 1
        copyHint.style.opacity = 0
        copyIcon.style.color = '#707070'
    }, 2000)
    copyIcon.style.opacity = 0


}

lengthSlider.addEventListener('input', updateSlider)
copyIcon.addEventListener('click', copyPassword)
generateBtn.addEventListener('click', generatePassword)