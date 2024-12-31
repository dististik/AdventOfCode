$(document).ready(function(){
	console.log('jQuery loaded...');
	// Run solution when button is clicked
	$(".submit_input").on("click",function(){
		console.log("jQuery listener triggered...");
		// Load puzzle input value
		let puzzleInput = $("#puzzle_input").val();
		// Split up input data to be manipulated
		let calibrationArray = puzzleInput.split('\n');
		for(let i=0;i<calibrationArray.length;i++){
			calibrationArray[i] = calibrationArray[i].split(" ");
			// Trim off the ":" character from the first index
			calibrationArray[i][0] = calibrationArray[i][0].substring(0,calibrationArray[i][0].length - 1);
			// Ensure every index is a number
			calibrationArray[i] = calibrationArray[i].map((x) => Number(x));
		}
		// Run through every equation permutation and determine if each is possible
		let validTotal = 0;
		for(let i=0;i<calibrationArray.length;i++){
			let maxPermutations = 2**(calibrationArray[i].length-2);
			for(let x=0;x<maxPermutations;x++){
				// Set up binary represntation of each operand's position for the current loop
				// 0 = addition, 1 = multiplication
				let operandsDecimal = (10**(calibrationArray[i].length-2)) + parseInt(x.toString(2));
				let operands = String(operandsDecimal).split('');
				operands = operands.map((x) => Number(x));
				operands.shift();
				// Perform operations based on binary positions for current loop
				let test = calibrationArray[i][1];
				let currentOperand = 0;
				calibrationArray[i].forEach(function(element,index){
					if(index == 0 || index == 1) return;
					else{
						if(operands[currentOperand]) test *= element;
						else test += element;
					}
					currentOperand++;
				});
				// If at any point the current combination of operands is valid, add the test value to tally and go to next calibration
				if(test == calibrationArray[i][0]) { validTotal += test; break; }
			}
		}
		// Report results
		$(".result").html(validTotal);
		$("#result2").html();
	});
});