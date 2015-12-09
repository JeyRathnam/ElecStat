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

function mapData(data,state,checkedValues,startYear,endYear,startMonth,endMonth){
    var datesRequested = [];
             datesRequested = generateStateFormat(startYear,endYear,startMonth,endMonth);
             var statesInData =[];
             for(var state in data){
                statesInData.push(data[state]['state']);
             }
            statesInData = unique(statesInData);
            var choroData = [],justData=[];
                for(var state in statesInData){
                    choroData[states_hash[statesInData[state]]] = 0;
                }
             var total=0;
        for(var filter in checkedValues){
             for(var state in statesInData){
                  datafil= datafilter(data,statesInData[state],checkedValues[filter],startYear,endYear,startMonth,endMonth);
             for(var value in datafil){
                  if(isInArray(value,datesRequested))
                    total += parseInt(datafil[value]);
                    }
                 if(isNaN(total)){ total= 0;}
                 choroData[states_hash[statesInData[state]]] = choroData[states_hash[statesInData[state]]] + total;
                // justData.push(parseInt(total));
                 total = 0;
              }
        }
             for(var value in choroData){
                 if(value != 'undefined' && value != 'US')
                 justData.push(choroData[value]);
             }
             justData.sort(compareNumbers);
             //choroData.remove(undefined);
            var maxVal = (Math.max.apply(Math, justData))/9;
             var constMax = maxVal;
             var maxValues = [];
             
             for(var i=0 ; i<9;i++){
                maxVal = Math.round(maxVal);
                 maxValues.push(maxVal);
                 maxVal = maxVal+constMax;
             }
             for(var value in choroData){
                 if(choroData [value] >= 0 && choroData[value] < maxValues[0])
                        $('#'+value).css('fill','#ffffe5');
                 if(choroData [value] >= maxValues[0] && choroData[value] <= maxValues[1])
                        $('#'+value).css('fill','#f7fcb9');
                 if(choroData [value] >= maxValues[1] && choroData[value] <= maxValues[2])
                        $('#'+value).css('fill','#d9f0a3');
                 if(choroData [value] >= maxValues[2] && choroData[value] <= maxValues[3])
                        $('#'+value).css('fill','#addd8e');
                 if(choroData [value] >= maxValues[3] && choroData[value] <= maxValues[4])
                        $('#'+value).css('fill','#78c679');
                 if(choroData [value] >= maxValues[4] && choroData[value] <= maxValues[5])
                        $('#'+value).css('fill','#41ab5d');
                 if(choroData [value] >= maxValues[5] && choroData[value] <= maxValues[6])
                        $('#'+value).css('fill','#238443');
                 if(choroData [value] >= maxValues[6] && choroData[value] <= maxValues[7])
                        $('#'+value).css('fill','#006837');
                 if(choroData [value] >= maxValues[7] && choroData[value] <= maxValues[8])
                        $('#'+value).css('fill','#004529');
                 if(choroData [value] > maxValues[8])
                        $('#'+value).css('fill','#004529');
             }
}