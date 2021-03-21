// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (num, arr) => {
  return ({
    specimenNum: num,
    _dna: arr,
    get dna () {
      return this._dna;
    },
    mutate() {
      let newBase = this._dna;
      const randomBase = Math.floor(Math.random() * this._dna.length);
      while (true) {
        const base = returnRandBase();
        if (this._dna[randomBase] !== base) {
          newBase.splice(randomBase, 1, base);
          break;
        }
      }
      return newBase;
    },
    compareDNA(obj) {
      const commonDNA = this._dna.filter((element, index) => {
        if (element === obj._dna[index]){
          return element;
        }
      })
      const percentage = Math.floor((100 * commonDNA.length) / this._dna.length);
      return `specimen #${this.specimenNum} and specimen #${obj.specimenNum} have ${percentage}% DNA in common`
    },
    willLikelySurvive() {
      const baseSurvive = this._dna.filter((element) => {
        if (element === 'G' || element === 'C'){
          return element;
        }
      })
      if (Math.floor((100*baseSurvive.length)/this._dna.length) >= 60){
        return true;
      } else {
        return false;
      }
    },
    complementStrand() {
      const complement = this._dna.map((base) => {
        switch(base){
          case 'A':
            return 'T';
            break;
          case 'T':
            return 'A';
            break;
          case 'C':
            return 'G';
            break;
          case 'G':
            return 'C';
            break;
        }
      })
      return complement;
    }
  });
}

let numpAequor = 1;
const instancespAequor = [];
while (numpAequor<=30){
  const base = pAequorFactory(numpAequor, mockUpStrand());
  if (base.willLikelySurvive()){
    instancespAequor.push(base.dna);
    numpAequor++;
  } else {
    continue;
  }
}

// Print 30 instances for experiments
console.log(instancespAequor);
console.log();
// Check the complementStrand method
console.log("=====================complementStrand METHOD");
const base = pAequorFactory(1, mockUpStrand());
console.log(base.dna);
console.log(base.complementStrand());
console.log();

// Get the most related instances
const identicalInst = [];
while (true){
  const firstDNA = pAequorFactory(1, mockUpStrand());
  const secondDNA = pAequorFactory(2, mockUpStrand());
  const percentage = firstDNA.compareDNA(secondDNA).match(/[0-9]{2}/g)
  if (percentage > 90) {
    identicalInst.push(firstDNA.dna);
    identicalInst.push(secondDNA.dna);
    console.log("=====================Identical Instances");
    console.log(`Percentage: ${percentage}`);
    break;
  }
}

console.log(identicalInst);
