const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');

const rockSchema = mongoose.Schema({
  type:{type: String, required: true},
  origin:{type: String, required: true},
  size:{type: String, required: true},
  color:{type: String, required: true}
});

const usersSchema = mongoose.Schema({
  username:{type: String, required: true},
  password:{type: String, required: true}
}) 


rockSchema.plugin(uniqueValidator);
rockSchema.plugin(mongoosePaginate);
usersSchema.methods.validPassword = function(plainTextPwd) {
  return bcrypt.compareSync(plainTextPwd, this.password);
}
usersSchema.plugin(uniqueValidator);

rockSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    type: this.type,
    origin: this.origin,
    size: this.size,
    color: this.color  
  };
}

usersSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    username: this.username
  };
}

const RocksInventory = mongoose.model('rocks', rockSchema);
const Users = mongoose.model('users', usersSchema);
module.exports = {RocksInventory, Users};

// bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash(newUser.password, salt, function(err, hash) {
//           newUser.password = hash;
//           newUser.save(callback);
//       });
//   });

// module.exports.createUser = function(newUser, callback){
//   bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash(newUser.password, salt, function(err, hash) {
//           newUser.password = hash;
//           newUser.save(callback);
//       });
//   });
// }
// module.exports = {User};