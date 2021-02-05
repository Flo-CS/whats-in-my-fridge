// TODO : How to this object factory in other way because if usersData model is changed, we need to change this

function createDefaultProduct(barcode) {
  return {
    barcode,
    quantity: 1,
    lastDateModified: new Date(),
    data: {},
  };
}

module.exports = { createDefaultProduct };
