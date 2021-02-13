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

var listening = false
var voiceBtn = document.querySelector('#voiceRecogBtn')
// //a function to start voice recognition
// const enableVoiceRecog = () => {
//     listening = true
//     voiceBtn.innerText = 'Stop Listening'
//     return 1
// }

// const diableVoiceRecog = () => {
//     listening = false
//     voiceBtn.innerText  ='Start Listening'
//     return 0
// }
voiceBtn.addEventListener('click', () => {
    // if (listening == false) {
    //     enableVoiceRecog()
    // }
    // else{
    //     diableVoiceRecog()
    // }

    var grammar = 'coma = ,' 
    var recognition = new webkitSpeechRecognition();
    var speechRecognitionList = new webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    var diagnostic = document.querySelector('.output');
    var bg = document.querySelector('html');
    recognition.start();
    console.log('Ready to receive a color command.');

    recognition.onresult = function (event) {
        var color = event.results[0][0].transcript;
        console.log(color);
    }
})

