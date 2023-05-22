var ParkingFeeCalculator = Class.create();
ParkingFeeCalculator.prototype = {
  initialize: function () {},

  // Query data using GlideRecord
  getDateTime: function () {
    var datetime = this.getParameter('sysparm_name');
    var location = this.getParameter('sysparm_location');

    var tableName = "sc_req_item"; // Replace with the name of your table
    var ga = new GlideRecord(tableName);

    // Add query conditions if needed
    ga.addEncodedQuery(
      "priority=1active=true^cat_item.nameLIKECar Park Reservations^state=2"
    );

    // Execute the query
    ga.query();

    // Return the GlideRecord object with the query results
    return ga;
  },

  type: "ParkingFeeCalculator",
};
