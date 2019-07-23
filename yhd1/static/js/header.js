// 边栏滑动一段距离出现
window.onscroll = function getTop() {
	var mytop = $(document).scrollTop();
	if (mytop > 700) {
		$(".aside").css({
			'display': 'block',
			'top': '140px',
		});
	} else {
		$(".aside").css('display', 'none');
	}
	setTimeout(getTop);
}
// 返回顶部效果
$(function() {
	$(".rocket").hide();
	$(function() {
		$(window).scroll(function() {
			if ($(window).scrollTop() > 1800) {
				$(".rocket").fadeIn(500);
			}
			else {
				$(".rocket").fadeOut(500);
			}
		});
		$(".rocket").click(function() {
			$('body,html').animate({
				scrollTop: 0
			},
			500);
			return false;
		});
	});
});


$('.after-hello>.name').text(Cookies.get('uName'));
//页面跳转
// function checkLogin()  {
// 	if(typeof Cookies.get('user') === 'undefined') {
// 		Cookies.set('url', window.location.href);
// 		window.location.href = '../login/login.html';
// 	}
// }
//登录页面
$('li.global>p.login').click(function(){
	window.location.href = '../login/login.html';
});
//注册页面
$('li.global>p.registration').click(function(){
	window.location.href = '../register/register.html';
});
//我的订单页面
$('li.order>span').click(function() {
	if(typeof Cookies.get('uName') === 'undefined') window.location.href = '../login/login.html';
	else window.location.href = '../personal/personal.html';
});

// checkLogin();
// $('li.order>span').click(function(){
// 	window.location.href = '../cart/cart.html';
// });
//退出页面

if(typeof Cookies.get('uName') === 'undefined'){
	$(".after-hello").css({
		'display': 'none',
	});
} else {
		$(".global").css('display', 'none');
}
$('.after-hello>p.name').click(function() {
	window.location.href = '../personal/personal.html';
});
$('.after-hello>p.name').text(Cookies.get('uName'));
$('.after-hello>p.exit').click(function() {
	Cookies.remove('uName');
	sessionStorage.clear();
	window.location.href = '../login/login.html';
});

$('.page>span').click(function() {
	window.location.href = '../index/index.html';
});

