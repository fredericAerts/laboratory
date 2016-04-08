document.addEventListener("DOMContentLoaded", function(event) {
	setTimeout(function(){
		var cursor = document.getElementById("js-cursor");
		cursor.style.transform = "scale(300)"; /* scales to 3000px width */
	}, 6000);
	setTimeout(function(){
		var body = document.getElementsByTagName("body")[0];
		var terminalText = document.getElementById("js-terminal-text");
		body.style.backgroundColor = "#ffffff";
		terminalText.style.opacity = 0;
	}, 7000);
});
