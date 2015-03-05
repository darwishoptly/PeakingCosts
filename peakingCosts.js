$(document).ready(function(){
	window.aa_test_winner_declared = function(visitor_size, num_peaks){
	
		crate_a = .40; 
		crate_b = .40; 
		peak_count = 1; 
		// console.log("Conversion Rate A: ", crate_a, "Conversion Rate B:", crate_b)
		visitor_size = parseFloat(visitor_size)
	
		conversions_a = 0;
		conversions_b = 0;
	
		for (var visitor = 1; visitor <= visitor_size; visitor++){
			if(Math.random() > crate_a){
				conversions_a = conversions_a + 1; 
			}
			if(Math.random() > crate_b){
				conversions_b = conversions_b + 1; 
			}
			if(visitor == peak_count * (visitor_size / num_peaks) || visitor == visitor_size){
				// console.log(visitor);
				if(isConclusive(conversions_a, conversions_b, visitor)){
					return true;
				}
				console.log("Peak Count", peak_count, "Visitors: ", visitor, "CR A:", conversions_a, "CR B:", conversions_b);
				peak_count = peak_count + 1;
			}
		}
		return false; 
	}

	var isConclusive = function(conversions_a, conversions_b, visitors_until_now){
		prob_a = conversions_a / visitors_until_now; 
		prob_b = conversions_b / visitors_until_now;
	
	
		pooled_proportion = (prob_a * visitors_until_now + prob_b * visitors_until_now) / (visitors_until_now + visitors_until_now);
		SE = Math.sqrt(pooled_proportion * (1 - pooled_proportion) * [ 1 / visitors_until_now + 1 / visitors_until_now ]);	
		Z = (prob_a - prob_b) / SE;
		// console.log("Z score:", Z, "A:", prob_a, "B:", prob_b);
	
		if(Math.abs(Z) > 1.96){
			// Test is conclusive
			return true;
		} else {
			// Test is inconclusive
			return false; 
		}
	}

	var numSimulations = 1000;
	
	var calculate = function(visitor_size, peaking_frequency, numSimulations){
		count = 0; 
		for (var i = 1; i <= numSimulations; i ++){
			// $(".output").html(i + " / " + numSimulations + " tests run");
			if(aa_test_winner_declared(visitor_size, visitor_size / peaking_frequency)){
				count = count + 1;
			}
		}
		// console.log(count);
		return(count);
	}
	
	$("button").click(function(){
		$(".output").html("Running Simulations...");
		window.setTimeout(function(){
			visitor_size = parseFloat($(".visitor").val());
			peaking_frequency = parseFloat($(".peaking_frequency").val());
			count = calculate(visitor_size, peaking_frequency, numSimulations);
			console.log(count);
			$(".output").html((count / numSimulations)*100 + "%");			
		}, 1);

	});
});





