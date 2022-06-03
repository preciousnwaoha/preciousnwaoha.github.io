const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.height = window.innerHeight 
canvas.width = window.innerWidth

const scoreEl = document.querySelector('#scoreEl')
const startGameBtn = document.querySelector("#startGameBtn")
const modalEl = document.querySelector("#modalEl")
const bigScoreEl = document.querySelector('#bigScoreEl')
const levelEl = document.querySelector("#levelEl")


class Player {
  constructor(x, y, r, color){
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

class Projectile {
  constructor(x, y, r, color, velocity){
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

class Enemy{
  constructor(x, y, r, color, velocity){
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

const friction = 0.98;
class Particle{
  constructor(x, y, r, color, velocity){
    this.x = x
    this.y = y
    this.r = r
    this.color = color
    this.velocity = velocity
    this.alpha = 1
  }

  draw() {
    c.save()
    c.globalAlpha = 0.1
    c.beginPath()
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.restore()
  }

  update() {
    this.draw()
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
    this.alpha -= 0.01
  }
}

const x = canvas.width / 2
const y = canvas.height / 2

//Arrays
let player = new Player(x, y, 10, 'white')
let projectiles = []
let enemies = []
let particles = []

function init(){
  player = new Player(x, y, 10, 'white')
  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;
  level = 1;
  levelEl .innerHTML = level;
  scoreEl.innerHTML = score;
}

function spawnEnemies(){
  setInterval(() => {
    const r = Math.random() * (30 - 10) + 10;

    let x;
    let y;
    if (Math.random() < 0.5){
      x = Math.random() < 0.5 ? 0 - r : canvas.width + r;
      y = Math.random() * canvas.height;
    }else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - r : canvas.height + r;
    }
    
    
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const angle = Math.atan2(
      canvas.height / 2 - y,
      canvas.width / 2 - x
    )

    const velocity = {
      x: (Math.cos(angle)/5) * level,
      y: (Math.sin(angle)/5) * level
    }

    enemies.push(new Enemy(x, y, r, color, velocity))
  }, 1000)
}

let animationId;
let score = 0;
let level = 1;
function animate() {
  animationId = requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0, 0, 0, 0.1)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();


  particles.forEach((particle, index) => {
    if(particle.alpha <= 0){
      particles.splice(index, 1)
    }else {
      particle.update();
    }
  })


  projectiles.forEach((projectile) => {
    projectile.update();

    //remove from edges of screen
    if(projectile.x + projectile.r < 0 || projectile.x - projectile.r > canvas.width || projectile.y + projectile.r < 0 || projectile.y - projectile.r > canvas.height) {
      setTimeout((index) => {
        projectiles.splice(index, 1)
      }, 0)
    }
  })

  enemies.forEach((enemy, index) => {
    enemy.update();

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

    //end game
    if(dist - enemy.r - player.r < 1){
      cancelAnimationFrame(animationId)
      modalEl.style.display = "flex"
      bigScoreEl.innerHTML = score
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      //when projectiles touch enemy
      if(dist - enemy.r - projectile.r < 1){

        //create explosions
        for(let i = 0; i < enemy.r * 2; i++){
          particles.push(new Particle(projectile.x, projectile.y, Math.random() * 3, enemy.color, {
            x: (Math.random() - 0.5) * (Math.random() * 6),
            y: (Math.random() - 0.5) * (Math.random() * 6)
          }))
        }

        if(enemy.r - 10 > 5){
          //increase score
          score += 100
          scoreEl.innerHTML = score

          gsap.to(enemy, {
            r: enemy.r - 10
          })
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1)
          }, 0) 
        }else {
          //remove from screen
          //increase score
        score += 150
        scoreEl.innerHTML = score
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(projectileIndex, 1)
          }, 0) 

          //increase level
          if(score >= level * 5000 && score < (level+1) * 5000){
            level += 1
            levelEl.innerHTML = level
          }
        }
      }
    });
  })
}

addEventListener("click", (event) => {
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  )
  const velocity = {
    x: Math.cos(angle) * 5.5,
    y: Math.sin(angle) * 5.5
  }

  projectiles.push(new Projectile(
    canvas.width / 2,
    canvas.height / 2,
    5,
    'white',
    velocity)
  )
})


startGameBtn.addEventListener("click", () => {
  init();
  animate();
  spawnEnemies();
  modalEl.style.display = 'none';
})