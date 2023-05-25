var ParkingFeeCalculator = Class.create();
ParkingFeeCalculator.prototype =
Object.extendsObject(AbstractAjaxProcessor, {
    getTime: function(){

    //Pass Parameter from Client-Script
    var carRID = this.getParameter('sysparm_car_regis_number');
    var startDateTime = this.getParameter('sysparm_start_time');
    var endDateTime = this.getParameter('sysparm_end_time');

    //Query Record
    var carRecord = new GlideRecord('sc_req_item');

    //Query SELECT carID is carRID
    carRecord.addEncodedQuery("active=true^cat_item.nameSTARTSWITHCar Park Reservations"+carRID);

    //Query SELECT Date time in Range of startTime and endTime
    carRecord.addEncodedQuery("active=true^variables.a0c57d8a47262110b6bcf2e7536d4317="+carRID+"^variables.79d5bd8a47262110b6bcf2e7536d439a<javascript:gs.dateGenerate('" +startDateSplit[0]+ "','"+ startDateSplit[1] +"')^variables.20f531ca47262110b6bcf2e7536d4368>javascript:gs.dateGenerate('" + endDateSplit[0] + "','" + endDateSplit[1] + "')^NQactive=true^variables.a0c57d8a47262110b6bcf2e7536d4317="+carRID+"^variables.79d5bd8a47262110b6bcf2e7536d439aBETWEENjavascript:gs.dateGenerate('" +startDateSplit[0]+ "','"+ startDateSplit[1] +"')@javascript:gs.dateGenerate('" + endDateSplit[0] + "','" + endDateSplit[1] + "')^ORvariables.20f531ca47262110b6bcf2e7536d4368BETWEENjavascript:gs.dateGenerate('" +startDateSplit[0]+ "','"+ startDateSplit[1] +"')@javascript:gs.dateGenerate('" + endDateSplit[0] + "','" + endDateSplit[1] + "')");
    carRecord.query();
    
    // var count = 0;
    // while (carRecord.next()){
        //Count number of record
        //If count > 0 -> Found item on query option
        // count = count + 1;
    // }
    return count;
    },
    type: 'ParkingFeeCalculator'
});