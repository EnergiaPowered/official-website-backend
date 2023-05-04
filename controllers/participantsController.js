const ParticipantCertificate = require("../models/Participant");

module.exports = {
  saveCertificate: async (req, res) => {
    try {
      console.log("req in controller", req);

      let certificateData = new ParticipantCertificate({
        name: req.name,
        workshop: req.workshop,
        sessionCount: req.sessionCount,
        headName: req.headName,
        viceName: req.viceName,
        projectName: req.projectName,
      });
      await certificateData.save();
      res
        .status(201)
        .json({
          message: "certificate added successfully",
          certificate: certificateData,
        });
    } catch (err) {
      res.status(500).json({ err });
      console.log(err);
    }
  },
  getCertificate: async (req, res) => {
    try {
      console.log("req in controller", req.params.serial);

      // find a certificate aith a specific serial number sent in params
      let certificateData = await ParticipantCertificate.find({
        serialNumber: req.params.serial,
      });

      console.log("certificateData", certificateData);

      // if certificate is not found
      if (certificateData.length == 0 )
        return res.status(404).json({ message: "certificate not found" });
      res
        .status(201)
        .json({
          message: "certificate found successfully",
          certificate: certificateData,
        });
    } catch (err) {
      res.status(500).json({ err });
      console.log(err);
    }
  },
};
