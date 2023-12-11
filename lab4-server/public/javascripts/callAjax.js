
function callAjax(url, method, successHandler, data, contentType) {
    $.ajax({
        url: url,
        method: method,
        data: data,
        contentType: contentType,
        success: successHandler,
        error: (error) => console.error("Was an error:", error)
    });
}

export {callAjax};