
















































/*--------------------
Utils
--------------------*/
const lerp = (f0, f1, t) => (1 - t) * f0 + t * f1;

/*--------------------
Vars
--------------------*/
const mouse = {
  newX: 0,
  newY: 0,
  speedX: 0,
  speedY: 0,
  x: 0,
  y: 0,
  hover: false,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
};
const $cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('[data-link]');

/*--------------------
Mouse
--------------------*/
const handleMouse = e => {
  if (!mouse.hover) {
    mouse.x = e.clientX || e.touches[0].clientX;
    mouse.y = e.clientY || e.touches[0].clientY;
  }
};
window.addEventListener('mousemove', handleMouse);
window.addEventListener('touchmove', handleMouse);
window.addEventListener('touchstart', handleMouse);

/*--------------------
Links
--------------------*/
let timer;
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      $cursor.classList.add('hover');
      mouse.hover = true;
      const { top, left, width, height } = link.getBoundingClientRect();
      mouse.x = left - 6;
      mouse.y = top - 1;
      mouse.width = width;
      mouse.height = height;
    }, 100);
  });
  link.addEventListener('mouseleave', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      $cursor.classList.remove('hover');
      mouse.hover = false;
    }, 100);
  });
});

/*--------------------
Raf
--------------------*/
const raf = () => {
  mouse.newX = lerp(mouse.newX, mouse.x, 0.12);
  mouse.newY = lerp(mouse.newY, mouse.y, 0.12);

  mouse.speedX = lerp(mouse.speedX, mouse.x - mouse.newX, 0.12);
  mouse.speedY = lerp(mouse.speedY, mouse.y - mouse.newY, 0.12);
  const speed =
    Math.abs(mouse.speedX) > Math.abs(mouse.speedY)
      ? mouse.speedX
      : -mouse.speedY;

  let style;

  if (!mouse.hover) {
    style = {
      width: '30px',
      height: '30px',
      marginLeft: '-15px',
      marginTop: '-15px',
      transform: `
        translate(${mouse.newX}px, ${mouse.newY}px)
        rotate(${45 - speed * 0.2}deg)
        scale(${1 - Math.abs(speed) * 0.001})
      `,
    };
  } else {
    style = {
      width: `${mouse.width}px`,
      height: `${mouse.height}px`,
      marginLeft: 0,
      marginTop: 0,
      transform: `
        translate(${mouse.newX}px, ${mouse.newY}px)
        rotate(0deg)
        scale(${1 - Math.abs(speed) * 0.001})
      `,
    };
  }
  Object.assign($cursor.style, style);

  requestAnimationFrame(raf);
};
raf();


var canvas, c, w, h,
    twoPI = Math.PI * 2,
    mX, mY, drag = null, move = true;

var points = [];

window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
window.onload = function(){
  canvas = document.createElement('canvas')
    w = canvas.width = window.innerWidth - 40;
  h = canvas.height = window.innerHeight - 40;
  c = canvas.getContext('2d');
  document.body.appendChild(canvas);
  
  window.addEventListener('resize', function(e){
    w = canvas.width = window.innerWidth - 40;
    h = canvas.height = window.innerHeight - 40;
  });
  
  canvas.addEventListener('mousedown', function(e){
    for(var p = 0; p < points.length; p++){
      for(var v = 0; v < points[p].v.length; v++){
        var dx = mX - points[p].v[v].x,
            dy = mY - points[p].v[v].y,
            dd = Math.sqrt(dx * dx + dy * dy);
        
        if(dd <= points[p].v[v].z){
          drag = { p: p, v: v };
        }
      }
    }
  });
  
  canvas.addEventListener('mouseup', function(e){
    drag = null;
  });
  
  canvas.addEventListener('mousemove', function(e){
    mX = e.pageX-20;
    mY = e.pageY-20;
  });
  
  for(var i = 0; i < 15; i++){
    points.push(
      new Vector3Line(
        new Vector3( Math.random() * w * 0.6 + w * 0.2, Math.random() * h * 0.6 + h * 0.2, 5 ),
        new Vector3( Math.random() * w * 0.6 + w * 0.2, Math.random() * h * 0.6 + h * 0.2, 5 )
      )
    );
  }
  
  animate();
}
  
  function Vector3(x,y,z){
    this.x = x;
    this.xd = Math.random()*2-1;
    this.y = y;
    this.yd = Math.random()*2-1;
    this.z = z;
  }

