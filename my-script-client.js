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
      ga.addParam("sysparm_name", "calculateFee");
      ga.addParam("sysparm_car_regis_number", regId);
      ga.addParam("sysparm_start_time", g_form.getValue("start"));
      ga.addParam("sysparm_end_time", g_form.getValue("end"));

      // Make the asynchronous AJAX call
      ga.getXML(timeThunCallback);
  }

  function timeThunCallback(response) {
      var jsonResponse = response.responseXML.documentElement.getAttribute("answer");
      var result = JSON.parse(jsonResponse);

      var durationHours = result.durationHours;
      var totalFee = result.totalFee;
      g_form.setValue("duration", durationHours + " hour(s)");
      g_form.setValue("fee", totalFee + " bath");

      if (response.responseXML.documentElement.getAttribute("error") === "true") {
          // There is an overlapping reservation
          g_form.addErrorMessage("Car has another reservation at the same time.");
          // Clear the fee field
          g_form.clearValue("start");
          g_form.clearValue("end");
      } else {
          // No overlapping reservation, display the duration and fee
          g_form.setValue("duration", durationHours + " hour(s)");
          g_form.setValue("fee", totalFee + " bath");
      }

  }
}