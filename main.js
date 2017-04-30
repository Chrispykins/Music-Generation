(function(global) {	
	
	var sheetMusic;
	var notes;

	//string holding the id of the div where the sheet music is rendered
	var DOMstring= 'music';

	var composer= new global.Composer({timeSig: [4, 4]});
	global.composer= composer;

	function generateMusic() {

		var AbcString= "";
		AbcString+= "L:1/" + composer.timeSig[1] +'\n';
		AbcString+= 'M:'+ composer.timeSig[0] +'/'+ composer.timeSig[1] +'\n';

		var melody= composer.beginMelody();

		for (var i= 0, l= melody.measures.length; i < l; i++) {

			var currentMeasure= melody.measures[i];

			for (var j= 0, k= currentMeasure.notes.length; j < k; j++) {

				AbcString+= currentMeasure.notes[j].abc;

				var duration= currentMeasure.notes[j].duration * composer.timeSig[1];
				duration= global.decToFrac(duration);

				AbcString+= duration;	
			}
		}

		console.log(AbcString)

		sheetMusic= ABCJS.renderAbc(DOMstring, AbcString,

			{
				/*engraver*/
			},

			{
				/*parser*/
				listener: {
					hightlight: onClick
				}
			},

			{
				/**/
			}

		)[0];
	  
	

	  notes= sheetMusic.lines[0].staff[0].voices[0];

	  for (var i= 0, l= notes.length; i < l; i++) {
	    	
		if (notes[i].el_type == 'note') {
		  notes[i].midi= 60 + i;
		}
		else {
		  notes.splice(i, 1);
		  i--;
		  l--;
		}
	  }
  
	}

	function onClick(elem) {

		MIDI.noteOn(0, elem.midi, 127);
		MIDI.noteOff(0, elem.midi, 0.75);
	}

	function play() {

		for(var i= 0, l= notes.length; i < l; i++) {
			
			MIDI.noteOn(0, notes[i].midi, 127, i * 0.2);
			MIDI.noteOff(0, notes[i].midi, 0.2 + (i * 0.2) );
		}
	}

	generateMusic();

})(window);