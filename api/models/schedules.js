const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
    taskNo: { type: Number},
    date: { type: Date},
    title: { type: String, required: true },
    description: { type: String, required: true },
})

const UserSchedules = mongoose.model("todos", ScheduleSchema)

                                                                                                                                
module.exports = UserSchedules