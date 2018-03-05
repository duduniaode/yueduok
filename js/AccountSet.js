window.onload = function(){
    checkLogin();
    // 个人中心
    OwnerCenter();
    WriteAtc();
    exit();
    //获取省份信息
    getPro();
    // 获取星座
    getStar();
    // loadArticle(1);
   
    
}


// 确认修改
document.getElementById("modify-btn").onclick = function(){
    getSex();
    console.log(getSex());
    // token avatar name gender constellation city
    var token = localStorage.token;
    if(token == ''){
        alert('请您先登录');
        window.open('Login.html');
    }
    // 头像
    var avatar = document.getElementById("file_img").files[0];
    // 昵称
    var name = document.getElementById("new-name").value;
    // 性别
    var gender = getSex();
    // 星座
    var constellation_index = document.getElementById("xing").selectedIndex;
    var constellation = document.getElementById("xing").options[constellation_index].text;
        // 本地baocun
    localStorage.constellations = constellation;    
    // 城市
     //省
    var province_index = document.getElementById("province").selectedIndex;
    var province = document.getElementById("province").options[province_index].text; 
    localStorage.province = province;
     //市
    var city_index = document.getElementById("city").selectedIndex;
    var city = document.getElementById("city").options[city_index].text; 
    localStorage.city1 = city;
     //区
    var area_index = document.getElementById("area").selectedIndex;
    var area = document.getElementById("area").options[area_index].text;
    localStorage.area = area;
    console.log("token:"+token+"; "+"avatar:"+avatar+"; "+"name:"+name+"; "+"gender:"+gender+"; "+"constellation:"+constellation);
    console.log("province:"+province+"city:"+city+"area:"+area);     
    
    var cityArr = new Array();
    cityArr[0] = String(province_index);
    cityArr[1] = String(city_index);
    cityArr[2] = String(area_index);
    var upcity = '['+String(cityArr)+']';
    console.log(upcity);
    // token avatar name gender constellation city
    var formdata = new FormData();
    formdata.append("token",token);
    formdata.append("avatar",avatar);
    formdata.append("name",name);
    formdata.append("gender",gender);
    formdata.append("constellation",constellation);
    formdata.append("city",upcity);
    console.log("formdata:"+formdata);

    // 提交数据
    ajaxXHR2('POST',url+'account/profile',function(data){
        if (data.code == 'SUCCESS') {
            alert("提交成功");
            window.open('Login.html');
        } else {
            alert("提交失败");
        }
    },formdata);
    // // 校验密码
    // var login_pwd = document.getElementById("login-pwd").value;
    // var account = localStorage.account;
    // var abc = "account="+account+"&password="+login_pwd;
    // ajaxXHR('POST',url+'account/login',function(data){
    //     if(data.code == 'SUCCESS'){
    //         // 提交数据
    //         ajaxXHR2('POST',url+'account/profile',function(data){
    //             if (data.code == 'SUCCESS') {
    //                 alert("提交成功");
    //             } else {
    //                 alert("提交失败");
    //             }
    //         },formdata);
    //     }else{
    //         alert("密码错误");
    //     }
    // },abc)
}

// 获取性别值
function getSex(){
    var radio = document.getElementsByName("sex");
    for (i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            return radio[i].value;
        }
    }
}
// 性别点击
 document.getElementById("man-img").onclick = function(){
     document.getElementById("man-choose").style.display = "";
     document.getElementById("man-unchoose").style.display = "none";
     document.getElementById("woman-choose").style.display = "none";
     document.getElementById("woman-unchoose").style.display = "";
 }
 document.getElementById("woman-img").onclick = function(){
    document.getElementById("man-choose").style.display = "none";
    document.getElementById("man-unchoose").style.display = "";
    document.getElementById("woman-choose").style.display = "";
    document.getElementById("woman-unchoose").style.display = "none";
 }

// 上传头像
document.getElementById("file_img").onchange = function(){
    var file =this.files[0];
    // 获取文件读取对象
    var img_reader = new FileReader();
    img_reader.onload = function(e){
        console.log(e.target);
        document.getElementById("div_img").innerHTML = '<img src="'+e.target.result+'"width="50px" height="50px" border-radius:"50%" >';
    }
    // 把图片传进去
    img_reader.readAsDataURL(file);
}

