//Immediately Invoked Function Expression

(function () {

    //selecting all the buttons
    const ul = document.querySelector('ul')

    ul.addEventListener('click', (e) => {
        var blkId = e.target.getAttribute('data-target')
        
        var blkToEnable = document.querySelector(blkId)

        blkToEnable.classList.toggle('selected')
    })
    const btns = document.querySelectorAll('.control-btn')

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