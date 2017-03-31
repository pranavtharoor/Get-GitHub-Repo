var pwd = '', user = '', pwt = '';

$('#submit').click(() => {
  user = $('#user').val();
  getrepos();
  $('#user').blur();
});

$('#input-form').submit(function(e){
  e.preventDefault();
  user = $('#user').val()
  getrepos()
});

function getrepos() {
	$.ajax({
    	url:'/github/' + user,
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
}

function sendurl(url1, type1) {
  pwt = type1;
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
        pwd = data[0].url;
        }
		}
    });
}

$('.folder-up').click(() => {
  if(pwt == 'file' || pwt == 'repo' || pwt == 'dir') {
    pwd = pwd.split("/");
  var length = pwd.length;
  }
  if(pwd[length - 2] == 'contents' && pwt != 'file') {
    getrepos();
    pwd = pwd.join("/");
  } else if(pwt == 'file'){
    pwd.splice(-1, 1);
    pwd = pwd.join("/");
    sendurl(pwd, 'dir');
  } else if(pwt == 'repo' || pwt == 'dir') {
    pwd.splice(-2, 2);
    pwd = pwd.join("/");
    sendurl(pwd, "dir");
  }
});