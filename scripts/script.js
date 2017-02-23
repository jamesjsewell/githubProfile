console.log('hello world')

//GLOBAL VARIABLES -------------------------------------
//determines which section of the page to build       //
var dataSet = 'profile'								  //
var profileNodes = {}							      //
													  //
//user profile attributes are stored in this data set //
var userProfile = {}								  //
var userRepo = {}							          //
													  //												  //
//links to github api 								  //
var vanillaApiUrl = 'https://api.github.com/users/'	  //
//------------------------------------------------------
//------------------------------------------------------

//returns an object containing the api paths to profile info and repo info
function build_url(userName){

	var profilePath = vanillaApiUrl + userName
	var repoPath = vanillaApiUrl + userName + "/repos"
	
	return {profile: profilePath, repo: repoPath}
}

//requests data from an api given an api url
function request_data(url){

    var profileInfoPromise = $.getJSON(url) 
    profileInfoPromise.then(process_new_data)
}

//processes data from the request and repackages it
function process_new_data(dataObj){
	
	console.log(dataObj)
	
	//gathers info needed for profile section
	if(dataSet === 'profile'){
		
		userProfile = {

			avatar: {class: "userAvatar", tag: "img", content: dataObj.avatar_url},
			name: {class: "fullName", tag: "h2" , content: dataObj.name},
			username: {class: "userName", tag: "h3", content: dataObj.login},
			bio: {class: "bio", tag: "p", content: dataObj.bio},
			org: {class: "orgLink", tag: "a", content: dataObj.company},
			city: {class: "city", tag: "p", content: dataObj.location},
			email: {class: "email", tag: "p", content: dataObj.email},
			blog: {class: "blog", tag: "a", content: dataObj.blog}
		}
	}

	//gathers info needed for repo section 
	if(dataSet === 'repo'){
		console.log('made it to repo')
		userRepo = {

			test: "test"
		}
	}
	
	console.log(userProfile)
	build_html()
}

//builds html from organized data
function build_html(){

	if(dataSet === 'profile'){

		for(var i in userProfile){

			var attribute = userProfile[i]
			console.log(attribute)
			var node = build_a_node(attribute.tag, attribute.class, attribute.content)
			profileNodes[i] = node 
		}
	}	

	console.log('nodes', profileNodes)

	apply_html()
}

//builds and returns a single html node given defining arguments
function build_a_node(tag, selector, content){

	var nodeString = ""

	var node = document.createElement(tag)

	if(tag === 'img'){
		node.setAttribute("class", selector)
		node.src = content
	}

	if(tag === 'a'){
		node.setAttribute("class", selector)
		node.setAttribute("href", content)
		node.innerHTML = content
	}

	if(tag != 'a' && tag != 'img'){
		node.setAttribute("class", selector)
		node.innerHTML = content
	}

	console.log(node)

	return node
}

//adds completed html to page
function apply_html(){

	if(dataSet === "profile"){

		var profileContainer = document.createElement("div")
		profileContainer.setAttribute("id", "profileContainer")

		for(var i in profileNodes){
			console.log(profileNodes[i])
			profileContainer.appendChild(profileNodes[i])
		}

		var bodyNode = document.querySelector("#thePage")
		bodyNode.appendChild(profileContainer)

	initialize_app('repo', 'jamesjsewell')
	
	}
}

//starts the app
function initialize_app(pageSection, user){

	//build profile section
	//apiPaths.profile for profile info and .repo for repo info 
	dataSet = pageSection
	var apiPaths = build_url(user)
	request_data(apiPaths[dataSet])
	
}

initialize_app('profile', 'jamesjsewell')







