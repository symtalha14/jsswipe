/*swipe script for mobile phones in ES 5 JS*/

var originX=0;
var originY=0;
var changeTotal=0;
var extremes={
    'leftExtreme':0,
    'rightExtreme':slides.length-1,
}
var DIR;
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
var last_slide = slidesArray.length-1;
var notExtreme=false;
var current_slide=0;
let leftSwipe = (elem,e)=>{
    e.preventDefault();
    //currently touched slide
    var index = slidesArray.indexOf(elem);
    //check for non existing slides
    current_slide=index;
    if(index!=extremes['rightExtreme']){
        notExtreme=true;
        console.log("Not an Extreme");
        var currentX = e.touches[0].clientX;
        var changeX = currentX - originX;
        changeTotal=changeX;
        elem.style.left = changeX + 'px';
        slidesArray[index + 1].style.left = (screen.width-Math.abs(changeX))+ 'px';
        
    }else{
        return;
    }
}

let rightSwipe = (elem,e) => {
    e.preventDefault();
    //currently touched slide
    var index = slidesArray.indexOf(elem);
    //check for non existing slides
    current_slide = index;
    if (index != extremes['leftExtreme']) {
        notExtreme = true;
        console.log("Not an Extreme");
        var currentX = e.touches[0].clientX;
        var changeX = currentX - originX;
        changeTotal = changeX;
        elem.style.left = changeX + 'px';
        slidesArray[index - 1].style.left = -(screen.width - Math.abs(changeX)) + 'px';

    } else {
        return;
    }
}

//on touch start
swipeWrapper.addEventListener('touchstart' , (e)=>{
    e.preventDefault();
    originX = e.touches[0].clientX;
    originY = e.touches[0].clientY;

    
});

//on touch move
swipeWrapper.addEventListener('touchmove' , (e)=>{
    e.preventDefault();
    //if the direction is valid
    var direction = getSwipeDirection(e);
    if (getSwipeDirection(e)){
        DIR=getSwipeDirection(e);
        direction==='Left'?leftSwipe(e.target,e):rightSwipe(e.target,e);
    }

});

//on touch end
swipeWrapper.addEventListener('touchend', (e) => {
    e.preventDefault();
    if(notExtreme){
        if (DIR == 'Left') {
            //greater than the threshold
            if (Math.abs(changeTotal) > 25 ){
                console.log(Math.abs(changeTotal));
                slides[current_slide].style.left = "-100%";
                slidesArray[current_slide + 1].style.left = "0";
                //slides[slidesArray[last_slide]].style.left = "100%";
        }
        else {
            console.log(Math.abs(changeTotal));
            slides[current_slide].style.left = "0";
            slides[current_slide + 1].style.left = "100%";
            //slides[slidesArray[last_slide]].style.left = "200%";
        }
    }else{

            if (Math.abs(changeTotal) > 25) {
                console.log(Math.abs(changeTotal));
                slides[current_slide].style.left = "100%";
                slidesArray[current_slide - 1].style.left = "0";
                //slides[slidesArray[last_slide]].style.left = "100%";
            }
            else {
                console.log(Math.abs(changeTotal));
                slides[current_slide].style.left = "0";
                slides[current_slide - 1].style.left = "-100%";
                //slides[slidesArray[last_slide]].style.left = "200%";
            }

    }
        notExtreme=false;
    }

});