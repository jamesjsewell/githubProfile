console.log('hello world')

//links to github api 
var vanillaApiUrl = 'https://api.github.com/users/'

//returns an object containing the api paths to profile info and repo info
function build_url(userName){

	var profilePath = vanillaApiUrl + userName
	var repoPath = vanillaApiUrl + userName + "/repos"
	
	return {profile: profilePath, repo: repoPath}
}

//requests data from an api given an api url
function request_data(url,requestNumber){
	
	if(requestNumber === 1){

    	var profileInfoPromise = $.getJSON(url) 
    	profileInfoPromise.then(process_new_data)

	}

	if(requestNumber === 2){

    	var repoInfoPromise = $.getJSON(url) 
    	repoInfoPromise.then(process_new_data)
	}
}

//processes data from the request and repackages it
function process_new_data(dataObj){
	
	//userProfile = {}
	//userProfile["name": dataObj.name, "blog"]

}

//builds html from organized data
function build_html(){

}

//builds and returns a single html node given defining arguments
function build_a_node(){

}

//adds completed html to page
function apply_html(){

}

//starts the app
function initialize_app(){

	//apiPaths.profile for profile info and .repo for repo info 
	var apiPaths = build_url('jamesjsewell')
	request_data(apiPaths.profile, 1)

}

initialize_app()







