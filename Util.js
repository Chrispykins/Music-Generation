Math.randomRange= function(min, max) {
    return ( Math.random() * (max - min) ) + min;
}

//takes an array and returns a random item from that array
Array.prototype.random= function(weights) {
    
    //if there are no weights, return a random item from the array
    if (!weights) {
        return this[Math.floor( Math.randomRange(0, this.length) )];
    }
    
    //calculate the sum of all the weights
    var total= weights.reduce(function(a,b) {return a+b});
    
    //store a random number
    var rand= Math.randomRange(0, total);
    
    //set up accumulator to add up the weights
    var acc= 0
    
    //check each range of values up to total to see where rand falls
    for (var i= 0, l= weights.length; i < l; i++) {
        
        acc+= weights[i]
        
        if (rand >= (acc - weights[i]) && rand <= acc) {
            
            return this[i];
        }
    }
    
    console.error("Array.random() didn't find an item!")
}

//
Array.prototype.closestTo= function(value) {
 
   var result= this[0];
   var closest= Math.abs(this[0] - value);
   
   for (var i= 0, l= this.length; i < l; i++) {
       
       if (Math.abs(this[i] - value) < closest) {
           closest= Math.abs(this[i] - value);
           result= this[i];
       }
       
       
   }
   
   return result;
}

Random= {};

Random.range= Math.randomRange;

//returns a random integer between and including integers min and max
Random.int= function(min, max) {

  //round max and min down
  min= parseInt(min);
  max= parseInt(max);

  //flip max and min if they are in the wrong spots
  if (min > max) {
    var temp= min;
    min= max;
    max= temp;
  }

  return Math.floor( Random.range(min, max + 1) );
}