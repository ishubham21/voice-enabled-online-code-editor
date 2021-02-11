const getBlobURL = (code, type) => {
    
    //creating a blob (Binarly Large Object)
    const blob = new Blob([code], { type })
    //creating  a URL for blob
    return URL.createObjectURL(blob)
}

const getGeneratedUrl = ({ html, css, js }) => {
    
    //getting URL for css and js
    const cssURL = getBlobURL(css, 'text/css')
    const jsURL = getBlobURL(js, 'text/javascript')

    //source - HTML
    const sourceHTML = `
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
    return getBlobURL(sourceHTML, 'text/html')
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

//click event listener for run button
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
