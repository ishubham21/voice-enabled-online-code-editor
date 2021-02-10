//Immediately Invoked Function Expression

(function () {

    //selecting all the buttons
    const ul = document.querySelector('ul')

    ul.addEventListener('click', (evt) => {

        const selectedBlk = e.taget
        var blkId = selectedBlk.getAttribute('data-target')
        
        var blkToEnable = document.querySelector(blkId)

        blkToEnable.classList.toggle('selected')
    })

    //iterating over buttons
    // for (let i = 0; i < btns.length; i++) {

    //     btns[i].addEventListener('click', () => {
            
    //         var blkId = this.getAttribute('data-target')
    //         var blkToEnable = document.querySelector(blkId)

    //         //toggle
    //         blkToEnable.classList.toggle('selected')
        
    //     })

    // }
    
})();