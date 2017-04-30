(function(global) {


	function Measure(composer) {

		this.composer= composer || global.composer || new global.Composer();

		this.timeSig= [composer.timeSig[0], composer.timeSig[1]];
		this.clef= composer.clef;

		this.notes= [];
		this.harmonies= [];

		this.breakpoints= 1;

		//set triple time beam breaks every three eighth notes
		if (this.timeSig[0] % 6 === 0) {
			this.breakpoints= 3 / this.timeSig[1] * 4;
		}

		//set odd time signature beam breaks to the odd number
		else if ((this.timeSig[0] / this.timeSig[1] * 4) % 1 !== 0) {
			this.breakpoints= this.timeSig[0] / this.timeSig[1] * 4;
		}
	}

	global.Measure= Measure;

})(window);