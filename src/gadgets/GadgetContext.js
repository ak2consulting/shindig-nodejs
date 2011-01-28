var Cache = require(__dirname+'/../../common/Cache.js').Cache,
    Hash = require(__dirname+'/../../common/Hash.js').Hash,
    BasicSecurityToken = require(__dirname+'/../../common/sample/Hash.js').BasicSecurityToken;
var GadgetContext = exports.GadgetContext = function(){this.initialized.apply(this, arguments);};
GadgetContext.prototype = {
    initialized: function(){
        this.DEFAULT_VIEW = 'profile';
        this.httpFetcher = null;
        this.locatle = null;
        this.renderingContext = this.setRenderingContext();
        this.registry = null;
        this.view = null;
        this.moduleId = null;
        this.url = null;
        this.cache = null;
        this.blacklist = null;
        this.ignoreCache = this.setIgnoreCache();
        this.forcedJsLibs = setForcedJsLibs();
        this.containerConfig = null;
        this.container = null;
        this.refreshInterval;
//     $this->setRenderingContext($renderingContext);

//     // Request variables
//     $this->setIgnoreCache($this->getIgnoreCacheParam());
//     $this->setForcedJsLibs($this->getForcedJsLibsParam());
//     $this->setUrl($this->getUrlParam());
//     $this->setModuleId($this->getModuleIdParam());
//     $this->setView($this->getViewParam());
//     $this->setContainer($this->getContainerParam());
//     $this->setRefreshInterval($this->getRefreshIntervalParam());
    },
    getRefreshIntervalParam: function(req){
        return req.query['refresh'] ? req.query['refresh'] : process.Config.get('default_refresh_interval');
    },
    getContainerParam: function(req) {
        var container = 'default';
        if(req.query['container']){
            container = req.query['container'];
        }else if(false){
            // TODO:
            //$container = $_POST['container'];
        }else if(req.query['synd']){
            container = req.query['synd'];
        }else if(false){
            // TODO:
            //$container = $_POST['synd'];
        }
        return container;
    },
    getIgnoreCacheParam: function(req) {
        // TODO:
        // Support both the old Orkut style &bpc and new standard style &nocache= params
        return (req.query['nocache'] !== undefined) || (req.query['bpc'] !== undefined);
//         return (isset($_GET['nocache']) && intval($_GET['nocache']) == 1) || (isset($_GET['bpc']) && intval($_GET['bpc']) == 1);
    },
    getForcedJsLibsParam: function(req) {
        return req.query['libs'] ? req.query['libs'] : null;
    },
    getUrlParam: function(req) {
        if(req.query['url']){
            return req.query['url'];
        }else if(false){
            //TODO:
//             return $_POST['url'];
        }
        return null;
    },
    getModuleIdParam: function(req) {
        return (req.query['mid'] && req.query['mid'].match(/^\d+$/)) ? req.query['mid'] : 0;
    },
    getViewParam: function(req) {
        return req.query['view'] ? req.query['view'] : this.DEFAULT_VIEW;
    },
    instanceBlacklist: function() {
        var blackListClass = process.Config.get('blacklist_class');
        if (blackListClass) {
            return new blackListClass();
        } else {
            return null;
        }
    },
    instanceHttpFetcher: function() {
        var remoteContent = process.Config.get('remote_content');
        return new remoteContent();
    },
    instanceRegistry: function(req) {
        var featureCache = Cache.createCache(process.Config.get('feature_cache'), 'FeatureCache'),
            key = Hash.MD5.calc(process.Config.get('features_path').join(',')),
            registry = featureCache.get(key);
        if(!registry){
            registry = new GadgetFeatureRegistry(process.Config.get('features_path'));
            featureCache.set(key, registry);
        }
        return registry;
    },
    instanceLocale: function(req) {
        var language = req.query['lang'] ? req.query['lang'] : req.body['lang'] ? req.body['lang'] : 'all',
            country = req.query['country'] ? req.query['country'] : req.body['country'] ? req.body['country'] : 'all',
            return {'lang': language.toLowerCase(), 'country': country.toLowerCase()};
    },
    instanceContainerConfig: function() {
        var containerConfigClass = process.Config.get('container_config_class');
        return new containerConfigClass(process.Config.get('container_path'));
    },
    getContainer: function() {
        return this.container;
    },
    getContainerConfig: function() {
        if (this.containerConfig === null) {
            this.containerConfig = this.instanceContainerConfig();
        }
        return this.containerConfig;
    },
    getModuleId: function() {
        return this.moduleId;
    },
    getRegistry: function() {
        if (this.registry === null) {
            this.setRegistry(this.instanceRegistry());
        }
        return this.registry;
    },
    getUrl: function() {
        return this.url;
    },
    getView: function() {
        return this.view;
    },
    setRefreshInterval: function(interval) {
        this.refreshInterval = interval;
    },
    setContainer: function(container) {
        this.container = container;
    },
    setContainerConfig: function(containerConfig) {
        this.containerConfig = containerConfig;
    },
    setBlacklist: function(blacklist) {
        this.blacklist = blacklist;
    },
    setCache: function(cache) {
        this.cache = cache;
    },
    setHttpFetcher: function(httpFetcher) {
        this.httpFetcher = httpFetcher;
    },
    setLocale: function(locale) {
        this.locale = locale;
    },
    setModuleId: function(moduleId) {
        this.moduleId = moduleId;
    },
    setRegistry: function(registry) {
        this.registry = registry;
    },
    setRenderingContext: function(renderingContext) {
        this.renderingContext = renderingContext;
    },
    setUrl: function(url) {
        this.url = url;
    },
    setView: function(view) {
        this.view = view;
    },
    setIgnoreCache: function(ignoreCache) {
        this.ignoreCache = ignoreCache;
    },
    setForcedJsLibs: function(forcedJsLibs) {
        this.forcedJsLibs = forcedJsLibs;
    },
    getRefreshInterval: function() {
        return this.refreshInterval;
    },
    getIgnoreCache: function() {
        return this.ignoreCache;
    },
    getForcedJsLibs: function() {
        return this.forcedJsLibs;
    },
    getBlacklist: function() {
        if (this.blacklist === null) {
            this.setBlacklist(this.instanceBlacklist());
        }
        return this.blacklist;
    },
    getRenderingContext: function() {
        return this.renderingContext;
    },
    getHttpFetcher: function() {
        if (this.httpFetcher === null) {
            this.setHttpFetcher(this.instanceHttpFetcher());
        }
        return this.httpFetcher;
    },
    getLocale: function() {
        if (this.locale === null) {
            this.setLocale(this.instanceLocale());
        }
        return this.locale;
    },
    extractAndValidateToken: function(signer) {
        if (signer === null) {
            return null;
        }
        //TODO:
        token = BasicSecurityToken.getTokenStringFromRequest();
        
        return this.validateToken(token, signer);
    },
    validateToken: function(token, signer) {
        if (!token) {
            throw 'Missing or invalid security token';
        }
        return signer.createToken(token);
    }
};

