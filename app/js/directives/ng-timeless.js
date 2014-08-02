(function() {
  'use strict';

  angular.module("Timeless", [])
    .directive('timeless', function() {

      var Timeless;
      Timeless = {
        times: {
          year: 31557600000, month: 2629800000, week: 604800000,
          day: 86400000, hour: 3600000, minute: 60000, second: 1000
        },
        labels: {
          past: ['ago'],
          future: ['in'],
          year: ['yr', 'yrs'],
          month: ['month', 'months'],
          week: ['wk', 'wk'],
          day: ['d', 'd'],
          hour: ['h', 'h'],
          minute: ['min', 'min'],
          second: ['s', 's'],
          prefix: '',
          suffix: '',
          updateInterval: 1000,
          timeType: {
            auto: 0,
            month: 1,
            week: 2,
            day: 3,
            hour: 4,
            minute: 5,
            second: 6
          }
        },
        epoch: function () {
          return Date.now();
        },
        difference: function (time) {
          return this.epoch() - time;
        },
        estimate: function (date) {
          var diff = this.difference(date)
            , ago
            , future
            , time
            , result = [];

          for (time in this.times) {
            if (diff >= this.times[time]) {
              ago = Math.floor(diff / this.times[time]);
              time = Timeless.labels[time][ago > 1 ? 1 : 0];
              result.push(
                Timeless.labels.prefix
                + ' '
                + ago
                + ''
                + time
                + ' '
                + Timeless.labels.past
                + ' '
                + Timeless.labels.suffix
              );
            }
            else if (diff < 0 && diff <= this.times[time]) {
              future = Math.abs(Math.floor(diff / this.times[time]));
              if (future > 1) {
                time = Timeless.labels[time][1];
                result.push(
                  Timeless.labels.prefix
                  + ' '
                  + Timeless.labels.future
                  + ' '
                  + future
                  + ' '
                  + time
                  + ' '
                  + Timeless.labels.suffix
                );
              }
            }
          }
          return result;
        },
        isValid: function(timeItem) {
          return Object.keys(timeItem);
        }

      };

    var applies = [];
    setInterval(function () {
      if (applies && applies.length > 0){
        for (var i = 0; i < applies.length; i++){
          var fun = applies[i].fn;
          fun();
        }
      }
    }, 1000);

    var guid = (function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
      }
      return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
      };
    })();

    return {
      transclude: true,
      restrict: 'E',
      replace: true,
      template: '<span ng-transclude></span>',
      scope: {
          time: '=',
          options: '=',
          type: '='
      },
      link: function(scope, element, attrs) {
        console.log("created: " + scope.$id);
        angular.extend(Timeless.labels, scope.options);
        var estimateTime = Timeless.estimate(typeof scope.time === 'string' ? new Date(scope.time) : scope.time)
          , setTimeType;

        if (typeof estimateTime[Timeless.labels.timeType[scope.type]] == 'undefined') {
          setTimeType = Timeless.labels.timeType.auto;
        }
        else {
          setTimeType = Timeless.labels.timeType[scope.type];
        }
        setTimeout(function() {
            element.text(estimateTime[setTimeType]);
        }, 1);

        scope.refreshFn = {
          id: scope.$id, 
          fn: function() {
            scope.$apply(function () {
              var estimateTime = Timeless.estimate(typeof scope.time === 'string' ? new Date(scope.time) : scope.time);
              element.text(estimateTime[setTimeType]);
            });
          }
        };
        applies.push(scope.refreshFn);
        console.log('length: ' + applies.length);

        scope.$on('$destroy', function() {
          console.log("destroy: " + scope.$id);
          for (var i = 0; i < applies.length; i++) {
            var item = applies[i];
            if (item.id == scope.$id){
              applies.splice(i, 1);
              console.log('matamos: ' + scope.$id);
              console.log('length: ' + applies.length);
            }
          };
        });
      }
    };
  });

}());
