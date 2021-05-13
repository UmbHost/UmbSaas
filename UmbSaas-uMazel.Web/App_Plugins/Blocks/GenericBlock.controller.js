angular.module("umbraco").controller("Umazel.Website.Blocks.GenericBlockController", function ($scope, entityResource) {

    var vm = this;
    getIsDisabled();
    getChildItemsCount();
    vm.label = ($scope.block.label === '' || $scope.block.label === null) ? '(No title)' : $scope.block.label;


    $scope.$watch("block.data.disabled", function (newValue, oldValue) {
        if (newValue === oldValue) return;
        getIsDisabled();
    });

    function getIsDisabled() {
        vm.isDisabled = $scope.block.data.disabled;
    }

    function getChildItemsCount() {
        var subItems = $scope.block.data.items;
        // Check if 'items' is a multiple media picker rather than a nested block.
        if ((typeof subItems) === 'string') {
            vm.childItemsCount = (subItems !== undefined) ? (subItems.match(/umb:/g) || []).length : 0;
        } else {
            vm.childItemsCount = (subItems !== undefined) ? subItems.contentData.length : 0;
        }
    }

    //vm.imageUrl = null;
    //function loadImage(propertyVaue) {
    //    if (propertyVaue != "") {
    //        entityResource.getById(propertyVaue, "Media").then(function (ent) {
    //            vm.imageUrl = ent.metaData.MediaPath;
    //        });
    //    } else {
    //        vm.imageUrl = null;
    //    }
    //}

    //loadImage($scope.block.data.image);

    //$scope.$watch("block.data.image", function (newValue, oldValue) {
    //    if (newValue === oldValue) return;
    //    loadImage(newValue);
    //});

});