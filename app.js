/**
 * Module dependencies.
 */
 var express = require('express'),
     Config = process.Config = new (require('./src/common/Config.js').Config)(),
     Modules = {};

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});
  if(Config.get('debug')){
      // Basic sanity check if we have all required modules
//       var _modules = 'json SimpleXML libxml curl openssl'.split(' ');
      var _modules = ''.split(' ');
      // if plain text tokens are disallowed we require mcrypt
      if(!Config.get('allow_plaintext_token')){
          _modules.push('mcrypt');
      }
      // if you selected the memcache caching backend, you need the memcache extention too :) 
      if(Config.get('data_cache') === 'CacheMemcache'){
          _modules.push('memcache');
      }
      // TODO: evalでmoduleのロードを確認する？
      for(var i = 0, l = _modules.length; i < l; i++){
          try{
              if(_modules[i].length > 0){
                  Modules[_modules[i]] = require(_modules[i]);
              }
          }catch(ex){
              console.log(ex);
              process.exit(-1);
          }
      }
      // NOTICE:
      //   get_magic_quotes_gpc と always_populate_raw_post_data を無視
  }

  // TODO: autoload の実装をどうするか
  var locations = [
      'src/common', 'src/gadgets/servlet', 
  ];
//       'src/common', 'src/common/sample', 'src/gadgets', 'src/gadgets/servlet', 
//       'src/gadgets/oauth', 'src/gadgets/sample', 'src/social', 'src/social/servlet', 
//       'src/social/service', 'src/social/opensocial', 'src/social/model', 'src/social/spi', 
//       'src/social/converters', 'src/social/oauth', 'src/social/sample'];
  
  // Routes
  var configServletMap = Config.get('servlet_map');
  if(configServletMap){
      for(var path in configServletMap){
          if(configServletMap.hasOwnProperty(path)){
              console.log(path, configServletMap[path]);
              for(var i = 0; i < locations.length; i++){
                  try{
                      var Class = new (require(__dirname+'/'+locations[i]+'/'+configServletMap[path]+'.js')[configServletMap[path]])();
                      if(Class.doGet && typeof Class.doGet === 'function'){
                          app.get(path, Class.doGet);
                      }else if(Class.doPost && typeof Class.doPost === 'function'){
                          app.post(path, Class.doPost);
                      }
                  }catch(ex){
                      console.log(ex);
                  }
              }
//               app[configServletMap[path].method](path, configServletMap[path].func);
          }
      }
  }
// app.get('/', function(req, res){
//   res.render('index.jade', {
//     locals: {
//         title: 'Express'
//     }
//   });
// });

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}
