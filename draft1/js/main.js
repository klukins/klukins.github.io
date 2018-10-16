// $.getJSON("http://gsx2json.com/api?id=1MdT_A4DPV6jHHLD-XTEqZt8y7KQSmyBvydy8f9CwlSY&q=05October2018", function(data) {
//   //first row "title" column
//   console.log();
// });

//this works to spit out city:
// $(document).ready(function() {
//                $.getJSON('http://gsx2json.com/api?id=1MdT_A4DPV6jHHLD-XTEqZt8y7KQSmyBvydy8f9CwlSY&q=05October2018&columns=false', function(stuff) {
//                   console.log('city: ' + stuff.rows[0].city);
//                });
//             });



$(document).ready(function() {
   $.getJSON('http://gsx2json.com/api?id=1MdT_A4DPV6jHHLD-XTEqZt8y7KQSmyBvydy8f9CwlSY&columns=false', function(stuff) {
      console.log(stuff);
      var arrayNumber;
      var startArray = document.getElementsByClassName("popup")[0].id;
      for(var i = 0; i < stuff.rows.length; i++) {
   		if(stuff.rows[i].day === startArray) {
      		arrayNumber = i;
      		break;
      	};
   	  };
   	  console.log('array number ' + arrayNumber + '; startArray ' + startArray);
   	  for(var j = arrayNumber; j < (arrayNumber + 42); j++){
   	  	if(stuff.rows[j].away == 1) {
   	  		var jID = "#" + stuff.rows[j].day + "";
   	  		console.log(jID);
   	  		$("td"+jID+"").addClass('not-home');
   	  	}
   	  }
	});
});

$(document).click(function(event) {
	var clicked = event.target.closest("td").id;
    console.log(clicked);
	if (event.target.className.includes("popup")) {
    	$('.hover').show();
	}
	else {
    	$('.hover').hide();
  	}
});

// $('.popup').click(function(event){
// 	console.log('krissy');
// });
   //if function for contents of popup box

   //if a square is flying out, then contents are "Krissy is flying to [city]"
   		
   //if a square is flying in, then contents are "Krissy is flying home from [city]"
   //if a square is flying between, then contents are "Krissy is flying from [city of previous square] to [city]"
   //if a square is away, then contents are "Krissy is in [city]"
   //else, "Krissy is home in Chicago, IL"