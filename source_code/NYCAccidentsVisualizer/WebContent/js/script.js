
// contains google map
var map = null;

// contains markers for lastcall
var lastCallMarkers = null;

// Utility Methods
var Utility = function () {
    // validate dates
    // checks startdate > endDate, if not then return false
    this.validateDates = function () {
        var check = true;
        var startDateTime = $("#startTime").val();
        var endDateTime = $("#endTime").val();
        var startDate = new Date(startDateTime);
        var endDate = new Date(endDateTime);
        if (endDate <= startDate) {
            check = false;
        }
        return check;
    }

    // Move the scroller up or down depending upon status of scroller
    this.callScroller = function () {
        if ($("#filterFrame").hasClass("glyphicon-collapse-down scroller")) {
            $("#filterFrame").removeClass(
                    "glyphicon-collapse-down scroller");
            $("#filterFrame").addClass("glyphicon-collapse-up scroller");
            $("#filterCore").slideDown();

        } else {
            $("#filterFrame").removeClass("glyphicon-collapse-up scroller");
            $("#filterFrame").addClass("glyphicon-collapse-down scroller");
            $("#filterCore").slideUp();
        }
    }

    // Initialize filters
    // set startdate as current date time- (12 months)
    // set enddate as current date time
    this.initializeFilters = function () {
        var currentdate = new Date();
        var month = currentdate.getMonth() + 1;
        if (month < 10) {
            month = '0' + month.toString();
        }
        var startDate = (currentdate.getFullYear() - 1) + "-" + month.toString()
                + "-" + currentdate.getDate();
        var startDateTime = startDate + " " + "00:00";
        var endDate = (currentdate.getFullYear()) + "-" + month.toString()
        + "-" + currentdate.getDate();
        var endDateTime = endDate + " " + currentdate.getHours() + ":00";
        $("#startTime").val(startDateTime);
        $("#endTime").val(endDateTime);
        $("#spnInfoMaxAccCount").html(MAXCOUNTACCIDENTS.toString());
    }

    // show loading
    this.showLoading = function () {
        $("#loading").modal({
            keyboard: false,
            backdrop: "static"
        });
    }
    // hide loading
    this.hideLoading = function () {
        $("#loading").modal('hide');
    }
    // show error
    this.showError = function (message) {
        $("#error").show();
        $("#error").html(message);
    }
    // hide error
    this.hideError = function () {
        $("#error").hide();
    }
}

// Accident Object
var Accident = function () {
    this.latitude = "";
    this.longitude = "";
    this.location = "";
    this.on_street_name = "";
    this.cross_street_name = "";
    this.off_street_name = "";
}

