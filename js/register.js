// 注册
  //获取验证码
  document.getElementById("btn-code").onclick = function(){
    //获取用户输入的手机号
    var phone = document.getElementById("txtphone").value;
    // 手机号严谨判断
    if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phone))){ 
        alert("手机号码有误"); 
        return false; 
    } 
    //GET传参数直接拼接
    
    ajaxXHR('GET',url+'captcha?type=register&phone='+phone,function(data){
    
        if(data.code == 'account_has_registered'){
            alert('此手机号已注册');
            return;
        }
        if(data.code == 'phone_format_error'){
            alert('手机号码格式错误');
            return;
        }
        if(data.code == 'param_type_error'){
            alert('验证码错误');
            return;
        }
        if(data.code == 'SUCCESS'){
            document.getElementById("txtcode").value = data.captcha;
            alert('您的验证码是'+data.captcha);
        }
    });
}    
// 点击注册
document.getElementById("btn-register").onclick =function(){
    // "account="+phone+ "&password="+password+"&captcha="+captcha
    var account = document.getElementById("txtphone").value;
    console.log(account);
    var captcha = document.getElementById("txtcode").value;
    console.log(captcha);
    var password = document.getElementById("txtpassword").value;
    var password2 = document.getElementById("txtpassword2").value;
    console.log(password);
    // 判断密码合法性
    if(password==''){
        alert('请输入密码');
        return;
    }
    if(password!=password2){
        alert('两次密码不一致！');
        return false;
    }
    //密码位数
    if(password.length<6 | password.length>32){
        alert('密码必须大于6位 小于32位');
        return;
    }
    // post：
    ajaxXHR('POST',url+'account/register',function(data){
        if(data.code == 'SUCCESS'){
            // //本地存储用户信息
               //跳转
               alert('注册成功');
            // window.location.href='Login.html';
        }else{
            console.log(data.message);
        }
    },"account="+account+ "&password="+password+"&captcha="+captcha);
   
}

