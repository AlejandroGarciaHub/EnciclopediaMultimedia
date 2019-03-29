jQuery(document).ready(function() {
  checkContainer();
});

function checkContainer () {
  const path = require('path')
  const url = require('url')

  if($('.texto-inner').is(':visible')){ //if the container is visible on the page
    readTextFile();  //Adds a grid to the html
  } else {
    setTimeout(checkContainer, 50); //wait 50 ms, then try again
  }
}

function readTextFile()
{
  const path = require('path')
  const url = require('url')

  let file='tecnicas'

  const element=event.srcElement.id

    file=element


  const fullPath=path.join(__dirname, '../../resources/texts/'+file+'.txt')
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", fullPath, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
//                alert(allText);
                $('#texto-inner').text(allText)
//                $('#subtitulo').text(subtitulo)
//                $('#imagen').attr('src','../../resources/imgs/2d/'+imagen+'.jpg')

            }
        }
    }
    rawFile.send(null);
}