// 城市
    /**
     * 获取省份接口数据
     */
    function getPro(){
        //请求省份
        ajaxXHR('GET',url + 'city/province',function(data){
            //错误时返回
            if(data.code!='SUCCESS'){
                /**
                 * insertAdjacentHTML() 将指定的文本解析为HTML或XML，
                 * 并将结果节点插入到DOM树中的指定位置。它不会重新解析它正在使用的元素，
                 * 因此它不会破坏元素内的现有元素。
                 * 这避免了额外的序列化步骤，使其比直接innerHTML操作更快。
                 * 'afterbegin'插入元素内部的第一个子节点之前。
                 */
                document.getElementById('province').insertAdjacentHTML('afterbegin','<option>无法加载城市信息请刷新重试</option>');
                return;
            }
            //添加省级选项
            // 取到省份数据
            var dt = data.data.province;
            var str = '<option>请选择</option>';
            for (var i=0;i<dt.length;i++){
                //data 自定义属性 '-'是自定义属性标准的写法 id是自己自定义的属性值
                // 创建option标签 
                str+='<option value='+dt[i].ProID+' data-name='+dt[i].name+' data-id='+dt[i].ProID+'>';
                str+=dt[i].name;
                str+='</option>';
            }
            // 插入省份数据
            document.getElementById('province').innerHTML = str;
            // document.getElementById('province').insertAdjacentHTML('afterbegin',str);


        });
    }
    /**
     * @param {*} pro_id
     * 
     */
        // 城市
    function getCity(pro_id){
        var str = '<select id="city" class="form-control">';
        ajaxXHR('GET',url+'city/city?ProID='+pro_id,function(data){
                //错误时返回
                if(data.code!='SUCCESS'){
                    str = '<select class="form-control">请求失败</select>';
                    return;
                }
                //添加城市选项
                str += '<option>请选择</option>';
                var dt = data.data.city;  
                for (var i=0;i<dt.length;i++){
                    str+='<option data-id='+dt[i].CityID+'>';
                    str+=dt[i].name;
                    str+='</option>';
                }
                str+='</select>';
                //'afterend'元素自身的后面。
                document.getElementById('province').insertAdjacentHTML('afterend',str);
            
                document.getElementById('city').onchange =function(){
                    // console.log(666);

                    if(document.getElementById("area")!=null){
                        this.parentNode.removeChild(document.getElementById("area"));
                    }
                    //获取城市ID
                    var city_id = this.selectedOptions[0].dataset.id;


                    var str = '<select id="area" class="form-control">';
                    ajaxXHR('GET',url+'city/area?CityID='+city_id,function(data){
                        //错误时返回
                        if(data.code!='SUCCESS'){
                            str = '<select class="form-control">请求失败</select>';
                            return;
                        }
                        //添加qu/xian选项
                        str += '<option>请选择</option>';
                        var dt = data.data.area;  
                        for (var i=0;i<dt.length;i++){
                            str+='<option data-id='+dt[i].Id+'>';
                            str+=dt[i].DisName;
                            str+='</option>';
                        }
                        str+='</select>';
                        document.getElementById('city').insertAdjacentHTML('afterend',str);
                    
                    });
                }
    
            });
        }
    /**
     * 省份选中事件
     */
    document.getElementById("province").onchange = function(){
        if(document.getElementById("city")!=null){
            this.parentNode.removeChild(document.getElementById("city"));
        }
        if(document.getElementById("area")!=null){
            this.parentNode.removeChild(document.getElementById("area"));
        }

        //取到所选省
        // console.log(this.selectedOptions[0].dataset);
        var id = this.selectedOptions[0].dataset.id;
        if(id===undefined) return;

        //调用城市接口数据
        getCity(id);
    }

// 星座
function getStar(){
    ajaxXHR('GET',url+'constellations/query',function(data){
        var xzarr = data.data.constellations;
        // console.log(xzarr);
        for(var i=0;i<xzarr.length;i++){
            var perxz = xzarr[i];
            //获取星座的select
             var xzsel = document.getElementById("xing");
            //创建option
            var xzopt = document.createElement("option");
            //创建文本
            var xzval = document.createTextNode(perxz);
            // xzopt.innerText = perxz;
            //将文本插入到option
            xzopt.appendChild(xzval);
            //将option插入select
            xzsel.appendChild(xzopt);
        }
    });
}

