import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: Types.DocumentArray<typeof reactionSchema>,
}

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleString(), //Use a getter method to format the timestamp on query.
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

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
        reactions: [reactionSchema],
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
}); //Creates a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
