var buttonSaveClicked = false;

	Template.survey2.rendered = function() {
    renderHelper('survey2');

 		$('.accordion .accordion-section-title').removeClass('active');
    $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
	};


	Template.survey2.events({
    "click .btn-save" : function() {
      buttonSaveClicked = true;
      $('#survey2').submit();
      return false;
    }, 
    "click .accordion-section-title" : function(e, template) {
    	var currentAttrValue = $(e.target).attr('href');
 
        if($(e.target).is('.active')) {
	 		$('.accordion .accordion-section-title').removeClass('active');
	        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
	    }else {
	 		$('.accordion .accordion-section-title').removeClass('active');
	        $('.accordion .accordion-section-content').slideUp(300).removeClass('open'); 
            // Add active class to section title
            $(e.target).addClass('active');
            // Open up the hidden content panel
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
        }
 
        e.preventDefault();
    },
    
 
  });

function renderHelper(survey){
  $.material.init();

  if (Session.get("selected_doc") == null) {
    AutoForm.resetForm(survey);
  } 
  $('[name = "version_id"]')[0].value = Session.get("selectedSurveyVersionId");
}

Handlebars.registerHelper("isPrimarySchool", function () {
        var schoolId = Session.get("selectedSchoolId");
        var school = Schools.findOne({'_id' : schoolId}, {"schoolDetails.CLASSIFICATION" : 1});
        var ret = false;
        if (school.schoolDetails.CLASSIFICATION === 'Primary') {
          ret = true;
        }
        return ret;
    });

Handlebars.registerHelper("isSecondarySchool", function () {
        var schoolId = Session.get("selectedSchoolId");
        var school = Schools.findOne({'_id' : schoolId}, {"schoolDetails.CLASSIFICATION" : 1});
        var ret = false;
        if (school.schoolDetails.CLASSIFICATION === 'Secondary') {
          ret = true;
        }
        return ret;
    });

Handlebars.registerHelper("isOther", function () {
        var schoolId = Session.get("selectedSchoolId");
        var school = Schools.findOne({'_id' : schoolId}, {"schoolDetails.CLASSIFICATION" : 1});
        var ret = false;
        if (school.schoolDetails.CLASSIFICATION === 'Other') {
          ret = true;
        }
        return ret;
    });

AutoForm.addHooks(['survey2'], {
       onSuccess: function(operation, result, template) {  

        if (buttonSaveClicked) {
              FlashMessages.sendSuccess('School saved!');
          buttonSaveClicked = false;
        }   

      },
      onError: function() {
        if (buttonSaveClicked) {
              FlashMessages.sendError('Error saving school. Please see below for errors');
          buttonSaveClicked = false;
        } 
      }
    });