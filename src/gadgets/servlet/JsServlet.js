var HttpServlet = require(__dirname+'/../../common/HttpServlet.js').HttpServlet,
    GadgetsContext = require(__dirname+'/../../gadgets/GadgetContext.js').GadgetContext,
    GadgetFeatureRegistry = require('/../../gadgets/GadgetFeatureRegistry.js').GadgetFeatureRegistry;
    var JsServlet = exports.JsServlet = function(){this.initialize.apply(this, arguments)};
    JsServlet.prototype = new HttpServlet();
    JsServlet.prototype.initialize = function(){};
    JsServlet.prototype.doGet = function(req, res){
        this.noHeaders = true;
        if(req['HTTP_IF_MODIFIED_SINCE']){
            // TODO
//             res.header('HTTP/1.1 304 Not Modified');
            res.header('Content-Length', 0);
            this.destroy();
        }
        var url = req.url.toLowerCase();
        // TODO もっと短く書けるはず
        if(url.match(/^([^\/]*)\/?/)){
            url = url.match(/^([^\/]*)\/?/)[1];
        }

        
        
        
        $uri = strtolower($_SERVER["REQUEST_URI"]);
        $uri = substr($uri, strrpos($uri, '/') + 1);
        // remove any params that would confuse our parser
        if (strpos($uri, '?')) {
            $uri = substr($uri, 0, strpos($uri, '?'));
        }
        if (strpos($uri, '.js') !== false) {
            $uri = substr($uri, 0, strlen($uri) - 3);
        }
        $needed = array();
        if (strpos($uri, ':')) {
            $needed = explode(':', $uri);
        } else {
            $needed[] = $uri;
        }
        $found = array();
        $missing = array();
        $contextClass = Config::get('gadget_context_class');
        $context = new $contextClass('GADGET');
        $registry = new GadgetFeatureRegistry(Config::get('features_path'));
        if ($registry->resolveFeatures($needed, $found, $missing)) {
            $isGadgetContext = !isset($_GET["c"]) || $_GET['c'] == 0 ? true : false;
            $jsData = '';
            foreach ($found as $feature) {
                $jsData .= $registry->getFeatureContent($feature, $context, $isGadgetContext);
            }
            if (! strlen($jsData)) {
                header("HTTP/1.0 404 Not Found", true);
                die();
            }
            $this->setCachingHeaders();
            header("Content-Type: text/javascript");
            echo $jsData;
        } else {
            header("HTTP/1.0 404 Not Found", true);
        }
        die();
    };
    
    JsServlet.prototype.setCachingHeaders = function(){
        // Expires far into the future
        header("Expires: Tue, 01 Jan 2030 00:00:01 GMT");
        // IE seems to need this (10 years should be enough).
        header("Cache-Control: public,max-age=315360000");
        // Firefox requires this for certain cases.
        header("Last-Modified: " . gmdate('D, d M Y H:i:s', time()));
    };
