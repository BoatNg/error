module.exports = function() {
    var domain = 'http://127.0.0.1:7001'
    var flag = true;
    window.onload = function() {
        // CSRF
        var csrftoken = getCookie('csrfToken');
        function csrfSafeMethod(method) {
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }
        function getCookie(name) {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
            else
            return null;
        }
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader('x-csrf-token', csrftoken);
                }
            },
        });
    }
    $(document).ajaxError(function() {
        if(!flag) return;
        flag = false;
        var arg = arguments;
        var now = new Date();
        $.ajax({
            url:domain + '/api/v1/ajaxError',
            method:'GET',
            dataType: 'jsonp',
            data:{
                status: arg[1].status,
                data: arg[2].data,
                url: arg[2].url,
                method: arg[2].method,
                statusText: arg[1].statusText,
                time: now
            }
        })
    });
    window.onerror = function(type, file, line, row) {
        var nowTime = new Date();
        $.ajax({
            url:domain + '/api/v1/errord',
            method:'GET',
            dataType: 'jsonp',
            data:{
                type:arguments[0].split(':')[0],
                detail: arguments[0].split(':')[1],
                file: arguments[1],
                row: arguments[2],
                line: arguments[3],
                time: nowTime
            }
        })
    }
    a.b();
}

