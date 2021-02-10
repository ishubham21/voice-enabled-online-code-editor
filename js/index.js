//Immediately Invoked Function Expression

(function () {

    //selecting all the buttons
    const btns = document.querySelectorAll('.control-btn')

    //iterating over buttons
    for (let i = 0; i < btns.length; i++) {

        btns[i].addEventListener('click', () => {
            
            var blkId = btns[i].getAttribute('data-target')
            var blkToEnable = document.querySelector(blkId)

            //toggle
            blkToEnable.classList.toggle('selected')
        
        })

    }
    
})();