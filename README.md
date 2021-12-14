# 🎮 Rope And Cloth Simulation #
***The simulation can be found [hosted on this link!](https://ropeandclothsim.netlify.app)***

More information about the controls can be found here: [CONTROLS](#controls)

Create your own rope or cloth-like objects and simulate collisions against obstacles, movement in the (user-controlled!) wind and even rope tears. Play around, experiment and try not to break physics! <br>
![Demo Gif](/assets/rope-sim-demo.gif) <br>
This interactive simulation uses the principles of *[Verlet Integration](https://www.algorithm-archive.org/contents/verlet_integration/verlet_integration.html)* to realistically model rope mechanics and is made using the ```p5.js``` library. 




*⚠️ Currently, touch controls aren't supported so a mouse/trackpad is needed to use the simulation ⚠️*

# Controls 🕹️ #
* In any state of the sim, the following commands can be used: <br>
🔠 ``space`` = **toggle play/plause** <br>
🔠 ``C`` = **clear canvas** <br>
🔠 ``D`` = **toggle dark-mode** <br>
🔠 ``right-click`` *point* = **delete point** ❗Deleting a point deletes any ropes connected to it<br> 
A [CLOTH](#cloth) can also be created at any time using the cloth button

* When the simulation is paused, new [POINTS](#points) can be created or connected as follows: <br>
⏸️  ``click`` = **new normal point** <br>
⏸️  ``shift`` + ``click`` *point* = **toggle locked point** <br>
⏸️  ``Z`` + ``click`` *point* = **toggle obstacle point** ❗Creating an obstacle deletes any ropes connected to it <br> 
⏸️  ``click`` *two points* = **create rope between points**❗A rope must always connect to 2 points <br>

* When the simulation is playing, the created obstacles can be moved around. The effects of the [WIND](#wind) can also be seen on the objects: <br>
▶️ ``click`` + *drag point* = **move connected body** <br>
For other information, check out the [MISCELLANEOUS](#miscellaneous-notes) section


## Points ##
There are 3 different types of points that can be created - normal, locked and obstacle points. <br>
⚪ Normal points are the moving parts of a rope object. They can be connected to other normal or locked points and are affected by gravity. <br>
🔴 Locked points are the anchors of a rope object. While they can be connected to other normal or locked points, they are not affected by gravity and remain constrained in place.<br>
⚫ Obstacle are barriers that the other points collide against. Note that only points collide with obstacles while any connected rope passes through. Obstacles are neither affected by gravity nor can be connected to any type of point. <br>

Clicking the canvas creates a new normal point. This point can then be toggled between locked or obstacle points by clicking using the appropriate keys.

## Cloth ##
A cloth is essentially a grid of ropes with a few locked points in the first row. These ropes and points behave in exactly the same manner as they normally do. To create a cloth of specfic dimensions, click on the ``CLOTH`` button, select the number of rows using the first toggle and columns using the second toggle and confirm the selection by re-selecting`CONFIRM` button. 

## Wind ##
Wind influences all normal points. The magnitude of the wind can be adjusted using the 2D slider in the controls. To reset the wind, the `WIND` button can be clicked! 

## Miscellaneous Notes ##
* Resizing the browser window at any time will reset the simulation.
* The closer the points are to each other, the more realistic is their movement.


