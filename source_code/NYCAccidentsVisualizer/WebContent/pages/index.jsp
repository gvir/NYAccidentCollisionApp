<!DOCTYPE html>
<head>
  <title>NYC Accidents Visualizer</title>
  <script src="https://code.jquery.com/jquery-1.11.2.min.js" type="text/javascript"></script>
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet" />
  <link href="css/jquery.datetimepicker.css" rel="stylesheet" />
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js" type="text/javascript"></script>
  <script src="js/jquery.datetimepicker.js" type="text/javascript"></script>
  <script src="js/constants.js" type="text/javascript"></script>
  <script src="js/script.js" type="text/javascript"></script>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9gGRsWS0tYdc5w0QwtUS2C2ejIBC9uZI"></script>
  <link href="css/style.css" rel="stylesheet" />
</head>
<body>
  <!--Error Div-->
  <div class="alert alert-danger alert-dismissable" id="error">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    <span id="pageErrorMessage"></span>
  </div>
  <!--Header-->
  <div class="container">
    <div class="row">
      <h1>NYC Accidents visualizer</h1>
    </div>
  </div>
  <!--Filters-->
  <div class="container" id="filters">
    <!--Contains All Filter=-->
    <div id="filterCore">
      <div class="row">
        <div class="col-md-2">
          Select Time Span
        </div>

        <div class="element">
          Start (>=)
        </div>
        <div class="space"></div>
        <div class="element">
          <input id="startTime" class="datetimepicker" type="text">
                </div>
        <div class="space"></div>
        <div class="space"></div>
        <div class="element">
          End (<)
        </div>
        <div class="element">
          <input id="endTime" class="datetimepicker" type="text">
                </div>
      </div>
      <div class="row padtop">
        <div class="col-md-2">
          Person
        </div>
        <div class="element">
          <input type="radio" name="persons" value="0"/>Injured
        </div>
        <div class="space"></div>
        <div class="element">
          <input type="radio" name="persons" value="1"/>Killed
        </div>
        <div class="space"></div>
        <div class="element">
          <input type="radio" name="persons" value="2" checked="checked"/>Does not Matter
        </div>
      </div>
      <div class="row padtop">
        <div class="col-md-2">
          Pedestrians
        </div>
        <div class="element">
          <input type="radio" name="pedestrians" value="0"/>Injured
        </div>
        <div class="space"></div>
        <div class="element">
          <input type="radio" name="pedestrians" value="1"/>Killed
        </div>
        <div class="space"></div>
        <div class="element">
          <input type="radio" name="pedestrians" value="2" checked="checked"/>Does not Matter
        </div>
      </div>
      <div class="row padtop">
        <div class="col-md-2">
          Cyclist
        </div>
        <div class="element">
          <input type="radio" name="cyclists" value="0"/>Injured
        </div>
        <div class="space"></div>
        <div class="element">
          <input type="radio" name="cyclists" value="1"/>Killed
        </div>
        <div class="space"></div>
        <div class="element">
          <input type="radio" name="cyclists" value="2"  checked="checked"/>Does not Matter
        </div>
      </div>
      <div class="row padtop">
        <div class="col-md-2">
          Motorists
        </div>
        <div class="element">
          <input type="radio" name="motorists" value="0"/>Injured
        </div>
        <div class="space"></div>
        <div class="element">
          <input type="radio" name="motorists" value="1"/>Killed
        </div>
        <div class="space"></div>
        <div class="element">
          <input type="radio" name="motorists" value="2" checked="checked"/>Does not Matter
        </div>
      </div>
      <div class="row padtop">
        <div class="col-md-2">
          No Of Vehicles Involved
        </div>
        <div class="element">
          <input type="radio" name="vehicles" value="0"/>1
        </div>
        <div class="space"></div>
        <div class="element">
          <input type="radio" name="vehicles" value="1"/>2
        </div>
        <div class="space"></div>
        <div class="element">
          <input type="radio" name="vehicles" value="2"/>3
        </div>
        <div class="space"></div>
        <div class="element">
          <input type="radio" name="vehicles" value="3"/>>3
        </div>
        <div class="element">
          <input type="radio" name="vehicles" value="4" checked="checked"/>NA
        </div>
      </div>
      <div class="row padtop">
        <div class="col-md-2">
          Contributing Factor
        </div>
        <div class="col-md-10 pad0">
          <div class="element">
            <input type="checkbox" id="chkContributingFactorPS" value="0"/>Payment Slippery
          </div>
          <div class="space"></div>
          <div class="element">
            <input type="checkbox" id="chkContributingFactorBU" />Backing Unsafely
          </div>
          <div class="space"></div>
          <div class="element">
            <input type="checkbox" id="chkContributingFactorTCD" />Traffic Control Disregarded
          </div>
          <div class="space"></div>
          <div class="element">
            <input type="checkbox" id="chkContributingFactorDI"/>Driver Inexperience
          </div>
          <div class="space"></div>
          <div class="element">
            <input type="checkbox" id="chkContributingFactorLC" />Lost Consciousness
          </div>
          <div class="space"></div>
          <div class="element">
            <input type="checkbox" id="chkContributingFactorDIA" /> Driver Inattention/Distraction
            <div class="space"></div>
            <div class="element">
              <input type="checkbox" id="chkContributingFactorUS" /> Unspecified
            </div>
          </div>
        </div>
      </div>
      <div class="row padtop">
        <div class="col-md-2">
          Type Of Vehicle
        </div>
        <div class="col-md-10 pad0">
          <div class="element">
            <input type="checkbox" id="chkVehicleTypePV"/>Passenger Vehicle
          </div>
          <div class="space"></div>
          <div class="element">
            <input type="checkbox" id="chkVehicleTypeSU"/>Sport Utility / Station Wagon
          </div>
          <div class="space"></div>
          <div class="element">
            <input type="checkbox" id="chkVehicleTypePUT"/>Pick Up Truck
          </div>
          <div class="space"></div>
          <div class="element">
            <input type="checkbox" id="chkVehicleTypeVan"/>Van
          </div>
          <div class="space"></div>
          <div class="element">
            <input type="checkbox" id="chkVehicleTypeUN" />Unknown
          </div>
        </div>
      </div>
      <div class="row padtop">
        <button class="btn btn-submit marleft15" id="submit">Submit</button>
        <div class="element label label-info floatr accidents-count-info ">
          Maximum Accidents Count Visible : <span id="spnInfoMaxAccCount"></span>
        </div>
      </div>
    </div>
    <!--Scroller to up/down filters-->
    <div id="filterFrame" class="glyphicon glyphicon-collapse-up scroller">
    </div>
  </div>
  <!--Map Div-->
  <div class="container map" >
    <div id="map" class="row">
    </div>
  </div>
  <!--Loading Div-->
  <div id="loading" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <img src="i/loader.gif" />
        <span>Processing...</span>
      </div>

    </div>
  </div>
</body>
