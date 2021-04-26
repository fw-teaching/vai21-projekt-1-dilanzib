
readImg(document.getElementById("blah"));

function readImg(image) {
    var img = image;
    let redD = {}, 
        greenD ={}, 
        blueD ={};

    img.onload = function(){
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
    
        canvas.height = img.height;
        canvas.width = img.width;

        context.drawImage(img, 0, 0);

        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixelData = imgData.data;
        //console.log(pixelData);

        for (var i = 0; i < 256; i++) { //an img might not have all 256 values of each color
            redD[i] = 0;
            greenD[i] = 0;
            blueD[i] = 0;
          }
        for (var i = 0; i < pixelData.length; i += 4) { //moving forward pixel by pixel
            redD[pixelData[i]]++;
            greenD[pixelData[i + 1]]++;
            blueD[pixelData[i + 2]]++;
          }

          //console.log(greenD);
      }
    
}






