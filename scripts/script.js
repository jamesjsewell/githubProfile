console.log('hello world')

//GLOBAL VARIABLES -------------------------------------
//determines which section of the page to build       //
var currentUser = 'magentanova'						  //	
var dataSet = 'profile'								  //
var profileNodes = {}								  //
var repoNodes = []						      	      //
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
	console.log(repoPath)
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

		build_html(userProfile)
	}

	//gathers info needed for repo section 

	if(dataSet === 'repo'){
		
		var repos = {}

		for(var i in dataObj){
			repos[dataObj[i].name] = dataObj[i]
		}

		for(var i in repos){
			repoSource = repos[i]
			userRepo[i] = {
				name: {class: "repoName", tag: "h2", content: repoSource.name},
				description: {class: "repoDescription", tag: "h3", content: repoSource.description},
				language: {class: "repoLang", tag: "p", content: repoSource.language},
				updatedAt: {class: "updated", tag: "p", content: repoSource.updated_at}

			}

		}
		build_html(userRepo)
	}

}

//builds html from organized data
function build_html(data){

	//builds nodes based off of profile data set
	if(dataSet === 'profile'){

		for(var i in data){
			var attribute = data[i]
			console.log(attribute)
			var node = build_a_node(attribute.tag, attribute.class, attribute.content)
			
			if(dataSet === 'profile'){
				profileNodes[i] = node 
			}	
		}
	}
	
	//builds nodes based off of repo data set
	if(dataSet === 'repo'){

		for(var i in data){

			var oneDiv = []

			for(var j in data[i]){
		
				var attribute = data[i][j]
				var node = build_a_node(attribute.tag, attribute.class, attribute.content)
				oneDiv.push(node)
				
			}
			
			var outerNode = build_a_node("div", "repo", "")
			
			for(var k in oneDiv){
				
				outerNode.appendChild(oneDiv[k])
			}
			console.log(oneDiv)
			repoNodes.push(outerNode)
		}
	}

	apply_html()
}

//builds and returns a single html node given defining arguments
function build_a_node(tag, selector, content){

	var nodeString = ""

	var node = document.createElement(tag)

	//assigns properties to new node based on it's tag type
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

	return node
}

//adds completed html to page
function apply_html(){

	if(dataSet === "profile"){

		var profileContainer = document.createElement("div")
		profileContainer.setAttribute("class", "profileContainer")

		for(var i in profileNodes){
			console.log(profileNodes[i])
			profileContainer.appendChild(profileNodes[i])
		}

		var bodyNode = document.querySelector("#thePage")
		bodyNode.appendChild(profileContainer)

		initialize_app('repo', currentUser)
		return null
	
	}

	if(dataSet === "repo"){

		var repoContainer = document.createElement("div")
		repoContainer.setAttribute("class", "repoContainer")
		console.log(repoContainer)
		
		for(var i in repoNodes){
			repoContainer.appendChild(repoNodes[i])
		}

		var bodyNode = document.querySelector("#thePage")
		bodyNode.appendChild(repoContainer)

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

initialize_app('profile', currentUser)







