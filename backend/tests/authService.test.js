
import 'dotenv/config';
import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';

import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import { register, login } from '../services/authService.js';

const testEmails = new Set();
const testPassword = 'TaskFlow-Test-Password-123!';

before(async () => {
  const testUri = process.env.MONGODB_TEST_URI;

  // Safety check: never silently use the normal database.
  if (!testUri || !testUri.includes('taskflow_test')) {
    throw new Error(
      'MONGODB_TEST_URI must point to the taskflow_test database'
    );
  }

  await connectDB(testUri);
});

after(async () => {
  try {
    // Delete only test accounts created by this test file.
    if (mongoose.connection.readyState === 1 && testEmails.size > 0) {
      await User.deleteMany({
        email: { $in: [...testEmails] }
      });
    }
  } finally {
    await mongoose.disconnect();
  }
});

function uniqueEmail() {
  const email = `auth-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}@example.com`;

  testEmails.add(email);
  return email;
}

test('registration creates a user without returning the password hash', async () => {
  const email = uniqueEmail();

  const result = await register(email, testPassword);

  assert.equal(result.email, email);
  assert.ok(result.id);
  assert.equal(result.passwordHash, undefined);

  const savedUser = await User.findOne({ email }).select('+passwordHash');

  assert.ok(savedUser);
  assert.notEqual(savedUser.passwordHash, testPassword);
});

test('duplicate registration is rejected with status 409', async () => {
  const email = uniqueEmail();

  await register(email, testPassword);

  await assert.rejects(
    register(email, testPassword),
    { status: 409 }
  );
});

test('correct password allows login', async () => {
  const email = uniqueEmail();

  await register(email, testPassword);

  const result = await login(email, testPassword);

  assert.equal(result.email, email);
  assert.ok(result.id);
  assert.equal(result.passwordHash, undefined);
});

test('incorrect password is rejected with status 401', async () => {
  const email = uniqueEmail();

  await register(email, testPassword);

  await assert.rejects(
    login(email, 'Wrong-Password-123!'),
    { status: 401 }
  );
});

test('unknown email is rejected with status 401', async () => {
  await assert.rejects(
    login(uniqueEmail(), testPassword),
    { status: 401 }
  );
});

test('invalid email is rejected with status 400', async () => {
  await assert.rejects(
    register('not-an-email', testPassword),
    { status: 400 }
  );
});

test('short password is rejected with status 400', async () => {
  await assert.rejects(
    register(uniqueEmail(), 'short'),
    { status: 400 }
  );
});
