$(document).ready(function(){
	console.log('jQuery loaded...');
	// Run solution when button is clicked
	$(".submit_input").on("click",function(){
		console.log("jQuery listener triggered...");
		// Load puzzle input value
		let puzzleInput = $("#puzzle_input").val();
		// Create new regular expression
		const rex = /(mul\(\d{1,3},\d{1,3}\))/g
		// Initialize array for a list of valid "instructions"
		let foundInstructions = puzzleInput.match(rex);
		// Execute multiplication instructions
		let mulTotal = puzzleMulInst(foundInstructions);
		// Part 2 begin -- split the original string to omit any conditional sections
		let conditionalInstructions = puzzleInput.split(/don't\(\)[^]+?do\(\)/gm);
		// Isolate instructions yet again, but this time over multiple strings
		let conMul = ["mul(0,0)"];
		for(let i=0;i<conditionalInstructions.length;i++){
			conMul = conMul.concat(conditionalInstructions[i].match(rex));
		}
		// Execute conditional instructions
		let conTotal = puzzleMulInst(conMul);
		// Report results
		$(".result").html(mulTotal);
		$("#result2").html(conTotal);
	});

	function puzzleMulInst(array){
		let total = 0;
		for(let i=0;i<array.length;i++){
			let mulPairs = array[i].match(/\d{1,3}/g);
			total += mulPairs[0] * mulPairs[1];
		}
		return total;
	}
});