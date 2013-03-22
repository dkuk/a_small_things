$(document).ready(function(){
  /*jQuery('input.issue_estimated_hours, input.estimated_hours').live('input', function(){
      calcDueDate();  
    });*/
  $('select.select2').select2({
     width: '250px'
  });

  $(document.body).on("click", "input.issue_due_date", function(){
      $(this).data('set_auto_val', false);
      $(this).removeClass("highlight");
    });

  $('td.project>a').each(function(index){
    $(this).parent().html($(this).html());
  });

  $('a.icon').each(function(index){
    if($(this).html() == $(this).text()) {
      $(this).html('<span>'+$(this).html()+'</span>');
    }
  });
  
  $('tr.hascontextmenu').removeClass('hascontextmenu');

  $('#ajax-indicator').remove(); //style.opacity = 0;

  $('#sidebar').children('a[href$="issues?set_filter=1"]').each(function(index){
    $(this).prev('h3').remove();
    $(this).remove();
  });

  $('#sidebar').children('a[href$="gantt"]').remove();
  $('#sidebar').children('a[href$="report"]').next().remove();

  $("#attributes select[name*=assigned_to_id] option:contains(' мне ')").each(function(){
    $(this).remove();
  });

  // $(document.body).on('click', 'form[data-remote="true"] input[type=submit], a.icon-del[data-remote="true"]', function(){  
  //   $(this).after('<div class="loader"></div>');
  //   $(this).hide();
  // });

  $(document.body).on('click', 'form[data-remote="true"] input[type=submit], a.icon-del[data-remote="true"], a.show_loader[data-remote="true"]', function(){  
    // $(this).after('<div class="loader" style="width:'+$(this).outerWidth().toString()+'px;"></div>');
    // $(this).hide();
    jQuery(document.body).data('ajax_emmiter', jQuery(this))
  });

  $(document).ajaxStart(function() {
    // alert('ajax started')
    obj = jQuery(document.body).data('ajax_emmiter')
    if(typeof obj != 'undefined') {
      obj.after('<div class="loader" style="width:'+obj.outerWidth().toString()+'px; box-sizing: border-box; display: inline-block;"></div>');
      obj.addClass('ajax_hidden_emmiter');
      obj.hide();
    }
    jQuery(document.body).data('ajax_emmiter', undefined)
  });

  $(document).ajaxStop(function() {
    // alert('ajax_ready')
    jQuery("div.loader:empty").remove();
    jQuery('.ajax_hidden_emmiter').show();
  });  

});

function checkDueDateCalcIsHandy()
  {
    var start_date=$('input.issue_start_date');
    var due_date=$('input.issue_due_date');
    var estimated_hours=$('input.issue_estimated_hours');
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
