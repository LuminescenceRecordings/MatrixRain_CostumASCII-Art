var c = document.getElementById("c");
var ctx = c.getContext("2d");

//使画布全屏显示
c.height = window.innerHeight;
c.width = window.innerWidth;

//将字符串转换为单字符数组
var konkani = " #,.?0123456789:;@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$";
var characters = konkani.split("");

var font_size = 14;
//计算字符列数
var columns = c.width/font_size;

//x是x坐标，drops[x]的值是y坐标，浏览器向下y是正值
var drops = [];

//Canvas中，文本从坐标的左下角开始绘制，所以y坐标份数初始为1
for (var x = 0; x < columns; x++) {
    drops[x] = 1;
}

//----定位测试施工中----
const asciiArt = "A";

//非14倍数窗口，用以定位最后一行
// var pieceY = Math.floor(c.height / font_size);  
var pieceY = 30;

var stopArtPx = false; 


function draw() {
    //通过不断全屏覆盖半透明的黑色玻璃板，新字符的产生永远在最上层，从而产生雨滴尾迹效果
    //执行见下方代码setInterval();
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    //字符颜色
    ctx.fillStyle = "#00FFFF";

    //遍历字符变化
    for (var i = 0; i < drops.length; i++) {
        //随机生成字符
        var text = characters[Math.floor(Math.random() * characters.length)];
                
        //字符变化内容、坐标
        ctx.fillText(text, i * font_size, drops[i] * font_size);

                
        //----定位测试施工中----

        //雨滴字符接触到图案字符触发雨痕特效
        if (i == 0 && drops[i] == pieceY) {
            stopArtPx = true;
        }

        if (i == 0 && drops[i] == pieceY + 8) {
            stopArtPx = false;
        }
        
        //此clearRect()防止逐渐消失，而是立即消失
        ctx.clearRect(0, pieceY * font_size - font_size, font_size, font_size);

        if (stopArtPx == false) {
            //此clearRect()防止字体不断变厚
            ctx.clearRect(0, pieceY * font_size - font_size, font_size, font_size);
            ctx.fillStyle = "#00FFFF";
            ctx.fillText(asciiArt, 0, pieceY * font_size);
        }


        //不断在下一行变化字符
        drops[i]++;

        //字符变化坐标复位
        if (drops[i] * font_size > c.height + 8 * font_size && Math.random() > 0.975)
			      drops[i] = 1;
    }
}

//更改窗口大小会重新执行程序
window.onresize=()=>{
    location.reload();
}

//内容执行、执行间隔
//此段代码才是雨滴尾迹效果产生的核心执行
setInterval(draw, 50);
