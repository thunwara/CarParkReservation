function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue == "") {
    return;
  }

  //Get time and vehicle rid from portal form
  var startDate = new Date(g_form.getValue("start"));
  var endDate = new Date(g_form.getValue("end"));
  var nowDate = new Date().getTime();
  var regId = g_form.getValue("vehicle_registration_number");

  // Create a GlideAjax object
  var ga = new GlideAjax("ParkingFeeCalculator");
  ga.addParam("sysparm_name", "getTime");
  ga.addParam("sysparm_car_regis_number", g_form.getValue("vehicle_registration_number"));
  ga.addParam("sysparm_start_time", g_form.getValue("start"));
  ga.addParam("sysparm_end_time", g_form.getValue("end"));


  // Make the asynchronous AJAX call
  ga.getXML(timeThun);
  function timeThun(response) {
      g_form.setValue("fee", nowDate);
      // Handle the response data
      // ...
    }
}