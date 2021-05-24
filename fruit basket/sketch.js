var db,gamestate=0,playercount,game,form,player,label,greeting,textfield,button,gs=0,playerinfo
var c1,c2,c3,c4,b,p1,p2,p=[],bg
var fruits;
var fruitGroup;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;

function preload(){
 c1=loadImage("basket.png")  
 c2=loadImage("basket.png")  
  b=loadImage("q.jpg")   
bg=loadImage("bg1.jpg")
player_img = loadImage("images/basket2.png");
fruit1_img = loadImage("images/apple2.png");
fruit2_img = loadImage("images/banana2.png");
fruit3_img = loadImage("images/melon2.png");
fruit4_img = loadImage("images/orange2.png");
fruit5_img = loadImage("images/pineapple2.png");
fruitGroup = new Group();
}
function setup(){
createCanvas(1000,600)
db=firebase.database()
label=createElement("h1")
label.html("Fruit Basket")
label.position(400,150)
textfield=createInput("enter name")
textfield.position(400,250)
textfield.hide()
button=createButton(" press to start  ")
button.position(430,300)
button.hide()
button1=createButton("Reset")
button1.position(900,500)
button1.hide()
greeting=createElement("h1")
greeting.position(350,height/2)
greeting.hide()
db.ref("gamestate").on("value",readgs)
db.ref("playercount").on("value",readpc)

p1=createSprite(350,500)
p1.addImage(c1)
p1.scale=0.5
p2=createSprite(650,500)
p2.addImage(c2)
p2.scale=0.5
p=[p1,p2]
}
function draw(){
background(220)

 if(gamestate==0){
if(playercount==2){

writegs(1)
}
image(bg,0,0,width,height)
 textfield.show()  
 button.show() 
 button.mousePressed(function(){
  textfield.hide()   
  button.hide()
  var name=textfield.value()
  playercount+=1
writepc()
player= new Player()
player.playernumber=playercount
player.playername=name
player.updatename()
player.updatedistance()

greeting.show()
greeting.html("Welcome"+player.playernumber +":" + name)
gs=1
 }) 
 if(gs==1){
   textfield.hide()
   button.hide()
 }
 }
 else if(gamestate==1){
  button1.mousePressed(function(){
writegs(0)
/*var pir=db.ref("players")
pir.remove()*/
db.ref("/").update({gamestate:0,playercount:0,players:{player1:{name:"",distance:0},player2:{name:"",distance:0}}})


  })
  if (frameCount % 20 === 0) {
    fruits = createSprite(random(100, 1000), 0, 100, 100);
    fruits.velocityY = 6;
    var rand = Math.round(random(1,5));
    switch(rand){
        case 1: fruits.addImage("fruit1",fruit1_img);
        break;
        case 2: fruits.addImage("fruit1", fruit2_img);
        break;
        case 3: fruits.addImage("fruit1", fruit3_img);
        break;
        case 4: fruits.addImage("fruit1", fruit4_img);
        break;
        case 5: fruits.addImage("fruit1", fruit5_img);
        break;
    }
    fruitGroup.add(fruits);
   /* if (player.index !== null) {
      for (var i = 0; i < fruitGroup.length; i++) {
          if (fruitGroup.get(i).isTouching(p)) {
              fruitGroup.get(i).destroy();
           player.score=player.score+=1
            player.updatescore() 
          }
          
      }
    }*/
    
}
     label.hide()
     greeting.hide()
     button1.show()
    image(b,0,0,1000,600)
     
     drawSprites()
     db.ref("players").on("value",function(d){
     playerinfo=d.val()  
     })
    
     var index =0;
     if(player!=undefined){
     var index=0
     for(var plr in playerinfo) {
      index+=1
      console.log(index-1,p)
   p[index-1].overlap(fruitGroup,callback)
      textSize(20)
      p[index-1].x=playerinfo[plr].distance
      fill("black")
      text(playerinfo[plr].name.slice(0,7),p[index-1].x-25,p[index-1].y+25)
      textSize(30)
      fill("white")
      stroke("white")
      strokeWeight(3)
      if(index==1)
      text(playerinfo[plr].score,50,50)
else
text(playerinfo[plr].score,width-50,50)
     }
     }
  
     if(keyDown("left")&&player.playercount!=0){
    player.distance-=50
    player.updatedistance()
     }
     if(keyDown("right")&&player.playercount!=0){
      player.distance+=50
      player.updatedistance()
       }
   
}
fill(255)
textSize(30)
text(mouseX+","+mouseY,mouseX,mouseY)
}
function readgs (d) {
gamestate=d.val()    
}
function readpc(a){
    playercount=a.val()
}
function readsc(c){
 score=c.val()
}
function writeps (){
  db.ref("/").update({score:score}) 
}
function writepc (){
  db.ref("/").update({"playercount":playercount}) 
}
 function writegs(g){
db.ref("/").update({gamestate:g})
 }
 function callback(s1,s2){
   s2.remove()
   player.score=player.score+=1
   player.updatescore() 
 }
  
 