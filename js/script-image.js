//previewar bilderna användaren väljer 
function readURL(img) {
  if (img.files && img.files[0]) {
      var readImage = new FileReader();
      readImage.onload = function (event) {
      $('#image')
          .attr('src', event.target.result)
      };
      readImage.readAsDataURL(img.files[0]);

      d3.selectAll("#chart > *").remove();   //raderar förra charten så att det inte den föregående blir kvar efter att en ny 
  }
}


readImg(document.getElementById("image"));

function readImg(image) {
    var img = image;
    var redD =[];
    var greenD =[]; 
    var blueD =[];
2
    img.onload = function(){
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
    
        canvas.height = img.height;
        canvas.width = img.width;

        context.drawImage(img, 0, 0);

        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixelData = imgData.data;
        
        for (var i = 0; i < 256; i++) { //en färg kanske inte har alla 256 värden, drf loopas det igenom
          redD[i] = 0;
          greenD[i] = 0;
          blueD[i] = 0;
        }
        for (var i = 0; i < pixelData.length; i += 4) { //loopar pixel by pixel 
            redD[pixelData[i]]++;
            greenD[pixelData[i + 1]]++;
            blueD[pixelData[i + 2]]++;
        }

        console.log("Röd, grön, blå")
        console.log(redD, greenD, blueD);

        /**  H I S T O G R A M M E T  */ 
        var height = 400;
        var width = 600;
        var barWidth = width/256;
      
        var chart = d3.select('#chart')
                        .append('svg')
                          .attr('height', height)
                          .attr('width', width)
                          .style('background', '#d3d3d3');
    
        
        //varje färg har olika max värden 
        var yRed = d3.scaleLinear()
                .domain([0, d3.max(redD)])
                .range([0, height-5]);
         var yGreen = d3.scaleLinear()
                .domain([0, d3.max(greenD)])
                .range([0, height-5]);
         var yBlue = d3.scaleLinear()
                .domain([0, d3.max(blueD)])
                .range([0, height-5]);


          chart.selectAll('red')
                .data(redD).enter() //loopar in redD arrayen till histogrammet
                  .append('rect')
                    .attr('x', function(d , i){
                      return i * barWidth;
                    })
                    .attr('y', function(d){
                        return height-yRed(d);
                    }) 
                    .attr('height', function(d) {
                            return yRed(d);
                      })
                    .attr('width', barWidth+0.1)
                    .style('fill', 'red')
                    .style('opacity', '0.5')

          chart.selectAll('green')
                .data(greenD).enter()
                  .append('rect')
                    .attr('x', function(d , i){
                      return i * barWidth;
                    })
                    .attr('y', function(d){
                        return height-yGreen(d);
                    }) 
                    .attr('height', function(d) {
                            return yGreen(d);
                      })
                    .attr('width', barWidth+0.1)
                    .style('fill', 'green')
                    .style('opacity', '0.5')

           chart.selectAll('blue')
                .data(blueD).enter()
                  .append('rect')
                    .attr('x', function(d , i){
                      return i * barWidth;
                    })
                    .attr('y', function(d){
                        return height-yBlue(d);
                    }) 
                    .attr('height', function(d) {
                            return yBlue(d);
                      })
                    .attr('width', barWidth+0.1)
                    .style('fill', 'blue')
                    .style('opacity', '0.5')

      
      }
 
}









  





