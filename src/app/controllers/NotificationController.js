import * as Yup from 'yup';
import User from '../models/User';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

class NotificationController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    // sequelize - findAll | mongoose - find
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }
}
export default new NotificationController();
