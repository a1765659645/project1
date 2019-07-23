$(".submit").click(function() {
	var user = users.find(function(item){
		return item.userName === $(".name").val();
	});
	if(typeof user === "undefined") {
		alert("用户名不存在。。");
		return;
	}
	if(user.password !== $(".pwd").val()) {
		alert("密码错误。。");
		return;
	}
	Cookies.set("uName", user.userName);
	window.location.href ='../index/index.html';

	window.location.href = Cookies.get('url') || '../index/index.html';
	var shoppingInfo = cart.filter(function(item) { return item.name === users.userName; });
	sessionStorage.setItem('shoppingInfo',JSON.stringify(shoppingInfo));
	
	});
