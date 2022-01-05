const mongoose = require('mongoose');

const ContestantSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Input your Full Name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ],
      unique: true
    },
    phoneNumber: {
      type: String
    },
    address: {
      type: String
    },
    occupation: {
      type: String
    },
    nationality: {
      type: String
    },
    stateOfOrigin: {
      type: String
    },
    dob: {
      type: String
    },
    username: {
      type: String
    },
    contestantPhoto: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Xdf9OyXn9BpWL30gb6cpyLnkiCCbSaH8wVB1007o9WpYBDgb6J1_afDQTdJuqwgE3xM&usqp=CAU'
    },
    contestantId: {
      type: String
    },
    contestantNo: {
      type: String,
      default: 0
    },
    voteCount: {
      type: String,
      default: 0
    },
    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'User'
    // },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Cascade delete votes when a Contestant is deleted
ContestantSchema.pre('remove', async function (next) {
  console.log(`Votes being removed from contestant ${this._id}`);
  await this.model('Vote').deleteMany({ contestant: this._id });
  next();
});

// Reverse populate with virtuals
ContestantSchema.virtual('votes', {
  ref: 'Vote',
  localField: '_id',
  foreignField: 'contestant',
  justOne: false
});

module.exports = mongoose.model('Contestant', ContestantSchema);
