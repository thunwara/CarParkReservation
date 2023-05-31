function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue === "") {
    return;
  }

  // Get time and vehicle rid from portal form
  var startDate = new Date(g_form.getValue("start"));
  var endDate = new Date(g_form.getValue("end"));
  var nowDate = new Date().getTime();
  var regId = g_form.getValue("vehicle_registration_number");

  // Check if startDate is before now or endDate is before startDate or endDate is before nowDate
  if (nowDate > startDate || endDate < startDate || endDate < nowDate) {
    g_form.addErrorMessage("Your start date or end date is not correct.");
    g_form.clearValue("start");
    g_form.clearValue("end");
  } else {
    // Create a GlideAjax object
    var ga = new GlideAjax("ParkingFeeCalculator");
    ga.addParam("sysparm_name", "getTime");
    ga.addParam("sysparm_car_regis_number", regId);
    ga.addParam("sysparm_start_time", g_form.getValue("start"));
    ga.addParam("sysparm_end_time", g_form.getValue("end"));

    // Make the asynchronous AJAX call
    ga.getXML(timeThun);
  }

  function timeThun(response) {
    var answer = response.responseXML.documentElement.getAttribute("answer");
    alert(answer);
    g_form.setValue("fee", answer);

    // Retrieve additional parameters passed from server script
    var parameter1 =
      response.responseXML.documentElement.getAttribute("parameter1");
    var parameter2 =
      response.responseXML.documentElement.getAttribute("parameter2");

    // Use the parameters as needed
    console.log("Parameter 1: " + parameter1);
    console.log("Parameter 2: " + parameter2);
  }
}
