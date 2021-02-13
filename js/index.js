//Immediately Invoked Function Expression
(function () {

    //selecting the list wrapper i.e. <ul>
    const btnList = document.querySelector('.toggle-btns')

    //click event listener
    btnList.addEventListener('click', (e) => {

        //using event.target 
        var blkId = e.target.getAttribute('data-target')

        var blkToEnable = document.querySelector(blkId)
       
        //toggling the class selected
        blkToEnable.classList.toggle('selected')

    })
    
})();

const getBlobURL = (code, type) => {
    
    //creating a blob - Binary Large Object
    const blob = new Blob([code], { type })
    //creating URL for above blob
    return URL.createObjectURL(blob)
}

const getGeneratedUrl = ({ html, css, js }) => {
    
    //getting URL for css and js
    const cssURL = getBlobURL(css, 'text/css')
    const jsURL = getBlobURL(js, 'text/javascript')

    const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}"></script>`}
      </head>
      <body>
        ${html || ''}
      </body>
    </html>
  `
    //returning a link for HTML code with links
    return getBlobURL(source, 'text/html')
}

const getCodeValues = () => {

    //getting values of textboxes for compilation
    const html = document.querySelector('#html').value
    const css = document.querySelector('#css').value
    const js = document.querySelector('#js').value

    if (!html) {
        alert('Cannot run empty html')
        return null
    }

    //codes object containing codes from all the blocks
    const codes = { html, css, js }
    return codes
}

var run = document.querySelector('#run')
run.addEventListener('click', () => {

    const codeValues = getCodeValues()
    
    if (codeValues != null) {

        const urlForIframe = getGeneratedUrl(codeValues)        
        const iframe = document.querySelector('#result')
        
        //giving url to iframe - setting attribute
        iframe.setAttribute('src', urlForIframe)
    
    }

})

//a function to copy to the clipboard
function copyText(textToCopy) {
    //using window.navigator API to copy the results to the clipboard
    window.navigator.clipboard.writeText(textToCopy)
    copyBtn.innerText = 'Copied'
}

//function to handle popups and catch voice texts
const writeVoiceText = (voiceText) => {

    var copyBtn = document.querySelector('#copyVoiceText')
    copyBtn.innerText = 'Copy'

    var closeBtn = document.querySelector('#closePopup')

    //popup
    var popup = document.querySelector('.popup')
    popup.style.display = 'flex'

    //result
    var popupTextArea = document.querySelectorAll('.popup h3')[1]
    popupTextArea.innerText = voiceText

    //close popup
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none'
    })
    
    //copy button
    copyBtn.addEventListener('click', copyText(voiceText))
}

//flag value
var listening = false
var voiceBtn = document.querySelector('#voiceRecogBtn')

//creating an instance for voice recognition
var recognition = new webkitSpeechRecognition();

//setting continous listening
recognition.continuous = true;
recognition.lang = 'en-US';

//don't retrun interim and unsure results
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//a function to start voice recognition
const enableVoiceRecog = () => {
    listening = true
    voiceBtn.innerText = 'Stop Listening'

    //starting voice recognition
    recognition.start()
    console.log('Ready to receive voice inputs.')

    return
}

const diableVoiceRecog = () => {
    listening = false
    voiceBtn.innerText  ='Start Listening'

    //stopping voice recognition
    recognition.stop()
    
    return 
}

//click event listener
voiceBtn.addEventListener('click', () => {
    if (listening != true) {
        enableVoiceRecog()
    }
    else{
        diableVoiceRecog()
    }

    //onresult function from speech recog
    recognition.onresult = function (event) {
        //results object
        var result = event.results[0][0].transcript
        writeVoiceText(result)
    }
})


//check if the browser is upgraded or not
window.addEventListener('load', () => {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser is outdated. You may want to upgrade it.')

        //native to chrome
        upgrade();
    }
})


