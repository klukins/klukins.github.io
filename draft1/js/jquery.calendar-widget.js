(function($) { 
   
	function calendarWidget(el, params) { 
		
		var now   = new Date();
		var thismonth = now.getMonth();
		var thisyear  = now.getYear() + 1900;

		var opts = {
			month: thismonth,
			year: thisyear
		};
		
		//if query string is blank or incorrect, go to current month. Else, go to month in query string. If query string is partial, fill in blank parameter with current month or year
		var url_string = window.location.href;
		var url = new URL(url_string);
		var urlMonthOriginal = url.searchParams.get("month");
		var urlMonth = urlMonthOriginal - 1;
		var urlYear = url.searchParams.get("year");
		if ((urlMonthOriginal == null) && (urlYear == null)){
			console.log('query string blank');
		}
		else if ((urlMonthOriginal !== null) && (urlMonthOriginal <= 0) || (urlMonthOriginal >= 13)){
			console.log('invalid month');
			console.log('urlMonth: ' + urlMonth + ', urlMonthOriginal: ' + urlMonthOriginal);
		}
		else if ((urlYear !== null) && (urlYear <= 2000) || (urlYear >= 2100)){
			console.log('invalid year');
		}
		else if ((urlMonthOriginal !== null) && (urlYear !== null)){
			console.log('not blank');
			opts = {month: urlMonth, year: urlYear};
		}
		else if ((urlMonthOriginal !== null) && (urlYear == null)){
			console.log('no year');
			opts = {month: urlMonth, year: thisyear};
		}
		else if ((urlMonthOriginal == null) && (urlYear !== null)){
			console.log('no month');
			opts = {month: thismonth, year: urlYear};
		};

		
		
		$.extend(opts, params);
		
		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var dayNames = ['<div class="fullweekday">Sunday</div><div class="weekletter">S</div>',
					    '<div class="fullweekday">Monday</div><div class="weekletter">M</div>',
					    '<div class="fullweekday">Tuesday</div><div class="weekletter">T</div>',
					    '<div class="fullweekday">Wednesday</div><div class="weekletter">W</div>',
					    '<div class="fullweekday">Thursday</div><div class="weekletter">T</div>',
					    '<div class="fullweekday">Friday</div><div class="weekletter">F</div>',
					    '<div class="fullweekday">Saturday</div><div class="weekletter">S</div>'];
		month = i = parseInt(opts.month);
		year = parseInt(opts.year);
		var m = 0;
		var table = '';
		
			// next month
			if (month == 11) {
				var next_month = '<a href="?month=' + 1 + '&amp;year=' + (year + 1) + '" title="' + monthNames[0] + ' ' + (year + 1) + '"><i style="font-size:24px" class="fa">&#8680;</i></a>';
			} else {
				var next_month = '<a href="?month=' + (month + 2) + '&amp;year=' + (year) + '" title="' + monthNames[month + 1] + ' ' + (year) + '"><i style="font-size:24px" class="fa">&#8680;</i></a>';
			}
				
			// previous month
			if (month == 0) {
				var prev_month = '<a href="?month=' + 12 + '&amp;year=' + (year - 1) + '" title="' + monthNames[11] + ' ' + (year - 1) + '"><i style="font-size:24px" class="fa">&#8678;</i></a>';
			} else {
				
				var prev_month = '<a href="?month=' + (month) + '&amp;year=' + (year) + '" title="' + monthNames[month - 1] + ' ' + (year) + '"><i style="font-size:24px" class="fa">&#8678;</i></a>';
			}		
			//table += ('<h3 id="current-month">'+monthNames[month]+' '+year+'</h3>');
			

			table += ('<table class="month-nav-row"><tr><th class="th-nav-prev" style="text-align: left; width:20%"><div class="nav-prev">'+ prev_month +'</div></th><th class="th-month-name" style="text-align: center; width:60%;"><h3 id="current-month">'+monthNames[month]+' '+year+'</h3></th><th class="th-nav-next" style="text-align: right; width:20%;"><div class="nav-next">'+ next_month +'</div></th></tr></table>');
			// uncomment the following lines if you'd like to display calendar month based on 'month' and 'view' paramaters from the URL
			// table += ('<div class="nav-prev">'+ prev_month +'</div>');
			// table += ('<div class="nav-next">'+ next_month +'</div>');
			table += ('<table class="calendar-month " ' +'id="calendar-month'+i+' " cellspacing="0">');	
		
			table += '<tr>';
			
			for (d=0; d<7; d++) {
				table += '<th class="weekday">' + dayNames[d] + '</th>';
			}
			
			table += '</tr>';
		
			var days = getDaysInMonth(month,year);
            var firstDayDate=new Date(year,month,1);
            var firstDay=firstDayDate.getDay();
			
			var prev_days = getDaysInMonth(month,year);
            var firstDayDate=new Date(year,month,1);
            var firstDay=firstDayDate.getDay();
			
			var prev_m = month == 0 ? 11 : month-1;
			var prev_y = prev_m == 11 ? year - 1 : year;
			var prev_days = getDaysInMonth(prev_m, prev_y);
			firstDay = (firstDay == 0 && firstDayDate) ? 7 : firstDay;
	
			var i = 0;
            for (j=0;j<42;j++){
			  
              if ((j<firstDay)){
                table += ('<td class="other-month popup" id="' + (prev_days-firstDay+j+1) + monthNames[month-1] + year + '"><span class="day">' + (prev_days-firstDay+j+1) + '</span></td>');
			  } else if ((j>=firstDay+getDaysInMonth(month,year))) {
				i = i+1;
                table += ('<td class="other-month popup" id="' + i + monthNames[month + 1] + year + '"><span class="day">'+ i +'</span></td>');			 
              }else{
                table += ('<td class="current-month day' + (j-firstDay+1) +' popup"  id="' + (j-firstDay+1) + monthNames[month] + year + '"><span class="day">'+(j-firstDay+1)+'</span></td>');
              }
              if (j%7==6)  table += ('</tr>');
            }

            table += ('</table>');

		el.html(table);
	}
	
	function getDaysInMonth(month,year)  {
		var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
		if ((month==1)&&(year%4==0)&&((year%100!=0)||(year%400==0))){
		  return 29;
		}else{
		  return daysInMonth[month];
		}
	}
	
	
	// jQuery plugin initialisation
	$.fn.calendarWidget = function(params) {    
		calendarWidget(this, params);		
		return this; 
	}; 

})(jQuery);