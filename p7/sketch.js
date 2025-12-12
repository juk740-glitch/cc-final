//baby witch
let witch;
let name;
let bag;
let item;
let playerDirection;

//characters
let empress;
let hangedMan;
let hermit;
let devil;

//sources
let lotus;
let monument;
let pearl;

let source;

//game stuff
let scene = 0;
let walls;
let gamePaused = false;
let itemChosen = false;
let destinyChosen = false;
let locationChosen = false;
let sourceFound = false;

//what's my name? (scene 0)
let input_;
let button_;
let question_;

//choices (scene 6)
let destiny;
let finalLoc;
let submit_;

//restart game
let restartButton;

let babyWitch;
let empressSprite;
let hangedManSprite;
let hermitSprite;
let snake;

let intro; 

let forest1;
let forest2;
let forest3;
let forest4;
let forest5;
let garden1;
let summit;
let lotus1;
let pearl1;
let sun1;

let bookC;
let scepterA;
let locketB;

function preload() {
  intro = loadImage('../p7/pixil-frame-0 (31).png');
  
  babyWitch = loadImage('../p7/baby.png');
  empressSprite = loadImage('../p7/empress.png');
  hangedManSprite = loadImage('../p7/hangedman.png');
  hermitSprite = loadImage('../p7/hermit.png');
  snake = loadImage('../p7/devil.png');
  
  forest1 = loadImage('../p7/bg1.png');
  forest2 = loadImage('../p7/bg2.png');
  garden1 = loadImage('../p7/bg3.png');
  forest3 = loadImage('../p7/bg4.png');
  forest4 = loadImage('../p7/bg5.png');
  forest5 = loadImage('../p7/bg6.png');
  summit = loadImage('../p7/bg7.png');
  
  lotus1 = loadImage('../p7/lotus.png');
  pearl1 = loadImage('../p7/pearl.png');
  sun1 = loadImage('../p7/sun.png');
  
  bookC = loadImage('../p7/book.png');
  scepterA = loadImage('../p7/scepter.png');
  locketB = loadImage('../p7/locket.png');


}

function setup() {
  let c = createCanvas(600, 400);
  c.parent("p5-container"); 
  
  //instantiating objects
  walls = new Walls();
  doors = new Doors();
  
  witch = new Witch();
  bag = new CarrierBag();
  item = new SpecialItem();
  
  empress = new Empress();
  hangedMan = new HangedMan();
  hermit = new Hermit();
  devil = new Devil();
  
  lotus = new Lotus();
  monument = new Monument();
  pearl = new Pearl();
  
  //name input
  button_ = createButton('begin journey');
  button_.parent("p5-container");

  // must be absolute positioned
  button_.style("position", "absolute");
  button_.style('z-index', '10');
  button_.position(375, 300);
  
  button_.mousePressed(() => witch.startGame());
  button_.hide();
  
  //what am i looking for
  destiny = createRadio();
  destiny.parent("p5-container");
  destiny.style("position", "absolute");
  destiny.position(335, 185);

  destiny.option('secrets of the universe');
  destiny.option('manifestation of dreams');
  destiny.option('true love');

  submit_ = createButton('submit');
  submit_.parent("p5-container");
  submit_.style("position", "absolute");
  submit_.position(340, 255);
  
  destiny.elt.querySelectorAll('label').forEach(label => {
    label.style.display = 'block';
  });
  
  destiny.hide();
  submit_.hide();
  
  //add destiny to bag so hermit can determine final location of source
  submit_.mousePressed(() => {
    let choice = destiny.value();
    if (choice) {
      console.log("player chose:", choice);
      destiny.hide();
      submit_.hide();
      destinyChosen = true;

      bag.addItem(choice);
      console.log(bag.content);

      hangedMan.continueDialogue();
    }
  });
  
  //restart game
  restartButton = createButton('restart journey');
  restartButton.parent("p5-container");
  restartButton.style("position", "absolute");
  restartButton.position(width / 2 - 60, height / 2 + 100);
  restartButton.hide();
  
  restartButton.mousePressed(() => restartGame());

}

