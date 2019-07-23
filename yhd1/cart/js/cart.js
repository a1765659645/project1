//购物
checkLogin();
var shoppingInfo = JSON.parse(sessionStorage.getItem('shoppingInfo'));
shoppingInfo.forEach(function(item) {
	var products = shoppingInfo;
	console.log(product);
	});
	product.forEach(function(item) {
	$(`
			<tr data-id="${ item.id }">//筛选出来的某一已登录用户的所有购物信息(保存在shoppingInfo里)，可能一条，可能多条
				<td><input type="checkbox" checked /></td>
				<td class="avatar"><a><img src="${ item.avatar }"></a></td>
				<td class="name"><a>${ item.name }</a></td>
				<td class="price">${ item.price }</td>
				<td>
						<span class="decrease">-</span>
						<span class="count">${ item.count }</span>
						<span class="increase">+</span>
				</td>
				<td><span class="sub-acount">${ item.price * item.count }</span></td>
				<td>
					<span class="i"><i class="iconfont icon-Collection"></i></span>
					<span class="delete"><i class="iconfont icon-delete"></i></span>
				</td>
			</tr>
			<tr>商品总价:￥${ item.count * item.price }</tr>
	`).appendTo('tbody');
});
updateResult();
// updateResult();//更新完再调用一次
// //全选反选功能
$('.all').click(function() {
	$('input').prop('checked', $(this).prop('checked'));
  updateResult();
});				
$('tbody input').click(function() {
	$('.all').prop('checked', !$('tbody input:not(:checked)').length);
	updateResult();
});

//增加,减少购买数量
$('.increase,.decrease').click(function() {
	var id = parseInt($(this).closest('tr').attr('data-id'));
	console.log(id);
	var target = shoppingInfo.find(function(item) { return item.id === id });
	console.log(target);
	if(this.className === 'decrease') {
		if(target.count === 1) return;
		target.count -= 1;
		$(this).next().text(target.count);
	} else {
		if(target.count === 10) { alert('购买数量已达上限..'); return; }
			target.count += 1;
			$(this).prev().text(target.count);
	}
	sessionStorage.setItem('shoppingInfo', JSON.stringify(shoppingInfo));
	var price = parseInt($(this).closest('tr').find('.price').text());
	$(this).closest('tr').find('.sub-acount').text(target.count * price);
	updateResult();
});
// 删除功能
$('.delete').click(function() {
	if(!confirm('确定删除？')) { return;}
	var id = parseInt($(this).closest('tr').attr('data-id'));
	for(var i = 0; i < shoppingInfo.length; i++) {
		if(shoppingInfo[i].id === id) {
			shoppingInfo.splice(i, 1);
			sessionStorage.setItem('shoppingInfo', JSON.stringify(shoppingInfo));
			$(this).closest('tr').fadeOut(1000, function() {
				$(this).remove();
				// updateResult();
			});
			break;
		}
	}
});
//批量删除

// 更新total,acount值，总数量与总价格
function updateResult() {
        var total = 0, acount = 0;
        $('tr:has(td>input:checked)').each(function(i, item) {
                total += parseInt($(item).find('.count').text());
                acount += parseInt($(item).find('.sub-acount').text());
        });
        $('.total').text(total);
        $('.acount').text(acount);
};

//遍历，拼ul
bannerImages.forEach(function(item) {
	var $ul = `<ul data-id='${item.id}'></ul>`;//拼出4个ul
	$('.banner-content').append($ul);
});
//
var $ul = $('.banner-content>ul');
$ul.each(function(i, item) {
	var id = parseInt($(item).attr('data-id'));
	var data = bannerLists.filter(function(item1) {
		return item1.fid === id;//五次循环里共筛五次，筛出五组
	});
	data.forEach(function(item2) {
		var liHtml =
		`<li>
		<a class="avatar"><img src='${ item2.avatar }'/></a>
		<p>￥${ item2.price }</p>
		<a class="name">${ item2.name }</a>
		</li>`;
		$(item).append(liHtml);
	});
});
//点击轮播
$('.banner>span.prev').click(function() {
	var target = $('.banner-content>ul').first();
	if(parseInt(target.css('marginLeft')) === 70) return;
	target.css('margin-left', '+=1200')
});
$('.banner>span.next').click(function() {
	var target = $('.banner-content>ul').first();
	if(parseInt(target.css('marginLeft')) === -3530) return;
	target.css('margin-left', '-=1200')
});
$('.banner>span').css('transition', 'all 0.6s');

//点击指示器轮播
//用each
var indict = $('.banner-indicators>li');
indict.each(function(i,item) {
	$(item).click(function() {
		//if($(this).className === 'active') return;
			var target = $('.banner-content>ul').first();
			var number = (-(parseInt(target.css('marginLeft'))-70)/ 1200);
			console.log(number);
			$(indict[i]).addClass('active').siblings().removeClass('active');
			target.css('marginLeft',70-(i%4*1200));
	});
});

//地址三级联动
	var addressInit = function(_cmbProvince, _cmbCity, _cmbArea, _cmbStreet, defaultProvince, defaultCity, defaultArea,defaultStreet)  
{  
    var cmbProvince = document.getElementById(_cmbProvince);  
    var cmbCity = document.getElementById(_cmbCity);  
    var cmbArea = document.getElementById(_cmbArea); 
	var cmbStreet = document.getElementById(_cmbStreet);
      
    function cmbSelect(cmb, str)  
    {  
        for(var i=0; i<cmb.options.length; i++)  
        {  
            if(cmb.options[i].value == str)  
            {  
                cmb.selectedIndex = i;  
                return;  
            }  
        }  
    }  
    function cmbAddOption(cmb, str, obj)  
    {  
        var option = document.createElement("OPTION");  
        cmb.options.add(option);  
        option.innerText = str;  
        option.value = str;  
        option.obj = obj;  
    }  
      
    function changeCity()  
    {  
        cmbArea.options.length = 0;  
        if(cmbCity.selectedIndex == -1)return;  
        var item = cmbCity.options[cmbCity.selectedIndex].obj;  
        for(var i=0; i<item.areaList.length; i++)  
        {  
            cmbAddOption(cmbArea, item.areaList[i], null);  
        }  
        cmbSelect(cmbArea, defaultArea);  
    }  
    function changeProvince()  
    {  
        cmbCity.options.length = 0;  
        cmbCity.onchange = null;  
        if(cmbProvince.selectedIndex == -1)return;  
        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;  
        for(var i=0; i<item.cityList.length; i++)  
        {  
            cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i]);  
        }  
        cmbSelect(cmbCity, defaultCity);  
        changeCity();  
        cmbCity.onchange = changeCity;  
    }  
      
    for(var i=0; i<provinceList.length; i++)  
    {  
        cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i]);  
    }  
    cmbSelect(cmbProvince, defaultProvince);  
    changeProvince();  
    cmbProvince.onchange = changeProvince;  
}  
  addressInit('cmbProvince', 'cmbCity', 'cmbArea'); 




		if(typeof Cookies.get('uName') === 'undefined') window.location.href = '../login/login.html';
Cookies.set('url', window.location.href);
$('.exit').click(function(){
	window.location.href = Cookies.get('url');
});