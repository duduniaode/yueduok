

// 登录
document.getElementById("btn-login").onclick = function(){
    var phone = document.getElementById("txtphone").value;
    console.log(phone);
    var password = document.getElementById("txtpassword").value;
    console.log(password);
   //POST：
   var abc = "account="+phone+"&password="+password;
   console.log( abc );
    ajaxXHR('POST',url+'account/login',function(data){        
        if(data.code == 'SUCCESS'){
            localStorage._id = data.data.user._id;
            localStorage.account = data.data.user.account;
            localStorage.name = data.data.user.name;
            localStorage.token = data.data.user.token;
            localStorage.background = data.data.user.background;
            localStorage.city = data.data.user.city;
            localStorage.gender = data.data.user.gender;
            localStorage.avatar = data.data.user.avatar;
        //跳转
        // window.location.href='ActSetok.html';
        console.log(localStorage.token);
        window.location.href='ArticleList.html';
        }else{
           alert('用户名或密码错误 ');
           return;
        }
    },abc);
}