// Query Generator
var Engine = function () {
    // Get Date Filter
    // for example " date >= '2014-10-01 00:00' and date < '2015-04-01 00:00'"
    this._getDateFilter = function () {
        var startDateTime = $("#startTime").val();
        var endDateTime = $("#endTime").val();
        return " date >= '" + startDateTime + "' and date < '"
                + endDateTime + "'";
    }

    // Get PersonFilter
    // for example : 'number_of_persons_injured > 0'
    // if input value element is 'Does not Matter' then no filter is applicable 
    // value = 0 : injured
    // value = 1 : killed
    this._getPersonFilter = function () {
        var personFilter = $('input[name="persons"]:checked').val();
        var filter = ""
        switch (personFilter) {
            case "0":
                filter = "number_of_persons_injured > 0";
                break;
            case "1":
                filter = "number_of_persons_killed > 0";
                break;
        }
        return filter;

    }

    // Get PedestrianFilter
    // for example : 'number_of_pedestrians_injured > 0'
    // if input value element is 'Does not Matter' then no filter is applicable 
    // value = 0 : injured
    // value = 1 : killed
    this._getPedestrianFilter = function () {
        var filter = ""
        var pedistrianFilter = $('input[name="pedestrians"]:checked').val();
        switch (pedistrianFilter) {
            case "0":
                filter = "number_of_pedestrians_injured > 0";
                break;
            case "1":
                filter = "number_of_pedestrians_killed > 0";
                break;
        }
        return filter;
    }

    // Get CyclistFilter
    // for example : 'number_of_cyclist_injured > 0'
    // if input value element is 'Does not Matter' then no filter is applicable 
    // value = 0 : injured
    // value = 1 : killed
    this._getCyclistFilter = function () {
        var filter = ""
        var cyclistFilter = $('input[name="cyclists"]:checked').val();
        switch (cyclistFilter) {
            case "0":
                filter = "number_of_cyclist_injured > 0";
                break;
            case "1":
                filter = "number_of_cyclist_killed > 0";
                break;
        }
        return filter;
    }

    // Get MotoristFilter
    // for example : 'number_of_motorist_injured > 0'
    // if input value element is 'Does not Matter' then no filter is applicable 
    // value = 0 : injured
    // value = 1 : killed
    this._getMotoristFilter = function () {
        var filter = ""
        var motoristsFilter = $('input[name="motorists"]:checked').val();
        switch (motoristsFilter) {
            case "0":
                filter = "number_of_motorist_injured > 0";
                break;
            case "1":
                filter = "number_of_motorist_killed > 0";
                break;
        }
        return filter;
    }

    // Get NoOfVehilceFilter
    // for example : "vehicle_type_code_1 != '' and vehicle_type_code_2 != '' and vehicle_type_code_3 != ''"
    // if input value element is NA then no filter is applicable 
    // value = 0 : vehicle count 1
    // value = 1 : vehicle count 2
    // value = 2 : vehicle count 3
    // value = 3 : vehicle count >3
    this._getNoOfVehicleFilter = function () {
        var filter = ""
        var value = $('input[name="vehicles"]:checked').val();
        switch (value) {
            case "0":
                filter = "vehicle_type_code_1 != '' and vehicle_type_code_2 = '' and vehicle_type_code_3 = ''";
                filter = filter
						+ "and vehicle_type_code_4 = '' and vehicle_type_code_5 = ''";
                break;
            case "1":
                filter = "vehicle_type_code_1 != '' and vehicle_type_code_2 != '' and vehicle_type_code_3 = ''";
                filter = filter
						+ "and vehicle_type_code_4 = '' and vehicle_type_code_5 = ''";
                break;
            case "2":
                filter = "vehicle_type_code_1 != '' and vehicle_type_code_2 != '' and vehicle_type_code_3 != ''";
                filter = filter
						+ "and vehicle_type_code_4 = '' and vehicle_type_code_5 = ''";
                break;
            case "3":
                filter = "vehicle_type_code_1 != '' and vehicle_type_code_2 != '' and vehicle_type_code_3 != ''";
                filter = filter + "and vehicle_type_code_4 != ''";
                break;
        }
        return filter;
    }

    // Get ContributingFactorFilter
    // for example : "contributing_factor_vehicle_1 in ('Pavement Slippery') || contributing_factor_vehicle_2 in ('Pavement Slippery') ....up to contributing_factor_vehicle_5 "
    // depedning upon the checked element filter values are calculated

    this._getContributionFactorFilter = function () {
        var filter = "";
        var chkContributingFactorPS = $("#chkContributingFactorPS").is(
                ':checked');
        var chkContributingFactorBU = $("#chkContributingFactorBU").is(
                ':checked');
        var chkContributingFactorTCD = $("#chkContributingFactorTCD").is(
                ':checked');
        var chkContributingFactorDI = $("#chkContributingFactorDI").is(
                ':checked');
        var chkContributingFactorLC = $("#chkContributingFactorLC").is(
                ':checked');
        var chkContributingFactorDIA = $("#chkContributingFactorDIA").is(
                ':checked');
        var chkContributingFactorUS = $("#chkContributingFactorUS").is(
                ':checked');
        var inQuery = '('
        if (chkContributingFactorPS) {
            inQuery = inQuery + "'" + "Pavement Slippery" + "',";
        }
        if (chkContributingFactorBU) {
            inQuery = inQuery + "'" + "Backing Unsafely" + "',";
        }
        if (chkContributingFactorTCD) {
            inQuery = inQuery + "'" + "Traffic Control Disregarded" + "',";
        }
        if (chkContributingFactorDI) {
            inQuery = inQuery + "'" + "Driver Inexperience" + "',";
        }
        if (chkContributingFactorLC) {
            inQuery = inQuery + "'" + "Driver Inattention/Distraction"
                    + "',";
        }
        if (chkContributingFactorDIA) {
            inQuery = inQuery + "'" + "Lost Consciousness" + "',";
        }
        if (chkContributingFactorUS) {
            inQuery = inQuery + "'" + "Unspecified" + "',";
        }
        if (inQuery.length > 1) {
            inQuery = inQuery.substring(0, inQuery.length - 1);
        }
        inQuery = inQuery + ')'
        if (inQuery.length > 2) {
            filter = "(contributing_factor_vehicle_1 in " + inQuery
                    + " or ";
            filter = filter + "contributing_factor_vehicle_2 in " + inQuery
                    + " or ";
            filter = filter + "contributing_factor_vehicle_3 in " + inQuery
                    + " or ";
            filter = filter + "contributing_factor_vehicle_4 in " + inQuery
                    + " or ";
            filter = filter + "contributing_factor_vehicle_5 in " + inQuery
                    + ")";
        }
        return filter;
    }

    // Get TypeOfVehicleFilter
    // for example : "vehicle_type_code_1 in ('PASSENGER VEHICLE') || vehicle_type_code_2 in ('PASSENGER VEHICLE') ....up to vehicle_type_code_5 "
    // depedning upon the checked element filter values are calculated
    this._getTypeOfVehilceFilter = function () {
        var filter = "";
        var chkVehicleTypePV = $("#chkVehicleTypePV").is(':checked');
        var chkVehicleTypeSU = $("#chkVehicleTypeSU").is(':checked');
        var chkVehicleTypePUT = $("#chkVehicleTypePUT").is(':checked');
        var chkVehicleTypeVan = $("#chkVehicleTypeVan").is(':checked');
        var chkVehicleTypeUN = $("#chkVehicleTypeUN").is(':checked');

        var inQuery = '('
        if (chkVehicleTypePV) {
            inQuery = inQuery + "'" + "PASSENGER VEHICLE" + "',";
        }
        if (chkVehicleTypeSU) {
            inQuery = inQuery + "'" + "SPORT UTILITY / STATION WAGON" + "',";
        }
        if (chkVehicleTypePUT) {
            inQuery = inQuery + "'" + "PICK-UP TRUCK" + "',";
        }
        if (chkVehicleTypeVan) {
            inQuery = inQuery + "'" + "VAN" + "',";
        }
        if (chkVehicleTypeUN) {
            inQuery = inQuery + "'" + "UNKNOWN" + "',";
        }
        if (inQuery.length > 1) {
            inQuery = inQuery.substring(0, inQuery.length - 1);
        }
        inQuery = inQuery + ')'
        if (inQuery.length > 2) {
            filter = "(vehicle_type_code_1 in " + inQuery + " or ";
            filter = filter + "vehicle_type_code_2 in " + inQuery + " or ";
            filter = filter + "vehicle_type_code_3 in " + inQuery + " or ";
            filter = filter + "vehicle_type_code_4 in " + inQuery + " or ";
            filter = filter + "vehicle_type_code_5 in " + inQuery + ")";
        }
        return filter;
    }

    // Get Query String depeding upon the filters
    this.getQueryString = function () {
        var query = 'Select * from ' + TABLE + ' where'
        // append date filter
        query = query + this._getDateFilter();
        // append person filter
        var personFilter = this._getPersonFilter();
        // get pedstrian filter
        var pedestrianFilter = this._getPedestrianFilter();
        // get cyclist filter
        var cyclistFilter = this._getCyclistFilter();
        // append motorist filter
        var motoristFilter = this._getMotoristFilter();
        // get cyclist count filter
        var vehicleCountFilter = this._getNoOfVehicleFilter();
        // get contribution factor filter
        var contributionFactorFilter = this._getContributionFactorFilter();
        // get type of vehicle filter
        var typeOfVehicleFilter = this._getTypeOfVehilceFilter();
        // append all filters
        if (personFilter.length != 0) {
            query = query + " and " + personFilter;
        }
        if (pedestrianFilter.length != 0) {
            query = query + " and " + pedestrianFilter;
        }
        if (cyclistFilter.length != 0) {
            query = query + " and " + cyclistFilter;
        }
        if (motoristFilter.length != 0) {
            query = query + " and " + motoristFilter;
        }
        if (vehicleCountFilter.length != 0) {
            query = query + " and " + vehicleCountFilter;
        }
        if (contributionFactorFilter.length != 0) {
            query = query + " and " + contributionFactorFilter;
        }
        if (typeOfVehicleFilter.length != 0) {
            query = query + " and " + typeOfVehicleFilter;
        }
        // filtering out data with no latitude and longitude information
        query = query
                + " and longitude is not null and latitude is not null";
        // appending  the LIMIT
        query = query + " LIMIT " + MAXCOUNTACCIDENTS;
        return query;
    }

    /* get collection of markers
     * @param data : collection of Accident Objects
     * @param  map :   google.maps.Map object
     * @return markers : collection of  new google.maps.Marker
     */
    this.getMarkers = function (data, map) {
        var markers = []
        for (var option = 0; option < data.length; option++) {
            var location = new google.maps.LatLng(data[option].latitude,
                    data[option].longitude);
            var marker = new google.maps.Marker({
                position: location,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillOpacity: 0.5,
                    fillColor: '#ff0000',
                    strokeOpacity: 1.0,
                    strokeColor: '#fff000',
                    strokeWeight: 3.0,
                    scale: 15
                    //pixels
                }
            });
            markers[markers.length] = marker;
        }
        return markers;
    }

    // draws the initial map
    this.drawOnMap = function () {
        var mapOptions = {
            center: {
                lat: 40.77,
                lng: -73.9
            },
            zoom: 12
        };
        var map = new google.maps.Map(document.getElementById('map'),
                mapOptions);
        return map;
    }

    /* plot collection of markers on map
    * @param markers : collection of google.maps.Marker
    * @param  map :   google.maps.Map object
    */
    this.plotMarkers = function (markers, map) {
        for (var option = 0; option < markers.length; option++) {
            markers[option].setMap(map);
        }
    }

    /* Removes collection of markers on map
    * @param markers : collection of google.maps.Marker
    */
    this.removeMarkers = function (markers) {
        for (var option = 0; option < markers.length; option++) {
            markers[option].setMap(null);
        }
    }

}
var utility = new Utility();
var engine = new Engine();
$(document).ready(function () {
    utility.hideError();
    //initialzing filters
    utility.initializeFilters();
    jQuery('.datetimepicker').datetimepicker({
        format: 'Y-m-d H:i',
    });
    // binding events
    // binding scroll event
    $("#filterFrame").click(function () {
        utility.callScroller();
    });
    map = engine.drawOnMap();
    // binding submit event
    $("#submit").click(function () {
        callServer();
    });
    callServer();
});

// calls server
function callServer() {
    utility.hideError();
    if (!utility.validateDates()) {
        utility.showError(DATE_VALIDATION_ERROR);
        return;
    }
    if (lastCallMarkers != null) {
        engine.removeMarkers(lastCallMarkers);
    }
    // get Query String
    var query = engine.getQueryString();
    utility.showLoading();
    console.log(query)
    $.ajax({
        url: "Index",
        method: "POST",
        data: {
            query: query
        },
        dataType: "json",
        success: function (data) {
            if (data.length > 0) {
                // plot markers
                var markers = engine.getMarkers(data, map);
                lastCallMarkers = markers;
                engine.plotMarkers(markers, map);

            }
            else {
                // no data available for selected filters
                utility.showError(DATA_NOT_AVAILABLE_ERROR);
            }
            utility.hideLoading();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // error at the server
            utility.showError(UNKNOWN_ERROR);
            utility.hideLoading();
        }
    });
}