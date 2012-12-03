module ASmallThings
  module ASmallThings
    class Hooks  < Redmine::Hook::ViewListener
      render_on(:view_layouts_base_html_head, :partial => "hooks/a_small_things/html_head")			
    end
  end
end
