var HttpServlet = require(__dirname+'/../../common/HttpServlet.js').HttpServlet;
var FilesServlet = exports.FilesServlet = function(){this.initialize.apply(this, arguments);};
var fs = require('fs');

FilesServlet.prototype = new HttpServlet();
FilesServlet.prototype.initialize = function(){};
FilesServlet.prototype.getPath = undefined;
// TODO: require url が url か originalUrl かの確認
FilesServlet.prototype.getRequestUri = function(req){req.url};
FilesServlet.prototype.doGet = function(req, res){
     // TODO: doGet のインプリメント
    var file = this.getRequestUri().replace(new RegExp(process.Config.get('web_prefix'), 'g'), '');
    file = this.getPath() + file;

//     if(fs.realpathSync(file).substr(0, ))

    /*
    if (substr(realpath($file), 0, strlen(realpath($this->getPath()))) != realpath($this->getPath())) {
      header("HTTP/1.0 400 Bad Request", true);
      echo "<html><body><h1>400 - Bad Request</h1></body></html>";
      die();
    }
    // if the file doesn't exist or can't be read, give a 404 error
    if (! file_exists($file) || ! is_readable($file) || ! is_file($file)) {
      header("HTTP/1.0 404 Not Found", true);
      echo "<html><body><h1>404 - Not Found</h1></body></html>";
      die();
    }
    $dot = strrpos($file, '.');
    if ($dot) {
      $ext = strtolower(substr($file, $dot + 1));
      if ($ext == 'html' || $ext == 'htm') {
        $this->setContentType('text/html');
      } elseif ($ext == 'js') {
        $this->setContentType('text/javascript');
      } elseif ($ext == 'css') {
        $this->setContentType('text/css');
      } elseif ($ext == 'xml') {
        $this->setContentType('text/xml');
      } elseif ($ext == 'png') {
        $this->setContentType('image/png');
      } elseif ($ext == 'gif') {
        $this->setContentType('image/gif');
      } elseif ($ext == 'jpg' || $ext == 'jpeg') {
        $this->setContentType('image/jpeg');
      }
    }
    $this->setCharset('');
    $this->setLastModified(filemtime($file));
    readfile($file);
}
*/
};
//   /**
//    * Handles the get file request, if the file exists and is in the correct
//    * location it's echo'd to the browser (with a basic content type guessing
//    * based on the file extention, ie .js becomes text/javascript).
//    * If the file location falls outside of the shindig/javascript root a
//    * 400 Bad Request is returned, and if the file is inside of the root
//    * but doesn't exist a 404 error is returned
//    */
//   public function doGet() {
//     $file = str_replace(Config::get('web_prefix'), '', $this->getRequestUri());
//     $file = $this->getPath() . $file;
//     // make sure that the real path name is actually in the javascript_path, so people can't abuse this to read
//     // your private data from disk .. otherwise this would be a huge privacy and security issue 
//     if (substr(realpath($file), 0, strlen(realpath($this->getPath()))) != realpath($this->getPath())) {
//       header("HTTP/1.0 400 Bad Request", true);
//       echo "<html><body><h1>400 - Bad Request</h1></body></html>";
//       die();
//     }
//     // if the file doesn't exist or can't be read, give a 404 error
//     if (! file_exists($file) || ! is_readable($file) || ! is_file($file)) {
//       header("HTTP/1.0 404 Not Found", true);
//       echo "<html><body><h1>404 - Not Found</h1></body></html>";
//       die();
//     }
//     $dot = strrpos($file, '.');
//     if ($dot) {
//       $ext = strtolower(substr($file, $dot + 1));
//       if ($ext == 'html' || $ext == 'htm') {
//         $this->setContentType('text/html');
//       } elseif ($ext == 'js') {
//         $this->setContentType('text/javascript');
//       } elseif ($ext == 'css') {
//         $this->setContentType('text/css');
//       } elseif ($ext == 'xml') {
//         $this->setContentType('text/xml');
//       } elseif ($ext == 'png') {
//         $this->setContentType('image/png');
//       } elseif ($ext == 'gif') {
//         $this->setContentType('image/gif');
//       } elseif ($ext == 'jpg' || $ext == 'jpeg') {
//         $this->setContentType('image/jpeg');
//       }
//     }
//     $this->setCharset('');
//     $this->setLastModified(filemtime($file));
//     readfile($file);
//   }
// }
