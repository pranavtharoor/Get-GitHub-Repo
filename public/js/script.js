$('#submit').click(() => {
	$.ajax({
    	url:'/github/' + $('#user').val(),
   		type: 'get',
   		success: (data) => {
   			$('#repos #file-list').text('');
        if(!($('#file-list').hasClass('show-files')))
          $('#file-list').addClass('show-files');
        if($('#file-list').hasClass('show-code'))
          $('#file-list').removeClass('show-code');
   			for(x in data) {
    			$('#repos #file-list').append('<div class="list-item"><button class="' + data[x].type + ' icon" onclick="sendurl(\'' + data[x].url + '\', \'' + data[x].type + '\')"></button><div class="list-name">' + data[x].name + '</div></div>');
    		}
		}
    });
});
function sendurl(url1, type1) {
	$.ajax({
    	url:'/github/type/' + encodeURIComponent(url1) + '/' + type1,
   		type: 'get',
   		success: (data) => {
   			$('#repos #file-list').text('');
   			if(type1 == 'file') {
          if($('#file-list').hasClass('show-files'))
            $('#file-list').removeClass('show-files');
          if(!($('#file-list').hasClass('show-code')))
            $('#file-list').addClass('show-code');
   				$('#repos #file-list').append('<xmp>' + data + '</xmp>');
   			} else {
          if(!($('#file-list').hasClass('show-files')))
            $('#file-list').addClass('show-files');
          if($('#file-list').hasClass('show-code'))
            $('#file-list').removeClass('show-code');
          for(x in data) {
            $('#repos #file-list').append('<div class="list-item"><button class="' + data[x].type + ' icon" onclick="sendurl(\'' + data[x].url + '\', \'' + data[x].type + '\')"></button><div class="list-name">' + data[x].name + '</div></div>');
	    		}
	    	}
		}
    });
}