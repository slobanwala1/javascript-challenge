// from data.js
var tableData = data;

// YOUR CODE HERE!
// use tbody tag to group body content
tbody = d3.select("tbody")

function updateTable(data) {
  tbody.text("")

  data.forEach(function(alien_sighting) {
    updated_tRow = tbody.append("tr")
    Object.entries(alien_sighting).forEach(function([key, value]) {
      updated_tData = updated_tRow.append("td").text(value)
    })
  })
}

updateTable(tableData)
