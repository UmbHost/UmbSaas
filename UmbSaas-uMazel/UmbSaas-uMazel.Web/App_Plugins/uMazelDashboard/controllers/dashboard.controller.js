app.controller('uMazelIntroCtrl', function ($scope, dashboardService) {
    dashboardService.getPageSettings().then(function (response) {
        $scope.pageSettings = response.data;
    });
});
