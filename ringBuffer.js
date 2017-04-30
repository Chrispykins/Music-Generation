////////////////////////////////////////
// Javascript Ring Buffer Implementation
// by Chris Gallegos
///////////////////////////////////////

(function(global) {
    
    //Ring Buffer class
    //Values must be passed as an array of values for the buffer
    function Ring(values) {
        
        //make sure values exists
        this.buffer= values || [];
        
        this.size= this.buffer.length;
        
        this.start= 0;
        this.end= this.size - 1;

    }

    //Returns the item at the given index
    Ring.prototype.get= function(index) {

        //adjust index for starting offset
        index+= this.start;
        
        //calculate index inside of ring size, compensate for negative numbers
        index= ( (index % this.size) + this.size) % this.size;
        
        return this.buffer[index];
    }
    
    
    //Sets the item at the given index to the given value, returns the value
    Ring.prototype.set= function(index, value) {
        
        //adjust index for starting offset
        index+= this.start;

        
        //calculate index inside of ring size, compensate for negative numbers
        index= ( (index % this.size) + this.size) % this.size;
        
        this.buffer[index]= value;
        
        return value;
    }
    
    
    //Returns the index of the first instance of the value in the buffer
    //A result of -1 indicates that the value is not in the buffer
    Ring.prototype.indexOf= function(value) {
        
        var index= this.buffer.indexOf(value);
        
        //if value is not in buffer return -1
        if (index < 0) { return -1 }
        
        //adjust index for starting offset
        index+= -this.start;
        
        //calculate index inside of ring size
        return (index + this.size) % this.size;
    }
    
   
    //shifts the start and ending indices, negative numbers allowed, returns the new start index
    Ring.prototype.rotate= function(number) {
        
        var start= this.start + number;
        var end= this.end + number;
        
        //calculate new start and end inside of ring size, compensate for negative numbers
        this.start = ( (start % this.size) + this.size) % this.size;
        this.end   = ( (end % this.size) + this.size) % this.size;
        
        return this.start;
    }

    Ring.prototype.rotateTo= function(value) {

        if (this.indexOf(value) >= 0) {
            return this.rotate( this.indexOf(value) );
        }

        return false;
    }
    
    
    //creates a new array beginning at this.start and ending at this.end
    Ring.prototype.toArray= function() {
        
        return this.buffer.slice(this.start).concat(this.buffer.slice(0, this.start));
    }

    //make sure Math.randomRange has been implemented
    if (Math.randomRange) {

        //returns a random item from buffer based on weights,
        //if no weights are provided, weight is distribruted evenly
        Ring.prototype.random= function(weights) {

            //if there are no weights, return a random item from the array
            if (!weights) {
                return this.get( Math.floor( Math.randomRange(0, this.size) ) );
            }

            //calculate the sum of all the weights
            var total= weights.reduce(function(a,b) {return a+b});

            //store a random number
            var rand= Math.randomRange(0, total);

            //set up accumulator to add up the weights
            var acc= 0;

            //check each range of values up to total to see where rand falls
            for (var i= 0, l= weights.length; i < l; i++) {

                acc+= weights[i];

                if (rand >= (acc - weights[i]) && rand <=acc) {

                    return this.get[i];
                }

            }

            console.error("Array.random() didn't find an item!");
        }
    }

    global.Ring= Ring;
    
    
})(window); //pass global scope here
//passing 'window' will make global variables behave normally