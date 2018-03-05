window.onload = function(){
    checkLogin();
    // 退出
    exit();
    OwnerCenter();

    console.log('1');
}
function UploadPic(){
    // 获取点击按钮的对象
    var file_img = document.getElementById("file-img");
    // 判断浏览器类型
    var ua = navigator.userAgent.toLowerCase();
    var url = '';
    // 判断当前浏览器是否为ie浏览器
    if(/msie/.test(ua)){
        url = file_img.value;
    }else{
        //获取forms中的文件，并赋值给url，每次调用URL.crreateObjectURl方法时，都会创建一个对象。
        url = window.URL.createObjectURL(file_img.files[0]);
    }
    //获取img标签对象的src，并将url赋值给img标签的src属性，这是完成打印的一步。
    document.getElementById("article-image").src = url;
    document.getElementById("article-image").className = "article-image";
    document.getElementById("up-img").style.background = "";
    
    document.getElementById("upimg-word").style.display = "none";
    document.getElementById("change-img").style.display = "";
    console.log('2');
}

// 发布文章
document.getElementById("top-publish").onclick = function(){
    console.log('3');
    var token = localStorage.token;
    console.log(token);
    if(token == ''){
        alert("请先登录");
        return false;
    }
    var pic = document.getElementById("file-img").files[0];
    var title = document.getElementById("title").value;
    console.log('title'+title);
    var body = document.getElementById("body").value;
    console.log('body'+body);
    var formdata = new FormData();
    formdata.append("token",token);
    formdata.append("title",title);
    formdata.append("pic",pic);
    formdata.append("body",body);
    console.log(body);
    ajaxXHR2('POST',url+'/posts/add',function(data){
        if(data.code = 'SUCCESS'){
            alert("发表成功");
        }if(data.code = 'param_incomplete'){
            alert("请求参数不完整");
        }if(data.code = 'article_has_exist'){
            alert("文章标题已存在");
        }if(data.code = 'account_token_invalid'){
            alert("身份已失效,请重新登陆");
        }
    },formdata);
    
}









