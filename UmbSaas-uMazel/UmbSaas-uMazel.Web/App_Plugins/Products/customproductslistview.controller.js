
(function () {
    "use strict";

    function customproductslistviewcontroller($scope, listViewHelper, $location, contentResource, mediaResource, mediaHelper) {

        var vm = this;

        vm.selectItem = selectItem;
        vm.clickItem = clickItem;

        // Init the controller
        function activate() {

            // Load background image for each item
            angular.forEach($scope.items, function (item) {
                getBackgroundImage(item);
            });

        }

        // Load background image
        function getBackgroundImage(item) {
            console.log(item);
            //contentResource.getById(item.id).then(function (c) { var mydoc = c; console.log(c.Price); });
            mediaResource.getById(item.productImages.split(',')[0])
                .then(function (media) {
                    // find the image thumbnail
                    item.imageThumbnail = mediaHelper.resolveFile(media, true);
                });
        }

        // Item select handler
        function selectItem(selectedItem, $event, index) {

            // use the list view helper to select the item
            listViewHelper.selectHandler(selectedItem, index, $scope.items, $scope.selection, $event);
            $event.stopPropagation();

        }

        // Item click handler
        function clickItem(item) {

            // change path to edit item
            $location.path($scope.entityType + '/' + $scope.entityType + '/edit/' + item.id);

        }

        activate();

    }

    angular.module("umbraco").controller("My.ListView.Layout.customproductslistviewcontroller", customproductslistviewcontroller);

})();