{% if ucfunc("run_code_once", "uc_sort_filter") == true %}

function initUCSortFilters(event, objParent){
  	var selector = ".uc-sort-filter__select,.uc-sort-filter__select-dir";
  	var objSelects = objParent.find(selector);
  
  	jQuery.each(objSelects, function(index, select){
      	 
      	 var objSelect = jQuery(select);
      	
      	 var objFilter = objSelect.parents(".uc-sort-filter");
      	 var showDebug = objFilter.data("showdebug");
      
         var objQueryData = g_ucDynamicFilters.getFilterGridQueryData(objFilter);
		 
      	 var isWoo = g_ucDynamicFilters.getVal(objQueryData, "woo");
      	 var type = objSelect.data("type");
         var objWooFill = objFilter.find(".uc-sort-filter__woofill");
      
      	 if(type != "orderby")
           showDebug = false;
      
      	 if(objWooFill.length && type == "orderby"){
           
           if(isWoo === true)
              	objSelect.html(objWooFill.html());
            
            objWooFill.remove();
         }
      
        if(showDebug == true)
			console.log("Sort Filter: init filter value",objFilter);
      	 
         var initVal = objSelect.data("initval");	//auto, num_option
           
      	 switch(initVal){
           case "auto":
      	     var initVal = g_ucDynamicFilters.getVal(objQueryData, type,"default");
            
             if(showDebug == true)
                 console.log("auto value (from grid)",initVal,objQueryData);
             
           break;
           case "num_option":
           	 var numOption = Number("{{selected_option_number}}")-1;
           	 initVal = objSelect.find("option:eq("+numOption+")").val();
          break;
        }
      	
      	var option = objSelect.find(`option[value="${initVal}"]`);
      
      	if(option.length)
          	objSelect.val(initVal);
      	else{
          console.log("sort filter error: option with value: "+initVal+" not found",objSelect);
        }
      
       if(showDebug == true)
         console.log("final value",initVal);
      
    });
  	
    objParent.on("change",selector, function(event){
        
        var objSelect = jQuery(this);
        var objFilter = objSelect.parents(".uc-sort-filter");
      
      	objFilter.trigger("uc_filter_change");
    });
    
}

function getUCCSortFilterData(event, responseData){
  
  var objFilter = jQuery(this);
  var objOutput = {};

  var objSelect = objFilter.find(".uc-sort-filter__select");
  
  if(objSelect.length){
  	var sortValue = objSelect.val();
  	objOutput["orderby"] = sortValue;
    
    if(sortValue == "meta"){
	  	objOutput["metaname"] = objSelect.data("metaname");
	  	objOutput["metatype"] = objSelect.data("metatype");      
    }
    
  }
  
  var objSelectDir = objFilter.find(".uc-sort-filter__select-dir");
  if(objSelectDir.length){
  	var dirValue = objSelectDir.val();
  	objOutput["orderdir"] = dirValue;
  }
  
  responseData.output = objOutput;
  
}
 
function onUCClearCSortFilter(){
	
  	var objFilter = jQuery(this);
  	objFilter.val("default");
}


{% endif %}


{{ ucfunc("put_docready_start") }}

		var objFilter = jQuery("#{{uc_id}}");
  	
 		if(typeof initUCSortFilters != "undefined"){

          objFilter.on("init_filter_type", initUCSortFilters);
          objFilter.on("get_filter_data", getUCCSortFilterData);
          objFilter.on("clear_filter", onUCClearCSortFilter);
        }
 
{{ ucfunc("put_docready_end") }}