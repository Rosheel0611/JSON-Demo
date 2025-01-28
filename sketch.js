let weatherJSON 
let minTemp = Infinity
let maxTemp = -Infinity
let images = {}
let dx
function preload() {
  weatherJSON = loadJSON("https://api.weather.gov/gridpoints/OKX/33,37/forecast")  
}

function setup() {
  createCanvas(600, 400);
  dx = width/(weatherJSON.properties.periods.length+2)
  
  line(20,50,20,350)
  line(20,350,580,350)
  textSize(32)
  text("temperature",10,50)
  text("month",275,380)
  
  // const fit = (img) => {
  //   img.resize(dx,0)
  //   redraw()
  // }
  
  for( const p of weatherJSON.properties.periods ) {
    minTemp = min(p.temperature, minTemp)
    maxTemp = max(p.temperature, maxTemp)
    // if( ! (p.icon in images) ) {
    //   images[p.icon] = loadImage(p.icon, fit) 
    // }    
  }
  noLoop()
}

function draw() {
  background(220);
  let px = dx // dx * (i+1), where i = 0
  let py = map( weatherJSON.properties.periods[0].temperature, minTemp, maxTemp, 0.8*height, 0.2*height)
  for( let i = 1; i < weatherJSON.properties.periods.length; i++ ) {
    let cx = dx * (i+1)
    let cy = map( weatherJSON.properties.periods[i].temperature, minTemp, maxTemp, 0.8*height, 0.2*height)
    line(px,py,cx,cy)
    px = cx
    py = cy
    // if( weatherJSON.properties.periods[i].icon in images ) {
    //   image(images[weatherJSON.properties.periods[i].icon],dx*(i+1),height/2)   
    // }    
  }
  line(30,60,30,350)
  line(30,350,580,350)
  textSize(22)
  textAlign(CENTER,CENTER)
  text("\nT\ne\nm\np\ne\nr\na\nt\nu\nr\ne",12,175)
  text("month",280,380)
  
  // console.log(images)
}

function keyPressed() {
  redraw()
}
