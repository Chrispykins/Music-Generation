(function (global) {

	function Note(name, octave, duration) {

		this.name= name || 'C';
		this.octave= global.parseInt(octave) || 4;
		this.duration= duration || 1/4;

		//how much of duration is across the bar line
		this.acrossBar= 0;

		this.abc= global.noteToAbc([name, octave]);
		this.midi= global.noteToMidi([name, octave]);
	
	}

	Note.prototype.play= function(duration) {

		duration = duration || 0.75;

		MIDI.noteOn(0, this.midi, 127);
	 	MIDI.noteOff(0, this.midi, duration);

	 	return this;
	}

	Note.prototype.enharmonic= function(delta) {

		if (isNaN(delta)) {
			return;
		}

		this.octave+= Math.floor((global.diatonics.indexOf(this.name) + delta) / 7);

		this.name= global.enharmonic(this.name, delta);

		this.abc= global.noteToAbc([this.name, this.octave]);

		return this;
	}

	Note.prototype.accidental= function() {

		if (this.name.length == 1) {

			return '=';
		}

		return this.name[1];
	}

	//sharpens a natural note, and naturalizes a flat note
	Note.prototype.sharpen= function() {

		if (this.name.length == 1) {
			this.name+= '#';
		}

		else if (this.name[1] == 'b') {
			this.name= this.name[0];
		}

		else if (this.name[1] == '#') {
			return;
		}

		this.midi++;

		this.abc= global.noteToAbc([this.name, this.octave]);

		return this;

	}


	//flattens a natural note, and naturalizes a sharp note
	Note.prototype.flatten= function() {

		if (this.name.length == 1) {
			this.name+= 'b';
		}

		else if (this.name[1] == '#') {
			this.name= this.name[0];
		}

		else if (this.name[1] == 'b') {
			return;
		}

		this.midi--;

		this.abc= global.noteToAbc([this.name, this.octave]);

		return this;

	}


	global.Note= Note;

})(window);