function createCheckBoxList(document_names){
    checkBoxContainer = document.createElement('div');
    listElement = document.createElement('ul'); 

    checkBoxContainer.appendChild(listElement);
    document.getElementById('checkboxes').appendChild(checkBoxContainer);

    for (i = 0; i < document_names.length; ++i) {
        listItem = document.createElement('li');
        listItem.setAttribute("style","list-style-type: none");

        inputItem = document.createElement('input');
        inputItem.setAttribute("type","checkbox");
        inputItem.setAttribute("id",document_names[i]);
        inputItem.setAttribute("name",document_names[i]);
        inputItem.setAttribute("autocomplete","off");

        labelItem = document.createElement('label');
        labelItem.setAttribute("for",document_names[i]);
        labelItem.innerHTML=document_names[i];

        listItem.appendChild(inputItem);
        listItem.appendChild(labelItem);
        listElement.appendChild(listItem);
    }
}

function addSelectedItemsToMap() {
    resetMap();
    for (i = 0; i < mongo_document_names.length; ++i) {
        if(document.getElementById(mongo_document_names[i]).checked){
            data = mongodata.filter(x=>x.name==mongo_document_names[i]).map(x=>x.geojson)[0]
            displayFeatureList(data, mongo_document_names[i]);
        }
    }
}


function addSelectedItemsToMap22222222() {
	var stationsbool = document.getElementById("stations").checked;
	var plekjesbool = document.getElementById("plekjes").checked;
    var gr_routes_vl_bool = document.getElementById("gr_routes_vl").checked;
    var gr_routes_wa_bool = document.getElementById("gr_routes_wa").checked;
    var gr_12_bool = document.getElementById("gr_12").checked;
    var gr_12_slaapplaatsen_bool = document.getElementById("gr_12_slaapplaatsen").checked;
    var oosterijk_bool = document.getElementById("oosterijk_routes").checked;
    var oosterijk_slaapplaatsen_bool = document.getElementById("oosterijk_slaapplaatsen").checked;
    


	map_123.off();
	map_123.remove();

	map_123 = setupMap();


    
    if (stationsbool) {
        displayFeatureList(stationdata, "stations");
    }
	if (plekjesbool) {
		displayFeatureList(alleplekjesdata, "alle plekjes");
	}
	
    if (gr_routes_vl_bool) {
		displayFeatureList(gr_routes_vl_data, "gr routes vl");
	}
    if (gr_routes_wa_bool) {
		displayFeatureList(gr_routes_wa_data, "gr routes wa");
	}

	if (gr_12_bool) {
		displayFeatureList(gr_12_data, "gr 12");
	}
    if (gr_12_slaapplaatsen_bool) {
		displayFeatureList(gr_12_slaapplaatsen_data, "gr 12 slaapplaatsen");
	}

    if (oosterijk_bool) {
		displayFeatureList(oosterijk_data, "oosterijk");
	}
    if (oosterijk_slaapplaatsen_bool) {
		displayFeatureList(oosterijk_slaapplaatsen_data, "oosterijk slaapplaatsen");
	}
}

function makeList(listOfDataNames) {
    function select(string){
        console.log(string)
    }

    dropDownContainer = document.createElement('div');
    dropDownContainer.className = "dropdown";

    selectButton = document.createElement('button');
    selectButton.innerHTML = "Select";
    selectButton.setAttribute("class","btn btn-light dropdown-toggle");
    selectButton.setAttribute("type", "button");
    selectButton.setAttribute("id", "dropdownMenuButton1");
    selectButton.setAttribute("data-bs-toggle","dropdown");
    selectButton.setAttribute("aria-expanded","false");
    dropDownContainer.appendChild(selectButton);

    listElement = document.createElement('ul'); 
    listElement.setAttribute("class","dropdown-menu");
    listElement.setAttribute("aria-labelledby","dropdownMenuButton1");
    dropDownContainer.appendChild(listElement);

    document.getElementById('navbar').appendChild(dropDownContainer);

    numberOfListItems = listOfDataNames.length;
    for (i = 0; i < numberOfListItems ; ++i) {
        listItem = document.createElement('li');

        button = document.createElement('button');
        button.setAttribute("type","button");
        button.setAttribute("class","btn btn-light dropdown-item");
        button.setAttribute("onclick","select('"+listOfDataNames[i]+"')");
        button.innerHTML=listOfDataNames[i];
        
        listItem.appendChild(button)
        listElement.appendChild(listItem);
    }
}