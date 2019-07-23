// 把data中的左边栏数据导入html中
var htmlStr = "";
for(var i = 0; i < product.length; i++){
	htmlStr += '<li>';
	htmlStr += '<a href="#">';
	htmlStr += '<img src="' + product[i].avatar + '"/>';
	htmlStr += "<p class='name'>" + product[i].name + "</p> ";
	htmlStr += '</a>';
	htmlStr += "<span class='price'>" + product[i].price + "元</span>";
	htmlStr += "<p class='remark'>" + product[i].remark + "</p>";
	htmlStr += '</li>';
}
$('.like-list>ul').html(htmlStr);

// 把顾客喜爱部分数据导入HTML中
var likeStr = "";
for(var i = 0; i < ranking.length; i++){
	likeStr += '<li>';
	likeStr += "<p class='number'>" + ranking[i].number + "</p>";
	likeStr += '<a href="#">';
	likeStr += '<img src="' + ranking[i].avatar + '"/>';
	likeStr += "<p class='name'>" + ranking[i].name + "</p> ";
	likeStr += '</a>';
	likeStr += "<span class='price'>" + ranking[i].price + "元</span>";
	likeStr += "<p class='remark'>" + ranking[i].remark + "</p>";
	likeStr += '</li>';
}
$('.hot-rank>ul').html(likeStr);

// 把评论部分导入HTML中
var commentStr = "";
for(var i = 0; i < ranking.length; i++){
	commentStr += '<div class="comment-content-list">';
	commentStr += '<img class="avatar"/ src="' + comments[i].avatar + '"/>';
	commentStr += "<span class='name'>" + comments[i].name + "</span>";
	commentStr += '<div>';
	commentStr += '<div class="score">';
	commentStr += "<span>" + comments[i].scores + "</span>";
	commentStr += '<img src="' + comments[i].score + '"/>';
	commentStr += '</div>';
	commentStr += "<span class='remark'>" + comments[i].remark + "</span>";
	commentStr += "<span class='comment'>" + comments[i].comment + "</span>";
	commentStr += "<span class='post'>" + comments[i].post + "</span>";
	commentStr += '<img class="img"/ src="' + comments[i].img + '"/>';
	commentStr += "<span class='data'>" + comments[i].data + "</span>";
	commentStr += '</div>';
	commentStr += '</div>';
}
$('.comment-content').html(commentStr);

// 放大镜效果
function initZoom() {
	$('.main-avator img').hide().eq(0).show();
	var imgUrl = $('.big-avator>img').first().attr('src');
	var x = $('.main-avator').width();
	var y = $('.main-avator').height();
	$('.zoom-small').css({
		'background-size': `${x}px ${y}px`,
		'background-image': `url(${ imgUrl })`,
	});
	var ratio = x / $('.zoom-small').width();
	$('.zoom-big').css({
		'background-size': `${ x * ratio }px ${ y * ratio }px`,
		'background-image': `url(${ imgUrl })`,
	});
}
initZoom();

$('.sub-avator li').click(function() {
	var i = $(this).index();
	var activeI = $('.main-avator img:visible').index();
	if(i === activeI) return;
	$('.main-avator img').fadeOut(200).eq(i).fadeIn(200);
	var imgUrl = $('.main-avator img').eq(i).attr('src');
	$('.zoom-small, .zoom-big').css('background-image',`url(${imgUrl})`);
});

$('.main-picture span.prev, .main-picture span.next').click(function() {
	var $target = $('.sub-avator li').first();
	if($target.is(':animated')) return;
	var marginLeft = parseInt($target.css('marginLeft'));
	if($(this).hasClass('prev') && marginLeft === 0) return;
	if($(this).hasClass('next') && marginLeft === -250) return;
	var temp = $(this).hasClass('prev') ? marginLeft + 50 : marginLeft - 50;
	$target.animate({
		'margin-left': temp + 'px'
	}, 400);
});

