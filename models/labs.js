Labs = new Mongo.Collection("labs");

ScienceLabDrillDownSchema = new SimpleSchema({
  labCondition:{
    label: "What is the condition of the lab?",
    optional: true,
    type: String,
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Good Condition", value: 'Good Condition'},
          {label: "Average Condition", value: 'Average Condition'},
          {label: "Poor Condition", value: 'Poor Condition'}
        ];
      }
    }
  },
  hasNecessaryEquipment: {
    label: "Does the lab have the equipment necessary?",
    type: Boolean,
      optional: true,
      autoform: {
        type: "boolean-radios",
        trueLabel: "Yes",
        falseLabel: "No",
      }
  },
  hasSafeStorage: {
    label: "Is there a safe and lockable storage space for lab equipment?",
    type: Boolean,
      optional: true,
      autoform: {
        type: "boolean-radios",
        trueLabel: "Yes",
        falseLabel: "No",
      }
  },
  comment: {
    type: String,
    optional: true,
    label: "Comment"
  }

});

ScienceLabSchema = new SimpleSchema({
  hasLab: {
    label: "Does your school have a science laboratory?",
    type: Boolean,
      optional: true,
      autoform: {
        type: "boolean-radios",
        trueLabel: "Yes",
        falseLabel: "No",
      }
  },
  numberOfLabs: {
    label: "How many labs does the school have?",
    type: Number,
    optional: true,
    autoform: {
      type: "text"
    }
  },
  labs: {
      type: Array,
      optional: true,
      minCount: 0,
      maxCount: 100
   },
   "labs.$": {
      optional: true,
      type: ScienceLabDrillDownSchema
   },
  
});

Labs.attachSchema(ScienceLabSchema);