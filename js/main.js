
///////////////////////////// search book function start //////////////////////////////////////////
const searchBooks = () => {
    const input = document.getElementById('input');
    const inputText = input.value;
    
    if (input.value === '' && input.value.length !== null) {
        document.getElementById('searchResult').innerHTML = `<div class='position-absolute w-90 shadow-lg  d-flex flex-column justify-content-center align-items-center pt-5' style="height:300px">
        <img src="img/text-field.svg" class='img-fluid h-100'>
        <h2 class="my-4 text-center">You've to type any Books name first</h2>
    </div>`;
        document.getElementById('cardContainer').textContent = '';
    } else {
        document.getElementById('cardContainer').textContent = '';
        document.getElementById('searchResult').innerText = '';
        input.value = '';

      ///////////// loading spinner //////////////////////////
        cardContainer.innerHTML = `
        <div class='position-absolute w-100 d-flex justify-content-center align-items-center' style="height:300px">
        <img  src="img/loading.svg" width="100" height="100">
        </div>`

        const url = `https://openlibrary.org/search.json?q=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data.docs));    
    }

}
////////////////////////////////// search book function end /////////////////////////////////////



//////////////////////////////////// Card display function start  //////////////////////////////////
const displayResult = allData => {
    document.getElementById('searchResult').innerText = `${allData.length} search result founds`
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.textContent = '';
    if (allData.length === 0 ) {
        document.getElementById('searchResult').innerHTML = ` <div class='position-absolute w-100 d-flex flex-column justify-content-center align-items-center pt-5' style="height:300px">
        <img src="img/empty.svg" class=' h-100'>
        <h2 class="my-4 text-center">No Books Found</h2>
        </div>`;
        
      } else {
        // //////for each loop start /////////////////
        allData.forEach(data => {
            ////////// creating card div start//////////////
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            div.innerHTML = `
            <div style="height: 500px;" class="card p-2 m-3 rounded ">
                <img style="height: 15rem;" class="img-fluid" src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" alt="Image not found" onerror="this.onerror=null;this.src='imagefound.gif';" >
                
                <h3>${data.title}</h3>
                <p class="p-0 m-0"><span class="fw-bold">Author:</span> ${data.author_name}</p>
                <p class="p-0 m-0"><span class="fw-bold">Publisher:</span> ${data.publisher}</p>
                <p class="p-0 m-0"><span class="fw-bold">First publish :</span> ${data.first_publish_year}</p>
            </div>
            `
            //////////////// creating card div end ///////////////
            cardContainer.appendChild(div);
        });
        ////////////// for each loop end /////////////////////
        
    }

}
////////////////////////////////// card display function end ////////////////////////////////////




