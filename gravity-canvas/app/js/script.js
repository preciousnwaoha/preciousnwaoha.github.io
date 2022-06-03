
var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "#000000"; 

var c = canvas.getContext("2d");

var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

var gravity = 1;
var friction = 0.99;

//Event Listeners
addEventListener("mousemove", function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

//helper functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  red = String(Math.random() * 255);
  green = String(Math.random() * 255);
  blue = String(Math.random() * 255);
  color = "rgb(" + red + ", " + green + ", " + blue + ")";
  return color;
}

function Ball(x, y, dx, dy, r, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.color = color;

  this.update = function() {
    if(this.y + this.r > canvas.height){
      this.dy = -this.dy * friction;
    }else {
    this.dy += gravity;
    }

    if(this.x + this.r +this.dx > canvas.width || this.x -this.r <= 0){
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0 , Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  };
  

}

// Implementation
var ballArray = [];
function init() {
  for(let i = 0; i < 1000; i++){
    var x = randomIntFromRange(r, canvas.width - r);
  var y = randomIntFromRange(r, canvas.height - r);
  var dx = randomIntFromRange(-2, 2);
  var dy = randomIntFromRange(-2, 2);
  var r = randomIntFromRange(10, 30);
    ballArray.push(new Ball(x, y, dx, dy, r, randomColor()));
  }

}

//animating
function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for(let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();

  }
}

init();
animate();