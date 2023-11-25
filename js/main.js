// accessing the search input
let searchInputEl = document.getElementById("inputSearch");
// Accessing the search result element
let searchResultEl = document.getElementById("searchResults");
// Getting the spinner element
let spinnerEl = document.getElementById("spinner");

// function to create the required element
function createAndAppendSearchResult (result) {
    // creating the result element
    let resultItemElement = document.createElement("div");
    resultItemElement.classList.add("result-item");
    // Append the above within the searchResultEl
    searchResultEl.appendChild(resultItemElement);

    // title
    let { link, title, description} = result;
    let resultTitleel = document.createElement("a");
    resultTitleel.href = link;
    resultTitleel.target = "_blank";
    resultTitleel.textContent = title;
    resultTitleel.classList.add("result-title");
    // Position them under the result item element
    resultItemElement.appendChild(resultTitleel);

    // break element
    let titleBreakEl = document.createElement("br");
    resultItemElement.appendChild(titleBreakEl);
    
    // url
    let resultUrlEl = document.createElement("a");
    resultUrlEl.href = link;
    resultUrlEl.target = "_blank";
    resultUrlEl.textContent = link;
    resultUrlEl.classList.add("result-url");
    // Appending
    resultItemElement.appendChild(resultUrlEl);

    // break element
    let urlBreakEl = document.createElement("br");
    resultItemElement.appendChild(urlBreakEl);
    
    // description
    let resultDescriptionEl = document.createElement("p");
    resultDescriptionEl.classList.add("link-description");
    resultDescriptionEl.textContent = description;
    // Appending the element to their parent
    resultItemElement.appendChild(resultDescriptionEl);
}


// function to display the results
function displayResults(search_results){
    // Deactivate the spinner
    spinnerEl.classList.toggle("d-none");

    // if the result is empty we show the message that result was not found
    if (search_results.length === 0){
        searchResultEl.innerHTML = "Result was not found!";
    }
    else{
        for (let result of search_results) {
            createAndAppendSearchResult(result);
        }
    } 
}

// function to search the word in wiki
function searchWiki(event) {
    if (event.key === "Enter") {
        // activate the spinner
        spinnerEl.classList.toggle("d-none");
        // clearing the search result every time:
        searchResultEl.textContent = "";
        // getting the user input
        let searchInputValue = searchInputEl.value;
        // api url to send the response
        let url = `https://apis.ccbp.in/wiki-search?search=${searchInputValue}`;
        // setting the option for Http Response
        let option = {
            method: "GET"
        }
        fetch(url, option)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonData) {
                let { search_results } = jsonData;
                displayResults(search_results);
            });
    }
};

// Adding Event listener to the search input to get the entered characters
searchInputEl.addEventListener("keydown", searchWiki);


