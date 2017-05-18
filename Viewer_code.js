window.onload = function() {
  document.getElementById('search').focus() ;
};

function getKeyInfo(key){
  var wikiQuery = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + key + '&prop=info&inprop=url&utf8=&format=json' ;

  var currDiv = document.getElementById('body') ;
  currDiv.style.backgroundColor = "#E1F5FE" ;
  currDiv.innerHTML =  '<div id = "">'+
        '<div class="container contailer-fluid" id="search-bar">'+
          '<div class="col-xs-1"><img src="search.svg" alt="image" id="min-pic"/></div>'+
          '<div class="input-group" style="width: 400px; margin-top: 35px ; ">'+
            '<input type="text" class="form-control" id="search">'+
            '<span class="input-group-btn">'+
              '<button class="btn btn-default" type="button" id="search-bar-btn" onclick="getKey()" style="font-weight:bold">Go!</button>'+
            '</span>'+
          '</div>'+
        '</div>'+
        '<div id = "search-result">'+
        '</div>'+
      '</div> ';

   document.getElementById('search').value = key ;
  $.ajax({
    url: wikiQuery ,
    dataType : "jsonp",
    success: function(response){
      var div = document.getElementById('search-result');
      div.innerHTML = "" ;
      for(var i = 0 ; i < response.query.search.length; i++)
      {
        var title = response.query.search[i].title ;
        var url = title.replace(/ /g, "_");
        var fullURL = "https://en.wikipedia.org/wiki/"+url ;
        div.innerHTML = div.innerHTML + '<div class="jumbotron container" style="background-color: transparent;text-align:left;height:100px ;"><span id="title"><a href = "'+fullURL+'">'+title
                      +'</a></span><br/><a href="https://en.wikipedia.org/wiki/'+url
                      +'"target="_blank">'+'https://en.wikipedia.org/wiki/'+url
                      +'</a></br><div style="width:500px;">'+response.query.search[1].snippet+'</div></div>';
      }
    }
  });
}


function getKey(){
  var key = document.getElementById("search").value;
  getKeyInfo(key) ;
}
