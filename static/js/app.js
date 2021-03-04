// from data.js
var tableData = data;
// Copy that gets manipulated each time
var modifiedTableCopy = data;
var resetCounter = 0;

// use tbody tag to group body content
tbody = d3.select("tbody")

function updateTable(data) {
  tbody.text("");
  data.forEach(function(alien_sighting) {
    updated_tRow = tbody.append("tr")
    Object.entries(alien_sighting).forEach(function([key, value]) {
      updated_tData = updated_tRow.append("td").text(value);
    })
  })
}

function filterData(fullData, data, htmlName, fieldName) {
  if ((data.property("value") === undefined || data.property("value").length == 0)) {
    return null;
  }
  modifiedTableCopy = fullData.filter(ufo_sighting => {
    return ufo_sighting[htmlName] === data.property("value");
  })
  return modifiedTableCopy;
}

// Get a fresh copy of original data and display it
function resetData() {
  modifiedTableCopy = tableData;
  return modifiedTableCopy;
}



// filter/submit button logic
var filterButton = d3.select("#filter-btn");

filterButton.on("click", function() {
  console.log('hit here');
  resetTable = resetData();
  updateTable(resetTable);
  // We don't want page to refresh instead we want data to update.
  d3.event.preventDefault();

  var dateEntered = d3.select("#datetime");
  var countryEntered = d3.select("#country");
  var stateEntered = d3.select("#state");
  var cityEntered = d3.select("#city");
  var ufoTypeEntered = d3.select("#shape");
  var fieldArr = [dateEntered, countryEntered, stateEntered, cityEntered, ufoTypeEntered];
  var htmlFieldArr = ["datetime", "country", "state", "city", "shape"];
  var fieldStringArr = ["dateEntered", "countryEntered", "stateEntered", "cityEntered", "ufoTypeEntered"];
  var i = 0;

  fieldArr.forEach((element) => {
    filteredField = filterData(modifiedTableCopy, element, htmlFieldArr[i], fieldStringArr[i]);
    if (filteredField != null) {
      updateTable(filteredField);
    } else {
      resetCounter++;
    }
    i++;
  });

  if (resetCounter == 5) {
    freshData = resetData();
    updateTable(freshData);
    resetCounter = 0;
  } else {
    resetCounter = 0;
  }

})

updateTable(tableData);
