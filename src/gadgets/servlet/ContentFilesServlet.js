var FilesServlet = require(__dirname+'/FilesServlet.js').FilesServlet;
var ContentFilesServlet = exports.ContentFilesServlet = function(){this.initialize.apply(this, arguments)};
ContentFilesServlet.prototype = new FilesServlet();
ContentFilesServlet.prototype.initialize = function(){
};
ContentFilesServlet.prototype.getPath = function(){
    return process.Config.get('javascript_path');
};
