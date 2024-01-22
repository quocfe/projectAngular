import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	taskName: String,
	description: String,
	project: { type: Schema.Types.ObjectId, ref: 'Project' },
	employee: { type: Schema.Types.ObjectId, ref: 'Employee' },
	priority: String,
	status: { type: String, default: 'working' },
	startDate: { type: Date, default: Date.now },
	endDate: Date,
});

export default mongoose.model('Task', TaskSchema);
