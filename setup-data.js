// LOAD GEOJSON FILES

function loadJSON(file_name,callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', file_name, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }



function loadData(listOfFileNames,listOfDataNames){

    let listOfData =[]

    for (i=0;i<listOfFileNames.length;i++){

        file_name = listOfDataNames[i];
        
        loadJSON(listOfFileNames[i], (e) => {
            listOfData.push(JSON.parse(e));
        });
    }

    return listOfData

}

var stationdata;
var alleplekjesdata;
var gr_routes_vl_data;
var gr_routes_wa_data;
var gr_12_data;
var gr_12_slaapplaatsen_data;
var oosterijk_data;
var oosterijk_slaapplaatsen_data;



var mongo_document_names;
var mongodata;
loadJSON("https://that-map-app.herokuapp.com/all_places", (e) => {
    mongodata = JSON.parse(e);
    mongo_document_names = mongodata.map(x => x.name)
    createCheckBoxList(mongo_document_names)
    //displayFeatureList(stationdata, "stations");
});

loadJSON("https://tijsvandenheuvel.github.io/map-app/data/stations.geojson", (e) => {
    stationdata = JSON.parse(e);
    //displayFeatureList(stationdata, "stations");
});

loadJSON("./data/alle_plekjes.geojson", (e) => {
    alleplekjesdata = JSON.parse(e);
    //displayFeatureList(stationdata, "stations");
});
loadJSON("./data/gr_list_vlaanderen.geojson", (e) => {
    gr_routes_vl_data = JSON.parse(e);
    //displayFeatureList(stationdata, "stations");
});

loadJSON("./data/gr_list_wallonie.geojson", (e) => {
    gr_routes_wa_data = JSON.parse(e);
    //displayFeatureList(stationdata, "stations");
});
loadJSON("./data/gr_12.geojson", (e) => {
    gr_12_data = JSON.parse(e);
    //displayFeatureList(stationdata, "stations");
});

loadJSON("./data/Osterreich_zeltplatzen.geojson", (e) => {
    oosterijk_data = JSON.parse(e);
    //displayFeatureList(stationdata, "stations");
});

loadJSON("./data/Osterreich_zeltplatzen.geojson", (e) => {
    oosterijk_slaapplaatsen_data = JSON.parse(e);
    //displayFeatureList(stationdata, "stations");
});


// UPLOAD FILE
var filedata;
function openFile(event) {
    var input = event.target;

    var reader = new FileReader();

    reader.readAsText(input.files[0]);

    // check if Geojson

    reader.onload = function() {
    filedata = JSON.parse(reader.result)
    file_name = input.files[0].name
    displayFeatureList(filedata,file_name);
    };
    
  };



