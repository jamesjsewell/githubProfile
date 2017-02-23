console.log('hello world')

//GLOBAL VARIABLES -------------------------------------
//determines which section of the page to build       //
var dataSet = 'profile'								  //
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
			org: {class: "orgLink", tag: "p", content: dataObj.organizations_url},
			city: {class: "city", tag: "p", content: dataObj.location},
			email: {class: "email", tag: "p", content: dataObj.email},
			blog: {class: "blog", tag: "p", content: dataObj.blog}
		}
	}

	//gathers info needed for repo section 
	if(dataSet === 'repo'){
		
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
		}
	}	
}

//builds and returns a single html node given defining arguments
function build_a_node(){

}

//adds completed html to page
function apply_html(){

}

//starts the app
function initialize_app(){

	//build profile section
	//apiPaths.profile for profile info and .repo for repo info 
	dataSet = 'profile'
	var apiPaths = build_url('jamesjsewell')
	request_data(apiPaths.profile)
	
}

initialize_app()







