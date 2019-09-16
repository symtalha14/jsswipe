/*swipe script for mobile phones in ES 5 JS*/

var originX=0;
var originY=0;
var changeTotal=0;
var extremes={
    'leftExtreme':0,
    'rightExtreme':slides.length-1,
}
//decide  swipe direction
let getSwipeDirection = (e)=>{
    var currentX = e.touches?e.touches[0].clientX:null;
    var currentY = e.touches[0].clientY;
    var changeX = currentX-originX;
    var deflection = Math.abs(currentY-originY);
    if(changeX>0 && deflection<10){
        return 'Right';
    }
    if(changeX<0 && deflection<10){
        return 'Left';
    }
    if (deflection>=10){
        return null;
    }
}
var slidesArray = [];
for(let i=0;i<slides.length;i++){
    slidesArray.push(slides[i]);
}

var current_slide=0;
let leftSwipe = (elem,e)=>{
    //currently touched slide
    var index = slidesArray.indexOf(elem);
    //check for non existing slides
    current_slide=index;
    if(index!=extremes['rightExtreme']){
        var currentX = e.touches[0].clientX;
        var changeX = currentX - originX;
        changeTotal=changeX;
        elem.style.left = changeX + 'px';
        slidesArray[index + 1].style.left = -changeX + 'px';
        
    }else{
        return;
    }
}

let rightSwipe = (elem,e) => {
    console.log(elem);
}

//on touch start
swipeWrapper.addEventListener('touchstart' , (e)=>{
    originX = e.touches[0].clientX;
    originY = e.touches[0].clientY;

    
});

//on touch move
swipeWrapper.addEventListener('touchmove' , (e)=>{
    //if the direction is valid
    var direction = getSwipeDirection(e);
    if (getSwipeDirection(e)){
        direction==='Left'?leftSwipe(e.target,e):rightSwipe(e.target,e);
    }

});

//on touch end
swipeWrapper.addEventListener('touchend', (e) => {
    if(Math.abs(changeTotal)>25 && getSwipeDirection(e)=='Left'){
        console.log(Math.abs(changeTotal));
        slides[current_slide].style.left=0;
        slides[current_slide+1].style.left=0;
    }else{
        console.log(Math.abs(changeTotal));
        slides[current_slide].style.marginLeft = 0;
    }

});