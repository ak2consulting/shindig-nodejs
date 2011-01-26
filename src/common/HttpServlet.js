var HttpServlet = exports.HttpServlet = function(){this.initialize.apply(this, arguments)};
HttpServlet.prototype = {
    initialize: function(){
        this.lastModified = false;
        this.contentType = 'text/html';
        this.charset = 'UTF-8';
        this.noCache = false;
        this.cacheTime = process.Config.get('cache_time');
        this.noHeaders = false;

    },
    destroy: function(){
        // TODO:
//     if (! $this->noHeaders) {
//       header("Content-Type: $this->contentType" . (! empty($this->charset) ? "; charset={$this->charset}" : ''));
//       header('Accept-Ranges: bytes');
//       if ($this->noCache) {
//         header("Cache-Control: no-cache, must-revalidate", true);
//         header("Expires: Mon, 26 Jul 1997 05:00:00 GMT", true);
//       } else {
//         // attempt at some propper header handling from php
//         // this departs a little from the shindig code but it should give is valid http protocol handling
//         header('Cache-Control: public,max-age=' . $this->cacheTime, true);
//         header("Expires: " . gmdate("D, d M Y H:i:s", time() + $this->cacheTime) . " GMT", true);
//         // Obey browsers (or proxy's) request to send a fresh copy if we recieve a no-cache pragma or cache-control request
//         if (! isset($_SERVER['HTTP_PRAGMA']) || ! strstr(strtolower($_SERVER['HTTP_PRAGMA']), 'no-cache') && (! isset($_SERVER['HTTP_CACHE_CONTROL']) || ! strstr(strtolower($_SERVER['HTTP_CACHE_CONTROL']), 'no-cache'))) {
//           if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && $this->lastModified && ! isset($_SERVER['HTTP_IF_NONE_MATCH'])) {
//             $if_modified_since = strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']);
//             if ($this->lastModified <= $if_modified_since) {
//               header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $this->lastModified) . ' GMT', true);
//               header("HTTP/1.1 304 Not Modified", true);
//               header('Content-Length: 0', true);
//               ob_end_clean();
//               die();
//             }
//           }
//           header('Last-Modified: ' . gmdate('D, d M Y H:i:s', ($this->lastModified ? $this->lastModified : time())) . ' GMT', true);
//         }
//       }
//     }
//     else {
//       ob_end_flush();
//     }
    },
    getCharset: function(){
        return this.charset;
    },
    setCharset: function(charset){
        this.charset = charset;
    },
    setCacheTime: function(time){
        this.cacheTime = time;
    },
    getCacheTime: function(){
        return this.cacheTime;
    },
    setContentType: function(type){
        this.contentType = type;
    },
    getContentType: function(){
        return this.contentType;
    },
    getLastModified: function(){
        return this.lastModified;
    },
    setLastModified: function(modified){
        this.lastModified = this.lastModified > modified ? this.lastModified: modified;
    },
    setNoCache: function(cache){
        this.noCache = (cache === undefined) ? false: cache;
    },
    getNoCache: function(){
        return this.noCache;
    }
};
