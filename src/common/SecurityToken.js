/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


/**
 * An abstract representation of a signing token.
 * Use in conjunction with @code SecurityTokenDecoder.
 */
 
 var SecurityToken = exports.SecurityToken = function(){this.initialize.apply(this, arguments);};
 SecurityToken.prototype = {
     initialize: function(){},
     createFromToken: function(token, maxage) {},
     createFromValues: function(owner, viewer, app, domain, appUrl, moduleId, containerId) {},
     ANONYMOUS: '-1',

  /**
   * should return the actual raw token string from get, post or header
   * 
   * @return string
   */
     getTokenStringFromRequest: function() {}
     
  /**
   * is this an anonymous token? Always check this before using the owner/viewer/etc
   *
   * @return boolean if it's anonymous
   */
     isAnonymous: function(){},

  /**
   * Serializes the token into a string. This can be the exact same as
   * toString; using a different name here is only to force interface
   * compliance.
   *
   * @return A string representation of the token.
   */
     toSerialForm: function(){},

  /**
   * @return the owner from the token, or null if there is none.
   */
     getOwnerId: function(){},

  /**
   * @return the viewer from the token, or null if there is none.
   */
     getViewerId: function(){},

  /**
   * @return the application id from the token, or null if there is none.
   */
     getAppId: function(){},

  /**
   * @return the domain from the token, or null if there is none.
   */
     getDomain: function(){},

  /**
   * @return the URL of the application
   */
     getAppUrl: function(){},

  /**
   * @return the module ID of the application
   */
     getModuleId: function(){},
  
  /**
   * @return string
   */
     getAuthenticationMode: function(){},

  /**
   * @param string $mode
   */
     setAuthenticationMode: function(mode){};
 };
