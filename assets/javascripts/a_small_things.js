jQuery(document).ready(function(){
  /*jQuery('input.issue_estimated_hours, input.estimated_hours').live('input', function(){
      calcDueDate();  
    });*/
  jQuery(document.body).on("click", "input.issue_due_date", function(){
      jQuery(this).data('set_auto_val', false);
      jQuery(this).removeClass("highlight");
    });

  jQuery('td.project>a').each(function(index){
    jQuery(this).parent().html(jQuery(this).html());
  });

  jQuery('a.icon').each(function(index){
    jQuery(this).html('<span>'+jQuery(this).html()+'</span>');
  });
  
  jQuery('tr.hascontextmenu').removeClass('hascontextmenu');

  jQuery('#ajax-indicator').remove(); //style.opacity = 0;

  jQuery('#sidebar').children('a[href$="issues?set_filter=1"]').each(function(index){
    jQuery(this).prev('h3').remove();
    jQuery(this).remove();
  });

  jQuery('#sidebar').children('a[href$="gantt"]').remove();
  jQuery('#sidebar').children('a[href$="report"]').next().remove();

  jQuery("#attributes select[name*=assigned_to_id] option:contains(' мне ')").each(function(){
    jQuery(this).remove();
  });

  jQuery(document.body).on('click', 'form[data-remote="true"] input[type=submit], a.icon-del[data-remote="true"], a[data-remote=true]', function(){  
    jQuery(this).after('<div class="loader"></div>');
    jQuery(this).hide();
  });

});

function checkDueDateCalcIsHandy()
  {
    var start_date=jQuery('input.issue_start_date');
    var due_date=jQuery('input.issue_due_date');
    var estimated_hours=jQuery('input.issue_estimated_hours');
    if(start_date && estimated_hours && due_date ) {
      if(due_date.val()=='' || due_date.data('set_auto_val') ) {
        if(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/.test(start_date.val()) && /^[0-9\.]{1,}$/.test(estimated_hours.val()))
          calcDueDate(start_date, due_date, estimated_hours);
      }
      else {
        if(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/.test(start_date.val())
          && /^[0-9\.]{1,}$/.test(estimated_hours.val())
          && /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/.test(due_date.val())) {
          var date_arr=start_date.val().split(".");
          var issue_start_date = new Date(Date.parse(date_arr[2]+"-"+date_arr[1]+"-"+date_arr[0]));   
          date_arr=due_date.val().split("."); 
          var issue_due_date = new Date(Date.parse(date_arr[2]+"-"+date_arr[1]+"-"+date_arr[0])); 
          var days=(estimated_hours.val()/8).ceil();
          if(issue_due_date.getDate()-issue_start_date.getDate()<days-1)
            calcDueDate(start_date, due_date, estimated_hours);
        }
      }
    }
  }

function calcDueDate(start_date, due_date, estimated_hours) {
  var date_arr=start_date.val().split(".");
  var issue_due_date = new Date();
  var issue_start_date = new Date(Date.parse(date_arr[2]+"-"+date_arr[1]+"-"+date_arr[0]));
  var days=(estimated_hours.val()/8).ceil();
  var issue_due_date = new Date(issue_start_date.getTime()+(days-1)*1000*24*60*60+1);
  //issue_due_date.setDate(issue_start_date.getDate()+days-1);
      
  var month= issue_due_date.getMonth()+1;
  month=(month<10)? '0'+month : month;
  var day=issue_due_date.getDate();
  day=(day<10)? '0'+day: day;
  var year = issue_due_date.getFullYear();
  due_date.val(day+"."+month+"."+year);
  due_date.data('set_auto_val', true);
  due_date.addClass('highlight');       
}

setInterval(function() { 
    checkDueDateCalcIsHandy();
  }, 1000)
