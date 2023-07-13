import User from '../models/user-schema.js';
import fs from 'fs';
import { Octokit } from "@octokit/rest";
import dotenv from 'dotenv';
dotenv.config();


const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

export const uploadFile = async(req,res) => {
  const { name, email,  username } = req.body;
  const { path: tempPath, originalname } = req.file;

  try {
    // Upload profile image to GitHub repository
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GIT_USERNAME,
      repo: process.env.GITHUB_REPOSITORY,
      path: `profile_images/${originalname}`,
      message: 'Upload profile image',
      content: fs.readFileSync(tempPath, 'base64'),
    });
console.log('data:',data)

 // Create user in MongoDB
 const user = new User({
  name,
  email,
  username,
  imageUrl: data.content.html_url,
});
await user.save();

res.status(201).json({message: 'User created successfully',data:user });
} catch (error) {
  console.error('Error creating user:', error);
  res.status(500).json({ error: 'Internal Server Error',msg:error.message });
} finally {
  // Remove the temporary file
  fs.unlinkSync(tempPath);
}

}
