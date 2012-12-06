module ASmallThings
	module IssuePatch
	  def self.included(base) # :nodoc:
	    base.extend(ClassMethods)
	    base.send(:include, InstanceMethods)

	    # Same as typing in the class 
	    base.class_eval do
			validate :check_start_date_end_date_etimated_hours
			alias_method_chain :copy_from, :a_small_things
	    end

	  end

	  module ClassMethods   

	  end

	  module InstanceMethods 
		def check_start_date_end_date_etimated_hours
			if start_date!=nil and due_date!=nil and estimated_hours!=nil 
				if (due_date-start_date)*8+8<estimated_hours
					errors.add(:base, "#{l(:start_date_end_date_etimated_hours_error)}".html_safe)
				end
			end
		end    

		def copy_from_with_a_small_things(arg, options={})
		    issue = arg.is_a?(Issue) ? arg : Issue.visible.find(arg)
		    except_attr=["id",
		    			 "root_id", 
		    			 "parent_id", 
		    			 "lft", 
		    			 "rgt", 
		    			 "created_on", 
		    			 "updated_on", 
		    			 "tracker_id", 
		    			 "status_id", 
		    			 "start_date", 
		    			 "due_date", 
		    			 "priority_id", 
		    			 "assigned_to_id", 
		    			 "category_id", 
		    			 "fixed_version_id", 
		    			 "estimated_hours",
		    			 "done_ratio",
		    			 "issue"]

		    except_attr.push('executor_id') if issue.attributes['executor_id']!=nil
		    except_attr.push('check_date') if issue.attributes['check_date']!=nil
		    self.attributes = issue.attributes.dup.except(*except_attr)
		    #self.custom_field_values = issue.custom_field_values.inject({}) {|h,v| h[v.custom_field_id] = v.value; h}
		    #self.status = issue.status
		    self.author = User.current
		    unless options[:attachments] == false
		      self.attachments = issue.attachments.map do |attachement| 
		        attachement.copy(:container => self)
		      end
		    end
		    @copied_from = issue
		    self			
		end
	  end
	end
end

