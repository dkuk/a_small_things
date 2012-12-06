Redmine::Plugin.register :a_small_things do
  name 'Small Things plugin'
  author 'Author name'
  description 'This is a plugin for Redmine'
  version '0.0.1'
  url 'http://example.com/path/to/plugin'
  author_url 'http://example.com/about'
end

Rails.application.config.to_prepare do
  Issue.send(:include, ASmallThings::IssuePatch)
  WelcomeController.send(:include, ASmallThings::WelcomeControllerPatch)
  IssuesHelper.send(:include, ASmallThings::IssuesHelperPatch)
end

require 'a_small_things/view_hooks'
