import ErrorHandler from "../middlewares/error.js";
import { LogEntry } from "../models/logs.js";

export const setLogs = async(req, res, next)=>{
    try {
        const { level, log_string, timestamp, metadata } = req.body; 

        if(!level || !log_string || !timestamp || !metadata || !metadata.source) return next(new ErrorHandler("Please add all the details!", 400));

        await LogEntry.create({
            level,
            log_string,
            timestamp,
            metadata: {
                source: metadata.source 
            }
        });

        res.status(201).json({
            success: true,
            message: "Log Added!"
        });

    } catch (error) {
        next(error);
    }
};

export const getLogs = async (req, res, next) => {
    try {
        const { level, log_string, timestamp, source, startDate, endDate } = req.query;

        const query = {};
        if (level) query.level = level;
        if (log_string) query.log_string = { $regex: log_string, $options: 'i' };
        if (timestamp) query.timestamp = { $gte: new Date(timestamp) };
        if (source) query['metadata.source'] = source;

        if (startDate && endDate) {
            query.timestamp = { 
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        } else if (startDate) {
            query.timestamp = { $gte: new Date(startDate) };
        } else if (endDate) {
            query.timestamp = { $lte: new Date(endDate) };
        }

        const logs = await LogEntry.find(query);
        res.status(200).json({
            success: true,
            data: logs
        });
    } catch (error) {
        next(error);
    }
};


