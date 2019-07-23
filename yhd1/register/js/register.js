var code = '';


$('.right .ask-help').hover(function() {
	$(this).css('height','auto');
});
$('.right .ask-help').mouseout(function() {
	$(this).css('height','20px');
});
//跳转登录页
$('.regist').click(function(){
	window.location.href = '../login/login.html';
});


//更新验证码
function updateCode() {
	code = '';
	var arr = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
	for(var i = 0; i < 6; i++) {
		code += arr[Math.floor(Math.random()*arr.length)];//生成一个随机数组
	}
	document.querySelector('.get-code').innerText = code;
}
updateCode();
//用户名验证
document.getElementById('name').onblur = function() {
	var reg = /^[a-zA-Z0-9_\u4E00-\u9FA5]{4,20}$/;//用unicode编码\u4e00-\u9fa5判断是不是中文
	if(!reg.test(this.value)) {
		alert('用户名格式不正确，请重新输入');
	}
};
//手机号验证
document.getElementById('phone').onblur = function() {
	var reg = /^1[34578]\d{9}$/;
	if(!reg.test(this.value)) {
		alert('格式错误，请输入正确的手机号码');
	}
};
//验证码
document.querySelector('.get-code').onclick = function() {
	updateCode();
};
document.querySelector('.phone-code').onblur = function() {
	var reg = /^\d{6}$/;
	if(!reg.test(this.value)) {alert('请先输入验证码'); return; }
	if(this.value !== code) { alert('验证码错误'); updateCode(); }
};
//密码
document.querySelector('.pwd').onblur = function() {
	var reg = /^[a-zA-Z0-9]{6,20}$/;
	if(!reg.test(this.value)) {alert('请输入符合要求的密码');}
};
document.querySelector('.re-pwd').onblur = function() {
	if(!(this.value === document.querySelector('.pwd').value)) {alert('请确认二次密码输入正确');}
};
//input获得焦点
$('.form-group1>input').focus(function() {
	$('.form-group1>label').addClass('active');
	$('.form-group1>span').addClass('active');
});
$('.form-group2>input').focus(function() {
	$('.form-group2>label').addClass('active');
	$('.form-group2>span').addClass('active');
});
$('.form-group3>input').focus(function() {
	$('.form-group3>label').addClass('active');
});
$('.form-group4>input').focus(function() {
	$('.form-group4>label').addClass('active');
	$('.form-group4>span').addClass('active');
});
$('.form-group5>input').focus(function() {
	$('.form-group5>label').addClass('active');
	$('.form-group5>span').addClass('active');
});
//失去焦点
$('.form-group1>input').blur(function() {
	if(this.value !== '') return;
	$('.form-group1>label').removeClass('active');
	$('.form-group1>span').removeClass('active');
});
$('.form-group2>input').blur(function() {
	if(this.value !== '') return;
	$('.form-group2>label').removeClass('active');
	$('.form-group2>span').removeClass('active');
});
$('.form-group3>input').blur(function() {
	if(this.value !== '') return;
	$('.form-group3>label').removeClass('active');
	$('.form-group3>span').removeClass('active');
});
$('.form-group4>input').blur(function() {
	if(this.value !== '') return;
	$('.form-group4>label').removeClass('active');
	$('.form-group4>span').removeClass('active');
});
$('.form-group5>input').blur(function() {
	if(this.value !== '') return;
	$('.form-group5>label').removeClass('active');
	$('.form-group5>span').removeClass('active');
});	
	
	
	
	
// $('.form-group>input').each(function(i, item) {
// 	$(item).focus(function() {
// 	 $(item.prev()).addClass('active');
// 	$(item.next()).addClass('active');
// 	});
// 	console.log(item);
	// $(this).blur(function() {
	// 	if(this.value !== '') return;
	// $('.form-group>label').removeClass('active');
	// $('.form-group>span').removeClass('active');
	// });
// });


//跳转页面
var agree = $('.agree-regist').click(function() {
	// 验证：。。。
	if(input.value === '') return;
	else { window.location.href = '../order/order.html'; }
});

	