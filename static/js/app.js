// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

//function to build data table
function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
      }
    );
  });
}


// Keep track of all filters
var filters = {};

//function to update filters in the Var filters list
function updateFilters() {
    //checking that update filters is working in console log
    console.log('filtering')
    //checking that the right filters are being ammended
    console.log(filters)

    //settting variables for changing of input bars
    //recognizing box being changs
    var changedElement = d3.select(this).select("input");
    //establishing value
    var elementValue = changedElement.property("value");
    //establishing id
    var filterId = changedElement.attr("id")


    //if statement to ammend filters list
    if (elementValue) {
        filters[filterId] = elementValue;
    }
    else {
        delete filters[filterId];
    }
    filterTable();
}

//filtering data for loop based on filters list
function filterTable() {
    let filteredData = tableData;

    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value)
    });

    buildTable(filteredData)
};

// Attach an event to listen for any changes to the filter inputs 

d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);