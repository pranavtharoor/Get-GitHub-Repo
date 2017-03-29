$('#submit').click(() => {
	$.ajax({
    	url:'/github/' + $('#user').val(),
   		type: 'get',
   		success: (data) => {
   			$('#repos table').text('');
   			for(x in data) {
    			$('#repos table').append('<tr><td>' + data[x].type + '</td><td><button class="' + data[x].type + '" onclick="sendurl(\'' + data[x].url + '\', \'' + data[x].type + '\')">' + data[x].name + '</button></td></tr>');
    		}
		}
    });
});
function sendurl(url1, type1) {
	$.ajax({
    	url:'/github/type/' + encodeURIComponent(url1) + '/' + type1,
   		type: 'get',
   		success: (data) => {
   			$('#repos table').text('');
   			if(type1 == 'file') {
   				$('#repos table').append('<xmp>' + data + '</xmp>');
   			} else {
	   			for(x in data) {
	    			$('#repos table').append('<tr><td>' + data[x].type + '</td><td><button class="' + data[x].type + '" onclick="sendurl(\'' + data[x].url + '\', \'' + data[x].type + '\')">' + data[x].name + '</button></td></tr>');
	    		}
	    	}
		}
    });
}