const mongoose = require("mongoose");

const participantCertificateSchema = new mongoose.Schema({
    serialNumber:{
    type: String,
    required: true,
    },
  name: {
    type: String,
    required: true,
  },
  workshop: {
    type: String,
    required: true,
  },
  sessionsCount: {
    type: String,
    required: true,
  },
  headName: {
    type: String,
    required: true,
  },
  ViceName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model("ParticipantCertificate", participantCertificateSchema, "participantsCertificates");
