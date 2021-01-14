let entry =  windows.prompt("Enter url for image");
let img = lib220.loadImageFromURL(entry);
//imageMapXY(img: Image, func:((img: Image, x: number, y: number) => num[]): Image
// Function goes through every pixel applying the effect necessary
function imageMapXY(img, f){
  let output = img.copy();
  for(let i = 0; i < img.width; ++i){
    for(let j =0; j < img.height; ++j){
      output.setPixel(i,j, f(img, i, j));
    }
  }
  return output ;
}
//Helper function for applying grayscale effect on a pixel by setting all pixel values
// to their average.
function HelperGs(img,i,j){
  let pixel = img.getPixel(i,j);
  let m = (pixel[0] + pixel[1] + pixel[2])/3;
  let output = pixel.map(function apply(i){ i= m; return i;});
  return output;
}
// Applies grayscale effect on an entire img with the helper method. 
function mapToGrayscale(img){
  return imageMapXY(img, HelperGs);
}
// Highlights the edges of the img, by going to edges and and getting average of it's surrounding pixels
function highlightEdges(img){
  let b = 0;
  let output = img.copy();
  for(let i = 0; i < img.width ; ++i){
    for(let j = 0 ; j < img.height; j = j+1){
      let a = output.getPixel(i,j);
      if(i+1 === img.width){
         b = output.getPixel(0,j);
      }
      else{
        b = output.getPixel(i+1, j) ;
      } 
      let m1 = (a[0] +a[1] +a[2]) / 3 ;
      let m2 = (b[0] +b[1] +b[2]) / 3;
      let pass = Math.abs(m1-m2) ;
      output.setPixel(i,j,[pass, pass, pass]);
    }
  }
  return output;
}
//imageMask(img: Image,func: (img: Image, x: number, y: number) => boolean, maskValue: Pixel): Image
// HOF which masks an image with given maskValue 
function imageMask(img, f, maskValue){
  // HOF which applies maskValue if pixel isn't the same as original image
  // hlprIm((img: Image, x: number, y: number): Pixel
  function hlprIm(img, i, j){
    if(f(img,i,j) === true){
      return maskValue;
    }
    else{
      return img.getPixel(i,j);
    }
  }
  let tmp = imageMapXY(img, hlprIm);
    return tmp;
}
//blurPixel(img: Image, x: number, y: number): Pixel
// Function for blurring an individual pixel using the average of its 8 neighbouring pixels
function blurPixel(img,i,j){
  let rslt = [0,0,0];
  let ctr  = 0;
  for(let x = i-1; x < i+2 ; ++x){
   for(let y = j-1; y < j+2; ++y){
    if(x < img.width && y < img.height && x >= 0 && y >= 0){
      let tmpPixel = img.getPixel(x,y);
      rslt[0] = rslt[0] + tmpPixel[0];
      rslt[1] = rslt[1] + tmpPixel[1];
      rslt[2] = rslt[2] + tmpPixel[2];
      ++ctr;
    }
  }
}
  rslt = [rslt[0]/ctr, rslt[1]/ctr,rslt[2]/ctr];
  return rslt;
}
//blurImage(img: Image): Image
// HOF for Blurring an Image 
function blurImage(img){
  return imageMapXY(img, blurPixel);
}

//saturateHigh(img: Image): Image
// HOF takes in an img and saturates it with the help of saturatePixel
function saturateHigh(img){
// saturatePixel(img: Image, i: Number, j: Number): Pixel
// HOF which saturates an individual pixel ,it takes the args
// image, and x and y coordinates and returns a modified pixel.
  function saturatePixel(img,i,j){
    let pixel = img.getPixel(i,j);
    let output = pixel.map(function tmp(i){ if(i > 0.7){ i =1.0;} return i;});
    return output;
  }
  return imageMapXY(img, saturatePixel);
}
//blackenLow(img: Image): Image
// HOF takes in an img and blackens it with the help of blackenPixel
function blackenLow(img){
//blackenPixel(img: Image, i: Number, j: Number): Pixel
// HOF which blackens an individual pixel with the help of blknOrSatPixel,it takes the args
// image, and x and y coordinates for the image and returns a modified pixel.    
  function blackenPixel(img,i,j){
    let pixel = img.getPixel(i,j);
    let output = pixel.map(function tmp(i){ if(i < 0.3){ i = 0.0;}return i;});
    return output;
  }
  return imageMapXY(img, blackenPixel);
}
  const expr = windows.prompt("Enter Gs for grayscale, H for highlighted edges, Bl for blur, S for saturation, B for blacken and M for masking the image");
  switch(expr){
    case "Gs":
    console.log(mapToGrayscale(img).show());
    break;
    case "H":
    console.log(highlightEdges(img).show());
    break;
    case "Bl":
    console.log( blurImage(img).show());
    break;
    case "S":
    console.log(saturateHigh(img).show());
    break;
    case "B":
    console.log(blackenLow(img).show());
    break;
    case "M":
    console.log(imageMask(img, f, maskValue).show());
    break;
    default:
    console.log("out of options");
  }

    
