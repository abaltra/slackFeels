(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('auth/forgot.tpl.html',
    '<div class="row">\n' +
    '  <div class="col-md-4 col-md-offset-4">\n' +
    '\n' +
    '    <form role="form" name="form" ng-submit="submitted = true; forgot()" novalidate>\n' +
    '      <div class="form-group">\n' +
    '        <input type="email" class="form-control" id="email" name="email" placeholder="Email" ng-model="credentials.email" required>\n' +
    '      </div>\n' +
    '      <!--<button type="submit" class="btn btn-primary" ng-disabled="!form.modified || form.$invalid">Reset Password</button>-->\n' +
    '      <button type="submit" class="btn btn-primary">Reset Password</button>\n' +
    '      <div class="form-group" style="display: none;">\n' +
    '        <label for="helper">Leave this field blank</label>\n' +
    '        <input type="text" class="form-control" id="helper" name="helper" ng-model="credentials.helper"/>\n' +
    '      </div>\n' +
    '    </form>\n' +
    '\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('auth/recover.tpl.html',
    '<div class="row">\n' +
    '  <div class="col-md-4 col-md-offset-4">\n' +
    '\n' +
    '    <form role="form" name="form" ng-submit="submitted = true; recover()" novalidate>\n' +
    '      <div class="form-group">\n' +
    '        <input type="password" class="form-control" id="password" name="password" placeholder="Password" ng-model="credentials.password" required>\n' +
    '      </div>\n' +
    '      <div class="form-group">\n' +
    '        <input type="password" class="form-control" id="password-confirmation" name="password-confirmation" placeholder="Repeat Password" ng-model="credentials.passwordConfirmation" required>\n' +
    '      </div>\n' +
    '      <button type="submit" class="btn btn-primary" ng-disabled="!form.modified || form.$invalid">Recover Password</button>\n' +
    '      <div class="form-group" style="display: none;">\n' +
    '        <label for="helper">Leave this field blank</label>\n' +
    '        <input type="text" class="form-control" id="helper" name="helper" ng-model="credentials.helper"/>\n' +
    '      </div>\n' +
    '    </form>\n' +
    '\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('footer/index.tpl.html',
    '<div ng-controller="FooterCtrl">\n' +
    '  <footer class="footer">\n' +
    '    <div class="container">\n' +
    '      <p class="center">Made by The Two Beards.</p>\n' +
    '    </div>\n' +
    '  </footer>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('header/index.tpl.html',
    '<div ng-controller="HeaderCtrl">\n' +
    '  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">\n' +
    '    <!-- Brand and toggle get grouped for better mobile display -->\n' +
    '    <div class="navbar-header">\n' +
    '      <button type="button" class="navbar-toggle" data-toggle="collapse"\n' +
    '              data-target="#bs-example-navbar-collapse">\n' +
    '        <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span><span\n' +
    '        class="icon-bar"></span><span class="icon-bar"></span>\n' +
    '      </button>\n' +
    '      <a class="navbar-brand" href="/">slack feels</a>\n' +
    '    </div>\n' +
    '    <!-- Collect the nav links, forms, and other content for toggling -->\n' +
    '    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse">\n' +
    '      <ul class="nav navbar-nav">\n' +
    '        <li ng-repeat="navItem in navItems">\n' +
    '          <a href="{{navItem.url}}"><i class="{{navItem.cssClass}}"></i>&nbsp; {{navItem.title}}</a>\n' +
    '        </li>\n' +
    '      </ul>\n' +
    '\n' +
    '\n' +
    '      <ul class="nav navbar-nav navbar-right">\n' +
    '        <li ng-hide="currentUser">\n' +
    '          <a href="/register">Sign Up</a>\n' +
    '        </li>\n' +
    '        <li ng-hide="currentUser">\n' +
    '          <a href="/login">Log In</a>\n' +
    '        </li>\n' +
    '        <li ng-if="currentUser" class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">\n' +
    '          <span id="currentUserMenu" class="fa fa-user">&nbsp;{{currentUser.name}}</span> <b class="caret"></b></a>\n' +
    '          <ul class="dropdown-menu" ng-if="isUser">\n' +
    '            <li><a href="/profile"><span class="fa fa-cog"></span> My Profile</a></li>\n' +
    '            <li><a href="/logout"><span class="fa fa-sign-out"></span> Logout</a></li>\n' +
    '          </ul>\n' +
    '          <ul class="dropdown-menu" ng-if="isAdmin">\n' +
    '            <li><a href="/admin"><span class="fa fa-cog"></span> Admin</a></li>\n' +
    '            <li><a href="/logout"><span class="fa fa-sign-out"></span> Logout</a></li>\n' +
    '          </ul>\n' +
    '        </li>\n' +
    '      </ul>\n' +
    '    </div>\n' +
    '    <!-- /.navbar-collapse -->\n' +
    '  </nav>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home/index.tpl.html',
    '<div class="container">\n' +
    '\n' +
    '  <div class="row" ng-if="!currentUser">\n' +
    '    <div class="col-md-6 col-md-offset-3" style="text-align: center;">\n' +
    '      <h1>meet slack on steroids</h1>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="row" ng-if="currentUser">\n' +
    '      \n' +
    '    <div class="col-md-12">\n' +
    '      <table class="table">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '              <th>#channels</th>\n' +
    '              <th style="text-align: center;">Monday</th>\n' +
    '              <th style="text-align: center;">Tuesday</th>\n' +
    '              <th style="text-align: center;">Wednesday</th>\n' +
    '              <th style="text-align: center;">Thursday</th>\n' +
    '              <th style="text-align: center;">Friday</th>\n' +
    '            </tr>\n' +
    '          </thead>\n' +
    '          <tbody>\n' +
    '              <tr ng-repeat="t in stats.teams">\n' +
    '                <td>\n' +
    '                    {{t.name}}\n' +
    '                </td>\n' +
    '                <td ng-repeat="d in t.days" style="max-height: 96px; max-width: 96px;">\n' +
    '                  <canvas id="pie" class="chart chart-pie" data="d.data" labels="labels" colours="colours" options="options"></canvas>\n' +
    '                </td>\n' +
    '              </tr>\n' +
    '          </tbody>\n' +
    '      </table>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('login/index.tpl.html',
    '<div class="row">\n' +
    '  <div class="col-md-4 col-md-offset-4">\n' +
    '\n' +
    '    <a class="btn btn-primary" href="/auth/slack">\n' +
    '      Log In with Slack\n' +
    '    </a>\n' +
    '\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('register/index.tpl.html',
    '<div class="row">\n' +
    '  <div class="col-md-4 col-md-offset-4">\n' +
    '\n' +
    '    <form role="form" name="form" ng-submit="submitted = true; register()" novalidate>\n' +
    '      <div class="form-group">\n' +
    '        <input type="text" class="form-control" id="name" name="name" placeholder="Name" ng-model="credentials.name" required ng-minlength="3">\n' +
    '      </div>\n' +
    '      <div class="form-group">\n' +
    '        <input type="email" class="form-control" id="email" name="email" placeholder="Email" ng-model="credentials.email" required>\n' +
    '      </div>\n' +
    '      <div class="form-group">\n' +
    '        <input type="password" class="form-control" id="password" name="password" placeholder="Password" ng-model="credentials.password" required>\n' +
    '      </div>\n' +
    '      <div class="form-group">\n' +
    '        <input type="password" class="form-control" id="password-confirmation" name="password-confirmation" placeholder="Repeat Password" ng-model="credentials.passwordConfirmation" required>\n' +
    '      </div>\n' +
    '      <button type="submit" class="btn btn-success" ng-disabled="!form.modified || form.$invalid">Sign Up</button>\n' +
    '      <div class="form-group">\n' +
    '        By signing up, you agree to our <a href="/terms">terms of use</a>, <a href="/privacy">privacy policy</a> and <a href="/cookies">cookies policy</a>.\n' +
    '      </div>\n' +
    '      <div class="form-group" style="display: none;">\n' +
    '        <label for="helper">Leave this field blank</label>\n' +
    '        <input type="text" class="form-control" id="helper" name="helper" ng-model="credentials.helper"/>\n' +
    '      </div>\n' +
    '    </form>\n' +
    '\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="row">\n' +
    '  <div class="col-md-4 col-md-offset-4">\n' +
    '    <hr>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '<div class="row">\n' +
    '  <div class="col-md-4 col-md-offset-4">\n' +
    '\n' +
    '    <a class="btn btn-primary" href="/auth/slack">\n' +
    '      Log In with Slack\n' +
    '    </a>\n' +
    '\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('templates-app');
} catch (e) {
  module = angular.module('templates-app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('user/profile.tpl.html',
    '<div class="container">\n' +
    '\n' +
    '  <tabset type="pills">\n' +
    '    <tab heading="Account">\n' +
    '\n' +
    '      <div class="row" style="padding-top: 40px;">\n' +
    '        <div class="col-xs-8 col-md-4">\n' +
    '          <form role="form" name="form" ng-submit="submitted = true; saveProfile()" novalidate>\n' +
    '            <div class="form-group">\n' +
    '              <input type="text" class="form-control" id="email" placeholder="Enter email" ng-model="user.email" required ng-minlength="1">\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '              <a href ng-click="changePassword = !changePassword" class="btn btn-xs btn-primary">Change Password</a>\n' +
    '            </div>\n' +
    '            <div ng-show="changePassword">\n' +
    '              <div class="form-group">\n' +
    '                <input type="password" class="form-control" id="oldPassword" placeholder="Old password" ng-model="credentials.oldPassword" required ng-minlength="1">\n' +
    '              </div>\n' +
    '              <div class="form-group">\n' +
    '                <input type="password" class="form-control" id="newPassword" placeholder="New password" ng-model="credentials.newPassword" required ng-minlength="1">\n' +
    '              </div>\n' +
    '              <div class="form-group">\n' +
    '                <input type="password" class="form-control" id="newPasswordConfirmation" placeholder="Repeat new password" ng-model="credentials.newPasswordConfirmation" required ng-minlength="1">\n' +
    '              </div>\n' +
    '            </div>\n' +
    '            <hr/>\n' +
    '            <button type="submit" class="btn btn-primary">Save</button>\n' +
    '          </form>\n' +
    '        </div>\n' +
    '        <div class="col-xs-8 col-md-4">\n' +
    '        </div>\n' +
    '        <div class="col-xs-8 col-md-4">\n' +
    '          \n' +
    '        </div>\n' +
    '      </div>\n' +
    '\n' +
    '    </tab>\n' +
    '    <tab heading="Profile">\n' +
    '\n' +
    '      <div class="row" style="padding-top: 40px;">\n' +
    '        <div class="col-xs-8 col-md-4">\n' +
    '          <form role="form" name="form" ng-submit="submitted = true; saveProfile()" novalidate>\n' +
    '            <div class="form-group">\n' +
    '              <label for="name">Name</label>\n' +
    '              <input type="text" class="form-control" name="name" id="name" placeholder="Enter name" ng-model="user.name" required ng-minlength="1">\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '              <label for="image">Photo</label>\n' +
    '              <a class="thumbnail">\n' +
    '                <img ng-src="{{user.image}}" alt=""/>\n' +
    '              </a>\n' +
    '              <input type="file" id="image" nv-file-select="" uploader="uploader"  />\n' +
    '              <p class="help-block"></p>\n' +
    '              <div class="row">\n' +
    '                <div class="col-xs-6 col-md-3" ng-repeat="item in uploader.queue">\n' +
    '                  <a class="thumbnail">\n' +
    '                    <img ng-src="{{user.image}}" alt=""/>\n' +
    '                  </a>\n' +
    '                  <a class="thumbnail">\n' +
    '                    <div ng-show="uploader.isHTML5" thumb="{ file: item._file, height: 64 }"></div>\n' +
    '                    <a class="btn btn-xs btn-success" ng-click="item.upload()" ng-disabled="item.isReady || item.isUploading || item.isSuccess">\n' +
    '                      <span class="glyphicon glyphicon-upload"></span> Upload\n' +
    '                    </a>\n' +
    '                    <a class="btn btn-xs btn-warning" ng-click="item.cancel()" ng-disabled="!item.isUploading">\n' +
    '                      <span class="glyphicon glyphicon-ban-circle"></span> Cancel\n' +
    '                    </a>\n' +
    '                    <a class="btn btn-xs btn-danger" ng-click="item.remove()">\n' +
    '                      <span class="glyphicon glyphicon-trash"></span> Remove\n' +
    '                    </a>\n' +
    '                  </a>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '            <button type="submit" class="btn btn-primary">Save</button>\n' +
    '          </form>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '\n' +
    '    </tab>\n' +
    '\n' +
    '    <tab heading="Notifications">\n' +
    '\n' +
    '      <div class="row" style="padding-top: 40px;">\n' +
    '        <div class="col-xs-8 col-md-4">\n' +
    '          <h5>General</h5>\n' +
    '          <table class="table notifications">\n' +
    '            <tr ng-repeat="n in notifications | filter: {type: \'general\'}">\n' +
    '              <td>\n' +
    '                <span ng-click="updateNotification(n);" style="cursor: pointer;" ng-class="{\'selected\': n.selected, \'not-selected\': !n.selected}"><i class="fa fa-envelope"></i></span>\n' +
    '              </td>\n' +
    '              <td>{{n.label}}</td>\n' +
    '            </tr>\n' +
    '          </table>\n' +
    '        </div>\n' +
    '    </tab>\n' +
    '\n' +
    '  </tabset>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();
