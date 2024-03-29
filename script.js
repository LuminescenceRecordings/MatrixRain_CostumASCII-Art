var c = document.getElementById("c");
var ctx = c.getContext("2d");

//使画布全屏显示
c.height = window.innerHeight;
c.width = window.innerWidth;

//将字符串转换为单字符数组
var splitedChars = characters.split("");

var font_size = 14;
//计算字符列数
var columns = c.width/font_size;

//x是x坐标，drops[x]的值是y坐标，浏览器向下y是正值
var drops = [];
//Canvas中，文本从坐标的左下角开始绘制，所以y坐标份数初始为1
for (var x = 0; x < columns; x++) {
    drops[x] = 1;
}

//asciiArt变量已在asciiArt.js中声明

//ASCII每一列第一个有字符的位置
var upperEdge = [];
firstCharOfColumn();

//确保ASCII图案紧贴窗口最下方
var fullPieceY = Math.floor(c.height / font_size);
var pieceY = fullPieceY - asciiArt.length + 1;  
//确保ASCII图案于窗口x轴居中
var fullPieceX = Math.floor(c.width / font_size);
var pieceX = Math.floor((fullPieceX - asciiArt[0].length) / 2);


//更改窗口大小会重新执行程序
window.onresize=()=>{
    location.reload();
}

//内容执行、执行间隔
//此段代码才是雨滴尾迹效果产生的核心执行
setInterval(draw, processInterval);


//<<----Main---->>

function draw() {
    //ASCII图案字符颜色并绘制
    ctx.fillStyle = asciiArtColor;
    drawAsciiArt();
    
    //通过不断全屏覆盖半透明的黑色玻璃板，新字符的产生永远在最上层，从而产生雨滴尾迹效果
    //执行见代码setInterval();
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    //设置雨滴字符颜色并绘制
    ctx.fillStyle = rainColor;
    drawMatrixRain();   
}

//绘制ASCII图案字符
function drawAsciiArt() {
    for (var j = 0; j < asciiArt.length; j++) {
        for (var k = 0; k < asciiArt[j].length; k++){          
            //此clearRect()防止逐渐消失，同时防止ASCII图案字符堆叠变厚
            //绘制每一个ASCII图案字符
            var char = asciiArt[j][k];
            if (char != " ") {
                ctx.clearRect((k + pieceX) * font_size, (pieceY + j - 1) * font_size, font_size, font_size);
                ctx.fillText(char, (k + pieceX) * font_size, (pieceY + j) * font_size);
            }    
        }
    }
}

//绘制雨滴字符
function drawMatrixRain() {
    //遍历字符变化
    for (var i = 0; i < drops.length; i++) {
        //随机生成字符
        var text = splitedChars[Math.floor(Math.random() * splitedChars.length)];               
        
        //注释掉半透明黑色玻璃板可测试其字符不会堆叠的清爽效果
        ctx.clearRect(i * font_size, (drops[i] - 1) * font_size, font_size, font_size);
     
        //在ASCII图像最上边缘以下的位置清空处理，其余位置正常下雨
        if (drops[i] - pieceY >= upperEdge[i - pieceX]) {
            ctx.clearRect(i * font_size, (drops[i] - 1) * font_size, font_size, font_size);
        } else {
            ctx.fillText(text, i * font_size, drops[i] * font_size);
        }
        
        //不断在下一行变化字符
        drops[i]++;

        //字符变化坐标复位
        if (drops[i] * font_size > c.height + 8 * font_size && Math.random() > 0.975) {
            drops[i] = 1;
        }
    }
}


//<<----Prepare---->>

//定位ASCII图案每一列第一个有字符的y值
function firstCharOfColumn() {
    for (var k = 0; k < asciiArt[0].length; k++){
        let foundChar = false;

        for (var j = 0; j < asciiArt.length; j++) {
            var char = asciiArt[j][k];
            if (char != " ") {
                upperEdge.push(j);
                foundChar = true;
                break;
            }
        }

        if (!foundChar) {
            upperEdge.push(Infinity);
        }
    }
}

