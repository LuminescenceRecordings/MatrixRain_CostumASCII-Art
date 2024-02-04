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
    "                                                                                ",
    "                                                                                ",
    "                            :i.                                                 ",
    "                           .rJY:                               .                ",
    "                           .i71v.                           :r7717              ",
    "                           .:rvu7.                         i7JvuSdi             ",
    "                           :i7Yvsr                       .77ri7J5KS             ",
    "                          .i:rYjvs7.                   .ivv7r7r7LIb:            ",
    "                          :r7r77vrv7i..              .r7IsrrvYJLvvX7            ",
    "                          ivsr:::::ii7r7rrirrrrr:::.:77Iur7svs1UY7ju            ",
    "                         .i::.::::iiriririiiiirr7751v7KIr72XPdE5svSs            ",
    "                       .:i::.::i:ii777rriiii:i:iiiruXP57irr2gQdUrY27            ",
    "                  ..::i::::...::ii7vrrrrriiiriiiiii:vI5vrisDBDq7r71.            ",
    "                .:::::.:::.....::rvr:rrrrriririiiiii::YJvZQBgS7::Y7             ",
    "               ::.:...........::r77rrii:::iiririi:iii::i2dBdu7r755r             ",
    "              .::::...:i:.::.:i77v77i:.::::ii77riiiiii:::i7vrrrssrr.            ",
    "              :::....vgBBDY.:irr7r7i:.......::rrrriiii:::..:7v7vus7::           ",
    "             .:.    :rPZBBq::i::::::....isv:..:irririi::::..:r71qXvr:.          ",
    "            .::   . ivQBBd:::.:::.::::rqduRBB1iiiiiii:iii:i:::i75qjrr:          ",
    "            .:   ..::rsL...:::...:iYJgBS 5gBBBQLiriiiiiiiiiiii:i717ri:          ",
    "            ..  . :i:.  ....:.::::i7JQBIYQBBBPv:::::::i:::iii:iirrrrr:          ",
    "           ... .       ......:::::ir::7Sj21Yi....:.....::::::iiiirirrr          ",
    "           .. .    .:ii:::..:.::::::i...:::..::::.....i::.:.::::iiriri.         ",
    "          .:...  dBBQREDgEs:.....:::::.::iii:i::......::.:::.::::i:i:ii         ",
    "          ...:. .QBQBBBBBQB5......::::......:::::...........::::::ii:ir.        ",
    "          ....  :qgRRQBBBBBs...:.:::::.........:.:.:.:::.::::::iirri:iii        ",
    "          ......ibQRQDQRQE1i::i::::::.:.:.......::....::::::iii:rrrii:ii:       ",
    "          ....:ivUSDRMDDUYii:i::.::i::.:::::::...:::.::iiiii:i:ir7riiiiii.      ",
    "          .....iu2I1Xu25Xsririiii:i:i:::::::::i:::::iiiii:::::rrrr7irrrii:      ",
    "          ......:PgBBBDPPP7i:::::..:iri::::i:ii::::i::::.::::::rrriir7iii:      ",
    "          .......sggQQBBBBB5v:r7JIPbguri::iii:::::i::...:.::::irrirrririi:.     ",
    "           .......:jPdddEDMBBBMBBBMPJr:::i::::::::::.::::::::irrrrrririiir:     ",
    "           .:......:v1JvYr7LIu7vvrri:::::ii:::::::::::::::iiiirrrrrr777iiii     ",
    "            .....:...iri:i:::::i::.:.::i:i:iii::::.::::::iiir7rrirrv7vrririi    ",
    "             ...:.:......:::::::::iiiirii:i:i:i::.:.::::rirr7rrr7rLvvrririi:.   ",
    "             ::..:.:::.::::::i:iiiiiiiiiii:::::::::::::i:iirrrrvLYvv7rrrrrii.   ",
    "            ..:::.:.::::::::iii:iiiiiiiii:..:.::::iiiiiiiirirrvvYvv7rirrriii:   ",
    "            .::::::::::::::i:iiiiiii:iii::::.::::ii::iiiiiiir7777vriiiii:::i.   ",
    "            .:::::i:::::::::i:iii:r:iiiii:iii:iiri::::::i:rrrrv7vriii:::::::.   ",
    "            ::.:.::::iii:::::::i:iii:iirirr7rriiii:iir:iii:iirii::::::::::::.   ",
    "            :.:.:.::::iirrriiirrrrrrrrrr7r7rri::i:i:i:::iirr7i::::::::::::i..   ",
    "           ....:.::::::iirr7r7r77vvv77rrri:::::i:::i:::i:ii:.:.:::::::::::::.   ",
    "           .....::::::i:iiiirrrirrrirri::::::iriiii:::i::::::.::::::::::::ir.   ",
    "           .   . ......:::::::ii::::...:...:.......:......................:i    ",
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
