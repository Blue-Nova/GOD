objects = [];
noise_offset = 0;

// CONFIG SECTION START//

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const WIDTH = 400;                                                        // HOW WIDE THE SKETCH IS                                 //
const HEIGHT = 400;                                                       // HOW WIDE THE SKETCH IS                                 //
const LIFE_TIME=3.5;                                                      // HOW LONG EACH PARTICLE TAKES UNTIL DYING (average)     //
const START_SIZE=40;                                                      // HOW BIG EACH PARTICLE STARTS OUT                       //
const MAX_UP_SPEED=8;                                                     // HOW FAST PARTICLES TRAVEL UP                           //
const MAX_ANGLE=5;                                                        // HOW ANGLED (left and right) EACH PARTICLE COULD TRAVEL //
const MAX_POPULATION=700;                                                 // MAX AMOUNT OF PARTICLES ON SCREEN POSSIBLE             //
const POPULATION_GROWTH_SPEED=6;                                          // HOW MANY PARTICLES SPAWN EACH TICK                     //
const RGB_UPPER=[300,90,20];                                              // MAX COLORS FOR A PARTICLE                              //
const RGB_LOWER=[10,0,0];                                                 // MIN COLORS FOR A PARTICLE                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONFIG SECTION END//

function setup() {
  createCanvas(1800, 1000);
  frameRate(60);
  noStroke();
}

function createParticle(index){
  return new particle(map(random(),0,1,0-(width*0.1),width*1.10,false),   //X
  START_SIZE+height,                                                      //Y
  1,                                                                      //Z
  START_SIZE,                                                             //SIZE
  index,                                                                  //INDEX
  [map(noise(random(noise_offset)),0,1,RGB_LOWER[0],RGB_UPPER[0],false),  //RED
  map(noise(random(noise_offset)),0,1,RGB_LOWER[1],RGB_UPPER[1],false),   //GREEN
  map(noise(random(noise_offset)),0,1,RGB_LOWER[2],RGB_UPPER[2],false)]); //BLUE
}

function newMapVelocity(){
  return [map(noise(random(noise_offset)),0,1,-MAX_ANGLE,MAX_ANGLE,false),
    map(noise(random(noise_offset)),0,1,-MAX_UP_SPEED,0,false),
    map(noise(random(noise_offset)),0,1,0.1,0.3,false)];
}

function replaceParticle(index){
  objects[index] = createParticle(index);
  objects[index].vel = newMapVelocity();
}

function draw() {
  background(220);
  if(objects.length < MAX_POPULATION){
    for (let index = 0; index < POPULATION_GROWTH_SPEED; index++) {
      objects[objects.length] = createParticle(objects.length);
      objects[objects.length-1].vel = newMapVelocity();
    }

  }

  for (let index = 0; index < objects.length; index++) {
    objects[index].tick();
    noise_offset+=10
  }
}

class particle{
  x;
  y;
  z;

  vel = [];
  color = [];
  a;

  size;

  index;

  constructor(x,y,z,size,index,color){
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.index = index;
    this.color = color;
  }

  tick(){
    if(this.z > 10) replaceParticle(this.index);
    fill(this.color[0],this.color[1],this.color[2]);
    this.x += this.vel[0];
    this.y += this.vel[1];
    this.z += this.vel[2]/LIFE_TIME;
    circle(this.x,this.y,this.size/this.z);
  }

}