/*
Copyright 2013 Jeff Scudder

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var JsonPStore = JsonPStore || {
  callbacks: {},
  callbackCounter: 0
};

JsonPStore.HOST = 'https://jsonpstore.appspot.com/';

JsonPStore.call_ = function(path, params, callback) {
  // Build the request URL.
  var url = [JsonPStore.HOST, path, '?c=', JsonPStore.callbackCounter];
  for (var paramName in params) {
    if (params.hasOwnProperty(paramName)) {
      url = url.concat(['&', encodeURIComponent(paramName), '=',
                        encodeURIComponent(params[paramName])]);
    }
  }

  // Set a named callback so the JSONP response can trigger the callback.
  JsonPStore.callbacks['cb' + JsonPStore.callbackCounter] = function(response) {
    // Clean up the reference to prevent a memory leak.
    JsonPStore.callbacks['cb' + JsonPStore.callbackCounter] = null;
    if (callback) {
      callback(response);
    }
  }
  
  // Issue the request.
  var script = document.createElement('script');
  script.src = url.join('');
  script.type = 'text/javascript';
  var first = document.getElementsByTagName('script')[0];
  first.parentNode.insertBefore(script, first);

  JsonPStore.callbackCounter++;
};

JsonPStore.set = function(key, value, callback) {
  JsonPStore.call_('set', {k: key, v: value}, callback);
}

JsonPStore.get = function(key, callback) {
  JsonPStore.call_('get', {k: key}, callback);
}