function Vector3Line( v1, v2 ){
  this.v = [ v1, v2 ];
  this.angle = function(){
    var dx = this.v[1].x - this.v[0].x,
        dy = this.v[1].y - this.v[0].y;
    return Math.atan2(dy, dx);
  };
}

function animate(){
  update();
  clear();
  draw();
  requestAnimFrame(animate);
}

function update(){
  if(drag !== null){
    points[drag.p].v[drag.v].x = mX;
    points[drag.p].v[drag.v].y = mY;
  }
  if(!move) return;
  for(var p = 0; p < points.length; p++){
    for(var v = 0; v < points[p].v.length; v++){
      points[p].v[v].x += points[p].v[v].xd;
      points[p].v[v].y += points[p].v[v].yd;
      if(points[p].v[v].x >= w - points[p].v[v].z) points[p].v[v].xd *= -1;
      if(points[p].v[v].x <= 0 + points[p].v[v].z) points[p].v[v].xd *= -1;
      if(points[p].v[v].y >= h - points[p].v[v].z) points[p].v[v].yd *= -1;
      if(points[p].v[v].y <= 0 + points[p].v[v].z) points[p].v[v].yd *= -1;
    }
  }
}

function clear(){
  c.clearRect(0,0,w,h);
}

function draw(){
  c.save();
  c.strokeStyle = "rgba(255,255,255,0.75)";
  for(var p = 0; p < points.length; p++){
    // source handle
    c.fillStyle = "rgba(255,255,255,0.5)";
    c.beginPath();
    c.arc(points[p].v[0].x, points[p].v[0].y, points[p].v[0].z, 0, twoPI, false);
    c.closePath();
    c.stroke();
    c.fill()
      
      var a = points[p].angle();
    c.beginPath();
    c.moveTo(points[p].v[0].x + Math.cos(a) * points[p].v[0].z, points[p].v[0].y + Math.sin(a) * points[p].v[0].z);
    c.lineTo(points[p].v[1].x - Math.cos(a) * points[p].v[1].z, points[p].v[1].y - Math.sin(a) * points[p].v[1].z);
    //c.closePath();
    c.stroke();
    
    // target handle
    c.fillStyle = "rgba(255,255,255,0.2)";
    c.beginPath();
    c.arc(points[p].v[1].x, points[p].v[1].y, points[p].v[1].z, 0, twoPI, false);
    c.closePath();
    c.stroke();
    c.fill();
    
    var intersects = [];
    
    for(var p2 = 0; p2 < points.length; p2++){
      intersect = intersection(points[p].v[0], points[p].v[1], points[p2].v[0], points[p2].v[1], p, p2);
      if(intersect){
        intersects.push(intersect);
        c.beginPath();
        c.arc(intersect.x, intersect.y, 3, 0, twoPI, false);
        c.closePath();
        c.stroke();
      }
    }
    
    if(intersects.length > 1){
      c.save();
      c.strokeStyle = "rgba(0,128,255,0.75)";
      c.beginPath();
      for(var i = 0; i < intersects.length-1; i++){
        c.moveTo(intersects[i].x, intersects[i].y);
        c.lineTo(intersects[i+1].x, intersects[i+1].y);
      }
      c.closePath();
      c.stroke();
      c.restore();
    }
  }
  
  c.restore();
}

function status(msg){
  c.save();
  c.fillStyle = "rgba(255,255,255,1)";
  c.fillText( msg, 10, 15 );
  c.restore();
}

function intersection(a1,a2,b1,b2, p, p2){
  var ua_t = (b2.x-b1.x) * (a1.y-b1.y) - (b2.y-b1.y) * (a1.x-b1.x),
      ub_t = (a2.x-a1.x) * (a1.y-b1.y) - (a2.y-a1.y) * (a1.x-b1.x),
      u_b = (b2.y-b1.y) * (a2.x-a1.x) - (b2.x-b1.x) * (a2.y-a1.y);
  
  if( u_b != 0 ){
    var ua = ua_t/u_b,
        ub = ub_t/u_b;
    if( 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1){
      var ix = a1.x + ua * (a2.x-a1.x),
          iy = a1.y + ua * (a2.y-a1.y);
      return { x: ix,  y: iy, p: [ p, p2 ] };
    } else {
      return false;
    }
  } else { 
    return false;
  }
  return false;
}
