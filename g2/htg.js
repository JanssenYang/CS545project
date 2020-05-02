let cwidth=600, cheight=400;
let ctx;
let everything=[];
let rockbx=50, rockby=300, paperbx=150, paperby=300,scissorsbx=250, scissorsby=300;
let canvas1, newscore, size=15, result;
//error in double click on button
let lock = true, tid;
let choices=["rock.jpg", "paper.jpg", "scissors.jpg"];
let compimg = new Image();
let beats=[
    ["TIE: you both threw hunter", "You win: computer threw hunter", "You lose: computer threw hunter"],
    ["You lose: computer threw tiger", "TIE: you both threw tiger", "You win: computer threw tiger"],
    ["You win: computer threw gun", "You lose: computer threw gun","TIE: you both threw gun"]
    ];
let points=[[0,1,-1],[-1,0,1],[1,-1,0]];
let Throw=(sx,sy,smargin,swidth,sheight, rectcolor,picture)=>{
    let ima = new Image(); ima.src = picture;
    let obj={
        sx: sx, sy: sy, swidth:swidth, bwidth: swidth+2*smargin, bheight:sheight+2*smargin,
        sheight:sheight, fillstyle: rectcolor,
        draw:function(){
            ctx.strokeStyle="rgb(0,0,0)";
            ctx.strokeRect(this.sx, this.sy, this.bwidth, this.bheight);
            ctx.fillStyle = this.fillstyle;
            ctx.fillRect(this.sx, this.sy, this.bwidth, this.bheight);
            ctx.drawImage(this.img, this.sx+this.smargin, this.sy+this.smargin, this.swidth, this.sheight);
        },
        img:ima, smargin:smargin
    };
    return obj;
}
let choose=(ev)=>{
    let compch = Math.floor( Math.random()*3 );
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
            tid = setInterval(flyin,100);
            result = beats[compch][i];
            newscore = Number(document.f.score.value);
            newscore += points[compch][i];
            break;
        }
    }
}
let flyin=()=>{
    ctx.drawImage(compimg,70,100,size, size);
    size += 5;
    if( size > 50 ){
        clearInterval(tid);
        ctx.fillText(result, 200,100,250);
        document.f.score.value = String(newscore);
        //error in double click
        lock = true;
    }
}
let rockb = Throw(rockbx, rockby, 8, 50, 50,"rgb(250,0,0)", "rock.jpg");
let paperb = Throw(paperbx,paperby,8,50,50,"rgb(0,200,200)", "paper.jpg");
let scib = Throw(scissorsbx, scissorsby, 8,50,50,"rgb(0,0,200)","scissors.jpg");
everything.push(rockb);
everything.push(paperb);
everything.push(scib);
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