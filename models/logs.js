import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    level: {
        type: String,
        enum: ['info', 'error', 'success'],
        required: true
    },
    log_string: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    metadata: {
        source: {
            type: String,
            required: true
        }
    }
});

export const LogEntry = mongoose.model('LogEntry', logSchema);

