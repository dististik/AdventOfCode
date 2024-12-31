$(document).ready(function(){
	console.log('jQuery loaded...');
	// Run solution when button is clicked
	$(".submit_input").on("click",function(){
		console.log("jQuery listener triggered...");
		// Get the value of the text area
		let txtInput = $("#puzzle_input").val();
		// Break up text into an array of pairs (still in text)
		let idListPairs = txtInput.split("\n");
		// Cut up the pairs for easier handling
		let idListNum = [];
		let idListSeperate = [[],[]]; // Index 0 is one list, index 1 is the other
		for(let i=0;i<idListPairs.length;i++){ //probably a better way to do this but I'm out of practice orz
			idListNum[i] = idListPairs[i].split("   ");
			idListSeperate[0].push(idListNum[i][0]);
			idListSeperate[1].push(idListNum[i][1]);
		}
		// Sort the two ID lists
		idListSeperate[0].sort(function(a,b){return a-b});
		idListSeperate[1].sort(function(a,b){return a-b});
		// Find and tally the distances and similarities
		let distanceTotal = 0;
		let similarScore = 0;
		for(let i=0;i<idListSeperate[0].length;i++){
			distanceTotal += Math.abs(idListSeperate[0][i] - idListSeperate[1][i]);
			similarScore += idListSeperate[0][i] * arrayInstanceCounter(idListSeperate[1],idListSeperate[0][i]);
		}
		// Report totals
		$(".result").html(distanceTotal);
		$("#result2").html(similarScore);
	});

	function arrayInstanceCounter(array,value){
		let instanceCount = 0;
		for(let x=0;x<array.length;x++){
			if(array[x] == value) instanceCount++;
		}
		return instanceCount;
	}
});