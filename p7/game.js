class Empress {
  constructor() {
    this.x = 303;
    this.y = 180;
    this.w = 50;
    this.h = 50;
    this.size = 175;
    this.dialogue = ["welcome to the forest my darling",
                   "here is a basket for your journey", 
                   "fill it with all you find and desire"]
    this.currentLine = 0;
    this.showMessage = false;
    this.finished = false;
  }
  
  body() {  
    //fill('yellow');
    imageMode(CENTER);
    image(empressSprite, this.x, this.y, this.size, this.size);
    
    let d = int(dist(this.x, this.y + 30, witch.x, witch.y));
    if (d < 30 && !this.showMessage && !this.finished) {
      this.showMessage = true;
      gamePaused = true;
    }
    
    if(this.showMessage) {
      this.message();
    }
  }
  
  message() {
    fill(255);
    text(this.dialogue[this.currentLine], 330, 140);
  }
  
  nextLine() {
    if(this.showMessage) {
      this.currentLine++;
    
      // if past the last line hide message and reset
      if (this.currentLine >= this.dialogue.length) {
        this.currentLine = 0;
        
        this.showMessage = false;
        this.finished = true;
        
        gamePaused = false;
        bag.showInventory();
      }
    }
  }
}

class HangedMan {
  constructor() {
    this.x = width/2;
    this.y = 175;
    this.w = 40;
    this.h = 40;
    this.size = 200;
    this.dialogue = ["you have met with fate\n and escaped from temptation",
                   "little witch,\nyou still have a journey ahead of you",
                   "before you go further,\npause and take a look with me",
                     "what is is that you are truly looking for?",
                    "trust your intuition and\naccept your choice with peace",
                    "you will find your ultimate answer \nso long as you continue"]
    this.currentLine = 0;
    this.showMessage = false;
    this.finished = false;
  }
  
  body() {  
    //fill('red');
    imageMode(CENTER);
    image(hangedManSprite, this.x, this.y, this.size, this.size);
    
    let d = int(dist(this.x, this.y + 70, witch.x, witch.y));
    if (d < 30 && !this.showMessage && !this.finished) {
      this.showMessage = true;
      gamePaused = true;
    }
    
    if(this.showMessage) {
      this.message();
    }
  }
  
  message() {
    fill(255);
    text(this.dialogue[this.currentLine], 330, 175);
  }
  
  nextLine() {
    if(this.showMessage) {
      this.currentLine++;
    
      if (this.currentLine == 3) {
        destiny.show();
        submit_.show();
      } else if (this.currentLine >= this.dialogue.length) {
        this.currentLine = 0;
        erase();
        this.showMessage = false;
        this.finished = true;

        gamePaused = false;
      }
    }
  }
  
  continueDialogue() {
    destiny.hide();
    submit_.hide();
    
    this.currentLine++; 
  }
  
}

class Hermit {
  constructor() {
    this.x = width/2 + 10;
    this.y = 150;
    this.w = 40;
    this.h = 40;
    this.dialogue = ["you have come far, \nand have almost completed your journey",
                    "little witch, i know \nyou have the answers",
                    "i am merely here to act as your guide",
                    "from all that you have gathered \nand searched for"];
    this.currentLine = 0;
    this.showMessage = false;
    this.finished = false;
    this.addedMessage = false;
  }
  
  body() {  
    imageMode(CENTER);
    image(hermitSprite, this.x, this.y, 175, 175);
    
    let d = int(dist(this.x, this.y + 30, witch.x, witch.y));
    if (d < 30 && !this.showMessage && !this.finished) {
      this.showMessage = true;
      gamePaused = true;
    }
    
    if(this.showMessage) {
      this.message();
    }
  }
  
  message() {
    fill(0);
    text(this.dialogue[this.currentLine], 335, 100);
  }
  
   nextLine() {
    if (this.showMessage) {
      this.currentLine++;

      // when reaching the end, add the fate line
      if (this.currentLine === this.dialogue.length && !this.addedMssage) {
        let finalMessage = pickLocation();
        this.dialogue.push(finalMessage);
        this.addedMssage = true;
      } 
      // unpause the game
      else if (this.currentLine >= this.dialogue.length) {
        this.showMessage = false;
        this.finished = true;
        gamePaused = false;
      }
    }
  }
}


class Devil { 
  constructor() { 
    this.w = 20; 
    this.h = 10; 
    this.startX = width/2;
    this.startY = random(100, 350);
    this.speed = 3;
  }

  body() {
    imageMode(CENTER);
    image(snake, this.startX, this.startY, 100, 100);

    let d = int(dist(this.startX, this.startY, witch.x, witch.y));
    if (d < 30) {
      // send player back to starting location
      restartGame();
      scene = 1;
      witch.x = width / 2;
      witch.y = height - 15;
    }
  }

  move() {
    this.startX = this.startX + this.speed
    
    if(this.startX > width-15 || this.startX < 15){
      this.speed = -this.speed;
    } 
  }

}

class Walls { // a class for keeping placer inside sketch canvas
  constructor(c) { 
    this.top = 0;
    this.btm = 400;
    this.left = 0;
    this.right = 600;
  }
  
