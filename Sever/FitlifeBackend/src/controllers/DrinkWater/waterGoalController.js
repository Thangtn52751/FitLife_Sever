const WaterGoalModel = require("../../models/Water/waterGoalModel");
const asyncHandler = require('express-async-handler');
const WaterIntakeModel = require("../../models/Water/waterInTakeModel");
//Thiết lập mục tiêu uống nước
exports.setGoal = asyncHandler(async (req, res) => {
    const {targetGlasses, volumePerGlass} = req.body;

    if(!targetGlasses || targetGlasses <= 0 || !volumePerGlass || volumePerGlass <= 0){
        res.status(400);
        throw new Error("Mục tiêu hoặc dung tích mỗi ly không hợp lệ");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingGoal = await WaterGoalModel.findOne({
        userId: req.user.id,
        date: today,
    });

    if(existingGoal){
        res.status(400)
        throw new Error("Mục tiêu đã tồn tại");
    }

    const goal = await WaterGoalModel.create({
        userId: req.user.id,
        targetGlasses,
        volumePerGlass,
        date: today,
    });

    res.json({success: true, data: goal})
})

//Uống 1 ly nước
exports.drinkWater = asyncHandler(async (req, res)=> {
    const today = new Date();
    today.setHours(0, 0, 0, 0)

    const goal = await WaterGoalModel.findOne({
        userId: req.user.id,
        date : today,
    })

    if(!goal){
        res.status(400)
        throw new Error("Chưa có mục tiêu nào vào ngày hôm nay");
    }

    if(goal.achieveGlasses >= goal.targetGlasses){
        res.status(400)
        throw new Error("Đã đạt chỉ tiêu !")
    }

    goal.achieveGlasses += 1;
    await goal.save()

    await WaterIntakeModel.create({
        userId : req.user.id,
        volumeMl: goal.volumePerGlass,
    });

    res.json({success : true, data: goal});
}) 

//Xem tiến độ hôm nay
exports.getTodayGoal = asyncHandler(async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    
    const goal = await WaterGoalModel.findOne({
        userId : req.user.id,
        date : today,
    });

    res.json({success: true, data: goal});
});

//Lịch sử uống nước
exports.getHistory = asyncHandler(async (req, res) =>{
    const history = await WaterGoalModel.find({
        userId : req.user.id,
    }).sort({date: -1});

    res.json({success : true , data : history});
})

//Thống kê uống nước
exports.getWaterReport = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Xác định ngày đầu tuần (Chủ Nhật)
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    // Xác định đầu tháng và cuối tháng
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    // 1. Thống kê hoàn thành từng ngày trong tuần
    const weeklyGoals = await WaterGoalModel.find({
        userId,
        date: { $gte: weekStart, $lt: weekEnd }
    });

    const completedDays = weeklyGoals.filter(g => g.achieveGlasses >= g.targetGlasses).length;

    // 2. Tính tỷ lệ hoàn thành trung bình %
    const averageCompletion = weeklyGoals.length ? (completedDays / weeklyGoals.length) * 100 : 0;

    // 3. Tổng lượng nước đã uống trong tuần
    const waterIntakeWeek = await WaterIntakeModel.find({
        userId,
        drankAt: { $gte: weekStart, $lt: weekEnd }
    });

    const totalMlWeek = waterIntakeWeek.reduce((sum, item) => sum + item.volumeMl, 0);
    const drinkFrequency = waterIntakeWeek.length ? (waterIntakeWeek.length / 7).toFixed(2) : "0.00";
    const weeklyAverage = totalMlWeek ? (totalMlWeek / 7).toFixed(2) : "0.00";

    // 4. Tổng lượng nước đã uống trong tháng
    const waterIntakeMonth = await WaterIntakeModel.find({
        userId,
        drankAt: { $gte: monthStart, $lt: nextMonth }
    });

    const totalMlMonth = waterIntakeMonth.reduce((sum, item) => sum + item.volumeMl, 0);
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const monthlyAverage = totalMlMonth ? (totalMlMonth / daysInMonth).toFixed(2) : "0.00";

    // 5. Weekly Completion mảng true/false rõ ràng
    const weeklyCompletion = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);

        const goal = weeklyGoals.find(g => {
            const gDate = new Date(g.date);
            return gDate.getDate() === day.getDate() &&
                   gDate.getMonth() === day.getMonth() &&
                   gDate.getFullYear() === day.getFullYear();
        });

        weeklyCompletion.push(!!(goal && goal.achieveGlasses >= goal.targetGlasses));
    }

    // Trả kết quả
    res.json({
        success: true,
        weeklyCompletion, 
        weeklyAverage,
        monthlyAverage,
        averageCompletion: averageCompletion.toFixed(2),
        drinkFrequency
    });
});