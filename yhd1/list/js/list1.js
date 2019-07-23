// menu
var lis = document.querySelectorAll('.category>li');
var menuSub = document.querySelector('.menu-sub');
lis[0].onmouseover = function() {
	menuSub.style.display = 'block';
};
lis[0].onmouseout = function() {
	menuSub.style.display = 'none';
}
$('.hair').mouseover(function() {
	$('.mod-search-sub').addClass('show');
})
$('.hair').mouseout(function() {
	$('.mod-search-sub').removeClass('show');
})
$('.option>input').focus(function() {
	$('.option').css('background','#fff');
	$('.option>div').css('display','inline-block');
});
$('.option>input').blur(function() {
	$('.option>div').css('display','none');
});

$('.distribution').mouseover(function() {
	$('.distribution>input').css('background','#fff');
});
$('.distribution').mouseout(function() {
	$('.distribution>input').css('background','rgb(245,245,245)');
});

var id = parseInt(Cookies.get('categoryId'));
commodity1.forEach(function(item){
	$(`
		<li>
			<img src='${ item.avatar }'/>
			
			<p>${ item.price }</p>
			<p>${ item.name }</p>
			<span>${ item.discount }</span><br/>
			<div class='cart-box'>
				<input class="count" type="text" value="1">
				<div><span class="increase"><i class="iconfont icon-top"></i></span><span class="decrease"><i class="iconfont icon-bottom"></i></span></div>
				<span>${ item.addcart }</span>
			</div>
			<span><i class="iconfont icon-news"></i>${ item.comment } + '</span>
			<span><i class="iconfont icon-thumb"></i>${ item.like }</span><br>
			<span>自营</span>
			<span>${ item.shop }</span><i class="iconfont icon-right"></i>
		</li>
	`)
		.appendTo('.product-list');
});







window.onscroll = function() {
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollTop >= 650) {
		$('.mounting').css('top','0');
	} else{
		$('.mounting').css('top','-60px');
	}
}

$('.increase').click(function() {
	var val = $(this).parent().prev('.count').val();
	var num = parseInt(val) + 1;
	if(num > 5) {
		alert('本件商品购物车已达上限！');
		return;
	} else{
		$(this).parent().prev('.count').val(num);
	};
});
$('.decrease').click(function() {
	var val = $(this).parent().prev('.count').val();
	var num = parseInt(val) - 1;
	if(num < 1) return;
	$(this).parent().prev('.count').val(num);
});

// 点击购物车跳转页面
 
$('.search>.cart').click(function() {
	if(typeof Cookies.get('uName') === 'undefined') window.location.href = '../login/login.html';
	else window.location.href = '../cart/cart.html';
});

Cookies.set('url', window.location.href);
$('.exit').click(function(){
	window.location.href = Cookies.get('url');
});
