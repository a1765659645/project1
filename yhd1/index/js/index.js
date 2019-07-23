// search
var button = document.querySelectorAll('.search>button');
document.querySelector('.search>input').onmouseout = function() {
	button[0].style.borderColor = 'rgb(226,226,226)';
	button[0].style.backgroundColor = 'rgb(252,252,252)';
}
document.querySelector('.search>input').onmouseover = function() {
	button[0].style.borderColor = '#ff6700';
	button[0].style.backgroundColor = '#fff';
}
// menu
var lis = document.querySelectorAll('.category>li');
var menuSub = document.querySelector('.menu-sub');
lis[0].onmouseover = function() {
	menuSub.style.display = 'block';
};
lis[0].onmouseout = function() {
	menuSub.style.display = 'none';
}

// 倒计时
function showCountDownTime() {
	var begin = new Date();
	var end = new Date(2019, 7, 1, 0, 0, 0);
	var timeSpan = Math.ceil((end - begin) / 1000);
	var day = Math.floor(timeSpan / (3600 * 24));
	var hours = ('00' + Math.floor(timeSpan / 3600 % 24)).substr(-2);
	var minutes = ('00' + Math.floor(timeSpan / 60 % 60)).substr(-2);
	var seconds = ('00' + timeSpan % 60).substr(-2);
	document.querySelector('.hour').innerText = hours;
	document.querySelector('.minute').innerText = minutes;
	document.querySelector('.second').innerText = seconds;
	if (timeSpan <= 0) {
		clearInterval(timer);
		return;
	}
}
var timer = setInterval(showCountDownTime, 1000);
$('#count~li').css('background','white');


$('.left-indicator1').click(function() {
	var target = $('.content1');
	if(parseInt(target.css('marginLeft')) === 0) return;
	target.css('margin-left','+=120');
});
$('.right-indicator1').click(function() {
	var target = $('.content1');
	if(parseInt(target.css('marginLeft')) === -240) return;
	target.css('margin-left','-=120');
});
$('.left-indicator2').click(function() {
	var target = $('.content2');
	if(parseInt(target.css('marginLeft')) === 0) return;
	target.css('margin-left','+=120');
});
$('.right-indicator2').click(function() {
	var target = $('.content2');
	if(parseInt(target.css('marginLeft')) === -240) return;
	target.css('margin-left','-=120');
});
$('.left-indicator3').click(function() {
	var target = $('.content3');
	if(parseInt(target.css('marginLeft')) === 0) return;
	target.css('margin-left','+=120');
});
$('.right-indicator3').click(function() {
	var target = $('.content3');
	if(parseInt(target.css('marginLeft')) === -240) return;
	target.css('margin-left','-=120');
});
$('.left-indicator4').click(function() {
	var target = $('.content4');
	if(parseInt(target.css('marginLeft')) === 0) return;
	target.css('margin-left','+=120');
});
$('.right-indicator4').click(function() {
	var target = $('.content4');
	if(parseInt(target.css('marginLeft')) === -240) return;
	target.css('margin-left','-=120');
});
window.onscroll = function() {
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollTop >= 730) {
		$('.top').css('top','0');
	} else{
		$('.top').css('top','-60px');
	}
}
// banner
var index = 0,
	timer = null;

function toggleImage(targetIndex) {
	document.querySelector('.banner-images>.show').className = '';
	document.querySelector('.banner-indicators>.active').className = '';
	index = targetIndex;
	document.querySelectorAll('.banner-images>li')[index].className = 'show';
	document.querySelectorAll('.banner-indicators>li')[index].className = 'active';
}

function autoPlay() {
	timer = setInterval(function() {
		toggleImage(index + 1 > 3 ? 0 : index + 1);
	}, 6000);
}
document.querySelector('.banner').onmouseover = function() {
	clearInterval(timer);
};
document.querySelector('.banner').onmouseout = function() {
	autoPlay();
};
var indicators = document.querySelectorAll('.banner-indicators>li')
for (var i = 0; i < indicators.length; i++) {
	(function(j) {
		indicators[j].onmouseover = function() {
			toggleImage(j);
		};
	})(i);
}
autoPlay();
// 点击购物车跳转页面
 
$('.search>.cart').click(function() {
	if(typeof Cookies.get('uName') === 'undefined') window.location.href = '../login/login.html';
	else window.location.href = '../cart/cart.html';
});
Cookies.set('url', window.location.href);
$('.exit').click(function(){
	window.location.href = Cookies.get('url');
});
$('.meifahufa').click(function() {
	window.location.href = '/仿1号店/list/list1.html'
});
$('.bfcz').click(function() {
	window.location.href = '/仿1号店/commodity/commodity.html'
});