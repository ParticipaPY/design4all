/* @author Marcos baez <marcos@baez.io> */  
$(document).ready(function(){
  
    // loading papers
    /* Paper.loadPapers(function(data){          
      PaperView.renderSummary({
        collection : data,
        tmpl : $("#summary-tmpl"),
        el   : $(".summary")    
      });
      PaperView.renderPapers({
        collection : data, 
        tmpl : $("#paper-tmpl"),
        el   : $(".papers"),      
      });                           
    }); */

    // loading guidelines with no filters by default
    Guide.loadGuidelines(function(data){          
      GuideView.renderSummary({
        collection : data,
        tmpl : $("#summary-tmpl"),
        el   : $(".summary")    
      });
      GuideView.renderGuidelines({
        collection : data, 
        tmpl : $("#guide-tmpl"),
        el   : $(".guidelines"),      
      });                           
    });
  
    // any change in the filters
    $(".filter-simple select").change(function(e){      
      var filters = [];
      // we build automatically the filters array from existing form-controls
      $(".filter-simple .form-control").each(function(i,el){
        filters.push({ key : this.id.replace("filter-",""), value : $(this).val()});      
      });
      
      // and we filter the guidelines
      Guide.filter(filters, function(data){
        GuideView.renderSummary({
          collection : data,
          tmpl : $("#summary-tmpl"),
          el   : $(".summary")    
        });
        GuideView.renderGuidelines({
          collection : data, 
          tmpl : $("#guide-tmpl"),
          el   : $(".guidelines"),      
        });         
      });
      
    });  
});

/* Basic Guidelins data manipulation functions */
var Guide = {
  
  _guidelines : [],
    
  /* Load the list of guidelines 
   * @param callback function fn(collection) that recieve an array of guideline objects
   */
  loadGuidelines : function(callback){
     $.getJSON("guidelines.php", function(data){
        callback(data);
        Guide._guidelines = data;
     });        
  },
  
  /* Filters the original guideline list 
   *  @param f an array of {key : <json attr>, value : <attr value>} filters over the json attributes
   *   @param callback a function fn(collection) that received the filtered array 
   */
  filter : function(f, callback){
        
    var list = $.grep(this._guidelines, function(el,i){
       var r=true;
       for(k=0; k<f.length; k++){
         r = r && (f[k].value == "" || f[k].value.toLowerCase() == el[f[k].key].toLowerCase());
       }
      return r;                
    });
    
    callback(list);
  }  
};

/* Basic rendering functions */
GuideView = {
  /* Renders the search results summary
   * @param opt object {collection : <guidelines>, tmpl : <template>, el : <target dom>} elements
   */
  renderSummary : function(opt){
    var tot = opt.collection.length;
    //var cat = $.map(opt.collection, function(n){ return n.design_2});
    //var ppr = $.map(opt.collection, function(n){ return n.ref});
    
    var summary = opt.tmpl.text()
              .replace(/{npapers}/g, tot);
    $(opt.el).empty().append(summary);
    
  },
  
  /* Renders the search results
   * @param opt object {collection : <guidelines>, tmpl : <template>, el : <target dom>} elements
   */  
  renderGuidelines : function(opt){
    $(opt.el).empty();
    
    opt.collection.forEach(function(post){      
      var item = opt.tmpl.text()
        .replace(/{flag_evaluation}/g, post.flag_evaluation)
        .replace(/{tested_in}/g, post.tested_in)
        .replace(/{flag_design}/g, post.flag_design)
        .replace(/{designed_in}/g, post.designed_in)
        .replace(/{url}/g, post.url)
        .replace(/{year}/g, post.year)
        .replace(/{tech_name}/g, post.tech_name)
        .replace(/{title}/g, post.title)
        .replace(/{benefits}/g, post.benefits)
        .replace(/{technology_1}/g, post.technology_1)
        .replace(/{technology_2}/g, post.technology_2)
      $(opt.el).append(item);
    });
     
  }  
};
