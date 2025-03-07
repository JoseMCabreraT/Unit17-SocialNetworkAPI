import { Schema, Types, model, type Document } from 'mongoose';


interface IUser extends Document {
    username: string,
    email: String,
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Email validation
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought', // References Thought model
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User', // Self-referencing User model
        },
    ],
},
    {
        toJSON: {
           virtuals: true, getters: true,
        },
        timestamps: true,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model<IUser>('User', userSchema);

export default User;
