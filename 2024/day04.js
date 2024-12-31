$(document).ready(function(){
	console.log('jQuery loaded...');
	// Run solution when button is clicked
	$(".submit_input").on("click",function(){
		console.log("jQuery listener triggered...");
		// Load puzzle input value
		let puzzleInput = $("#puzzle_input").val();
		// Split input into a 2D array to make navigating easier
		let crossWordArray = puzzleInput.split("\n");
		for(let i=0;i<crossWordArray.length;i++){
			crossWordArray[i] = crossWordArray[i].split("");
		}
		let array = crossWordArray;
		// Run over each possible arrangement of XMAS, compare to our valid strings, and tally results
		let currentString = ["","","","","",""]; // vert, horiz, diag\, diag/, mas/, mas\
		let validStrings = ["XMAS","SAMX","MAS","SAM"];
		let XMASCounter = 0;
		let X_MASCounter = 0;
		// Exhaustive loop
		for(let i=0;i<crossWordArray.length;i++){
			for(let x=0;x<crossWordArray[i].length-2;x++){
				// Overflow protection from x while still iterating through entire grid
				if(x<crossWordArray[i].length-3){
					// Verticle
					currentString[0] = 
						crossWordArray[i][x] + 
						crossWordArray[i][x+1] + 
						crossWordArray[i][x+2] +
						crossWordArray[i][x+3];
					// Horizontal
					currentString[1] =
						crossWordArray[x][i] +
						crossWordArray[x+1][i] +
						crossWordArray[x+2][i] +
						crossWordArray[x+3][i];
				}
				// Overflow protection from i while still iterating through entire grid
				if(i<crossWordArray.length-3){
					// Easy diagonal
					currentString[2] =
						crossWordArray[i][x] +
						crossWordArray[i+1][x+1] +
						crossWordArray[i+2][x+2] +
						crossWordArray[i+3][x+3];
					// Hard diagonal
					currentString[3] =
						crossWordArray[i][x+3] +
						crossWordArray[i+1][x+2] +
						crossWordArray[i+2][x+1] +
						crossWordArray[i+3][x];
				}
				// Construct strings to catch X-MAS arrangements
				if(i<crossWordArray.length-2){
					currentString[4] =
						crossWordArray[i][x+2] +
						crossWordArray[i+1][x+1] +
						crossWordArray[i+2][x];
					currentString[5] =
						crossWordArray[i][x] +
						crossWordArray[i+1][x+1] +
						crossWordArray[i+2][x+2];
				}
				// Check for valid XMAS arrangements
				if(currentString[0] == validStrings[0] || currentString[0] == validStrings[1]) XMASCounter++;
				if(currentString[1] == validStrings[0] || currentString[1] == validStrings[1]) XMASCounter++;
				if(currentString[2] == validStrings[0] || currentString[2] == validStrings[1]) XMASCounter++;
				if(currentString[3] == validStrings[0] || currentString[3] == validStrings[1]) XMASCounter++;
				if(currentString[4] == validStrings[2] || currentString[4] == validStrings[3]){ // Could definitely use an && instead...
					if(currentString[5] == validStrings[2] || currentString[5] == validStrings[3]) X_MASCounter++;
				}
				// Reset strings
				currentString[0] = "";
				currentString[1] = "";
				currentString[2] = "";
				currentString[3] = "";
				currentString[4] = "";
				currentString[5] = "";
			}
		}
		// Report results
		$(".result").html(XMASCounter);
		$("#result2").html(X_MASCounter);
	});
});