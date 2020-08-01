module.exports = (array) => {
  return [...new Set(array)];
};

//As stated in README.md

// module.exports = (array) => {
//   return array.filter(
//     (element, index, self) =>
//       index ===
//       self.findIndex(
//         (i) =>
//           i.first_name === element.first_name &&
//           i.last_name === element.last_name
//       )
//   );
// };
