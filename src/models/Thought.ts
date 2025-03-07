import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    //reactions: Array of nested documents created with the reactionSchema
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        //reactions: Array of nested documents created with the reactionSchema
    },
    {
        toJSON: {
            virtuals: true, getters: true,
        },
        timestamps: true,
    },
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
