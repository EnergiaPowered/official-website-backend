// Importing Model
const Committee = require("../models/Committee");

module.exports = {
  /**
   * @api {get} /committees GET/ committees
   * @apiName GetAllCommittees
   * @apiGroup Committees Router
   * @apiSuccess {Object[]} Committees A list of all committee objects
   * @apiSampleRequest http://127.0.0.1:4000/committees
   * @apiSuccessExample Sample
   * [{"jobDescription":["Preparing the workshops’ material.","Making interviews with the coordination of HRs to select the participants.","Moderating sessions.","Organizing a semi-final and a final project for the participants."],"_id":"6024692102e88550d84ddf01","title":"Arduino & Embedded Systems","icon_class":"network-wired","mission":"Make the students interfere more with applications by providing them with workshops based on what they learn in their preparatory/first year.","vision":"Make it much easier for undergraduate students (especially newcomers) to discover their passion.","__v":0},{"jobDescription":["Preparing the workshops’ material.","Making interviews with the coordination of HRs to select the participants.","Moderating sessions.","Organizing a semi-final and a final project for the participants."],"_id":"6024692102e88550d84ddf02","title":"C++","icon_class":"code","mission":"Make the students interfere more with applications by providing them with workshops based on what they learn in their preparatory/first year.","vision":"Make it much easier for undergraduate students (especially newcomers) to discover their passion.","__v":0},{"jobDescription":["Managing all decorations and giveaways for events, info desks, booths and academic sessions.","Setting and executing coordination and reception plans for events","Contribute in delivery of science in academic sessions through effective activities.","Coordinating the flow of sessions with academic sessions’ instructors."],"_id":"6024465d3382c05e90e29bf5","title":"DCR","icon_class":"cut","mission":"Organizing and coordinating all events, booths, and workshops in terms of (decorations, giveaways, reception of attendees). \nAnd provide a healthy environment for the participants in AC sessions by many different Activities.","vision":"We aim to increase the quality of any project in Energia powered and help students to achieve maximum benefits of the workshops and events also raise their spirits and provide a good interface and a good impression in any event.","__v":0},{"jobDescription":["Create social media designs, posters, brochures, banners, certificates, T-shirts, and IDs.","Provide other committees with required designs."],"_id":"60244f71980aa316d0e2bce7","title":"Design","icon_class":"fill-drip","mission":"Create outstanding design solutions and commit to delivering excellent results that will be up to date in new design trends and establish beneficial relationships with peers and the surrounding committees.","vision":"Our vision is to develop and construct a supportive, collaborative environment, where every member is empowered to develop their skills, share his artworks, be inspired to share his expertise and preparing for the future through meaningful experiences, and motivate the members to create a special portfolio for their designs with EP. Hence, they will gain a fair experience and an excellent portfolio with a variety of spectacular designs.","__v":0},{"jobDescription":["Preparing the workshops’ material.","Making interviews with the coordination of HRs to select the participants.","Moderating sessions.","Organizing a semi-final and a final project for the participants."],"_id":"602458db9d1a4d54786c1c7c","title":"Digital Electronics","icon_class":"microchip","mission":"Make the students interfere more with applications by providing them with workshops based on what they learn in their preparatory/first year.","vision":"Make it much easier for undergraduate students (especially newcomers) to discover their passion.","__v":0},{"jobDescription":["Provide Energia with the needed fund to achieveits mission throughout the year.","Provide Energia with main, academic and catering sponsors.","Develop new fundraising strategies for better sponsorships.","Maintaining good relation with sponsors."],"_id":"602451569d1a4d54786c1c76","title":"Fundraising","icon_class":"hand-holding-usd","mission":"Guide members who want to learn, provide a healthy environment for members to help them to unleash all their hidden talents.","vision":"Fundraising isn't a way of begging it is selling benefits to the one who needs it also it is a good opportunity to master soft skills.","__v":0},{"jobDescription":["Responsible for any recruitment process and interviews.","Evaluating the performance of committees and members.","Solving problems of their committees.","Provide the place with the needed trainings.","Helping members to develop their performance and motivating them to keep the spirit up among them."],"_id":"60244a46a3ae46559c5e6807","title":"Human Resources","icon_class":"user-tie","mission":"Let the HR members trying to apply all HR functions on the scale of our activity by Setting and executing a suitable internal system for our activity and caring about and improving the quality of our academic sessions and all our events.","vision":"We aim to a deep delivery of HR science for our HR members and open the way for them to practice it almost completely on the scale of our activity.","__v":0},{"jobDescription":["Designing and building Booths, info desks and any required structure.","Supplying all needed materials and all printings.","Supplying transportation."],"_id":"6024485fa3ae46559c5e6806","title":"Logistics","icon_class":"tools","mission":"Designing and building inspiring booths for our events.","vision":"We aim to raise the Energia Powered image by a powerful existence on the real with our booths.","__v":0},{"jobDescription":["Preparing the workshops’ material.","Making interviews with the coordination of HRs to select the participants.","Moderating sessions.","Organizing a semi-final and a final project for the participants."],"_id":"6024692102e88550d84ddf03","title":"Management","icon_class":"chart-pie","mission":"Make the students interfere more with applications by providing them with workshops based on what they learn in their preparatory/first year.","vision":"Make it much easier for undergraduate students (especially newcomers) to discover their passion.","__v":0},{"jobDescription":["Responsible for all EP's online and offline campaigns' ideas and content.","Prepare marketing plans for all social media platforms.","Develope marketing strategies."],"_id":"60244c6ccfb59850d4dff32f","title":"Marketing","icon_class":"bullhorn","mission":"Help and encourage students to understand marketing tools and techniques which consider as one from the most important and fields in labour market.","vision":"Following the steps of creative mindset of marketers who can change a small little thing into valuable one through applying all market process and steps to reach the desired aim.","__v":0},{"jobDescription":["Cover events, sessions, booths, and gatherings (Photography and Videos).","Create campaigns requested content in coordination with the whole section.","Responsible for producing and editing all the needed documentaries for all Energia campaigns and events."],"_id":"60244f88980aa316d0e2bce8","title":"Media","icon_class":"camera","mission":"Learn illustrator and after effects to make any desired video, reach an advanced level in video editing and montage, and get to know all the photography techniques and photo editing.","vision":"Develop EP output level in the media field. Enhance the knowledge and skills of the upcoming leading generations.","__v":0},{"jobDescription":["Training all members and prepare them for the practical life.","Increase their technical skills.","Develop Energia Powered's mobile app.","Build leaders that will lead the committee."],"_id":"602453189d1a4d54786c1c78","title":"Mobile App Development","icon_class":"mobile-alt","mission":"Prepare leaders to be experts in their fields and able to manage themselves and others.","vision":"To accelerate the student’s transition into future technologies, and to raise the image and the reputation of Energia Powered.","__v":0},{"jobDescription":["Responsible for Energia’s external and internal approvals (permits)","Provide key speakers for all events.","Provide media coverage for all the events (TV & magazines) and occasions.","Responsible for ushering at the booth.","Representative for Energia at External competitions.","Responsible for Partnership with other activities and organizations."],"_id":"602450899d1a4d54786c1c75","title":"Public Relations","icon_class":"handshake","mission":"Making the members feels loyalty for Energia as well as making them professional at public relations work by providing them with sufficient trainings and tasks.","vision":"Developing PR committee and influencing on my team to be next Energia leaders.","__v":0},{"jobDescription":["Training all members and prepare them for the practical life.","Increase their technical skills.","More developing for energia website.","Design and prepare the material for our first workshop.","Train the members to be a good instractors.","Build leaders that will lead the committee."],"_id":"6024527f9d1a4d54786c1c77","title":"Web Development","icon_class":"laptop-code","mission":"Prepare leaders to be experts in their fields and able to manage  themselves and others.","vision":"To accelerate the student’s transition into future technologies, and to raise the image and the reputation of Energia Powered.","__v":0}]
   */
  
  getAllCommittees: async (req, res) => {
    try {
      const crew = await Committee.find(req.query).sort({ title: 1 });
      res.status(200).json(crew);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
  /**
   * @api {post} /committees POST/ committees
   * @apiName PostCommittee
   * @apiGroup Committees Router
   * @apiBody {string} title title of the request body
   * @apiBody {string} icon_class icon_class of the request body
   * @apiBody {string} mission mission of the request body
   * @apiBody {string} vision vision of the request body
   * @apiBody {string[]} jobDescription jobDescription of the request body
   * @apiError (400) RequestEmptyError Request body was empty
   * @apiSampleRequest http://127.0.0.1:4000/committees
   * 
   */
  postCommitte: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        validationResult(req).throw();
        let newCommittee = new Committee(req.body);
        newCommittee.save((err) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          res.sendStatus(200);
        });
      } else res.sendStatus(400);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  /**
   * @api {put} /committees/:id PUT/ committees/:id
   * @apiName PutCommittee
   * @apiGroup Committees Router
   * @apiError (400) RequestEmptyError Request body was empty
   * @apiError (404) CommitteeNotFound No committee with given id
   * @apiParam {string} id id of the committee
   * @apiSampleRequest http://127.0.0.1:4000/committees/72
   * @apiBody {string} title title of the request body
   * @apiBody {string} icon_class icon_class of the request body
   * @apiBody {string} mission mission of the request body
   * @apiBody {string} vision vision of the request body
   * @apiBody {string[]} jobDescription jobDescription of the request body
   * 
   * 
   */
  putCommitte: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        validationResult(req).throw();
        Committee.findByIDAndUpdate(
          req.params.id,
          { $set: req.body },
          (err, committee) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
            if (!committee) {
              console.log("Error 404: Committee not found");
              return res.status(404);
            }
            res.sendStatus(200);
          }
        );
      } else res.sendStatus(400);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  /**
   * @api {delete} /committees/:id DELETE/ committees/:id
   * @apiName DeleteCommitteeById
   * @apiGroup Committees Router
   * @apiError (401) AuthenticationError User is not authenticated
   * @apiError (403) AdministrationError User is not an administrator
   * @apiError (404) CommitteeNotFound No committee with given id
   * @apiSampleRequest http://127.0.0.1:4000/committees/70
   * @apiParam {number} id id of the committee
   */
  deleteOneCommitte: async (req, res) => {
    try {
      const committee = await Committee.findByIdAndRemove(req.params.id);
      if (!committee) {
        const err = new Error();
        err.message = "Member not found";
        return res.status(404).send(err);
      }
      res.sendStatus(200);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  /**
   * @api {delete} /committees DELETE/ committees
   * @apiName DeleteAllCommittees
   * @apiGroup Committees Router
   * @apiError (404) CommitteeNotFound No committees found
   * @apiSampleRequest http://127.0.0.1:4000/committees 
   */
  deleteAllCommittes: async (req, res) => {
    try {
      const committees = await Committee.deleteMany({});
      if (!committees) {
        console.log("Error 404: Committees not found");
        return res.status(404);
      }
      res.sendStatus(200);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
