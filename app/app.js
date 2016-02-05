(function(){

  'use strict';

  var app = angular.module('myApp', ['angular-chartist']);

  /*
  Controllers
  One controller is defined for each server-sent-events source.
  Naming convention: 
    for source http://xxx.xx.xx.xxx:xxxx/magicSourceName
    controller: MagicSourceNameController
    directive: magicSourceNameBehaviourName
    template url: view/magic-source-name-behaviour-name
  For each source, a unique controller is set, but multiple directives can be defined.  
  */
  app.controller('SseController', ['$scope',function($scope) {
        $scope.sseEvents = {};

        if (typeof(EventSource) !== 'undefined') {
          var source = new EventSource('http://172.17.66.212:6969/sse');

          source.onmessage = function (event) {
            var eventType = JSON.parse(event.data).eventType.replace(/:/g, " ");
            var _data = JSON.parse(event.data).data
            var _labels=[];
            var _series=[];

            for(var index = 0 ; index<_data.length ; index++){
              _labels.push(_data[index][0]);
              _series.push(_data[index][1]);
            }
            var data={}; 
            data['labels']=_labels;
            data['series']=[];
            data['series'].push(_series);      

            $scope.sseEvents[eventType] = data;
            $scope.$apply();
            
          };

        } else {
          alert('Server Sent Events not supported by browser.');
        }

      }]);

  app.controller('ServDataController', ['$scope',function($scope) {
        $scope.servDataEvents = {};
        var rawdata = {};
        var rawtype={};
        

        if (typeof(EventSource) !== 'undefined') {
          var source = new EventSource('http://172.17.66.212:6969/servData');
          source.onmessage = function (event) {
            var data={};
            

            var serverId = JSON.parse(event.data).serverId;
            var type = JSON.parse(event.data).type;
            
            if(undefined===rawdata[serverId])
              rawdata[serverId]= {};
            
            rawdata[serverId][type]=JSON.parse(event.data).data;

            
              var labels=[];
              var series=[];
              for(type in rawdata[serverId]){
                labels.push(type);
                series.push(rawdata[serverId][type]);
              }

              
              
            
            data['labels']=labels;
            data['series']=[];
            data['series'].push(series);

            $scope.servDataEvents[serverId] = data;
            $scope.$apply();            
          };
        } else {
          alert('Server Sent Events not supported by browser.');
        }

      }]);
app.controller('GeoController', ['$scope',function($scope) {
        // TODO: implement controller 
        if (typeof(EventSource) !== 'undefined') {
          var source = new EventSource('http://172.17.66.212:6969/geo');
          source.onmessage = function (event) {
             // TODO: implement event handler          
          };
        } else {
          alert('Server Sent Events not supported by browser.');
        }

      }]);


/*
TODO:
implement more filters

TODO:
Implement tooltip over barchart bars. On mouse over, show value of bar.
*/



  /*
  Directives
  The name of a directive should be descriptive of the behaviour of the application.
  The name of each directive ends with the type of data representation.
  Example:
    myDirectiveNameBartcharts, for many barcharts
    myDirectiveNameMap, for a single map

  */

  app.directive('sseBarcharts', function(){
    return{
      restrict:'E',
      templateUrl:'views/sse-barcharts.html'
    }});

  
  app.directive('servDataBarcharts', function(){
    return{
      restrict:'E',
      templateUrl:'views/serv-data-barcharts.html'      
    }

  });

  app.directive('geoMap', function(){
    return{
      restrict:'E',
      templateUrl:'views/geo-map.html'      
    }

  });

  app.directive('eventTypeFilter', function(){
    return{
      restrict:'E',
      templateUrl:'views/event-type-filter.html'

    }
  });
  /*
  Filters  
  */

  app.filter('custom', function() {
    return function(input, search) {
      if (!input) return input;
      if (!search) return input;
      var expected = ('' + search).toLowerCase();
      var result = {};
      angular.forEach(input, function(value, key) {
        var actual = ('' + key+ value).toLowerCase();
        if (actual.indexOf(expected) !== -1) {
          result[key] = value;
        }
      });
      return result;
    }
  })
  ;
})();

