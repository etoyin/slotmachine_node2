
exports.extractDateFromISOString = (isoString) => {
    try {
      const dateObj = new Date(isoString); // Parse the ISO date string
      if (isNaN(dateObj)) {
          return null; // Handle invalid dates
      }
  
      const year = dateObj.getUTCFullYear(); // UTC Year to prevent timezone issues
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // UTC Month (0-indexed)
      const day = String(dateObj.getUTCDate()).padStart(2, '0');   // UTC Day
  
      return `${year}-${month}-${day}`;
    } catch (error) {
        console.error("Error parsing date string:", error);
        return null; // Handle parsing errors gracefully
    }
}


exports.countOccurrences = (numbers) => {
    const occurrences = {};
  
    for (const number of numbers) {
      if (occurrences[number]) {
        occurrences[number]++;
      } else {
        occurrences[number] = 1;
      }
    }
    return occurrences;
}
  
  


exports.searchByDate = async(startDateStr, endDateStr, model) => {
    const { Op } = require("sequelize");
    try {
        // Convert the date strings to date objects
        const startDate = new Date(startDateStr + 'T00:00:00Z');  // Start of day in UTC
        const endDate = new Date(endDateStr + 'T23:59:59Z');    // End of day in UTC
  
  
        // Query with Sequelize using the Op.between operator
        const results = await model.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
  
        return results;
    } catch (error) {
        console.error('Error searching click events:', error);
        throw error; // Rethrow to handle errors externally
    }
  }
  