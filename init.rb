Redmine::Plugin.register :a_small_things do
  name 'Small Things plugin'
  author 'Vladimir Pitin, Danil Kukhlevskiy'
  description 'This is a plugin for including common libs'
  version '0.0.2'
  url 'http://rmplus.pro/'
  author_url 'http://rmplus.pro/'

  settings :partial => 'settings/a_small_things',
    :default => {
      'enable_select2_lib' => true,
      'enable_highcharts_lib' => false
    }
end

require 'a_small_things/view_hooks'
