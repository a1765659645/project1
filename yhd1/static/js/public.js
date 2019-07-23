// 验证登陆
function checkLogin() {
	if(typeof Cookies.get('productId') === 'undefined') {
		Cookies.set('url', window.location.href);
		// window.location.href = '../index/index.html';
	}
}