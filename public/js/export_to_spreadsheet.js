function exportToCSV() {
    const table = document.getElementById("user_data");
    const rows = Array.from(table.querySelectorAll('tr'));

    // Get data from each row
    const csvData = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => cell.textContent.trim()).join(',');
    }).join('\n');

    downloadFile(csvData, 'users_data.csv', 'text/csv');
}

function exportMetricsCSV(heading) {
    const chartData = myChart.data;
    const labels = chartData.labels;
    const datasets = chartData.datasets;

   const header = ['Labels', ...datasets.map(d => d.label)].join(','); // Get Labels and Dataset Labels for headers

   const rows = [header];
  // Get rows with the label and corresponding data
  for(let i = 0; i< labels.length; i++){
     const row = [labels[i], ...datasets.map(dataset => dataset.data[i])].join(',')
     rows.push(row);
  }
    const csvData = rows.join('\n');
    const now = new Date();
    const formatted_date =  `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
    const formatted_time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  downloadFile(csvData, heading+" "+formatted_date+formatted_time+'.csv', 'text/csv')
}

function downloadFile(data, filename, type) {
  const blob = new Blob([data], { type: type });
   const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
     document.body.removeChild(a);
     URL.revokeObjectURL(url);
}
