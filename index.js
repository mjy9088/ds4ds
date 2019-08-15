module.exports = (function () {
    const fs = require('fs');
    var DS4DS = {};
    DS4DS.fd = function (index, data) {
        this.index = index;
        this.data = data;
    };
    DS4DS.open = function (path, mode, callback) {
        if(!callback) {
            callback = mode;
            mode = 'r';
        }
        var tmp = {};
        (function (callback) {
            var ok = false, err, fd;
            tmp.index = function (_err, _fd) {
                if(!ok) {
                    err = _err;
                    fd = _fd;
                    ok = true;
                }
                else
                {
                    if(err) {
                        callback(err);
                    }
                    else if(_err) {
                        callback(_err);
                    }
                    else {
                        callback(undefined, new DS4DS.fd(_fd, fd));
                    }
                }
            }, tmp.data = function () {
                if(!ok) {
                    err = _err;
                    fd = _fd;
                    ok = true;
                }
                else
                {
                    if(err) {
                        callback(err);
                    }
                    else if(_err) {
                        callback(_err);
                    }
                    else {
                        callback(undefined, new DS4DS.fd(fd, _fd));
                    }
                }
            };
        })(callback);
        fs.open(path + '.index', mode, tmp.index);
        fs.open(path + '.data', mode, tmp.data);
    }
    return DS4DS;    
})();
