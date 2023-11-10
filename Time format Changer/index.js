function convertTo24HrsFormat(time) {
	// my solution
	const match = time.match(/(\d+):(\d+)(\w+)/); 
	const hour = parseInt(match[1]); 
    const minute = match[2]; 
    const period = match[3]; 
    let formattedHour = hour; 
  
    if (period === 'PM' && hour < 12) { 
        formattedHour += 12; 
		return `${formattedHour}:${minute}`;
    }else if(period==='AM'&& hour ===12){
		formattedHour=0;
		return `00:${minute}`;
	}else if(period === 'AM' && hour < 10){
		return `0${formattedHour}:${minute}`;
	}
    return `${formattedHour}:${minute}`; 
}

console.log(`Converted time: ${convertTo24HrsFormat("1:45PM")}`); // Output should be '13:45'
console.log(`Converted time: ${convertTo24HrsFormat("03:45PM")}`); // Output should be '15:45'


// offical method
function convertTo24HrsFormat(time) {
  var timeTextLower = time.toLowerCase();
  let [hours,mins] = timeTextLower.split(":");
  if(timeTextLower.endsWith("am")){
    hours=hours==12?"0":hours;
  }else if(imeTextLower.endsWith("pm")){
    hours=hours==12?hours:String(+hours+12);
  }
  return hours.padStart(2,0)+":" +min.slice(0,-2).padStart(2,0);
  
}
console.log(`Converted time: ${convertTo24HrsFormat("1:45PM")}`); // Output should be '13:45'
