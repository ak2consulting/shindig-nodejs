var HttpServlet = require(__dirname+'/../../common/HttpServlet.js').HttpServlet,
    GadgetsContext = require(__dirname+'/../../gadgets/GadgetContext.js').GadgetContext,
    GadgetFeatureRegistry = require('/../../gadgets/GadgetFeatureRegistry.js').GadgetFeatureRegistry;
    var JsServlet = exports.JsServlet = function(){this.initialize.apply(this, arguments)};
    JsServlet.prototype = new HttpServlet();
    JsServlet.prototype.initialize = function(){};
    JsServlet.prototype.doGet = function(req, res){
        this.noHeaders = true;
        if(req['HTTP_IF_MODIFIED_SINCE']){
            res.header('Content-Length', 0);
            res.send('Not Modified', 304);
            this.destroy();
        }
        var url = req.url.toLowerCase(), needed = undefined,
            found = [], missing = [], ContextClass = process.Config.get('gadget_context_class'),
            context = new ContextClass('GADGET'), registry = new GadgetFeatureRegistry(process.Config.get('features_path')),
            isGadgetContext = true, jsData = '';

        url = url.match(/^.*\/([^\?]*)/)[1];
        if(url.indexOf('.js') > -1){
            url = url.substr(0, url.indexOf('.js'));
        }
        if(url.indexOf(':') > -1){
            needed = url.split(':');
        }else{
            needed = [url];
        }
        if(registry.resolveFeatures(needed, found, missing)){
            isGadgetContext = !req.query['c'] || req.query['c'] === 0 ? true: false;
            for(var feature in found){
                if(found.hasOwnProperty(feature)){
                    jsData += registry.getFeatureContent(feature, context, isGadgetContext);
                }
            }
            if(jsData === ''){
                res.send('Not Found', 404);
                this.destroy();
            }
            this.setCachingHeaders(res);
            res.header('Content-Type', 'text/javascript');
            res.send(jsData);
        }else{
            res.send('Not Found', 404);
        }
        this.destroy();
    };
    
    JsServlet.prototype.setCachingHeaders = function(res){
        res.header('Expires', 'Tue, 01 Jan 2030 00:00:01 GMT');
        res.header('Cache-Control', 'public,max-age=315360000');
        var date = new Date(), w = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getUTCDay()],
            d = date.getUTCDate(), M = date.getUTCMonth(), Y = date.getUTCFullYear(),
            H = d.getUTCHours(), i = date.getUTCMinutes(), s = date.getUTCSeconds();
        
        res.header('Last-Modified', w+', '+ (d < 10 ? '0'+d : d) +' '+ (M < 10 ? '0'+M : M) +' '+ Y +' '+
                   (H < 10 ? '0'+H : H) +':'+ (i < 10 ? '0'+i : i) + ':' + (s < 10 ? '0'+s : s));
    };
