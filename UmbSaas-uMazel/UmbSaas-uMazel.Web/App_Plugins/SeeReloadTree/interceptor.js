angular.module('umbraco.services').config([
    '$httpProvider',
    function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q, $location) {
            return {
                'response': function (response) {
                    if (response.config.url.includes('/umbraco/backoffice/UmbracoApi/Content/PostSave')) {
                        if (response.status === 200) {
                            $location.path('/content/content/edit/' + response.data.id + '/');
                        }
                    }
                    return response;
                }
            };
        });
    }
]);