  build() {
    if (witch.x <= 0) {
      witch.x += 10;
    } else if (witch.x >= 600) {
      witch.x -= 10;
    } else if (witch.y <= 0) {
      witch.y += 10;
    } else if (witch.y >= 400) {
      witch.y -= 10;
    }
  }
}


class Doors {
  constructor(c) {
    //307, 130
  }
  
  build() {
    push();
    fill(0,255,0)
    rect(width/2, 15, 35, 35);
    pop();
  }

  nextScene() {
    if(scene == 1) {
      if (witch.x + witch.w / 2 > 307 - 30 
        && witch.x < 307 - 20 + 30 
        && witch.y + witch.h / 2 > 130 
        && witch.y < 130 + 30) {
        console.log("next scene");
        witch.x = width / 2;
        witch.y = height - 15;
        scene++;
      }
    } else if(scene == 2) {
        if (witch.x + witch.w / 2 > 307 - 30 
        && witch.x < 307 - 20 + 30 
        && witch.y + witch.h / 2 > 46 
        && witch.y < 46 + 30) {
          console.log("next scene");
          witch.x = width / 2;
          witch.y = height - 15;
          scene++;
        }
    } else if(scene == 3) {
      if (witch.x + witch.w / 2 > 307 - 30 
        && witch.x < 307 - 20 + 30 
        && witch.y + witch.h / 2 > 40 
        && witch.y < 40 + 30 && empress.finished) {
          console.log("next scene");
          witch.x = width / 2;
          witch.y = height - 15;
          scene++;
      }
    } else if(scene == 4) {
      if (witch.x + witch.w / 2 > 307 - 30 
        && witch.x < 307 - 20 + 30 
        && witch.y + witch.h / 2 > 46 
        && witch.y < 46 + 30
        && item.collected) {
          console.log("next scene");
          witch.x = width / 2;
          witch.y = height - 15;
          scene++;
      }
    } else if(scene == 5) {
      if (witch.x + witch.w / 2 > 307 - 30 
        && witch.x < 307 - 20 + 30 
        && witch.y + witch.h / 2 > 46 
        && witch.y < 46 + 30 && hangedMan.finished) {
          console.log("next scene");
          witch.x = width / 2;
          witch.y = height - 15;
          scene++;
      }
    } else if(scene == 6) {
      if (witch.x + witch.w / 2 > 440 - 30 
        && witch.x < 440 - 20 + 30 
        && witch.y + witch.h / 2 > 0 
        && witch.y < 30) {
          console.log("next scene");
          witch.x = width / 2;
          witch.y = height - 15;
          scene++;
      }
    } else if(scene == 7) {
      if (witch.y > 370 && hermit.finished) {
          console.log("next scene");
          witch.x = width / 2;
          witch.y = 30;
          scene++;
      }
    } else if(scene == 8) {
      if (witch.x + witch.w / 2 > 290 - 30 
        && witch.x < 290 - 20 + 30 
        && witch.y + witch.h / 2 > 400 
        && witch.y > 400 - 30) {
          console.log("next scene");
          witch.x = width / 2;
          witch.y = 30;
          scene++;
      }
    }
  }
//     if(scene == 1) {
//       if (witch.x + witch.w / 2 > 307 - 30 
//         && witch.x < 307 - 20 + 30 
//         && witch.y + witch.h / 2 > 130 
//         && witch.y < 130 + 30) {
//         console.log("next scene");
//         witch.x = width / 2;
//         witch.y = height - 15;
//         scene++;
//     } else {
//       if(scene == 3) {
//       if (witch.x + witch.w / 2 > width / 2 - 30 
//         && witch.x < width / 2 - 20 + 30 
//         && witch.y + witch.h / 2 > 0 
//         && witch.y < 0 + 30 && bag.visible) {
//         console.log("next scene");
//         witch.x = width / 2;
//         witch.y = height - 15;
//         scene++;
//       }
//     } else {
//       if (witch.x + witch.w / 2 > 307 - 30 
//         && witch.x < 307 - 20 + 30 
//         && witch.y + witch.h / 2 > 130 
//         && witch.y < 130 + 30) {
//         console.log("next scene");
//         witch.x = width / 2;
//         witch.y = height - 15;
//         scene++;
//       }
//     }
}

function keyPressed() {
  // Advance dialogue with left arrow key
  if (keyCode === RIGHT_ARROW && (empress.showMessage ||
                                  hangedMan.showMessage || 
                                  hermit.showMessage ||
                                 lotus.showMessage ||
                                 monument.showMessage ||
                                 pearl.showMessage)) {
    empress.nextLine();
    hangedMan.nextLine();
    hermit.nextLine();
    lotus.nextLine();
    monument.nextLine();
    pearl.nextLine();
  }
}

function pickLocation() {
  let fate = bag.content[1];
  let finalMessage;
  
  if(fate === "secrets of the universe") {
    finalMessage = "go to the river, \nand see what is in the pools"
  } else if(fate === "manifestation of dreams") {
    finalMessage = "continue onwards to the summit, \ndo not fear the heights"
  } else if(fate === "true love") {
    finalMessage = "return to the garden, \nthe Empress' realm"
  }
  
  return finalMessage;
}
