import User from "../models/users_modals.js"
import bcrypt from'bcrypt'
import jwt from 'jsonwebtoken'


export const getAllUsers = async (req,res)=>
    {
    try {
      //get all users
      const users = await User.find();
      return res.status(200).json({ message: "OK", users });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };


  export const signup = async (req, res) => {
    try {
        
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new User({ name, email, password });

        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}
  

export const login = async (req, res) => {
  try {
      const { email, password } = req.body;
     
      const user = await User.findOne({ email });
      const errorMsg = 'Auth failed email or password is wrong';
      if (!user) {
          return res.status(403)
              .json({ message: errorMsg, success: false });
      }
     
      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
          return res.status(403)
              .json({ message: errorMsg, success: false });
      }
     
      const jwtToken = jwt.sign(
          { email: user.email, _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
      )
      
      res.status(200)
          .json({
             user,
              message: "Login Success",
              success: true,
               jwtToken,
              
          })
  } catch (err) {
      res.status(500)
          .json({
              message: "Internal server errror",
              success: false
          })
  }
}


export const logout = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({
          message: "Email is required for logout",
          success: false,
        });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
  
      // Perform any logout logic here (e.g., invalidating tokens, clearing sessions, etc.)
      // Example: Invalidate user session or token (if applicable)
  
      return res.status(200).json({
        message: "Logout successful",
        success: true,
      });
    } catch (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  export const getByid=async(req,res)=>{
    try{
      const {id}=req.body
      const user=await  User.findById({_id:id})
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      return res.status(200).json({
        message: "User fetch successfully",
        success: true,
        user:user
      });
      

    } catch (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }

  }


  export const updateUserById = async (req, res) => {
    try {
      const { id, updatedData } = req.body;
  
      // Find and update the user by ID
      const updatedUser = await User.findByIdAndUpdate(
        id, 
        { $set: updatedData }, // Apply the updated data
        { new: true, runValidators: true } // Return the updated user and validate input
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "User updated successfully",
        success: true,
        user: updatedUser,
      });
    } catch (err) {
      console.error("Error during update:", err);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  
  export const searchUsers = async (req, res) => {
    try {
      const { query } = req.body;
  
      if (!query || query.trim() === "") {
        return res.status(400).json({
          message: "Search query is required",
          success: false,
        });
      }
  
      // Search for users based on name or email (case-insensitive)
      const users = await User.find({
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive search for name
          { email: { $regex: query, $options: "i" } }, // Case-insensitive search for email
        ],
      });
  
      if (users.length === 0) {
        return res.status(404).json({
          message: "No users found matching the query",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "Users fetched successfully",
        success: true,
        users,
      });
    } catch (err) {
      console.error("Error during search:", err);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  