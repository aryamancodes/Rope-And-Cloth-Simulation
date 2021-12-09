function Controllers(){
  this.createControllers = function(w,h){
    //colour scheme 
    let grayButton = ({
          fillBg: color("gray"), 
          fillBgHover: color("gray"),
          fillBgActive: color("gray")
        }),
        grayToggle = ({
          fillBgOff: color("gray"),
          fillBgOffHover:color("gray"),
          fillBgOffActive:color("gray"),
          fillBgOn:color("gray"),
          fillBgOnHover:color("gray"),
          fillBgOnActive:color("gray")
        }),
        whiteButton = ({
          fillBg: color("#e6f5ff"), 
          fillBgHover: color("#e6f5ff"),
          fillBgActive: color("#e6f5ff")
        });

    //play
    playButton = createToggle("Pause\n[SPACE]", w*0.05, h*0.03, w*0.165, h*0.05);
    playButton.labelOff = "Play!\n[SPACE]";
    playButton.setStyle("textSize", 10)
    playButton.mode = "onRelease";
    playButton.val = play;
    //clear
    clearButton = createButton("Clear\n[C]", w*0.05, h*0.095, w*0.165, h*0.05);
    clearButton.setStyle("fillBg", color("red"));
    clearButton.setStyle("fillBgHover", color("red"));
    clearButton.setStyle("textSize", 10);
    clearButton.mode = "onRelease";
    //dark
    darkButton = createToggle("Light Mode\n[D]", w*0.05, h*0.16, w*0.165, h*0.05);
    darkButton.labelOff = "Dark Mode\n[D]"
    darkButton.setStyle("textSize", 10);
    darkButton.mode = "onRelease";
    darkButton.val = darkMode;
    //info boxes
    infoBox1 = createButton("Controls:", w*0.05, h*0.23, w*0.165, h*0.05);
    infoBox1.setStyle(grayButton);
    infoBox1.setStyle("textSize", 12);

    infoBox2 = createButton("Right Click\nDelete Point", w*0.05, h*0.28, w*0.165, h*0.05);
    infoBox2.setStyle(grayButton);
    infoBox2.setStyle("textSize", 10);

    infoBox3 = createButton("[SHIFT]+Click:\nLock Point", w*0.05, h*0.33, w*0.165, h*0.05);
    infoBox3.setStyle(grayButton);
    infoBox3.setStyle("textSize",10);

    infoBox4 = createButton("[Z]+Click:\nObstacle Point", w*0.05, h*0.38, w*0.165, h*0.05);
    infoBox4.setStyle(grayButton);
    infoBox4.setStyle("textSize",10);

    infoBox5 = createToggle("Drag Mouse:\nMove Points", w*0.05, h*0.43, w*0.165, h*0.05);
    infoBox5.labelOff = "Click Canvas:\n New Point";
    infoBox5.setStyle(grayToggle);
    infoBox5.setStyle("textSize",10);

    infoBox6 = createButton("Click Points:\nConnect", w*0.05, h*0.48, w*0.165, h*0.05);
    infoBox6.setStyle(grayButton);
    infoBox6.setStyle("textSize",10);
    infoBox6.visible = !play;

    
    
    //wind controllers
    windButton = createButton("Wind\n(click:reset)", w*0.05, h*0.55, w*0.165, h*0.05);
    windButton.setStyle("textSize", 10);
    windButton.mode = "onRelease";
    windSlider = createSlider2d("Wind", w*0.05, h*0.60, w*0.165, h*0.20);

    //cloth controllers
    clothButton = createToggle("Cloth", w*0.05, h*0.82, w*0.165, h*0.05);
    clothButton.labelOn = "Create!";
    clothButton.setStyle("fillBgOn", color("#52f04d"));
    clothButton.setStyle("fillBgOnHover", color("#289e59"));
    clothButton.setStyle("textSize", 15);
    clothButton.mode = "onRelease";

    clothRowSlider = createSlider("rows", w*0.05, h*0.87, w*0.150, h*0.05, 2, 9);
    clothRowSlider.isInteger = true;
    clothRowSlider.val = 5;
    rowCount = createButton("R", w*0.2, h*0.87, w*0.02, h*0.05);
    rowCount.setStyle(whiteButton);

    clothColSlider = createSlider("columns", w*0.05, h*0.92, w*0.150, h*0.05, 2, 9);
    clothColSlider.isInteger = true;
    clothColSlider.val = 5;
    colCount = createButton("C", w*0.2, h*0.92, w*0.02, h*0.05);
    colCount.setStyle(whiteButton);

    clothRowSlider.visible = false;
    clothColSlider.visible = false;
    rowCount.visible = false;
    colCount.visible = false;
  }
  this.handleControllers = function(buttonName=null){
    drawGui();
    if(playButton.isReleased || buttonName=="playButton"){
    drawLineFrom = null;
    play = !play;
    playButton.val = play;
    infoBox5.val = play;
    infoBox6.visible = !infoBox6.visible;
    }
    if(clearButton.isReleased || buttonName =="clearButton"){
      resetCanvas();
    }
    if(darkButton.isReleased || buttonName =="darkButton"){
      darkMode = !darkMode;
      darkButton.val = darkMode;
      setup();
      let seafoam = color("#7fe4be");
      darkButton.setStyle("fillBgOn", seafoam)
    }
    if(windButton.isReleased){
      windSlider.valX = 0;
      windSlider.valY = 0;
      WIND = createVector(0,0);
    }
    if(windSlider.isChanged){
        WIND = createVector(windSlider.val.x, windSlider.val.y);
    }
    if(clothButton.isReleased){
      clothRowSlider.visible = clothButton.val;
      rowCount.visible = clothButton.val;
      clothColSlider.visible = clothButton.val;
      colCount.visible = clothButton.val;
      if(!clothButton.val){
        clear();
        points = [];
        obstacles = [];
        springs = [];
        drawLineFrom = null;
        createCloth(clothRowSlider.val, clothColSlider.val);
      }
    }
    if(clothRowSlider.isChanged){
      rowCount.label = clothRowSlider.val;
    }
    if(clothColSlider.isChanged){
      colCount.label = clothColSlider.val;
    }
  }
}

