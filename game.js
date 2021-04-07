document.addEventListener("DOMContentLoaded", () => {

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var clicked = false; 
	var minX = 0;
	var minY = 0;
	var maxX = 0;
	var maxY = 0;
	var time = 0;
	var xpos = 0;
	var ypos = 0;


	function randomColor(){
		var red = Math.floor(Math.random() * 200) + 30;
		var green = Math.floor(Math.random() * 200) + 30;
		var blue = Math.floor(Math.random() * 200) + 30;

		ctx.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
		//ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
	}

	function drawShape(){
		var randomShape = Math.floor(Math.random() * 2);
		var randomX = Math.floor(Math.random() * (canvas.width + 1));
		var randomY = Math.floor(Math.random() * (canvas.height + 1));

		console.log(`Random X: ${randomX}`);
		console.log(`Random Y: ${randomY}`);

		if (randomShape == 0){
			ctx.rect(randomX, randomY, 50, 50);
			minX = randomX;
			minY = randomY;
			maxX = randomX + 50;
			maxY = randomY + 50;
			
		}else{
			ctx.rect(randomX, randomY, 70, 30);
			minX = randomX;
			minY = randomY;
			maxX = randomX + 70;
			maxY = randomY + 30;
		}

		randomColor();
		ctx.fill();
	}

	function draw(){
		document.getElementById("highscore").innerHTML = "Best time: " + localStorage.getItem("highScore") + "ms";

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.beginPath();

		drawShape();
		
		ctx.closePath();
		
	}

	function timerCount(){
		time++;
	}setInterval(timerCount, 1);

	function highScore(){
		if(!localStorage.getItem("highScore")){
			localStorage.setItem("highScore", 0);
		}else{
			if(localStorage.getItem("highScore") == 0 | localStorage.getItem("highScore") > time){
				localStorage.setItem("highScore", time);
			}
		}
		
	}


	 function getMousePos(canvas, evt) {

	 	console.log(evt);
        var rect = canvas.getBoundingClientRect();
        
        xpos = evt.clientX - rect.left;
		ypos = evt.clientY - rect.top;

        console.log(`X ${xpos}`);
        console.log(`Y ${ypos}`);

        checkPosition(evt);
        
      }


	function checkPosition(mouseEvent){

		//ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
		document.getElementById("mouse").innerHTML = `Coordinates: ${xpos}, ${ypos} Offset: ${canvas.offsetLeft}, ${canvas.offsetTop}`;

	
		if ((xpos >= minX & xpos <= maxX) & (ypos >= minY & ypos <= maxY)){
			document.getElementById("timer").innerHTML = "Time: " + time + "ms ";
			highScore();
			draw();
			time = 0;
		}


	}


	 canvas.addEventListener('click', function(evt) {
	 	console.log("test")
	 	var mousePos = getMousePos(canvas, evt);
	 }, false);

	//canvas.addEventListener("click", checkPosition, false);	
	draw();
});