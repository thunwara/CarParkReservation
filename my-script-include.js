var ParkingFeeCalculator = Class.create();
ParkingFeeCalculator.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getTime: function() {
        // Pass Parameter from Client-Script
        var carRID = this.getParameter("sysparm_car_regis_number");
        var startDateTimeString = this.getParameter("sysparm_start_time");
        var endDateTimeString = this.getParameter("sysparm_end_time");

        // Convert startDateTimeString and endDateTimeString to GlideDateTime objects
        var startDateTime = new GlideDateTime();
        startDateTime.setDisplayValue(startDateTimeString);

        var endDateTime = new GlideDateTime();
        endDateTime.setDisplayValue(endDateTimeString);

        // Query Record
        var carRecord = new GlideRecord("sc_req_item");

        // Query SELECT carID is carRID
        carRecord.addEncodedQuery(
            "active=true^cat_item.nameSTARTSWITHCar Park Reservations" + carRID
        );
        carRecord.query();

        // Calculate duration in minutes
        var duration = GlideDateTime.subtract(startDateTime, endDateTime);
        var durationInMinutes = Math.ceil(duration.getNumericValue() / (1000 * 60)); // Convert duration to minutes

        gs.info("Duration in minutes: " + durationInMinutes);

        // Convert duration to hours and round up
        var durationInHours = Math.ceil(durationInMinutes / 60); // Convert duration to hours and round up

        gs.info("Duration in hours: " + durationInHours);

        // Calculate fee
        var fee;
        if (durationInHours < 60) {
            fee = durationInHours * 10;
        } else if (durationInHours < 240) {
            fee = durationInHours * 15;
        } else if (durationInHours < 480) {
            fee = durationInHours * 15;
        } else {
            fee = 200;
        }

        // Create a JSON object to hold the parameters
        var response = {
            durationMinutes: durationInMinutes,
            durationHours: durationInHours,
            totalFee: fee,
        };

        // Convert the JSON object to a string
        var jsonResponse = JSON.stringify(response);

        // Set the response type and send the JSON string back to the client script
        this.setResponseType(this.JSON);
        return jsonResponse;

        // var xmlDoc = new XMLDocument();
        // var root = xmlDoc.createElement("response");
        // xmlDoc.appendChild(root);

        // var durationMinutesNode = xmlDoc.createElement("durationMinutes");
        // durationMinutesNode.setAttribute("value", durationInMinutes);
        // root.appendChild(durationMinutesNode);

        // var durationHoursNode = xmlDoc.createElement("durationHours");
        // durationHoursNode.setAttribute("value", durationInHours);
        // root.appendChild(durationHoursNode);

        // // Convert the XML document to a string
        // var xmlString = xmlDoc.toXMLString();

        // // Set the response type and send the XML string back to the client script
        // this.setResponseType(this.XML);
        // return xmlString;

    },



    type: "ParkingFeeCalculator",
});