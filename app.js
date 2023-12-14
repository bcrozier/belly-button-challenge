// Assuming samples.json is in the same folder as your HTML file
const url = "samples.json";

d3.json(url).then(function(data) {
  // Assuming data has the necessary fields (names, otu_ids, sample_values, otu_labels)

  // Select the dropdown element
  const dropdown = d3.select("#selDataset");

  // Populate the dropdown with sample names
  data.names.forEach(sample => {
    dropdown.append("option")
      .attr("value", sample)
      .text(sample);
  });

  // Initial chart rendering with default sample
  updateChart(data.names[0]);

  // Event listener for dropdown change
  dropdown.on("change", function() {
    const selectedSample = this.value;
    updateChart(selectedSample);
  });

  // Function to update the chart based on the selected sample
  function updateChart(selectedSample) {
    const selectedDataIndex = data.names.indexOf(selectedSample);
    const selectedSampleValues = data.sample_values[selectedDataIndex].slice(0, 10).reverse();
    const selectedOtuLabels = data.otu_labels[selectedDataIndex].slice(0, 10).reverse();

    // Create a horizontal bar chart
    const chartContainer = d3.select("#bar");
    chartContainer.html(""); // Clear previous chart

    const chart = chartContainer.append("svg")
      .attr("width", 500)
      .attr("height", 400);

    const barHeight = 30;

    chart.selectAll("rect")
      .data(selectedSampleValues)
      .enter().append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * (barHeight + 5))
      .attr("width", d => d)
      .attr("height", barHeight)
      .attr("fill", "steelblue");

    chart.selectAll("text")
      .data(selectedOtuLabels)
      .enter().append("text")
      .attr("x", 5)
      .attr("y", (d, i) => i * (barHeight + 5) + barHeight / 2)
      .attr("dy", "0.35em")
      .text(d => d);
  }
});
