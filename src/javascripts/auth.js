let Auth = {};

Auth.getToken = ()=>{
	let arr = document.cookie.split(';');
	let token = '';
	for(const i in arr){
		if(arr[i].slice(0, 5) == 'token'){
			token = arr[i].slice(7, arr[i].length-3)
		}
	}
	return token
}

Auth.logOut = ()=>{
	let token = Auth.getToken();
	if(token){
		document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	}
}

Auth.isLoggedIn = ()=>{
	let token = Auth.getToken();
	if(token){
		let exp = JSON.parse(window.atob(token.split('.')[1])).exp;
		return exp > Date.now() / 1000;
	}else{
		Auth.logOut();
		return false
	}
};

Auth.currentUserName = ()=>{
	if(Auth.isLoggedIn()){
		let token = Auth.getToken();
		let username = JSON.parse(window.atob(token.split('.')[1])).username;
		return username;
	}else{
		return '';
	}
}

Auth.currentUserId = ()=>{
	if(Auth.isLoggedIn()){
		let token = Auth.getToken();
		let id = JSON.parse(window.atob(token.split('.')[1]))._id;
		return id;
	}
}

Auth.location = ()=>{
	if(Auth.isLoggedIn()){
		let token = Auth.getToken();
		let location = JSON.parse(window.atob(token.split('.')[1])).location;
		return location;
	}else{
		return ''
	}
}

export default Auth;