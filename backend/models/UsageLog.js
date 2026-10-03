import mongoose from 'mongoose';

const usageLogSchema = new mongoose.Schema(
  {
    toolId: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      default: 'calculate',
    },
    userIp: {
      type: String,
      default: '127.0.0.1',
    },
  },
  {
    timestamps: true,
  }
);

const UsageLog = mongoose.model('UsageLog', usageLogSchema);
export default UsageLog;
