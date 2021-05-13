var enableHideNodes = "";
var enableUncheckVariants = "";
$.ajax({
    url: "/umbraco/api/TreeVariantSettings/HideUnpublishedVariantsFromTree",
    success: function (data) {
        enableHideNodes = data;
    }
    , async: false
});

$.ajax({
    url: "/umbraco/api/TreeVariantSettings/UncheckUnpublishedVariantsOnPublish",
    success: function (data) {
        enableUncheckVariants = data;
    }
    , async: false
});

if (enableHideNodes === "true") {

    $(document).arrive("li.umb-tree-item.not-published-add", function () {
        var name = $(this).find("a").text();
        if (name.startsWith("(") && name.endsWith(")")) {
            $(this).hide();
        }
    });
    $(document).arrive("li.umb-tree-item.not-published", function () {
        var name = $(this).find("a").text();
        if (name.startsWith("(") && name.endsWith(")")) {
            $(this).hide();
        }
    });
}

if (enableUncheckVariants === "true") {

    $(document).arrive("ng-form[name='publishVariantSelectorForm'] input[type='checkbox'].ng-not-empty", function () {
        $(this).click();

        $("ng-form[name='publishVariantSelectorForm'] input[type='checkbox']").first().click();
    });
}