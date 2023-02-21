const mongoose = require("mongoose");

const CompaniesSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyCeo: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    default: "N/A",
  },
  phoneNo: {
    type: Number,
    default: "",
  },
  registrationNo: {
    type: String,
    default: "",
  },
 
  landLineNo: {
    type: Number,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "N/A",
  },
  postalCode: {
    type: String,
    default: "",
  },
  departments:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'Departments'
  },



});

const Companies = mongoose.model('companies',CompaniesSchema);
module.exports=Companies;
