window.onload = function(){
    checkLogin();
    WriteAtc();
    exit();
    OwnerCenter();
    // 加载文章列表
    loadArticle(1);
    // 监听滚动事件
    window.addEventListener('scroll',_.throttle(x(),1000));
}


// 加载文章
function loadArticle(page){
    var url1 = url + 'posts/list?page=' + page + '&limit=2';
    ajaxXHR('GET',url1,function(data){
        // 错误时返回
        if (data.code != 'SUCCESS' || data.data.articles.length == 0) {
            document.getElementById('loading').innerHTML = '没有更多文章';
            return false;
        }
        // 定义文章
        dt = data.data.articles;
        var str = '';
        // 生成文章列表
        for(var i = 0;i<dt.length;i++){
        //文章部分内容未定义 
        {
            // if(dt[i].title==''){
            //     document.getElementsByClassName("list-title")[0].innerHTML = "作者很懒，木有写";
            // }
            // if(dt[i].abstract==''|| dt[i].abstract== undefined){
            //     document.getElementById("list-content").innerHTML = "作者很懒，木有写";
            //     // document.getElementsByClassName("list-content")[0].innerHTML = "作者很烂，木有写";
            // }
            // // 头像
            // if(dt[i].author.avatar = ''){
            //     document.getElementsByClassName("list-author-head")[0].src = "../img/1.gif";
            // }
            // // 点赞
            // if(dt[i].praise_sum = ''){
            //     document.getElementById("praise_sum").innerHTML = "0";
            // }
            // // 查看数量
            // if(dt[i].look_sum = ''){
            //     document.getElementById("look_sum").innerHTML = "0";
            // }
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
            str += '<p class="list-content" id="list-content">'+dt[i].abstract+'</p>';
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
            str += '<span>' + dt[i].praise_sum + '</span></li>';
            // 查看数量
            str += '<li class="see-num"> <img src="../img/icon_saw.png" alt="">';
            str += '<span>' + dt[i].look_sum + '</span></li>';
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
        console.log(dt);
    })
}

// 监听滚动条
function x(){
    var page = 2;
    var loading = document.getElementById("loading");
    return function(){
        if (loading.getBoundingClientRect().top + loading.offsetHeight < document.documentElement.clientHeight) {
            console.log(page++);
              loadArticle(page++);
        }
    }
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
