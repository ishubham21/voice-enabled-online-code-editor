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

//a function to start voice recognition
function enableVoiceRecog(e){
    
    //creating an instance for speech recognition
    speechRecognition = new webkitSpeechRecognition();
    speechRecognition.onresult = console.log
    speechRecognition.start()
}

var voiceBtn = document.querySelector('#voiceRecogBtn')
voiceBtn.addEventListener('click', enableVoiceRecog)

