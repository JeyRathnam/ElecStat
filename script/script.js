function datafilter(data,state,filter,startYear,endYear,startMonth,endMonth){
                 var datacf = crossfilter(data);
             
             var fuelTypes  = datacf.dimension(function(d) { return d.Type; });
             var states = datacf.dimension(function(d) { return d.state; });
             
            fuelTypes.filter(filter);
            states.filter(state);
             var dataFiltered = states.top(Infinity);

             var filArray = [];
            filArray = generateStateFormat(startYear,endYear,startMonth,endMonth);
             var yearAndMonthFilterdData = [];
    yearAndMonthFilterdData['state']=state;
             
             for (var name in dataFiltered) {
                 for(var yearAndMonth in filArray)
                 yearAndMonthFilterdData[filArray[yearAndMonth]] = dataFiltered[name][filArray[yearAndMonth]];
             }
             return yearAndMonthFilterdData;
}


function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}

function generateStateFormat(startYear,endYear,startMonth,endMonth){
    
                 var monthStartIndex = months.indexOf(startMonth);
                var monthEndIndex = months.indexOf(endMonth);
    var filterArray=[];
                 for(var i=startYear; i<= endYear;i++){
                 startYear = i;
                 for(var j=monthStartIndex;j<=monthEndIndex;j++){
                     filterArray.push(startYear+"-"+months[j]);
                 }
                 
             }
    return filterArray;
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}