const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  id: String,
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  profilePicture: {
    type: String,
  },
  customURL: String,
  thirdParty: {
    type: [String],
    require: true
  },
  updateDate: Date,
  description: String,
  gameLibrary: {
    type: [String],
    default: []
  },
  isDeveloper: {
    type: Boolean,
    default: false
  },
  gamesCreated: {
    type: [String],
    default: []
  },
  createdDate: Date
}, {
  collection: 'Users'
})

UserSchema.pre('save', async function(next) {
  const user = this;
  console.log('pass test', user.password)
  const hash = await bcrypt.hash(user.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('Users', UserSchema)

module.exports = User
