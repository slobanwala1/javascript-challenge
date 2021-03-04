// from data.js
var tableData = data;
var tableCopy = data;
var resetCounter = 0;
var resetFlag = false;
// YOUR CODE HERE!
// use tbody tag to group body content
tbody = d3.select("tbody")

function updateTable(data) {
  // console.log(data);
  tbody.text("");

  data.forEach(function(alien_sighting) {
    updated_tRow = tbody.append("tr")
    Object.entries(alien_sighting).forEach(function([key, value]) {
      //console.log(key+value);
      updated_tData = updated_tRow.append("td").text(value);
    })
  })
}

function filterData(data, htmlName, fieldName) {
  console.log('new data:');
  console.log(data.property("value"));
  if ((data.property("value") === undefined || data.property("value").length == 0) && resetFlag == false) {
    console.log('data is empty');
    return null;
  }
  var filteredData = tableData.filter(ufo_sighting => {
    return ufo_sighting[htmlName] === data.property("value");
  })
  // console.log(filteredData);
  return filteredData;
}

function resetData() {
  return tableCopy;
}
// var filterInputs = d3.selectAll('.form-control');
// function clearData() {
//   filters = {};
//
//       // Sets every input field to empty
//       filterInputs._groups[0].forEach(entry => {
//           if (entry.value != 0) {
//               d3.select('#' + entry.id).node().value = "";
//           }
//       });
// }

updateTable(tableData);

// filter/submit button logic
var filterButton = d3.select("#filter-btn");

filterButton.on("click", function() {
  // We don't want page to refresh instead we want data to update.
  d3.event.preventDefault();

  var dateEntered = d3.select("#datetime");
  var countryEntered = d3.select("#country");
  var stateEntered = d3.select("#state");
  var cityEntered = d3.select("#city");
  var ufoTypeEntered = d3.select("#shape");
  // console.log(dateEntered.property("value"));
  filteredField = filterData(dateEntered, "datetime", "dateEntered");
  if (filteredField != null) {
    console.log('1');
    updateTable(filteredField);
  } else {
    resetCounter++;
  }
  filteredField = filterData(countryEntered, "country", "countryEntered");
  if (filteredField != null) {
    console.log('2');
    updateTable(filteredField);
  } else {
    resetCounter++;
  }

  filteredField = filterData(stateEntered, "state", "stateEntered");
  if (filteredField != null) {
    console.log('3');
    updateTable(filteredField);
  } else {
    resetCounter++;
  }

  filteredField = filterData(cityEntered, "city", "cityEntered");
  if (filteredField != null) {
    console.log('4');
    updateTable(filteredField);
  } else {
    resetCounter++;
  }

  filteredField = filterData(ufoTypeEntered, "shape", "ufoTypeEntered");
  if (filteredField != null) {
    console.log('5');
    updateTable(filteredField);
  } else {
    resetCounter++;
  }

  if (resetCounter == 5) {
    console.log('reset data');
    resetFlag = true;
    freshData = resetData();
    updateTable(freshData);
    resetCounter = 0;
    resetFlag = false;
  } else {
    resetCounter = 0;
    resetFlag = false;
  }

})
