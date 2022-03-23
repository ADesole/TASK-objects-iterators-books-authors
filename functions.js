const authors = require("./authors.json");
const books = require("./books.json");

/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  return books.find((book) => book.id === bookId);
}
// console.log(getBookById(12, books));

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  return authors.find(
    (author) => author.name.toLowerCase() === authorName.toLowerCase()
  );
}
// console.log(getAuthorByName("J.K. Rowling", authors));

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
  let arrayOfAuthors = [];
  authors.forEach((author) =>
    arrayOfAuthors.push({ author: author.name, bookCount: author.books.length })
  );
  return arrayOfAuthors;
}
// console.log(bookCountsByAuthor(authors));

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  books.forEach((book) => (colors[book.color] = []));
  books.forEach((book) => colors[book.color].push(book.title));

  // not a good solution but works

  return colors;
}
// console.log(booksByColor(books));

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  let bookArray = [];
  //find array of book ids
  //for each push
  if (!getAuthorByName(authorName, authors)) {
    return [];
  }
  books.forEach((book) => {
    if (getAuthorByName(authorName, authors).books.includes(book.id))
      bookArray.push(book.title);
  });
  return bookArray;
}
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  let max = 0;
  let bestOne;
  bookCountsByAuthor(authors).forEach((authorObj) => {
    if (authorObj.bookCount > max) {
      max = authorObj.bookCount;
      bestOne = authorObj;
      // bestOne = authorObj.author;
    }
  });
  return bestOne.author;
}
// console.log(mostProlificAuthor(authors));

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  let titleList = [];
  let bookAuthor = getBookById(bookId, books).authors;
  bookAuthor.forEach((authorObj) =>
    titleList.push(titlesByAuthorName(authorObj.name, authors, books))
  );
  let finalArray = [];
  titleList.forEach((elem) => finalArray.push(...elem));
  return finalArray.sort();
  // finalArray = [...new Set(finalArray)];
  // without duplicates
  // return finalArray;
}
// console.log(relatedBooks(46, authors, books));

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
  let copyAuthor = authors;
  copyAuthor.forEach((author) => (author["repeat"] = 0));
  // for (let index = 0; index < authors.length; index++) {
  //   for (let index1 = 0; index1 < authors.length; index1++) {
  //     copyAuthor[index][repeat] += compareArrays(
  //       copyAuthor[index].books,
  //       copyAuthor[index1].books
  //     );
  //   }
  // }
  copyAuthor.forEach((author) => {
    for (let index = 0; index < authors.length; index++) {
      author["repeat"] += compareArrays(author.books, authors[index].books);
    }
  });
  let max = 0;
  let bestOne = 0;
  copyAuthor.forEach((author) => {
    if (author.repeat > max) {
      max = author.repeat;
      bestOne = author;
      // bestOne = authorObj.author;
    }
  });

  return bestOne.name;
}
function compareArrays(array1, array2) {
  let sum = 0;
  for (let index1 = 0; index1 < array1.length; index1++) {
    for (let index2 = 0; index2 < array2.length; index2++) {
      if (array1[index1] === array2[index2]) sum++;
    }
  }
  return sum;
}
console.log(friendliestAuthor(authors));

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};
