function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
    return;
    }
    
    // Create a GlideAjax object
var ga = new GlideAjax('ParkingFeeCalculator');
ga.addParam('sysparm_name', 'getDateTime');

// Set any additional parameters
ga.addParam('sysparm_car_regis_number', carRegisNumber);

// Make the asynchronous AJAX call
ga.getXML(function(response) {
  var answer = response.responseXML.documentElement.getAttribute('answer');
  g_form.setValue('fee', answer);
  // Handle the response data
  // ...
});

    }