// Write your JavaScript code here!
window.addEventListener("DOMContentLoaded", init);

function init() {
   let URL = "https://handlers.education.launchcode.org/static/planets.json";
   fetch(URL).then(function (response) {
      response.json().then(function (destinations) {
         let currentDestination = destinations[Math.floor(Math.random() * destinations.length)];
         let missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML =
            `<h2>Mission Destination</h2>
             <ol>
                <li>Name: ${currentDestination.name}</li>
                <li>Diameter: ${currentDestination.diameter}</li>
                <li>Star: ${currentDestination.star}</li>
                <li>Distance from Earth: ${currentDestination.distance}</li>
                <li>Number of Moons: ${currentDestination.moons}</li>
             </ol>
                <img src="${currentDestination.image}" height=250px></img>`
      });
   });

   let pilotNameInput = document.querySelector("input[name=pilotName]");
   let copilotNameInput = document.querySelector("input[name=copilotName]");
   let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
   let cargoMassInput = document.querySelector("input[name=cargoMass]");
   document.addEventListener("submit", function (event) {
      let allInputs = getInputObjects();
      for (let input of allInputs) {
         input.element.style = "";
         input.element.placeholder = "";
         if (!input.isSet || !input.isValid) {
            input.element.placeholder = input.error;
            input.element.style = "box-shadow: 0 0 2px 1px red;";
         }
      }
      let errorCheck = allInputs.some(input => input.isSet === false);
      errorCheck = (errorCheck << 1) + allInputs.some(input => input.isValid === false);
      errorCheck & 2 ? alert("All fields are required!") : null;
      errorCheck & 1 ? alert("Please input valid information for each field!") : null;
      if (!errorCheck) {
         let faultyItems = document.getElementById("faultyItems");
         let launchStatus = document.getElementById("launchStatus");
         let fuelStatus = Number(fuelLevelInput.value.split(",").join("")) > 10000;
         let cargoStatus = Number(cargoMassInput.value.split(",").join("")) < 10000;
         let readyToLaunch = fuelStatus && cargoStatus;
         faultyItems.innerHTML =
            `<ol>
                 <li id="pilotStatus">Pilot ${pilotNameInput.value} is ready for launch.</li>
                 <li id="copilotStatus">Co-pilot ${copilotNameInput.value} is ready for launch.</li>
                 <li id="fuelStatus">Fuel level ${fuelStatus ? "high enough" : "too low"} for launch</li>
                 <li id="cargoStatus">Cargo mass ${cargoStatus ? "low enough" : "too high"} for launch</li>
             </ol>`
         launchStatus.innerHTML = readyToLaunch ? "Shuttle Ready For Launch" : "Shuttle Not Ready for Launch";
         launchStatus.style.color = readyToLaunch ? "green" : "red";
         faultyItems.style.visibility = "visible";
      }
      else {
         faultyItems.style.visibility = "hidden";
         launchStatus.innerHTML = "Awaiting Proper Input...";
         launchStatus.style.color = "inherit";
      }
      event.preventDefault();
   });


   function getInputObjects() {
      let allInputsObject = [{
         element: pilotNameInput,
         isSet: pilotNameInput.value !== "",
         isValid: isValid(pilotNameInput.value, 'englishName'),
         error: "A Valid Pilot Name must be entered."
      },
      {
         element: copilotNameInput,
         isSet: copilotNameInput.value !== "",
         isValid: isValid(copilotNameInput.value, 'englishName'),
         error: "a Valid Co-pilot Name must be entered."
      },
      {
         element: fuelLevelInput,
         isSet: fuelLevelInput.value !== "",
         isValid: isValid(fuelLevelInput.value, 'positiveNumber'),
         error: "A Valid Positive Number Must Be Entered."
      },
      {
         element: cargoMassInput,
         isSet: cargoMassInput.value !== "",
         isValid: isValid(cargoMassInput.value, 'positiveNumber'),
         error: "A Valid Positive Number Must Be Entered."
      }];
      return allInputsObject;
   }


   function isValid(aString, typeComparator) {
      switch (typeComparator) {
         case 'englishName':
            let validEnglishName = new RegExp('^[a-zA-Z ]+$|^$');
            return validEnglishName.test(aString);
         case 'positiveNumber':
            let positiveNumber = new RegExp('^[0-9]*(.)?([0-9])*$|^$|^[0-9]{1,3}(,[0-9]{3})*(.)?([0-9])*$');
            return positiveNumber.test(aString);
         default:
            alert("an error occurred in parsing input");
            return false;
      }
   }
}







