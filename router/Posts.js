const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");

//@route POST /api/posts
//@desc Creates a new post
//@access private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      });

      await newPost.save();

      res.status(200).json(newPost);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Sever Error" });
    }
  }
);

//@route GET /api/posts
//@desc Get all posts
//@access private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      return res.status(401).json({ msg: "Posts not found" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

//@route DELETE /api/posts/:postid
//@desc delete a post
//@access private

router.delete("/:postid", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);
    if (!post) {
      return res.status(401).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "Not authorized" });
    }

    await post.remove();

    res.status(200).json({ msg: "Post Removed" });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      res.status(401).json({ msg: "Post not found" });
    }
    res.status(500).json({ error: "Server Error" });
  }
});

//@route PUT /api/posts/like/:postid
//@desc Adds a like to the post
//@access private

router.put("/like/:postid", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);
    if (!post) {
      return res.status(401).json({ msg: "Post not found" });
    }

    if (
      post.likes.filter(like => like._id.toString() === req.user.id).length>0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({_id:req.user.id});

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

//@route PUT /api/posts/unlike/:postid
//@desc removes the like if it exists
//@access private
router.put('/unlike/:postid',auth,async (req,res)=>{
  try {
    const post =await Post.findById(req.params.postid);
    post.likes.map(like=>console.log(like.id))
    if(post.likes.map(like=>like._id.toString()===req.user.id).length===0){
      res.status(400).json({msg:'You haven\'t liked this post'});
    }

    const index = post.likes.map(like=>like._id).indexOf(req.user.id);
    console.log(index);
    post.likes.splice(index,1);

    await post.save();
    
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:'Server error'});
  }
});


//@route PUT /api/posts/comments
//@desc adds a comment to the post
//@access private

router.put('/comments/:postid',
[auth,
  [
    check('text','Text field is required').not().isEmpty()
  ]
],
async (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }

  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.postid);
    if(!post){
      return res.status(400).json({error:'Post not found'});
    }

    const comment = {
      user:req.user.id,
      text:req.body.text,
      name:user.name,
      avatar:user.avatar
    }

    post.comments.unshift(comment);

    await post.save();
    res.status(200).json(post.comments);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:'Server Error'});
  }
});

//@route DELETE /api/posts/comments/:postid/:commentid
//@desc removes a comment from the post
//@access private

router.delete("/comments/:postid/:commentid",auth,async(req,res)=>{
  try {
    const post =await Post.findById(req.params.postid);

    if(post.comments.map(comment=>comment.user==req.user.id).length===0){
      return res.status(400).json({msg:'You are not authorized to remove this comment'});
    }

    const commentindex = post.comments.map(comment=>comment.id.toString()).indexOf(req.params.commentid)
    post.comments.splice(commentindex,1);

    await post.save();

    res.status(200).json(post.comments);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error:'Server error'})
  }
})

//@route GET SINGLE POST /api/posts/:postid
//@des gets single post
//@access private
router.get('/:id',auth, async (req,res)=>{
  try {
    console.log()
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(400).json({error:"No Profile found"});
    }

    res.status(200).json(post);
    
  } catch (error) {
    console.log(error.msg)
    res.status(500).json({error:"Server error"});
  }
})

module.exports = router;