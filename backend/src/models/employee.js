import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
	name: String,
	password: String,
	email: { type: String, unique: true },
	zone: String,
	role: { type: String, default: 'Employee' },
	image: String,
	phone: String,
	enrollDate: { type: Date, default: Date.now },
	status: { type: String, default: 'working' },
	refreshToken: String,
});

EmployeeSchema.methods.gravatar = function (size) {
	if (!this.size) size = 200;
	if (!this.email) {
		return `https://gravatar.com/avatar/?s${size}&d=retro`;
	} else {
		let md5 = bcrypt.hashSync(this.email, 10);
		return `https://gravatar.com/avatar/${md5}?s${size}&d=retro`;
	}
};

export default mongoose.model('Employee', EmployeeSchema);
