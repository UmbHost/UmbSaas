angular.module('umbraco.resources').factory('dashboardService', function ($http) {
    var getPageSettings = function () {
        return $http.get('/umbraco/backoffice/api/dashboard/getpagesettings');
    }
    return {
        getPageSettings: getPageSettings
    };
});
