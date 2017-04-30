(function (global) {


	//keys holds the chromatic notes for each key
	global.keys= {

		contents: ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'],

		//grouped by degree:  [ I ]    [   II   ]    [  III  ]     [   IV - V   ]    [   VI   ]     [  VII  ]
		'C':  new global.Ring(['C' ,   'Db' ,'D' ,   'Eb','E'  ,   'F' ,'Gb','G' ,   'Ab' ,'A' ,   'Bb','B'  ]),
		'C#': new global.Ring(['C#',   'D'  ,'D#',   'E' ,'E#' ,   'F#','G' ,'G#',   'A'  ,'A#',   'B' ,'B#' ]),
		'Db': new global.Ring(['Db',   'Ebb','Eb',   'Fb','F'  ,   'Gb','G' ,'Ab',   'Bbb','Bb',   'Cb','C'  ]),
		'D':  new global.Ring(['D' ,   'Eb' ,'E' ,   'F' ,'F#' ,   'G' ,'G#','A' ,   'Bb' ,'B' ,   'C' ,'C#' ]),
		'D#': new global.Ring(['D#',   'E'  ,'E#',   'F#','F##',   'G#','A' ,'A#',   'B'  ,'B#',   'C#','C##']),
		'Eb': new global.Ring(['Eb',   'Fb' ,'F' ,   'Gb','G'  ,   'Ab','A' ,'Bb',   'Cb' ,'C' ,   'Db','D'  ]),
		'E':  new global.Ring(['E' ,   'F'  ,'F#',   'G' ,'G#' ,   'A' ,'A#','B' ,   'C'  ,'C#',   'D' ,'D#' ]),
		'F':  new global.Ring(['F' ,   'Gb' ,'G' ,   'Ab','A'  ,   'Bb','B' ,'C' ,   'Db' ,'D' ,   'Eb','E'  ]),
		'F#': new global.Ring(['F#',   'G'  ,'G#',   'A' ,'A#' ,   'B' ,'C' ,'C#',   'D'  ,'D#',   'E' ,'E#' ]),
		'Gb': new global.Ring(['Gb',   'Abb','Ab',   'Bbb','Bb',   'Cb','C' ,'Db',   'Ebb','Eb',   'Fb','F'  ]),
		'G':  new global.Ring(['G' ,   'Ab' ,'A' ,   'Bb' ,'B' ,   'C' ,'Db','D' ,   'Eb' ,'E' ,   'F' ,'F#' ]),
		'G#': new global.Ring(['G#',   'A'  ,'A#',   'B' ,'B#' ,   'C#','D' ,'D#',   'E'  ,'E#',   'F#','F##']),
		'Ab': new global.Ring(['Ab',   'Bbb','Bb',   'Cb','C'  ,   'Db','D' ,'Eb',   'Fb' ,'F' ,   'Gb','G'  ]),
		'A':  new global.Ring(['A' ,   'Bb' ,'B' ,   'C' ,'C#' ,   'D' ,'Eb','E' ,   'F'  ,'F#',   'G' ,'G#' ]),
		'A#': new global.Ring(['A#',   'B'  ,'B#',   'C#','C##',   'D#','E' ,'E#',   'F#','F##',   'G#','G##']),
		'Bb': new global.Ring(['Bb',   'Cb' ,'C' ,   'Db','D'  ,   'Eb','E' ,'F' ,   'Gb','G'  ,   'Ab','A'  ]),
		'B':  new global.Ring(['B' ,   'C'  ,'C#',   'D' ,'D#' ,   'E' ,'F' ,'F#',   'G' ,'G#' ,   'A' ,'A#' ]),
	}

	//modes holds the semitones between the notes and the tonic of a key
	global.modes= {

		modern: ['Major', 'Minor'],
		ancient: ['Aeolian', 'Locrian', 'Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian'],

		//modern
		Major:    new global.Ring([0, 2, 4, 5, 7, 9, 11]),
		Minor:    new global.Ring([0, 2, 3, 5, 7, 8, 10]),
		Harmonic: new global.Ring([0, 2, 3, 5, 7, 8, 11]),
		Melodic:  new global.Ring([0, 2, 3, 5, 7, 9, 11]),

		//ancient
		Aeolian:    new global.Ring([0, 2, 3, 5, 7, 8, 10]),
		Locrian:    new global.Ring([0, 1, 3, 5, 6, 8, 10]),
		Ionian:     new global.Ring([0, 2, 4, 5, 7, 9, 11]),
		Dorian:     new global.Ring([0, 2, 3, 5, 7, 9, 10]),
		Phrygian:   new global.Ring([0, 1, 3, 5, 7, 8, 10]),
		Lydian:     new global.Ring([0, 2, 4, 6, 7, 9, 11]),
		Mixolydian: new global.Ring([0, 2, 4, 5, 7, 9, 10])
	}

	global.circleOfModes= new global.Ring(['Locrian', 'Phrygian', 'Aeolian', 'Dorian', 'Mixolydian', 'Ionian', 'Lydian']);

	global.circleOfFifths= new global.Ring(['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F']);
	global.circleOfFourths= new global.Ring(['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G']);
	
	//cadences holds the scale degrees of chord progressions according to the modes
	global.cadences= [
		[0, 4],
		[0, 3, 4],
		[0, 4, 5, 4]
	];

	//holds the base note names in every diatonic scale
	global.diatonics= new global.Ring(['C', 'D', 'E', 'F', 'G', 'A', 'B']);

	//references particular to ABC.js
	global.abcRef= {

		//ABC.js suffixes to determine octave of rendered note
		octaves: [",,,," , ",,," , ",," , "," , "" , "" , "'" , "''" , "'''", "''''"]
	}



	////////////////////////
	//helpful functions
	////////////////////////

	//takes an array containing a note name and an octave integer and returns the corresponding midi value
	global.noteToMidi= function(note) {

		//note= [name, octave]

		//switch any sharps to flat to be viewed through the key of C
		while (note[0][1] == '#') {

			note[0] = global.enharmonic(note[0], 1);
		}

		//remove any double flats so note can be viewed through C
		while (note[0][2] === 'b') {

			note[0] = global.enharmonic(note[0], -1);
		}

		return global.keys.C.indexOf(note[0]) + ((note[1] + 1) * 12)
	}

	//takes a midi value and returns the corresponding note and octave in an object
	//optional argument: sharps controls whether or not the returned note uses sharps or flats
	global.midiToNote= function(midi, sharps) {

		var note= global.keys.C.get( midi % 12);

		//if user has asked for sharps, calculate enharmonically
		if (sharps && note[1] == 'b') {

			while (note[1] == 'b') {
				note = global.enharmonic(note, -1);
			}
		}

		return [note, global.midiToOctave(midi)];
	}

	//takes a midi value and returns which octave it's in
	global.midiToOctave= function(midi) {

		return Math.floor(midi / 12) - 1;
	}

	//takes an array containing a note name and an octave integer and returns an ABC.js string representing that note
	global.noteToAbc= function(note) {

		//note= [name, octave]

		var abc;

		//determine octave
		if (note[1] <= 4) {
			abc= note[0][0].toUpperCase();
		}

		if (note[1] >= 5) {
			abc= note[0][0].toLowerCase();
		}

		//determine accidentals
		if (note[0][1] == '#') {
			abc= '^' + abc;
		}

		else if (note[0][1] == 'b') {
			abc= '_' + abc;
		}

		else if (note[0][1] == '=') {
			abc= '=' + abc;
		}

		//apply octave suffix
		abc+= global.abcRef.octaves[note[1]];

		return abc;
	}

	//takes an ABC.js string and returns the note name and octave in an object
	global.abcToNote= function(abc, flats) {

		var suffix, octave, note;

		if (abc[0] == '^') {
			suffix = '#';
			note= abc[1];
		}

		else if (abc[0] == '_') {
			suffix = 'b';
			note= abc[1];
		}

		else if (abc[0] == '=') {
			suffix = '=';
			note= abc[1];
		}

		else {
			note= abc[0];
			suffix= "";
		}


		if (note === note.toUpperCase()) {

			//note is in octave 4 or lower
			//find the number of suffixes after the note
			octave= 4 - ( abc.slice(abc.indexOf(note)).length - 1);
		}
		else {

			//note is in octave 5 or higher
			//find the number of suffixes after the note
			octave = 5 + ( abc.slice(abc.indexOf(note)).length - 1);
		}

		return [note.toUpperCase() + suffix, octave];

	}

	//takes an ABC.js string representing a note and returns it's corresponding midi value
	global.abcToMidi= function(abc) {

		return global.noteToMidi( global.abcToNote(abc) );
	}

	//takes a common decimal and returns a fraction that is readable by ABC.js
	global.decToFrac= function(float) {

		//if float is not a decimal, don't process it
		if (parseInt(float) === float) {
			return float;
		}

		//check if decimal is a multiple of 1/16th
		if (float % (1/16) === 0) {

			var numerator= float * 16;
			var denominator= 16;

			while (numerator % 2 === 0) {
				numerator = numerator/2
				denominator = denominator/2;
			}

			return numerator +'/'+ denominator;

		}
		else console.error('cannot convert non-standard decimal to fraction')
	}

	//takes a note name and an integer which represents the change in scale degree
	global.enharmonic= function(note, delta) {

		//note = [base, accidentals...]

		var result, fromDegree, toDegree, distance;

		fromDegree= global.diatonics.indexOf(note[0]);

		toDegree= fromDegree + delta;

		distance= global.modes.Major.get(fromDegree) - global.modes.Major.get(toDegree);

		//compensate for looping around the Major scale ring buffer
		distance+= -12 * Math.floor( toDegree / 7);

		//apply accidentals to the distance
		if (note[1] == '#') {
			distance+= note.length - 1;
		}

		if (note[1] == 'b') {
			distance-= note.length - 1;
		}

		//grab resulting diatonic letter
		result= global.diatonics.get(toDegree);

		//add accidentals based on distance
		while (distance > 0) {
			result+= '#';
			distance--;
		}  

		while (distance < 0) {
			result+= 'b';
			distance++;
		}

		return result;

	}

})(window);