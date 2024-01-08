let resultsArea = $("#results");
let displayArea = $("#display");
let books = {};

$("#submit").on("click", function () {
  let searchText = $("input").val();
  performSearch(searchText);
});

// WORK NEEDED (SEE TODO)
function performSearch(searchText) {
  let URL = googleBookAPI_URL(searchText);
  // TODO: Create a GET request to URL with search text from the input box.
  // TODO: Add search results from above to the DOM: Use addResultToDOM and pass
  // in your search results.

  $.get(URL, function (data) {
      if (data.items && data.items.length >0) {
        addResultToDOM(data);
      } else {
        $(resultsArea).html(`<h3>${data[0].searchText}</h3>`);
      }
  });
}

// DO NOT MODIFY
function googleBookAPI_URL(searchText) {
  return `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchText}`;
}

// DO NOT MODIFY
function addResultToDOM(searchResults) {
  let items = searchResults.items;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let newBook = createBookFrom(item);

    books[newBook.id] = newBook;

    resultsArea.append(newBook.html);
  }

  // REQUIRED TO SUCCEED: Look at what gets logged out. Make sure you read
  // what properties are being stored.
  console.log(books);
}

// WORK NEEDED (SEE TODO)
resultsArea.on("click", function (event) {
  let isResultElement = event.target.getAttribute("class") === "result";

  if (isResultElement) {
    displayArea.empty();

    let bookId = event.target.id;
    let book = books[bookId];

    // TODO: Add bookHTML to the display area
    let bookHTML = htmlToDisplay(book);
    displayArea.html(bookHTML);
    console.log(bookHTML);
  }
});

// WORK NEEDED (SEE TODO)
function htmlToDisplay(book) {
  // TODO: Add image from book.
  let img = $("<img>").attr("src", book.image);

  return `
    <h2>${book.title}</h2>
    ${img}
    <h3><span class="description">${book.description}<span></h3>
  `;
}

// DO NOT MODIFY
function createBookFrom(item) {
  return {
    id: item.id,
    title: item.volumeInfo.title,
    description: item.volumeInfo.description,
    image: item.volumeInfo.imageLinks.thumbnail,
    html: `<span id="${item.id}" class="result">${item.volumeInfo.title}</span>`,
  };
}