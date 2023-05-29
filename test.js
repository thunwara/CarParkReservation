var ParkingFeeCalculator = Class.create();
ParkingFeeCalculator.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getTime: function() {
    // Retrieve parameters using getParameter() method
    var carRID = this.getParameter('sysparm_car_regis_number');
    var startDateTime = this.getParameter('sysparm_start_time');
    var endDateTime = this.getParameter('sysparm_end_time');

    // Query Record
    // ...
  },
  type: 'ParkingFeeCalculator'
});
