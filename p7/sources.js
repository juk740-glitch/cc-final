class Lotus {
  constructor() {
    this.x = width/2;
    this.y = 150;
    this.w = 40;
    this.h = 40;
    this.dialogue = ["hidden away in the lotus flower",
                    "is the light of love and transformation,",
                    "lead with love and devotion",
                    "and the path will be clear"];
    this.currentLine = 0;
    this.showMessage = false;
    this.finished = false;
  }
  
  display() {
    if (scene == 9) {
      this.showMessage = true;
      gamePaused = true;
    }
    
    if(this.showMessage) {
      this.message();
    }
  }
  
  message() {
    fill(255);
    textAlign(CENTER);
    text(this.dialogue[this.currentLine], 310, 100);
  }
  
  nextLine() {
    if(this.showMessage) {
      this.currentLine++;
    
      // if past the last line, hide the message and reset
      if (this.currentLine >= this.dialogue.length) {
        this.currentLine = 0;
        
        this.showMessage = false;
        this.finished = true;
        
        gamePaused = false;
      }
    }
  }
}

class Pearl {
  constructor() {
    this.x = width/2;
    this.y = 150;
    this.w = 40;
    this.h = 40;
    this.dialogue = ["deep in the river, buried in the sand",
                    "your source lies hidden as a pearl, tucked away",
                    "made with time and wisdom",
                    "as does your life unfold"];
    this.currentLine = 0;
    this.showMessage = false;
    this.finished = false;
  }
  
  display() {
    if (scene == 9)  {
      this.showMessage = true;
      gamePaused = true;
    }
    
    if(this.showMessage) {
      this.message();
    }
  }
  
  message() {
    fill(255);
    textAlign(CENTER);
    text(this.dialogue[this.currentLine], 280, 145);
  }
  
  nextLine() {
    if(this.showMessage) {
      this.currentLine++;
    
      // if past the last line, hide the message and reset
      if (this.currentLine >= this.dialogue.length) {
        this.currentLine = 0;
        
        this.showMessage = false;
        this.finished = true;
        
        gamePaused = false;
      }
    }
  }
}

class Monument {
  constructor() {
    this.x = width/2;
    this.y = 150;
    this.w = 40;
    this.h = 40;
    this.dialogue = ["you have reached the summit",
                    "a great feat indeed, you approach life",
                    "with a fire, your source becoming ignited",
                    "with the creative power of the sun"];
    this.currentLine = 0;
    this.showMessage = false;
    this.finished = false;
  }
  
  display() {
    if (scene == 9) {
      this.showMessage = true;
      gamePaused = true;
    }
    
    if(this.showMessage) {
      this.message();
    }
  }
  
  message() {
    fill(255);
    textAlign(CENTER);
    text(this.dialogue[this.currentLine], 300, 250);
  }
  
  nextLine() {
    if(this.showMessage) {
      this.currentLine++;
    
      // if past the last line, hide the message and reset
      if (this.currentLine >= this.dialogue.length) {
        this.currentLine = 0;
        
        this.showMessage = false;
        this.finished = true;
        
        gamePaused = false;
      }
    }
  }
}