const canvas = document.getElementById("jscanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jscolor");
const range = document.getElementById("jsrange");
const mode = document.getElementById("jsmode");
const save = document.getElementById("jssave");

const basic = 'black';
const CanvaswSize = 700;
const CanvashSize = 450;

canvas.width =  CanvaswSize;  //canvas내의 픽셀 범위를 지정해 줘야 픽셀로 그리기 가능
canvas.height =  CanvashSize;

ctx.fillStyle = "white";
ctx.fillRect(0,0, CanvaswSize,  CanvashSize);
//context(ctx)는 canvas 내의 픽셀을 뜻함
ctx.strokeStyle= basic; //처음색 검정
ctx.fillStyle = basic;
ctx.lineWidth = 1.5; //선 굵기

let painting = false;
let filling = false;

function onmousemove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;
    let backx = x;
    let backy = y;

    if(!painting){
        ctx.beginPath(); //선을 그릴때 사용하는 함수
        ctx.moveTo(x,y); //그리기 시작하는 선
    } 
        //만약 1---2 1과 2라는 좌표 사이에 있는 직선을 그린다 하면
        //시작 좌표를 1로 잡고(move) 끝 좌표를 2를 잡는다(to)
        //그러나 캔버스처럼 길이를 알 수 없는 선을 그리는 경우 
        //시작점과 끝점이 계속 변하므로 둘 다 x,y로 설정해준것이다.
        //canvas 직선의 원리 1---2----3  123은 보이지 않지만 픽셀마다 좌표가 존재한다.
      
    else{
        if(filling === false){  
        ctx.lineTo(x,y); // 그림의 끝이 되는 선 
        ctx.stroke(); //헌재까지 설정된 그림을 그리는 함수
        }
    }
}

function stoppainting()
{
    painting = false;
}

function startpainting()
{
    painting = true;
}

function changecolor(event)
{
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle= color;
    ctx.fillStyle = color;
}

function rangechange(event)
{
    const width = event.target.value;
    ctx.lineWidth = width;
}

function changemode()
{
    if(filling === true)
    {
        filling = false;
        mode.innerText = "Fill";
    }else
    {
        filling = true;
        mode.innerText = "Paint";
    }
}

function canvasclick()
{
    if(filling){
        ctx.fillRect(0,0, CanvaswSize,  CanvashSize);
    }
}

function rightclick(event)
{
     event.preventDefault();
}

function saveimage()
{
    const image = canvas.toDataURL(/*"image/jpeg" //png를 원하면 걍 비워두면됨(주석은 jpg)*/);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintImage🖌";
    link.click();
}

function button() {
    location.reload();
}

if(canvas || backl){
    canvas.addEventListener("mousemove", onmousemove);
    canvas.addEventListener("mousedown", startpainting);
    canvas.addEventListener("mouseleave", stoppainting);
    canvas.addEventListener("mouseup", stoppainting);
    canvas.addEventListener("click", canvasclick);
    canvas.addEventListener("contextmenu", rightclick);
}

Array.from(colors).forEach(color => color.addEventListener("click", changecolor));
//array.from(colors)는 각 색들(jscolor)에 관한 div들을 배열로 만들어주며
//(즉 검정~보라 까지의 모든 색들이 각각의 배열이 생기도록 함)

//foreach를 사용해 각각의 요소들을 돌리며 arrow함수를 이용하여(=>)
//색들을 클릭시 changecolor함수를 발생시키도록 한다.
//arrow함수는 function(color){color.addEventListener("click", changecolor)}와 같다.
//여기서 color는 array안에 있는 각각의 아이템들을 대표하는 것으로써 이름이 바뀌어도 상관 없다.

if(range){
    range.addEventListener("input", rangechange);
}

if(mode){
    mode.addEventListener("click", changemode);
}

if(save){
    save.addEventListener("click", saveimage); 
}