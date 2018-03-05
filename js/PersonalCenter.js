window.onload = function(){
    checkLogin();
    WriteAtc();
    exit();
    backTop();
    OwnerCenter();

    // 加载文章列表
    loadArticle(1);
    // 监听滚动事件
    window.addEventListener('scroll',_.throttle(x(),1000));

    // 获取作者id 
    var author_id = getQueryString("author_id");
    console.log("author_id"+author_id);

    // 个人中心信息
    // var url1 = url + 'account/profile'
    // ajaxXHR('POST',)
}

// 加载文章
function loadArticle(page){
    var author_id = getQueryString("author_id");
    var url1 = url + 'posts/list?page=' + page + '&limit=2' + '&user='+author_id;
    ajaxXHR('GET',url1,function(data){
        // 后面信息覆盖
        // document.getElementById("upper").style.backgroundImage = "url('../img/bg_center.png')" ;
        // console.log(localStorage.background);    
        //     // 头像 头像
        // document.getElementById("master-head").style.backgroundImage = 'url('+img_url+ localStorage.avatar+')';   
        // // document.getElementById("master-head").style.backgroundImage = img_url+ author.avatar;   
        //     // 性别
        // var gender = localStorage.gender;
        // if(gender == 'woman'){
        //     document.getElementById("icon_girl").style.display = '';
        // }else{
        //     document.getElementById("icon_boy").style.display = ''
        // }    
        //     // 姓名
        // document.getElementById("master-name").innerHTML = localStorage.name;    
        // console.log("dt[0].author.name"+localStorage.name);
        //     // 城市
        // document.getElementById("master-city").innerHTML = localStorage.province +' '+ localStorage.city1;    
        //     // 星座
        // document.getElementById("master-constellation").innerHTML =  localStorage.constellations;   
        // document.getElementById("article-num").innerHTML = "0";    
        // document.getElementById('loading').innerHTML = '没有更多文章';

        // 错误时返回
        if (data.code != 'SUCCESS' || data.data.articles.length == 0) {
            document.getElementById('loading').innerHTML = '没有更多文章';
            // document.getElementById('loading-text').style.display = 'none';
            return false;
        }
        // if( data.data.articles.length == 0){
        //   
        // }
        // 定义文章
        var dt = data.data.articles;
        console.log(data);
        
       
        var str = '';
        // 生成文章列表
        for(var i = 0;i<dt.length;i++){
        console.log("dt.length" + dt.length);
        document.getElementById("article-num").innerHTML = dt.length;    
                 // 定义作者
        // "url('../img/jq1.jpg')"
            // 背景图片'url('+img_url + localStorage.background +')'
            // 'url('+localStorage.background+')'
        //背景图片 
            // if(localStorage.background=='' || )
        document.getElementById("upper").style.backgroundImage = "url('../img/bg_center.png')" ;
        console.log(localStorage.background);    
            // 头像 头像
        document.getElementById("master-head").style.backgroundImage = 'url('+img_url+ dt[0].author.avatar+')';   
        // document.getElementById("master-head").style.backgroundImage = img_url+ author.avatar;   
            // 性别
        var gender = dt[0].author.gender;
        if(gender == 'woman'){
            document.getElementById("icon_girl").style.display = '';
        }else{
            document.getElementById("icon_boy").style.display = ''
        }    
            // 姓名
        document.getElementById("master-name").innerHTML = dt[0].author.name;    
        console.log("dt[0].author.name"+dt[0].author.name);
            // 城市
        document.getElementById("master-city").innerHTML = dt[0].author.city;    
            // 星座
        if(dt[0].author.constellations == '' || dt[0].author.constellations == undefined){
            document.getElementById("master-constellation").innerHTML =  localStorage.constellations;   
        }else{
             document.getElementById("master-constellation").innerHTML =  dt[0].author.constellations;   
        }    
            
        // 创建li标签
           str += '<li>';
           str += '<ul class="list-main">'
         //文章图片开始    
           str += ' <li class="fl">'
           str += '<a target="_blank" data-id='+dt[i]._id+' href="ArticleDetails.html?id='+dt[i]._id+'">';
           str += '<img src="" data-src='+img_url+dt[i].cover+' alt="" class="list-pic">';
           str += '</a>';
           str +='</li>';
         //文章图片结束
         //列表内容开始
            str += '<li class="fr">';
          //标题开始
            str += '<a href="ArticleDetails.html?id='+dt[i]._id+'">';
            str += '<span class="list-title">'+dt[i].title+'</span>';
            str += '</a>';
          //标题结束
          //内容开始
            str += '<p class="list-content">'+dt[i].abstract+'</p>';
          //内容结束   
          //详细信息开始
            str += '<ul class="list-details">';
            //作者信息开始
            str += '<li class="author">';
                // 头像
            str += '<a target="_blank" href="PersonalCenter.html?author_id='+ dt[i].author._id+'"><img src=' + img_url + dt[i].author.avatar +' alt="" class="list-author-head"><span>' + dt[i].author.name + '</span> </a>';
                // 姓名 
            str += '<li>';
            //作者信息结束 
            // 时间
            str += '<li class="creattime">'+ moment(dt[i].create_time).format('YYYY-MM-DD HH:mm:ss') + '</li>';
            // 点赞 查看数量  
            str += '<li class="fr"><ul>';
            // 点赞
            str += '<li class="thumbs-up"><img src="../img/icon_thumb_up.png" alt=""> ';
            str += '<span id="praise_sum">' + dt[i].praise_sum + '</span></li>';
            // 查看数量
            str += '<li class="see-num"> <img src="../img/icon_saw.png" alt="">';
            str += '<span id="look_sum">' + dt[i].look_sum + '</span></li>';
            str += '</ul></li>';
            str += '</ul>'; 
          //详细信息结束  
            str += '</li>';
         //列表内容结束    
           str += '</ul>';
           str += '</li>';
        }
        // 插入
        var e = document.getElementById("list");
        e.insertAdjacentHTML('beforeend',str);
        lazyLoad();
    })
}

// 监听滚动条
function x(){
    var page = 2;
    var loading = document.getElementById("loading");
    return function(){
        if (loading.getBoundingClientRect().top + loading.offsetHeight < document.documentElement.clientHeight) {
            // console.log(page++);
              loadArticle(page++);
        }
    }
}






