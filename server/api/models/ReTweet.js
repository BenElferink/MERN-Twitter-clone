import mongoose from 'mongoose';

const instance = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet',
    },
  },
  {
    timestamps: true,
    // this creates and maintains:
    // {
    //   createdAt: Date,
    //   updatedAt: Date,
    // }
  },
);

// NOTE! use a singular model name, mongoose automatically creates a collection like so:
// model: 'User' === collection: 'users'
const modelName = 'ReTweet';

export default mongoose.model(modelName, instance);
