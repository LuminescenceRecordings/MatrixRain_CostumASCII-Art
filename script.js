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

//Ascii图案
const asciiArt = [
    "                                                  ",
    "                                                  ",
    "                  i                               ",
    "                 .ur                              ",
    "                 .jU.                 :rY.        ",
    "                 .r2i                :sJqv        ",
    "                 .7jj.              .7rvb5        ",
    "                 :rusr             .77i71Z.       ",
    "                .irsuJi           :vLrvvjP:       ",
    "                .Yviirrr::....   :v2r7L1v5i       ",
    "                :vi.::ii777rv77rrrIL7JUIuur       ",
    "                ::.::iiririi:iiYjjSrvPMdvSr       ",
    "              .::.::ii77rii:::r:JdJiiSB57U:       ",
    "           .:i:::..::77riririiii:uUrvBRjiu.       ",
    "          :::::::...ivrirriiriii::vsBBqirv        ",
    "         .::.......:rvri:::iiriii::jREr7Xj        ",
    "         .::..i::..i77r:.::i77riii::r7r7Jr.       ",
    "         ::..rQB1.:r7v:..:.::7ri:i::.i7vjJ:       ",
    "        .:.  rDBM.::ii:...r..:rrrii:..rYP1r.      ",
    "        ..   vQB1..:::::ibRBv:irii:i:::rqXr:      ",
    "        :   .7Z7..::.:7IB:1QB2iii:iii:::JU7.      ",
    "       ..  .i:.......:vBRrBBB1:i:iiiii:irvr:      ",
    "       ..  .:......:::rvgKRgr.:..:::::i:rr7i      ",
    "       ...   ....:.::ii:.ii..:....::.::iirrr      ",
    "       ..  iI1jJi...::i:::i:i::..:r::::::iir.     ",
    "       :. .BBBBBQi ..:::.::::::......:.::iir:     ",
    "       .: .QBBBBBL ...::....:::.......:::iiir     ",
    "       .. :RQQQBBr.:::::.......:.:.:::::iriii.    ",
    "      ....igBRQM2:::::i...:...:..:::::i:rriir:    ",
    "       ..:vKDREXr:::::::.:::...::::ii::ir7iiii    ",
    "      ....s5XUIXviiii:i::::::i:::ii:::ii7rrrri.   ",
    "      ....:gBBDEu:::..:r:::iii:ii:.::::rrri7ri.   ",
    "       .. .PQQBBBu::v5gUi:::i:::::..:.:iririii.   ",
    "       ....:IgEgQBQQQBP7:i:::::::::::::rrrrriri   ",
    "       .....r21vvIXvY7r.::i::::::::::iiirr77rrr   ",
    "       ....:.rrr:i:i:::::iii:::::::::irrir7vrrr:  ",
    "        ..::..:.::::::i:i:iii::.:::iirrrr7vrrrr:  ",
    "        .:.:.:.:::ii:iirir:::::::::iirrrvLv7r7i:  ",
    "        :::.::::::i:iiiii:::::::i:i:irr7sv7rrrri  ",
    "        ::::.:::::ii:i:iii...::::iiiiirv7vrriiii  ",
    "        ::::::::iiiiiii:r:::::ii::::ii77vr:ii:i:  ",
    "       .:::::::::::i:iiiiiiriri::i:iirr7rii:::::  ",
    "       .:.::::i:::::i:iirirrr:i:iiiiir7:::::::::  ",
    "       ..:.::::rrrir77r7rrrr:::::i:irr::::::::::  ",
    "       ...:.::iir7rr77vrri::::::i:i:i::.::::::i:  ",
    "       ....::::iiiiririr::::irii::::::.:::::::ir  ",
    "          ....::::::i::.:.......:.......... ..::  ",    
];

//确保ASCII图案紧贴窗口最下方
var fullPieceY = Math.floor(c.height / font_size);
var pieceY = fullPieceY - asciiArt.length + 1;  
//确保ASCII图案于窗口x轴居中
var fullPieceX = Math.floor(c.width / font_size);
var pieceX = Math.floor((fullPieceX - asciiArt[0].length) / 2);

ctx.fillStyle = "#00FFFF";


//更改窗口大小会重新执行程序
window.onresize=()=>{
    location.reload();
}

//内容执行、执行间隔
//此段代码才是雨滴尾迹效果产生的核心执行
setInterval(draw, 50);


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


function draw() {
    drawAsciiArt();
    
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
        
        ctx.clearRect(i * font_size, (drops[i] - 1) * font_size, font_size, font_size);
        
        //非ASCII图案矩形内的雨滴进行绘制
        if (i < pieceX || i >= pieceX + asciiArt[0].length || drops[i] < pieceY) {
            //字符变化内容、坐标
            ctx.fillText(text, i * font_size, drops[i] * font_size);
        } 
        
        //对ASCII图案矩形内的空格字符处的雨滴进行绘制
        if (drops[i] >= pieceY && drops[i] < pieceY + asciiArt.length && 
            i >= pieceX && i < pieceX + asciiArt[0].length) {

            if (asciiArt[drops[i] - pieceY][i - pieceX] == " ") {
                ctx.fillText(text, i * font_size, drops[i] * font_size);
            }
        }
        
        //不断在下一行变化字符
        drops[i]++;

        //字符变化坐标复位
        if (drops[i] * font_size > c.height + 8 * font_size && Math.random() > 0.975)
			      drops[i] = 1;
    }
}
