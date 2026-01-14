import Notification from '../models/Notification.model.js';

/**
 * Create a notification for admin
 * @param {Object} options - Notification options
 * @param {String} options.type - Notification type (contact, admission, payment, system, other)
 * @param {String} options.title - Notification title
 * @param {String} options.message - Notification message
 * @param {String} options.link - Optional link to related page
 * @param {String} options.relatedId - Optional related document ID
 * @param {String} options.relatedModel - Optional related model name
 * @param {String} options.priority - Priority level (low, medium, high)
 */
export const createNotification = async (options) => {
  try {
    // Check if Notification model is available
    if (!Notification) {
      console.warn('Notification model not available');
      return null;
    }
    
    const notification = await Notification.create({
      type: options.type,
      title: options.title,
      message: options.message,
      link: options.link || null,
      relatedId: options.relatedId || null,
      relatedModel: options.relatedModel || null,
      priority: options.priority || 'medium'
    });
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error.message || error);
    // Don't throw error, just log it so it doesn't break the main flow
    return null;
  }
};

