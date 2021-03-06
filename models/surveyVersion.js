SurveyVersions = new Mongo.Collection("surveyVersions");
  
SurveyVersionSchema = new SimpleSchema({
  name: {
    type: String,
    label: "What would you like to call this version?",
    optional: true,
    autoform: {
      rows: 1,

    },
  },
  startDate: {
    type: Date,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "date",

      }
    }
  },
  endDate: {
    type: Date,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "date"
      }
    }
  },
  isVerified: {
    label: 'Mark as verified',
    type: Boolean,
    optional: true,
    
  },
  school_id: {
    type: String,
    defaultValue: function(){ 
      var schoolid = Session.get('selectedSchoolId');
      return schoolid;
    },
    autoform: {
      type: "hidden",
      label: false
    },
  },
});


SurveyVersions.attachSchema(SurveyVersionSchema);
