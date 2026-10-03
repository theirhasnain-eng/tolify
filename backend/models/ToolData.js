import mongoose from 'mongoose';

const toolDataSchema = new mongoose.Schema(
  {
    toolId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: 'Calculator',
    },
  },
  {
    timestamps: true,
  }
);

const ToolData = mongoose.model('ToolData', toolDataSchema);
export default ToolData;
