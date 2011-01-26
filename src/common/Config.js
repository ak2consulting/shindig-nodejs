var fs = require('fs'),
    Config = exports.Config = function(){this.initialize.apply(this, arguments)};

Config.prototype = {
    initialize: function(local){
        local = local || 'local';
        this._config = require(fs.realpathSync(__dirname+'/../../config/container.js')).ShindigConfig;
        var localConfigPath = fs.realpath(__dirname+'/../../config/'+local+'.js', function(err, resolvePath){
            if(!err){
                localConfig = require(localConfigPath).ShindigConfig;
                for(var i in localConfig){
                    if(localConfig.hasOwnProperty(i)){
                        this._config[i] = localConfig[i];
                    }
                }
            }
        });
    },
    setConfig: function(_config){
    },
    get: function(key){
        if(this._config.hasOwnProperty(key)){
            return this._config[key];
        }else{
//             throw 'InvalidKeyConfigException';
            return false;
        }
    },
    set: function(key, value, force){
        force = force || true;
        if(force){
            this._config[key] = value;
        }else{
            if(this._config.hasOwnProperty(key)){
//                 throw 'OverwriteKeyConfigException';
                return false;
            }else{
                this._config[key] = value;
            }
        }
    }
};

