module ASmallThings
	module IssuePatch
	  def self.included(base) # :nodoc:
	    base.extend(ClassMethods)
	    base.send(:include, InstanceMethods)

	    # Same as typing in the class 
	    base.class_eval do
			validate :check_start_date_end_date_etimated_hours
	    end

	  end

	  module ClassMethods   

	  end

	  module InstanceMethods 
		def check_start_date_end_date_etimated_hours
			if start_date!=nil and due_date!=nil and estimated_hours!=nil 
				if (due_date-start_date)*8*2<estimated_hours
					errors.add(:base, "#{l(:start_date_end_date_etimated_hours_error)}".html_safe)
				end
			end
		end    
	  end
	end
end

