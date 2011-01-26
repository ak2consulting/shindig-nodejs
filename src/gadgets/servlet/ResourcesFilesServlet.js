var FilesServlet = require(__dirname+'/FilesServlet.js').FilesServlet;
var ResourcesFilesServlet = exports.ResourcesFilesServlet = function(){this.initialize.apply(this, arguments)};
ResourcesFilesServlet.prototype = new FilesServlet();
ResourcesFilesServlet.prototype.initialize = function(){}
ResourcesFilesServlet.prototype.getPath = function(){
    return process.Config.get('resources_path');
};
ResourcesFilesServlet.prototype.getRequestUri = function(req){
    return req.url.replace(/\gadgets\/resources\//g, '');
};
