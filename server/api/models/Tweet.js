import mongoose from 'mongoose';

const instance = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
      required: true,
    },
    image: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
      },
    ],
    retweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReTweet',
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
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
const modelName = 'Tweet';

export default mongoose.model(modelName, instance);
