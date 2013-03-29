#!/usr/bin/env python
#
# Copyright 2013 Jeff Scudder
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import cgi
import datetime
import urllib
import webapp2

from google.appengine.ext import db

class Item(db.Model):
  data = db.TextProperty()
  #owner = db.StringProperty()

class Setter(webapp2.RequestHandler):
  def get(self):
    key = self.request.get('k')
    value = self.request.get('v')
    callback = self.request.get('c')
    self.response.out.write(
      'JsonPStore.callbacks.cb' + callback + '(true);');
    self.response.content_type = 'text/javascript';

class Getter(webapp2.RequestHandler):
  def get(self):
    pass

class SignIn(webapp2.RequestHandler):
  def get(self):
    pass

app = webapp2.WSGIApplication([('/set', Setter),
                               ('/get', Getter),
                               ('/signIn', SignIn)],
                              debug=True)
