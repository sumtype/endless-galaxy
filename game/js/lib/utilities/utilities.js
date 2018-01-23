function countKeyValuePairs(obj) {
   var count = 0;
   for (var prop in obj) if (obj.hasOwnProperty(prop)) count++;
   return count;
}
function countSpecificKeyValuePairs(obj, key) {
   var count = 0;
   for (var prop in obj) if (obj.hasOwnProperty(prop) && prop.toString().indexOf(key) !== -1) count++;
   return count;
}
