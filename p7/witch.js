class Witch {
  constructor() {
    this.x = width / 2;
    this.y = height - 15;
    this.w = 30;
    this.h = 30;
    this.speed = 4;
  }

  body() {
    //fill('purple');
    imageMode(CENTER);
    image(babyWitch, this.x, this.y, 200, 200);
  }
  
  startScreen() {
    button_.show();
    
    imageMode(CENTER);
    image(babyWitch, 300, 200, 200, 200);  
  }
  
  startGame() {
    scene = 1; // move to next scene
  }

  move() {
    if (keyIsDown(37)) { // move player left if left arrow key is pressed
        this.x -= this.speed;
        playerDirection = "left";
        //console.log("X: " + this.x + " Y: " + this.y);
    }
    if (keyIsDown(38)) { // move player up if up arrow key is pressed
      this.y -= this.speed;
      playerDirection = "up";
      //console.log("X: " + this.x + " Y: " + this.y);
    }
    if (keyIsDown(39)) { // move player right if left right key is pressed
      this.x += this.speed;
      playerDirection = "right";
      //console.log("X: " + this.x + " Y: " + this.y);
    }
    if (keyIsDown(40)) { // move player down if left down key is pressed
      this.y += this.speed;
      playerDirection = "down";
      //console.log("X: " + this.x + " Y: " + this.y);
    }
  }
}

class CarrierBag {
  constructor() {
    this.content = [];
    this.visible = false;
    this.x = 50;
    this.y = height-40
  }
  
  showInventory() {
    this.visible = true;
  }
  
  display() {
    if(this.visible) {
      push();
      stroke(0);
      fill(255);
      rectMode(CENTER);
      rect(this.x, this.y, 60, 60);
      pop();
    }
  }
  
  addItem(item) {
    this.content.push(item);
  }
  
}

class SpecialItem {
  constructor() {
    this.choices = ["book of alchemy", "scepter", "locket"];
    this.item = "";
    this.x = 200;
    this.y = 100;
    this.collected = false;
  }
  
  setItem() {
    this.item = random(this.choices);
  }

  display(bag) {
    if (!this.collected) {
      push();
      fill(255);
      if(this.item === "book of alchemy") {
        imageMode(CENTER);
        image(bookC, this.x - 10, this.y, 100, 100);
      } else if(this.item === "scepter") {
        imageMode(CENTER);
        image(scepterA, this.x, this.y, 100, 100);
      } else if(this.item === "locket") {
        imageMode(CENTER);
        image(locketB, this.x, this.y, 100, 100);
      }
      pop();
    } else {
      push();
      fill(255);
      if(this.item === "book of alchemy") {
        imageMode(CENTER);
        image(bookC, bag.x + 10, bag.y + 10, 100, 100);
      } else if(this.item === "scepter") {
        imageMode(CENTER);
        image(scepterA, bag.x, bag.y, 100, 100);
      } else if(this.item === "locket") {
        imageMode(CENTER);
        image(locketB, bag.x, bag.y, 100, 100);
      }
      pop();
    }
  }
  
  checkCollection(witch, bag) {
    if (!this.collected) {
      let d = dist(this.x, this.y, witch.x, witch.y);
      if (d < 30) { 
        this.collected = true;
        bag.addItem(this.item);
      }
    }
  }
  
}
