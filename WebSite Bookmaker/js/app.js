document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
	
	//get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validate(siteName,siteUrl)){
		return false;
	}

	var book_mark = {
		name: siteName,
		url: siteUrl
	}

	/*
	//local storage test
	localStorage.setItem('test','Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/

	//Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null) {
		// Init array
		var bookmarks = [];
		// Add to array
		bookmarks.push(book_mark);
		//set to loacalstorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	} else {
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add to array
		bookmarks.push(book_mark);
		//reset back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	// clear form
	document.getElementById('myForm').reset();
	// re-fetch bookmark from localstorage
	fetchBookmarks();

	// prevent form from subbmiting
	e.preventDefault();
}


// Fetch bookmarks
function fetchBookmarks() {
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');
	
	// Build Output
	bookmarksResults.innerHTML = '';
	for (var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">' +
										'<h3>' +name +
										' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
										' <a onClick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
										'</h3>' +
										'</div>'	;
	}

}


// Delete Bookmark
function deleteBookmark(url){
	// fetch bookmark from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//loop through bookmarks
	for(var i=0; i<bookmarks.length;i++){
		if (bookmarks[i].url == url) {
			//remove from array
			bookmarks.splice(i,1);
		}
	}
	//reset back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// re-fetch bookmark from localstorage
	fetchBookmarks();
}


function validate(siteName,siteUrl){
	if(!siteName || !siteUrl){
		alert('Please fill in the form!');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)) {
	  alert("Please you valid URL!");	  
	  return false;
	}
	return true;

}