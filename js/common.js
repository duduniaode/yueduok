
function ajaxXHR(type,url,cb,params){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status==200 && xhr.readyState==4){
            var data = JSON.parse(xhr.response);//讲json字符串转变为json对象
            cb(data);//成功时调用该方法
        } 
    }
    xhr.open(type,url,true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.withCredentials = true;
    xhr.send(params);
}

// 没有请求头的
function ajaxXHR2(type,url,cb,formdata){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status==200 && xhr.readyState==4){
            var data = JSON.parse(xhr.response);//将json字符串转变为json对象
            cb(data);//成功时调用该方法
        }
    }
    xhr.open(type,url,true);
    xhr.withCredentials = true;
    xhr.send(formdata);
}

var url ='https://dev.apis.sh/97mgherRFc/';
var img_url = 'https://dev.apis.sh/97mgherRFc/static/';


// function cb(data){
//     if(data.code == 'SUCCESS'){
//         //本地存储用户信息
//         localStorage._id = data.data.user._id;
//         localStorage.account = data.data.user.account;
//         localStorage.name = data.data.user.name;
//         localStorage.token = data.data.user.token;
//         localStorage.background = data.data.user.background;
//         localStorage.city = data.data.user.city;
//         localStorage.gender = data.data.user.gender;
//         localStorage.avatar = data.data.user.avatar;
//     }
// }
var token = localStorage.token;
// 登录校验
function checkLogin(){
    if(token == ''){
        document.getElementById("top-login").style.display = "";
        document.getElementById("top-user").style.display = "none";   
    }else{
        document.getElementById("top-login").style.display = "none";
        document.getElementById("top-user").style.display = "";
        console.log("localStorage.name:"+localStorage.name);
        console.log("localStorage.avatar:"+localStorage.avatar);
        document.getElementById("username").innerHTML = localStorage.name;
        document.getElementById("user-head").src = img_url + localStorage.avatar;
    }
}
// 退出登录
 function exit(){
    document.getElementById("exit").onclick = function(){
        localStorage.token = "";
        localStorage.account = "";
        localStorage.name = "";
        localStorage.background = "";
        localStorage.city = "";
        localStorage.gender = "";
        localStorage.avatar = "";
        console.log(token);
     }
 }
// 写文章
 function WriteAtc(){
    document.getElementById("towrite").onclick = function(){
        if(token !=""){
            window.open('WriteArticle.html');
        }else{
            alert("请登录");
        }
    }
 }

// 自己的个人中心
 function OwnerCenter(){
     document.getElementById("owner-center").onclick = function(){
        window.open('PersonalCenter.html?author_id='+localStorage._id);
     }
}
// 文章部分若未定义
function checkArticle(){
  
}



/**
* 预加载图片函数封装
  * @param {String} add 请求到的图片地址
  * @param {String} img 需要填充图片
  */
 function preLoadImg(add,img){
    var tmpImg = new Image();
    // 将请求到的图片的真实地址赋给temImg.src
    tmpImg.src = add;
    // 图片加载成功后，替换临时图片。
    tmpImg.onload = function () {
        // 将图片的真实地址给img
        img.src = tmpImg.src;
    }
    // 加载失败
    tmpImg.onerror = function () {
        var error = '../img/b.jpg';
        // 将错误图片地址给img
       img.src = error;
    }
    // 预加载图片(接口返回的图片地址需要前加上服务器地址)。
    // tmpImg.src = img_url + img;
 }

// 懒加载
function lazyLoad(){
    var imgs = document.getElementsByClassName('list-pic');
    // 伪数组
    // // /*
    // * 什么是伪数组：
    // * 1、伪数组是一个对象
    // * 2、这个对象必须要有length属性
    // * 3、如果这个对象的length不为0，那么必须要有按照下标存储的数据
    // * */
    var imags = Array.prototype.slice.call(imgs, 0);
    console.log(imags);
     // 循环所有图片
    //  forEach() 方法对数组的每个元素执行一次提供的函数。
     imags.forEach(function (img) {
        // 图片请求后不再执行该函数
        if (img.dataset.src === '') return;
        // 
        if (img.getBoundingClientRect().top + loading.offsetHeight< document.documentElement.clientHeight) {
            // 当图片出现在视窗中时，请求该图片。
            preLoadImg(img.dataset.src, img);
            // 通过dataset获取图片的真实地址
            // 清空自定义数据，之后在执行函数时避免重复请求。
            img.dataset.src = '';
        }
    });
} 


// 回到顶部
function backTop(){
    document.addEventListener('scroll', function () {
        //   定义可视区的高度
        var clientHeight = document.documentElement.clientHeight;
        //  获取返回顶部按钮
        var btn = document.getElementById('backtop');
        // 定时器
        var timer = null;
        // 是否顶部
        var isTop = true;
        // 滚动条滚动时触发
        window.onscroll = function () {
            //获取页面卷起的高度
            // 滚动条的高度
            var osTop1 = document.documentElement.scrollTop || document.body.scrollTop;
            // 显示回到顶部按钮
            if (osTop1 >= clientHeight) {
            btn.style.display = "block";
            } else {
            btn.style.display = "none";
            };
            // 回到顶部过程中用户滚动滚动条，停止定时器 
                // if (!isTop) {
                //     // clearInterval()方法能够取消setInterval()方法设置的定时器
                //     // window.clearInterval(intervalID)
                //     // intervalID是你想要取消的定时器的ID,这个ID是个整数,是由setInterval()返回的.
                //     clearInterval(timer);
                //     console.log("当回到顶部过程中用户滚动滚动条时，isTop为" + isTop); //false
                // };
                // isTop = false;
                // // 设置页面下拉到正在加载时禁止下拉 
        };
        btn.onclick = function () {
            // 设置定时器
            timer = setInterval(function () {
                // 获取滚动条距离顶部高度
                var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                console.log('滚动条距离顶部高度 ' + osTop);
                // 创建一条滚动条距离顶部高度为负数的数据 
                // 当点击返回顶部按钮时，用卷起距离 + 为负的卷起距离
                // 为负的卷起距离除以一个数 除数越小 为负的卷起距离越接近于卷起距离 滚动条速度越快
                // Math.floor() 返回小于或等于一个给定数字的最大整数。
                // Math.floor() === 向下取整
                var ispeed = Math.floor(-osTop / 7);
                console.log('ispeed ' + ispeed);
                // 卷起页面的距离
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                //到达顶部，清除定时器
                    if (osTop === 0) {
                            // clearInterval()方法能够取消setInterval()方法设置的定时器
            // window.clearInterval(intervalID)
            // intervalID是你想要取消的定时器的ID,这个ID是个整数,是由setInterval()返回的.
                        clearInterval(timer);
                    };
                isTop = true;
            }, 30);
        };
    });
}

 function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if (r != null) {
        return unescape(r[2]);
    } else if (q != null) {
        return unescape(q[2]);
    } else {
        return null;
    }
  }