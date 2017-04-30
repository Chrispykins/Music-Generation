(function(global) {

	//schema for functional harmonies
	function FunctionalHarmony(options) {

		options = options || {};

		this.root= options.root || 0;
		this.third= options.third || 2;
		this.fifth= options.fifth || 4;
		this.seventh= options.seventh;  //not all chords have sevenths

		//destination set by composer
		this.destination= null;

		this.rules= {
			destinations: []
		};
	}

	FunctionalHarmony.prototype.randomDestination= function() {

		this.destination= this.rules.destinations.random();

		return this.destination;
	}

	function Tonic() {

		options= {
			root: 0,
			third: 2,
			fifth: 4
		};

		//inherit from FunctionalHarmony
		FunctionalHarmony.call(this, options);

		this.rules= {
			destinations: [0, 1, 2, 3, 4, 5, -1, -2, -3, -4, -5]
		}

	}

	Tonic.prototype= FunctionalHarmony.prototype;

	function Dominant() {

		options= {
			root: 4,
			third: 6,
			fifth: 1,
			seventh: 3
		};

		//inherit from FunctionalHarmony
		FunctionalHarmony.call(this, options);

		this.rules= {
			destinations: [0, 4, 5, 6, -1],
			seventh: [0, 2]
		}
	}

	Dominant.prototype= FunctionalHarmony.prototype;

	//function for the II-V cadence
	function PreDominant() {

		options= {
			root: 1,
			third: 3,
			fifth: 5
		}

		//inherit from FunctionalHarmony
		FunctionalHarmony.call(this, options);

		this.rules= {
			destinations: [1, 4, 6],
			root: [1, 4, -1],
			third: [3, 4],
		}
	}

	global.FunctionalHarmony= FunctionalHarmony;
	global.Tonic= Tonic;
	global.Dominant= Dominant;
	global.PreDominant= PreDominant;


})(window);