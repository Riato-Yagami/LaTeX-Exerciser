module.exports = (array1, array2) => {
  const elements = getCommonElements(array1, array2);
  return elements;
}

function getCommonElements(array1, array2) {
    // Initialize an empty array to store the common elements
    let common_elements = [];
    
    // Create a copy of array2 to keep track of matches
    let array2Copy = [...array2];

    // Iterate through the first array
    for (let element of array1) {
        // Find the index of the current element in array2Copy
        let index = array2Copy.indexOf(element);

        // If the element is found, it is common, so add it to the result
        if (index !== -1) {
            common_elements.push(element);
            // Remove the element from array2Copy to prevent counting it again
            array2Copy.splice(index, 1);
        }
    }

    // Return the result array containing all the common elements
    return common_elements;
}
