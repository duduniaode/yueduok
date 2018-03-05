
window.onload = function(){
  checkLogin();
  WriteAtc();
  exit();
  QrCode();
  OwnerCenter();
    x();

  var id = getQueryString("id");
  console.log("id:"+id);
  console.log("token:"+localStorage.token);
  
  var url1 = url + 'posts/details?id='+id;
  //  var url1='php/details.js';
  ajaxXHR('GET',url1,function(data){
    if(data.code != 'SUCCESS'){
      alert("该文章不存在");
      return false;             
    }else{
      localStorage.article_id = data.data.article._id;
      var article_id = localStorage.article_id;
      console.log("article_id:"+article_id);
    }
    //  点击头像到个人中心
    document.getElementById("user-head").onclick = function(){
        window.open('PersonalCenter.html?author_id='+ dt[i].author._id);
    }
    var da = data.data.article;
    // console.log(da);
    // 生成文章
    document.getElementById("article-title").innerHTML = da.title;
      //作者头像 
    document.getElementById("head-img").src =img_url + da.author.avatar;     
        // 作者姓名
    document.getElementById("article-author-name").innerHTML = da.author.name;
        // 创作时间
    document.getElementById("article-creattime").innerHTML = moment(da.create_time).format('YYYY-MM-DD HH:mm:ss');
        // 点赞量
    document.getElementById("zan").innerHTML = da.look_sum;
        //文章图片
    if(da.pic == '' || da.pic == undefined){
        document.getElementById("article-pic").src = '../img/b.jpg';
    }else{
      document.getElementById("article-pic").src =img_url + da.pic;     
    }    
        //插入文章 
    document.getElementById("article-body").innerHTML = da.body;
  })
  PingL(1);
}

//异步请求，评论列表
function PingL(page){
//   localStorage.article_id = data.data.article._id;
  var article_id = localStorage.article_id;
  console.log("article_id"+article_id);

   
   url2 = url + 'comment/list?page=' + page + '&limit=' + 3 + '&article=' + article_id;
  // url2 = 'php/pinglun.js';
  ajaxXHR('GET',url2,function(data){
      var dat = data.data.comments;
      var str = '';
      for(var i = 0;i<dat.length;i++){
          str += '<div class="review-list"><ul><li>';
          // 头像姓名
          if(dat[i].author.avatar=='' || dat[i].author.avatar==undefined){
            str += '<a target="_blank" href="PersonalCenter.html?User_id='+ dat[i].author._id+'"><img src="../img/1.gif" class="headimg"><span>'+dat[i].author.name+'</span></a></li>';
          }else{
            str += '<a target="_blank" href="PersonalCenter.html?User_id='+ dat[i].author._id+'"><img src='+img_url + dat[i].author.avatar+' class="headimg"><span>'+dat[i].author.name+'</span></a></li>';
          }
          // 时间
          str += '<li><span class="time">'+moment(dat[i].create_time).format('YYYY-MM-DD HH:mm:ss')+'</span></li>';
          // 赞
          str += '<li><img src="../img/icon_thumb_up_like.png" alt=""  class="zanpic"><span class="zannum">'+dat[i].praise_sum+'</span></li>'
          // 内容
          str += '<div class="review-body">'+ dat[i].body +'</div>';
          str += '</ul></div>'
      }
      var e = document.getElementById("review");
      e.insertAdjacentHTML('beforeend', str);
  })
}
// 监听滚动条 加载评论
function x(){
    var page = 2;
    PingL(page++);
}

// 写评论
 // 获取提交按钮
 var publish = document.getElementById("comment-submit");
 // 绑定响应事件
 publish.onclick = function(){
     // 用户临时身份凭据token
     var token = localStorage.token;
     console.log("token:"+token);
     // 评论内容body
     var body = document.getElementById("comment_content").value;
     console.log('body:'+body);
     // 文章id article
     var article = getQueryString("id");
     console.log('article:'+article);
 
     // var formdata = new FormData();
     // formdata.append('token',token);
     // formdata.append('body',body);
     // formdata.append('article',article);
 
     ajaxXHR('POST',url+'comment/add',function(data){
        if(data.code == 'SUCCESS'){
            alert("发表成功");
        }if(data.code == 'article_not_found'){
            alert("文章不存在");
        }if(data.code == 'account_token_invalid'){
            alert("身份已失效，请重新登录");
        }
 
     },"token="+token+"&body="+body+"&article="+article);
 }

























// 二维码
function QrCode(){
  var share = document.getElementById("share");
  var qrcode = document.getElementById("qrcode");
  share.onmouseover = function(){
    qrcode.style.display = "";
  };
  share.onmouseout = function(){
      qrcode.style.display = "none";
  }
}


