function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue == "") {
    return;
  }
  //Type appropriate comment here, and begin script below
  if (
    g_form.getValue("start") == "" ||
    g_form.getValue("end") == "" ||
    g_form.getValue("vehicle_registration_number") == ""
  ) {
    return;
  }
  //Get time and vehicle rid from portal form
  var startDate = new Date(g_form.getValue("start")).getTime();
  var endDate = new Date(g_form.getValue("end")).getTime();
  var nowDate = new Date().getTime();
  var regId = g_form.getValue("vehicle_registration_number");
  
  //Check if startDate bf now or endDate bf startDate
  if (nowDate > startDate || endDate < startDate || endDate < nowDate) {
    g_form.addErrorMessage("Your start date or end date is not correct.");
    g_form.clearValue("start");
    g_form.clearValue("end");
  } else {
    var ga = new GlideAjax("carParkingTimeAjax"); //Run GlideAjax
    ga.addParam("sysparm_name", "getTime");
    ga.addParam("sysparm_car_regis_number", regId);
    ga.addParam("sysparm_start_time", g_form.getValue("start"));
    ga.addParam("sysparm_end_time", g_form.getValue("end"));
    ga.getXML(timeCalculated);
    function timeCalculated(response) {
      var timeDiffMin =
        response.responseXML.documentElement.getAttribute("answer");
      if (timeDiffMin == 0) {
        alert(
          "Cannot booking.\nYour vehicle number " +
            regId +
            " has been booked.\nPlease select another time for a new booking.\nThank you"
        );
        g_form.clearValue("start");
        g_form.clearValue("end");
      } else {
        var timeDiffHr = Math.ceil(timeDiffMin / 60);
        var fee = 0;
        //More than 8 HR
        if (timeDiffHr > 8) {
          fee = 200;
        } else if (timeDiffHr > 4 && timeDiffHr <= 8) {
          fee = 55 + (timeDiffHr - 4) * 20;
        } else if (timeDiffHr > 1 && timeDiffHr <= 4) {
          fee = 10 + (timeDiffHr - 1) * 15;
        } else if (timeDiffHr > 0 && timeDiffHr <= 1) {
          fee = 10;
        }
        g_form.setValue("parking_fee", fee);
      }
    }
  }
}
