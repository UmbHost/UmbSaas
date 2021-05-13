$(".searchmore").on("click", function (e) {
    e.preventDefault();
    $('#pageno').val(parseInt($('#pageno').val()) + 1);
    var postData = createSearchAjaxRequestParams();
    doSearchAjaxRequest(postData, $('#pageno').val());
});


function doSearchAjaxRequest(postData, page) {
    page = Number(page);
    if (isNaN(page)) { page = 1; }
    if (page === 1) { $('#pageno').val(1); }
    $.ajax({
        type: "POST",
        url: "/Umbraco/Surface/Search/Search",
        contentType: "application/json; charset=utf-8",
        data: postData,
        success: function (result, status, xhr) {
            //if (page === 1) {
            //    $(".list").html(result);
            //} else {
            $(".list").append(result);
            //}
        },
        error: function (xhr, status, error) {
            $("#dataDiv").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}

function createSearchAjaxRequestParams() {
    var retVal = '';
    retVal += '{';

    retVal += createParamKeyValuePair("searchQuery", $("#searchQuery").val(), true, true);
    retVal += createParamKeyValuePair("page", $("#pageno").val(), true, false);
    retVal += createParamKeyValuePair("pageId", $("#pageid").val(), true, false);
    retVal += createParamKeyValuePair("recordsPerPage", $("#recordsperpage").val(), true, false);
    retVal += createParamKeyValuePair("culture", $("#culture").val(), false, true);

    retVal += '}';
    return retVal;
}

function createParamKeyValuePair(key, value, useSeparator, useQuotes) {
    if (useSeparator === undefined) useSeparator = true;
    if (useQuotes === undefined) useQuotes = true;
    return (key + ':' + ((useQuotes) ? '"' : '') + value + ((useQuotes) ? '"' : '') + ((useSeparator) ? ',' : ''));
}