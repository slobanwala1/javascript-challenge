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
      updated_tData = updated_tRow.append("td").text(value);
    })
  })
}

function filterData(data, htmlName, fieldName) {
  return tableData.filter(ufo_sighting => {
    console.log(ufo_sighting.htmlName);
    console.log(data.property("value"));
    ufo_sighting.htmlName === data.property("value") || !data.property("value");
  })
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

  filteredField = filterData(dateEntered, "datetime", "dateEntered");
  updateTable(filteredField);
})
