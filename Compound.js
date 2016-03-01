function subscript(sub){
  return sub ? "_" + sub : sub;
}
var Compound = (function() {

  function getIons(ions, type){
    var ionArray = new Array;
    for(var i in ions) {
      if(type == "positive" && ions[i]["charge"] > 0){
        ionArray.push(ions[i]);
      }
      if(type == "negative" && ions[i]["charge"] < 0){
        ionArray.push(ions[i]);
      }
    }
    return ionArray;
  }

  function generateCompound(cation, anion) {
    ions = [
      {"name": "lithium", "symbol": "Li", "type": "metal", "charge": 1, "ionic_name": "lithium"},
      {"name": "sodium", "symbol": "Na", "type": "metal", "charge": 1, "ionic_name": "sodium"},
      {"name": "potassium", "symbol": "K", "type": "metal", "charge": 1, "ionic_name": "potassium"},
      {"name": "beryllium", "symbol": "Be", "type": "metal", "charge": 2, "ionic_name": "beryllium"},  
      {"name": "magnesium", "symbol": "Mg", "type": "metal", "charge": 2, "ionic_name": "magnesium"},  
      {"name": "calcium", "symbol": "Ca", "type": "metal", "charge": 2, "ionic_name": "calcium"},  
      {"name": "aluminum", "symbol": "Al", "type": "metal", "charge": 3, "ionic_name": "aluminum"},  
      {"name": "fluorine", "symbol": "F", "type": "nonmetal", "charge": -1, "ionic_name": "fluoride"},  
      {"name": "chlorine", "symbol": "Cl", "type": "nonmetal", "charge": -1, "ionic_name": "chloride"},  
      {"name": "bromine", "symbol": "Br", "type": "nonmetal", "charge": -1, "ionic_name": "bromide"},
      {"name": "oxygen", "symbol": "O", "type": "nonmetal", "charge": -2, "ionic_name": "oxide"},  
      {"name": "sulfur", "symbol": "S", "type": "nonmetal", "charge": -2, "ionic_name": "sulfide"},  
    ];

    cations = getIons(ions, "positive");
    anions = getIons(ions, "negative");

    compound = {};
    if(!cation || !anion){
      cation_index = Math.floor(Math.random() * cations.length);
      anion_index = Math.floor(Math.random() * anions.length);

      cation = cations[cation_index];
      anion = anions[anion_index];
    }

    compound["cation"] = cation;
    compound["anion"] = anion;

    compound["name"] = cation["ionic_name"] + " " + anion["ionic_name"];

    if (cation["charge"] == Math.abs(anion["charge"])){
      compound["cation_number"] = 1;
      compound["anion_number"] = 1;    
    }
    else{
      compound["cation_number"] = Math.abs(anion["charge"]);
      compound["anion_number"] = cation["charge"];
    }

    if (compound["cation_number"] == 1){
      cation["subscript"] = "";
    }else{
      cation["subscript"] = compound["cation_number"];
    }
    if (compound["anion_number"] == 1){
      anion["subscript"] = "";
    }else{
      anion["subscript"] = compound["anion_number"];
    }

    compound["formula"] = cation["symbol"] + subscript(cation["subscript"]) + anion["symbol"] + subscript(anion["subscript"]);
    // console.log(compound);
    return compound;
  } 

  return {
    generateCompound: generateCompound
  };          
}());