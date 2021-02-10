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
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
}

console.log(getBlobURL('<p>My webpage</p>', 'text/html'))