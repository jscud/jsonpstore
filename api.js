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

JsonPStore.addScript_ = function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript';
  var first = document.getElementsByTagName('script')[0];
  first.parentNode.insertBefore(script, first);
}

JsonPStore.addCallback_ = function(callback) {
  // Set a named callback so the JSONP response can trigger the callback.
  JsonPStore.callbacks['cb' + JsonPStore.callbackCounter] = function(stored) {
    // Clean up the reference to prevent a memory leak.
    JsonPStore.callbacks['cb' + JsonPStore.callbackCounter] = null;
    callback(stored);
  }
};

JsonPStore.set = function(key, value, callback) {
  JsonPStore.addCallback_(callback);
  JsonPStore.addScript_(['/set?k=', encodeURIComponent(key), 
                         '&v=', encodeURIComponent(value),
                         '&c=', JsonPStore.callbackCounter].join(''));
  JsonPStore.callbackCounter++;
}

JsonPStore.get = function(key, callback) {
  JsonPStore.addCallback_(callback);
  JsonPStore.addScript_(['/get?k=', encodeURIComponent(key), 
                         '&c=', JsonPStore.callbackCounter].join(''));
  JsonPStore.callbackCounter++;
}