function updateZoom(e) {
	var left, top;
	var mouseX = e.offsetX, mouseY = e.offsetY;
	var minX = $('.zoom-small').width() / 2;
	var maxX = $('.big-avator').width() - minX;
	var minY = $('.zoom-small').height() / 2;
	var maxY = $('.big-avator').height() - minY;
	if(mouseX < minX) left = 0;
	else if(mouseX > maxX) left = maxX - minX;
	else left = mouseX - minX;
	if(mouseY < minY) top = 0;
	else if(mouseY > maxY) top = maxY - minY;
	else top = mouseY - minY;
	$('.zoom-small').css({
		left: left + 'px',
		top: top + 'px',
		'background-position': `-${ left }px -${ top }px`
	});
	var ratioX = $('.big-avator').width() / $('.zoom-small').width();
	var ratioY = $('.big-avator').height() / $('.zoom-small').height();
	$('.zoom-big').css({
		'background-position': `-${ left * ratioX }px -${ top * ratioY }px`
	});
}
$('.zoom-overlay').mouseover(function(e) {
	updateZoom(e);
	$('.zoom-small').show();
	$('.zoom-big').addClass('show');
});
$('.zoom-overlay').mousemove(function(e) {
	updateZoom(e);
});
$('.zoom-overlay').mouseout(function(e) {
	$('.zoom-small').hide();
	$('.zoom-big').removeClass('show');
});

//评论部分标签选项卡
$('ul.product-list>li').click(function(){
	 var index = $(this).index();
	$('ul.product-content>li').eq(index).addClass('active').siblings().removeClass('active');
	$(this).addClass('active').siblings().removeClass('active');
});

if(typeof Cookies.get('productId') === 'undefined') {
	window.location.href = '../list/list.html';
}
//展示商品详情信息
var id = parseInt(Cookies.get('productId'));
var transition = commodity.find(function(item) { return item.id === id });
$('.big-avatar').empty();
$('.main-avatar1').attr('src',`${transition.avatar1}`);
$('.main-avatar2').attr('src',`${transition.avatar2}`);
$('.main-avatar3').attr('src',`${transition.avatar3}`);
$('.main-avatar4').attr('src',`${transition.avatar4}`);
$('.main-avatar5').attr('src',`${transition.avatar5}`);
$(`<span>${ transition.name }</span>`).appendTo('h3.name>span');
$(`<span>${ transition.price }</span>`).appendTo('li.price-number>span.price');
// var transition1 = commodity1.find(function(item) { return item.id === id });
// $('.big-avatar').empty();
// $('.main-avatar1').attr('src',`${transition1.avatar1}`);
// $('.main-avatar2').attr('src',`${transition1.avatar2}`);
// $('.main-avatar3').attr('src',`${transition1.avatar3}`);
// $('.main-avatar4').attr('src',`${transition1.avatar4}`);
// $('.main-avatar5').attr('src',`${transition1.avatar5}`);
// $(`<span>${ transition1.name }</span>`).appendTo('h3.name>span');
// $(`<p>${ transition1.price }</p>`).appendTo('li.price-number');



// 增加减少购买数量
$('.cartbox>a.cart').click(function(){
	function checkLogin()  {
		if(typeof Cookies.get('uName') === 'undefined') {
			Cookies.set('url', window.location.href);
			window.location.href = '../login/login.html';
		}
	}
	checkLogin();
});


$('.to-top').click(function() {
	var val = $(this).parent().prev('.count').val(); 
	var num = parseInt(val) + 1; 
	if(num > 10) {
		alert('商品购买数量已达到上限。。');
		return;
	}else {
		$(this).parent().prev('.count').val(num); 
	};
}); 
$('.to-bottom').click(function() {
	var val = $(this).parent().prev('.count').val(); 
	var num = parseInt(val) - 1; 
	if(num < 1) {
		return;
	}else {
		$(this).parent().prev('.count').val(num); 
	};
}); 
// 加入购物车
function checkLogin() {
		if(typeof Cookies.get('uName') === 'undefined') {
			Cookies.set('url', window.location.href);
			window.location.href = '../index/index.html';
		}
	}
$('.cartbox>a.cart').click(function(){
	checkLogin();
	var shoppingInfo = JSON.parse(sessionStorage.getItem('shoppingInfo'));
	var target = shoppingInfo.find(function(item) { return item.productId === id });
	
	if(typeof target === 'undefined') shoppingInfo.push({
		
		id: shoppingInfo[shoppingInfo.length - 1].id + 1,
		name: Cookies.get('uName'),
		productId: id,
		count: 1
	});
	else {
		if(target.count === 5){
			alert('当前商品在购物车中的数量已达到上限');
			return;
		}
		target.count += 1;
	}
	sessionStorage.setItem('shoppingInfo', JSON.stringify(shoppingInfo));
});