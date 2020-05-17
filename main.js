window.addEventListener("load", start, false);

//Placeholder function
function $(x){return document.getElementById(x)}

function start()
{
	//Prevents default form submission
	$('add').onclick = function(e){add(); e.preventDefault()}
	
	//Adds box shadow on focus and removes it on blur
	$('text').onfocus = function(){this.style.boxShadow = '0 0 5px #0a1f44'}
	$('text').onblur = function(){this.style.boxShadow = 'none'}
}



function add()
{
	text = $('text').value
	
	//If the textbox contains values
	if (text)
	{
		fetch("https://api.github.com/users").then(response => response.json())
		.then(data => getNames(data, text)).catch(err => alert(err))
	}
}

function getNames(data, text)
{
	/*Function to check if inputted name is in the object*/
	nameArr = []
	lengt = data.length
	for (var i=0; i<lengt; ++i)
	{
		//Creates an array to store all names in the object
		nameArr.push(data[i].login); 
	}
	
	//Removes leading and trailing spaces from inputted value
	text = text.trim().toLowerCase()
	if (nameArr.includes(text))
	{
		display(data[nameArr.indexOf(text)], text)
	}
	else
	{
		//If the inputted name is not in the object
		alert("This username is not in the login database. Try '" + nameArr[Math.floor(Math.random() * nameArr.length)] + "'")
	}
}

function display(subData,text)
{
	//Gets image src and github link
	url = "https://api.github.com/users/" + subData.login
	image = subData.avatar_url
	github = subData.html_url
	
	//Gets name, blog, and company
	fetch(url).then(response => response.json())
	.then(function(data){
		name = data.name
		blog = data.blog
		company = data.company
		//Displays the details
		appendd(image, name, github, company, blog)
		}).catch(err => alert(err))
}
function appendd(image, name, github, company, blog)
{
	//Generates the mark up
	markup = "<ul>" + 
				"<li>" +
					"<img src='" + image + "'>" +
					"<div class='details'>" +
						"<h3>Name : <span>" + name + "</span></h3>" +
						"<h3>Login name : <span>" + text + "</span></h3>" +
						"<h3>Github link : <a href= '" + github + "'>" + github + "</a></h3>" +
						"<h3>Company : <span>" + company + "</span></h3>" +
						"<h3>Blog : <a href= '" + blog + "'>" + blog + "</a></h3>" +
					//	"<h3>Location : </h3>" + location +
					"</div>" +
				"</li>"+
			"</ul>"
			
	//Appends the mark up
	$('result').innerHTML += markup
				
}
function removespace(x)
{
	//Prevents entry of spaces
	if (x.value.includes(" "))
	{
		x.value = x.value.slice(0,-1);
	}
}