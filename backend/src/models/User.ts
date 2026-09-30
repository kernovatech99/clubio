import bcrypt from 'bcryptjs';
import {Schema, model} from 'mongoose';

const userSchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        password: {type: String, required: true, select: false},
    },
    {
        timestamps: true,
        toJSON: {
            transform(_doc, ret: Record<string, unknown>) {
                delete ret.password;
                delete ret.__v;
                return ret;
            },
        },
    },
);

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
});

userSchema.methods.checkPassword = function (plain: string) {
    return bcrypt.compare(plain, this.password);
};

export const User = model('User', userSchema);
