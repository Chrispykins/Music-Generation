(function(global) {

	//controller function for constructing melody
	function Composer(options) {

		options= options || {};

		this.timeSig= options.timeSig || [4, 4];
		this.clef= options.clef || 'Treble';

		this.key= options.key || global.keys.C;
		this.mode= options.mode || global.modes.Major;

		this.range= options.range || [60, 84];

		//this.measures= [];

		this.rhythmSchema= {};

		this.melody= new Melody(this);
	}

	Composer.prototype.randomRhythm= function(options) {

		options= options || {};

		var maxDivisions= options.maxDivisions || 3;
		var numMeasures= options.numMeasures || Random.int(1, 2);

		var numBeats= numMeasures * this.timeSig[0];

		var partitions= [];

		///////////////////////////////////////////////////////////////

		//function executes when partition should be divided in half
		function divideByTwo() {

			//always divide on the first pass, afterward divide randomly
			if (Random.int(0, 1) || i === 0) {

				console.log('divide partition', k, 'in half')

				partitions.splice(k, 1, current/2, current/2);
				k++;
				l++;
			}
		}

		//function executes when partition is a multiple of three
		function divideByThree() {

			//always divide on first pass, randomly afterward
			if (Random.int(0, 1) || i === 0) {

				//choose randomly between triple or swung
				if (Random.int(0, 1)) {

					console.log('divide partition', k, 'in thirds')

					partitions.splice(k, 1, current/3, current/3, current/3);
					k+= 2;
					l+= 2;

				}
				else {

					console.log('swing partition', k)

					partitions.splice(k, 1, current * 2/3, current/3);
					k++;
					l++;
				}
			}
		}

		//function executes when there is no neat way to divide the partition
		function divideUneven() {

			//always divide on first pass, randomly afterward
			if (Random.int(0, 1) || i === 0) {

				//choose division point
				var div= Random.int(1, current - 1);

				partitions.splice(k, 1, div, current - div);
				k++;
				l++;
			}
		}

		///////////////////////////////////////////////////////////////////

		//parition first by bar
		for (var i= 0; i < numMeasures; i++) {
			partitions.push(this.timeSig[0])
		}

		//maxDivisions defines how many passes over the rhythm we do
		for (i= 0; i < maxDivisions; i++) {

			//pass over each partition and divide it further
			for (var k= 0, l= partitions.length; k < l; k++) {

				var current= partitions[k];

				//if current partition is divisible by two, divide it neatly in half
				if (current % 2 === 0 || current <= 1) {

					divideByTwo();
				}

				//else if current partition is divisible by three, divide in thirds or swing it
				else if (current % 3 === 0) {

					divideByThree();
				}

				//else the time signature is odd and must be divided unevenly
				else {

					divideUneven();
				}	
			}
		}

		//divide each partition by the length of a beat to arrive at musical time
		for (i= 0, l= partitions.length; i < l; i++) {
			partitions[i]= partitions[i] / this.timeSig[1];
		}

		console.log(partitions)
		return { beats: partitions, length: numBeats, numMeasures: numMeasures };

	}

	Composer.prototype.beginMelody= function() {

		var composer= this;

		var harmony= this.melody.currentHarmony;
		harmony= new global.Tonic();

		var rhythm= this.randomRhythm();
		this.rhythmSchema= rhythm;

		var currentMeasure= new global.Measure(this);

		function determineNote(beat) {

			//if (beat === 0) {

				var startPosition= ['root', 'third', 'fifth'].random();
				var scaleDegree= harmony[startPosition];
			//}
			//else return false;

			var name= composer.key.get( composer.mode.get(scaleDegree) );

			return new global.Note(name, 4, rhythm.beats[beat]);

		}

		var acc= 0;
		for (var i= 0, l= rhythm.beats.length; i < l; i++) {

			//if (acc >= this.timeSig[0] / this.timeSig[1]) {
			//	break;
			//}

			var note= determineNote(i);

			if (!note) continue;

			currentMeasure.notes.push(note);

			acc+= rhythm.beats[i];	
		}

		this.melody.measures.push(currentMeasure);

		return this.melody;
	}


	//data structure to hang notes on
	function Melody(composer) {

		this.composer= composer;

		//the melody consists of a series of measures which contain notes
		this.measures= [];

		this.schema= {
			head: [],
			tail: []
		}

		this.currentHarmony= null;
	}


	global.Composer= Composer;
	global.Melody= Melody;

})(window);