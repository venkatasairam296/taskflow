import argon2 from 'argon2';
import User from '../models/User.js';

export async function register(userEmail, userPassword) {
  // 1. Validate the input types first.
  if(typeof userEmail !== 'string' || typeof userPassword !== 'string'){
    const error = new Error('Email and password are required');
    error.status = 400;
    throw error;
  }

  if(userPassword.trim() === ""){
    const error = new Error('Password is required');
    error.status = 400;
    throw error;
  }

  // 2. Normalize the email.
  const email = userEmail.trim().toLowerCase();

  // 3. Validate email and password.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailPattern.test(email)){
    const error = new Error('Please provide a valid email address');
    error.status = 400;
    throw error;
  }

  if(userPassword.length < 12 || userPassword.length > 128){
    const error = new Error('Password must be between 12 and 128 characters');
    error.status = 400;
    throw error;
  }

  // 4. Hash the password.
  const passwordHash = await argon2.hash(userPassword);

  try {
    // 5. Create the user in MongoDB.
    const user = await User.create({ email, passwordHash });

    // 6. Return only safe fields.
    return {
      id: user.id,
      email: user.email
    };
  } catch (error) {
    if(error.code === 11000){
      const duplicateError = new Error("An account with this email already exists");
      duplicateError.status = 409;
      throw duplicateError;
    }

    throw error;
  }
}

export async function login(userEmail, userPassword) {
  if(typeof userEmail !== 'string' || typeof userPassword !== 'string'){
    const error = new Error('Email and password are required');
    error.status = 400;
    throw error;
  }

  if(userEmail.trim() === ""){
    const error = new Error('Email is required');
    error.status = 400;
    throw error;
  }

  if(userPassword.trim() === ""){
    const error = new Error('Password is required');
    error.status = 400;
    throw error;
  }

  const email = userEmail.trim().toLowerCase();

  const user = await User.findOne({ email }).select('+passwordHash');

  if(!user){
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  const isPasswordValid = await argon2.verify(
    user.passwordHash,
    userPassword
  );

  if(!isPasswordValid){
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  return {
    id: user.id,
    email: user.email
  };
}

export async function getCurrentUser(userId) {
  const user = await User.findById(userId);

  if(!user){
    const error = new Error('User not found');
    error.status = 401;
    throw error;
  }

  return {
    id: user.id,
    email: user.email
  };
}