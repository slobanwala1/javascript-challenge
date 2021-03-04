// from data.js
var tableData = data;

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
  var filteredData = tableData.filter(ufo_sighting => {
    return ufo_sighting[htmlName] === data.property("value")
  })
  return filteredData
}

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
  console.log(filteredField);
  updateTable(filteredField);
})
