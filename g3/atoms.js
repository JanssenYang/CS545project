let cwidth=600, cheight=400;
let ctx;
let everything=[];
// let goldx=50,goldy=300,woodx=150,woody=300,waterx=250,watery=300, firex=350,firey=300,soilx=450,soily=300;
// let goldx=306,goldy=33,woodx=77,woody=207,waterx=166,watery=488, firex=447,firey=488,soilx=534,soily=207;
let goldx=200,goldy=30,woodx=35,woody=155,waterx=100,watery=365, firex=305,firey=365,soilx=365,soily=155;
let canvas1, newscore, size=15, result;
//error in double click on button
let lock = true, tid;
let choices=["gold.jpg", "wood.jpg", "water.jpg","fire.jpg","soil.jpg"];
let compimg = new Image();
let beats=[
    ["TIE: you both threw gold", "You lose a lot: computer threw gold", "You win a little: computer threw gold", "You win a lot: computer threw gold", "You lose a little: computer threw gold"],
    ["You win a lot: computer threw wood", "TIE: you both threw wood","You lose a little: computer threw wood", "You win a little: computer threw wood","You lose a lot: computer threw wood"],
    ["You lose a little: computer threw water", "You win a little: computer threw water", "TIE: you both threw water", "You lose a lot: computer threw water","You win a lot: computer threw water"],
    ["You lose a lot: computer threw fire", "You lose a little: computer threw fire","You win a lot: computer threw fire","TIE: you both threw fire","You win a little: computer threw fire"],
    ["You win a litte: computer threw soil", "You win a lot: computer threw soil","You lose a lot: computer threw soil","You lose a little: computer threw soil","TIE: you both threw soil"]
];
let points=[
    [0,-2,1,2,-1],
    [2,0,-1,1,-2],
    [-1,1,0,-2,2],
    [-2,-1,2,0,1],
    [1,2,-2,-1,0]
];
let Throw=(sx,sy,smargin,swidth,sheight, rectcolor,picture)=>{
    let ima = new Image(); ima.src = picture;
    let obj={
        sx: sx, sy: sy, swidth:swidth, bwidth: swidth+2*smargin, bheight:sheight+2*smargin,
        sheight:sheight, fillstyle: rectcolor,
        draw:function(){
            ctx.strokeStyle="rgb(0,0,0)";
            ctx.strokeRect(this.sx, this.sy, this.bwidth, this.bheight);
            ctx.fillStyle = this.fillstyle;
            // console.log(this);
            ctx.fillRect(this.sx, this.sy, this.bwidth, this.bheight);
            ctx.drawImage(this.img, this.sx+this.smargin, this.sy+this.smargin, this.swidth, this.sheight);
        },
        img:ima, smargin:smargin
    };
    return obj;
}
let choose=(ev)=>{
    if( !lock ) return;
    let compch = Math.floor( Math.random()*5 );
    // compch = 4;
    let compchn = choices[compch];
    compimg.src = compchn;
    let mx, my;
    if( ev.layerX || ev.layerX == 0 ){
        mx=ev.layerX; my = ev.layerY;
    }else if(ev.offsetX|| ev.offsetX==0){
        mx=ev.offsetX; my=ev.offsetY;
    }
    for( let i=0; i<everything.length; i++ ){
        let ch = everything[i];
        //error in double click
        if( mx>ch.sx && mx<ch.sx+ch.bwidth && my>ch.sy && my<ch.sy+ch.bheight && lock ){
            drawall();
            lock=false;
            size=15;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(650,150,250,500);
            tid = setInterval(flyin,10);
            result = beats[compch][i];
            newscore = Number(document.f.score.value);
            newscore += points[compch][i];
            break;
        }
    }
}
let flyin=()=>{
    ctx.drawImage(compimg,700,300,size, size);
    size += 0.5;
    if( size > 80 ){
        clearInterval(tid);
        //font color
        ctx.fillStyle="#8866aa";
        ctx.fillText(result, 650,200,250);
        document.f.score.value = String(newscore);
        //error in double click
        lock = true;
    }
}
// let rockb = Throw(rockbx, rockby, 8, 50, 50,"rgb(250,0,0)", "rock.jpg");
// let paperb = Throw(paperbx,paperby,8,50,50,"rgb(0,200,200)", "paper.jpg");
// let scib = Throw(scissorsbx, scissorsby, 8,50,50,"rgb(0,0,200)","scissors.jpg");
let gold = Throw(goldx, goldy,8,50,50,"#ffffff", "gold.jpg");
let wood = Throw(woodx, woody,8,50,50,"#76EE00", "wood.jpg");
let water = Throw(waterx, watery,8,50,50,"#000000", "water.jpg");
let fire = Throw(firex, firey,8,50,50,"#ff0000", "fire.jpg");
let soil = Throw(soilx, soily,8,50,50,"#CD853F", "soil.jpg");
everything.push(gold);
everything.push(wood);
everything.push(water);
everything.push(fire);
everything.push(soil);
let init=()=>{
    document.f.score.value="0";
    ctx = document.getElementById('canvas').getContext('2d');
    canvas1 = document.getElementById('canvas');
    canvas1.addEventListener('click', choose, false);
    drawall();
    ctx.font= "bold 16pt Georgia";
    ctx.fillStyle = "blue";
}
let drawall=()=>{
    ctx.clearRect(0,0,cwidth, cheight);
    for( let i=0; i<everything.length; i++ ){
        everything[i].draw();
    }
}