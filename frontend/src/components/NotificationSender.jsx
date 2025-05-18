// src/utils/NotificationSender.js
import axiosInstance from '../axiosConfig';

export const NotificationSender = async ({ targetIndiviual, targetRole, title, content }) => {
  const formData = {
    receiverId: targetIndiviual || '',
    receiverRole: targetRole || '',
    title: title || '',
    content: content || '',
  };

  try {
    await axiosInstance.post('/api/notification', formData);
  } catch (error) {
    console.error('Notification send failed:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    alert('Notification send failed... Please try again...');
  }
};