function draw() {
  background(220);  
  walls.build();
  
  switch(scene) {
    case 0: //gimme name
      imageMode(CENTER);
      image(intro, width/2, height/2);
      
      witch.startScreen();
      break;
    case 1: //going to forest
      console.log('entering forest');
      button_.hide();
      //greeting_.hide();

      doors.build();
      doors.nextScene();
      
      imageMode(CENTER);
      image(forest1, width/2, height/2);
      
      witch.body();
      witch.move();
      
      fill(255, 60, 100);
      text("(" + mouseX + ", " + mouseY + ")", 100, 50);
      
      break;
    case 2: //entering garden
      console.log('entering garden');
      doors.build();
      doors.nextScene();
      
      imageMode(CENTER);
      image(forest2, width/2, height/2);
      
      witch.body();
      witch.move();
      
      fill(255, 60, 100);
      text("(" + mouseX + ", " + mouseY + ")", 100, 50);
      break;
    case 3: //talking to empress
      console.log('empress');
      doors.build();
      doors.nextScene();
      
      imageMode(CENTER);
      image(garden1, width/2, height/2);
      
      empress.body();
      
      witch.body();
      if(!gamePaused) {
        witch.move();
      }
      
      bag.display();
      
      fill(255, 60, 100);
      text("(" + mouseX + ", " + mouseY + ")", 100, 50);
      break;
    case 4: //getting the randomized item
      console.log('getting item');
      doors.build();
      doors.nextScene();
      
      imageMode(CENTER);
      image(forest3, width/2, height/2);
      
      witch.body();
      witch.move();
      devil.body();
      devil.move();
      
      bag.display();
      
      if (!itemChosen) {
        item.setItem();   // choose only once
        itemChosen = true;
      }
      item.display(bag); 
      item.checkCollection(witch, bag);
      
      console.log(item.item);
      console.log(bag.content);
      console.log('escaping devil');
      break;
    case 5: //hanged man
      console.log('hanged man');
      doors.build();
      doors.nextScene();
      
      imageMode(CENTER);
      image(forest4, width/2, height/2);
      
      bag.display();
      item.display(bag); 
      
      witch.body();
      if(!gamePaused) {
        witch.move();
      }
      
      hangedMan.body();
      if(hangedMan.currentLine == 3) {
        fill(255);
        rect(330, 180, 200, 105);
      } else {
        erase();
      }
      
      break;
    case 6: //otw to summit
      console.log('heading to summit');
      doors.build();
      doors.nextScene();
      
      imageMode(CENTER);
      image(forest5, width/2, height/2);
      
      bag.display();
      item.display(bag); 
      
      witch.body();
      witch.move();
      
      
      fill(255, 60, 100);
      text("(" + mouseX + ", " + mouseY + ")", 100, 50);
      break;
    case 7: //hermit
      console.log('hermit');
      doors.build();
      doors.nextScene();
      
      imageMode(CENTER);
      image(summit, width/2, height/2);
      
      bag.display();
      item.display(bag);
      
      hermit.body();
      
      witch.body();
      if(!gamePaused) {
        witch.move();
      }
            
      fill(255, 60, 100);
      text("(" + mouseX + ", " + mouseY + ")", 100, 50);
      break;
    case 8: //otw to wherever
      console.log('otw to location');
      doors.build();
      doors.nextScene();
      
      imageMode(CENTER);
      image(forest5, width/2, height/2);
      
      bag.display();
      item.display(bag); 
      
      witch.body();
      witch.move();
      
      
      fill(255, 60, 100);
      text("(" + mouseX + ", " + mouseY + ")", 100, 50);
      break;
    case 9: //i found the source
      console.log('the source');
      bag.display();
      item.display(bag);
      
      witch.body();
      if(!gamePaused) {
        witch.move();
      }
      
      source = bag.content[1]
      if (source == "true love") {
        imageMode(CENTER);
        image(lotus1, width/2, height/2);
        lotus.display();
        if (lotus.finished) restartButton.show();
      } else if (source == "manifestation of dreams") {
        imageMode(CENTER);
        image(sun1, width/2, height/2);
        monument.display();
        if (monument.finished) restartButton.show();
      } else if (source == "secrets of the universe") {
        imageMode(CENTER);
        image(pearl1, width/2, height/2);
        pearl.display();
        if (pearl.finished) restartButton.show();
      }
      
      
      fill(255, 60, 100);
      text("(" + mouseX + ", " + mouseY + ")", 100, 50);
      break;
  } 
}

function restartGame() {
  //reset variables
  scene = 0;
  textAlign(LEFT);
  gamePaused = false;
  itemChosen = false;
  destinyChosen = false;
  locationChosen = false;
  sourceFound = false;

  //reset bag & player
  bag = new CarrierBag();
  witch = new Witch();

  //hide restart button
  restartButton.hide();

  //reset characters
  empress = new Empress();
  hangedMan = new HangedMan();
  hermit = new Hermit();
  lotus = new Lotus();
  monument = new Monument();
  pearl = new Pearl();
  
  //select new item
  item = new SpecialItem();
  item.setItem();

  //reset name form
  input_.show();
  button_.show();
  //greeting_.show();
}
