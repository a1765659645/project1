//checkLogin();  //判断是否登陆
if(typeof Cookies.get('uName') === 'undefined') window.location.href = '../login/login.html';
$('.name').text(Cookies.get('uName'));
$('.exit').click(function() {
	Cookies.remove('uName');
	sessionStorage.clear();   //娓呯┖sessionStorage
	window.location.href = '../login/login.html';
});

$('.category').mouseover(function() {
	$('.menu-sub').css('display','block');
});
$('.category').mouseout(function() {
	$('.menu-sub').css('display','none');
});


// 文件上传
var uploader = WebUploader.create({   
	auto: true, // 选完文件后，是否自动上传   
	swf: 'js/Uploader.swf', // swf文件路径   
	server: '/uploadServlet?methodName=fileupload', // 文件接收服务端   
	pick: '#imgPicker', // 选择文件的按钮。可选   
	// 只允许选择图片文件。   
	accept: {   
		title: 'Images',   
		extensions: 'gif,jpg,jpeg,bmp,png',   
		mimeTypes: 'image/*'  
	}  
}); 
uploader.on( 'fileQueued', function( file ) {   
	var $list = $("#fileList"), //获取文件列表 
	$li = $(
		'<div id="' + file.id + '" class="file-item thumbnail">' +   
		'<img>' +   
		'<div class="info">' + file.name + '</div>' +   
		'</div>'
	),   
	$img = $li.find('img');
	$list.append( $li ); // $list为容器jQuery实例    
	// 创建缩略图   
	uploader.makeThumb( file, function( error, src ) {   
		if ( error ) {   
			$img.replaceWith('<span>不能预览</span>');   
			return;   
		}      
		$img.attr( 'src', src );//设置预览图
	}, 100, 100 ); //100x100为缩略图尺寸  
}); 

// 文件上传过程中创建进度条实时显示。
uploader.on( 'uploadProgress', function( file, percentage ) {   
	var $li = $( '#'+file.id ),   
	$percent = $li.find('.progress span');      
	//避免重复创建   
	if ( !$percent.length ) {   
		$percent = $('<p class="progress"><span></span></p>').appendTo( $li ).find('span');   
	}
	$percent.css( 'width', percentage * 100 + '%' );  
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。  
uploader.on( 'uploadSuccess', function( file, res ) {
	console.log(res.filePath);//这里可以得到上传后的文件路径
	$( '#'+file.id ).addClass('upload-state-done');  
}); 

// 文件上传失败，显示上传出错。 
uploader.on( 'uploadError', function( file ) {   
	var $li = $( '#'+file.id ),   
	$error = $li.find('div.error');      
	// 避免重复创建   
	if ( !$error.length ) {   
		$error = $('<div class="error"></div>').appendTo( $li );   
	}     
	$error.text('上传失败');  
});

// 完成上传，成功或者失败，先删除进度条。
uploader.on( 'uploadComplete', function( file ) {   
	$( '#'+file.id ).find('.progress').remove();  
});


// 表单
var names = ['user1', 'user2'];
$('#myform', '#saveform').Validform({
	btnSubmit: '#btn-sub',
	tiptype: 3,
	dragonfly: true,
	datatype: {
		'aaa': /^[\u4E00-\u9FA5]{2,4}$/,
		'bbb': function(val) {
			var target = names.find(function(item) { return item === val });
			return !target;
		}
	},
	beforeSubmit: function(form) {return false;}
});






// 生日
 var changeDD = 1;//->一个全局变量
function YYYYMMDDstart() {
	MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	//先给年下拉框赋内容
	var y = new Date().getFullYear();
	for (var i = (y - 47); i < (y + 21); i++) //以今年为准，前30年，后30年
		document.reg_testdate.YYYY.options.add(new Option(" " + i + " 年", i));
	//赋月份的下拉框
	for (var i = 1; i < 13; i++)
		document.reg_testdate.MM.options.add(new Option(" " + i + " 月", i));
	document.reg_testdate.YYYY.value = y;
	document.reg_testdate.MM.value = new Date().getMonth() + 1;
	var n = MonHead[new Date().getMonth()];
	if (new Date().getMonth() == 1 && IsPinYear(YYYYvalue)) n++;
	writeDay(n); //赋日期下拉框
	//->赋值给日，为当天日期
//        document.reg_testdate.DD.value = new Date().getDate();
}
if (document.attachEvent)
	window.attachEvent("onload", YYYYMMDDstart);
else
	window.addEventListener('load', YYYYMMDDstart, false);

function YYYYDD(str) //年发生变化时日期发生变化(主要是判断闰平年)
{
	var MMvalue = document.reg_testdate.MM.options[document.reg_testdate.MM.selectedIndex].value;
	if (MMvalue == "") {
//            var e = document.reg_testdate.DD;
		optionsClear(e);
		return;
	}
	var n = MonHead[MMvalue - 1];
	if (MMvalue == 2 && IsPinYear(str)) n++;
	writeDay(n)
}

function MMDD(str) //月发生变化时日期联动
{
	var YYYYvalue = document.reg_testdate.YYYY.options[document.reg_testdate.YYYY.selectedIndex].value;
	if (YYYYvalue == "") {
		var e = document.reg_testdate.DD;
		optionsClear(e);
		return;
	}
	var n = MonHead[str - 1];
	if (str == 2 && IsPinYear(YYYYvalue)) n++;
	writeDay(n)
}

function writeDay(n) //据条件写日期的下拉框
{
	var e = document.reg_testdate.DD;
	optionsClear(e);
	for (var i = 1; i < (n + 1); i++)
	{
		e.options.add(new Option(" " + i + " 日", i));
		if(i == changeDD){
			e.options[i].selected = true;  //->保持选中状态
		}
	}
	console.log(i);
	console.log(changeDD);
}

function IsPinYear(year) //判断是否闰平年
{
	return (0 == year % 4 && (year % 100 != 0 || year % 400 == 0));
}

function optionsClear(e) {
	e.options.length = 1;
}
//->随时监听日的改变
function DDD(str){
	changeDD = str;
}
$('.profile').click(function() {
	$('.show').removeClass('show');
	$('.right').addClass('show');
});
$('.order1').click(function() {
	$('.show').removeClass('show');
	$('.right1').addClass('show');
});

document.querySelectorAll('ul.tab a').forEach(function(item, i) {
	item.onclick = function() {
		if(this.className === 'active') return;
		document.querySelector('ul.tab a.active').className = '';
		document.querySelector('ul.tab-content>li.active').className = '';
		this.className = 'active';
		document.querySelectorAll('ul.tab-content>li')[i].className = 'active';
	};
});

Cookies.set('url', window.location.href);