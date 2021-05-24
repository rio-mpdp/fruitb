class Player{
  constructor(){
  this.playernumber=0
this.playername=""
this.distance=0
this.score=0
  } 
  getcount(){
    db.ref("playercount").on("value",function(a){
    playercount=a.val()    
    })
      
    }
  updatecount(c){
db.ref("/").update({"playercount":c})

  }
  updatename(){
    db.ref("players/player"+ this.playernumber).update({"name":this.playername})
  }
  updatedistance(){
    db.ref("players/player"+ this.playernumber).update({"distance":this.distance})
  }
  updatescore(){
    db.ref("players/player"+ this.playernumber).update({"score":this.score})
  }
  
}