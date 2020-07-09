function shuffle(a) {
	for (let i = a.length - 1; i >= 1; --i) {
		let j = Math.floor(Math.random() * (i + 1));
		let tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
}


function generateInput(n) {
	let numbers = [];
	let candidates = [];

	for (let j = 0; j < n; ++j) {
		candidates.push(j);
	}

	for (let i = 0; i < n; ++i) {
		shuffle(candidates);
		numbers.push(candidates);
	}

	return numbers;
}


function oracle(matchmaker) {
	let numTests = 10; // Change this to some reasonably large value
	for (let i = 0; i < numTests; ++i) {
		let n = 20; // Change this to some reasonable size
		let companies = generateInput(n);
		let candidates = generateInput(n);
		let hires = matchmaker(companies, candidates);
		//console.log(hires);
		test('Hires length is correct', function () {
			assert(companies.length === hires.length);
		});
		// Write your tests here


		test('unique elements', function () {
			for (let i = 0; i < hires.length; ++i) {
				assert(hires[i].company !== hires[hires.length - i - 1].company);
				assert(hires[i].candidate !== hires[hires.length - i - 1].candidate);
			}
		});

		test('stable', function () {
			let oracle = true;
			for (let i = 0; i < hires.length; ++i) {
				let currentComp = hires[i].company;
				for (let j = 0; j < hires.length; ++j) {
					let currentCand = companies[currentComp][j];
					if (currentCand === hires[i].candidate) {
						break;
					}
					let compPref = n;
					for (let k = 0; k < hires.length; ++k) {
						if (currentCand === hires[k].candidate) {
							compPref = hires[k].company;
						}
					}


					for (let l = 0; l < hires.length; ++l) {

						if (candidates[currentCand][l] === compPref) {
							break;
						}
						if (candidates[currentCand][l] === currentComp) {
							oracle = false;
						}
					}

				}

			}
			assert(oracle);
		});


	}
}
oracle(wheat1);
