import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    token: {
        type: String,
        default: '0'
    },
    loggedIn: {
        type: Boolean,
        default: false
    },
    firstName: String,
    lastName: String,
    phoneNumber: String,
    emailAddress:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', (next) => {
    if (!this.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Users', UserSchema);
