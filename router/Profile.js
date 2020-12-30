const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const Post = require("../models/Post")

//@route GET api/profile/me
//@desc Get current user profile
//@access private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "No Profile found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//@route POST /api/profile
//@desc Add and Update Profile
//@access private

router.post(
  "/",
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Please enter your skills').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()}); 
    }

    try {

      const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
      } = req.body;
  
      const profileFields = {};
      profileFields.user = req.user.id;
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (status) profileFields.status = status;
      if (skills)
        profileFields.skills = skills.split(",").map((skills) => skills.trim());
      if (bio) profileFields.bio = bio;
      if (githubusername) profileFields.githubusername = githubusername;
  
      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;
      
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.status(200).json(profile);
      }

      const newProfile = new Profile(profileFields);
      await newProfile.save();
      res.status(200).json(newProfile);
    } catch (error) {
      res.status(500).json({error:"Internal server error"});
    }
  }
);

//@route GET api/profile
//@desc Gets all user profiles
//@access public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profiles) {
      return res.status(400).json({ error: "No Profiles found" });
    }
    res.status(200).json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

//@route GET api/profile/:user_id
//@desc Gets individual profile
//@access public

router.get("/:user_id", async (req, res) => {
  try {
    //const id = req.params.user.id.toString()
    const profile = await Profile.findOne({
      _id: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "No Profile found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      res.status(500).json({ error: "No Profile found" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

//@route DELETE api/profile
//@desc deletes profile,user details and posts of an user
//@access private

router.delete("/", auth, async (req, res) => {
  try {
    //Delete Posts
    await Post.deleteMany({user:req.user.id});
    //Delete profile
    await Profile.findOneAndDelete({ user: req.user.id });
    //Delete User Detais
    await User.findOneAndDelete({ _id: req.user.id });
    

    res.status(200).json({ msg: "User deleted sucessfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//@route POST api/profile/experience
//@desc Adds experience to a profile
//@access private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company name is required").not().isEmpty(),
      check("from", "Please enter a from date").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newexperience = {
      title: title,
      company: company,
      location: location,
      from: from,
      to: to,
      current: current,
      description: description,
    };

    try {
      console.log(req.user.id);
      const profile = await Profile.findOne({ user: req.user.id });
      console.log(profile);
      profile.experience.unshift(newexperience);
      await profile.save();
      res.status(200).json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

//@route DELETE api/profile/experience/:expid
//@desc Removes experience from a profile
//@access private
router.delete("/experience/:expid", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //itrate through experience and find the index of particular id
    const index = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.expid);
    profile.experience.splice(index, 1);
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

//@route PUT api/profile/education
//@desc Adds education details to profile
//@access private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School name is required").not().isEmpty(),
      check("degree", "Degree field is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newedu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newedu);

      await profile.save();
      res.status(200).json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

//@route DELETE api/profile/education/:eduid
//@desc Removes education details to profile
//@access private
router.delete("/education/:eduid", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const index = profile.education
      .map((item) => item.id)
      .indexOf(req.params.eduid);

    profile.education.splice(index, 1);

    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
