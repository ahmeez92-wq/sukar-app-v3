import { LocalNotifications } from '@capacitor/local-notifications';

export async function initializeNotifications() {
  try {
    // طلب الإذن للإشعارات
    const permission = await LocalNotifications.requestPermissions();
    console.log('Notification permission:', permission);

    // جدولة إشعار تذكير قياس السكر كل 4 ساعات
    scheduleBloodSugarReminder();
    
    // جدولة إشعار تذكير الدواء
    scheduleMedicineReminder();
  } catch (err) {
    console.error('Failed to initialize notifications:', err);
  }
}

export async function scheduleBloodSugarReminder() {
  try {
    // حذف الإشعارات السابقة
    await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

    // جدولة إشعار جديد كل 4 ساعات
    const now = new Date();
    const nextReminder = new Date(now.getTime() + 4 * 60 * 60 * 1000);

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: 'تذكير قياس السكر',
          body: 'حان وقت قياس مستوى السكر في الدم',
          schedule: {
            at: nextReminder,
            every: 'day'
          },
          actionTypeId: 'BLOOD_SUGAR',
          extra: {
            type: 'blood_sugar_reminder'
          }
        }
      ]
    });

    console.log('Blood sugar reminder scheduled');
  } catch (err) {
    console.error('Failed to schedule blood sugar reminder:', err);
  }
}

export async function scheduleMedicineReminder() {
  try {
    // حذف الإشعارات السابقة
    await LocalNotifications.cancel({ notifications: [{ id: 2 }] });

    // جدولة إشعار الدواء في الصباح والمساء
    const morning = new Date();
    morning.setHours(8, 0, 0, 0);
    if (morning < new Date()) {
      morning.setDate(morning.getDate() + 1);
    }

    const evening = new Date();
    evening.setHours(20, 0, 0, 0);
    if (evening < new Date()) {
      evening.setDate(evening.getDate() + 1);
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 2,
          title: 'تذكير الدواء - الصباح',
          body: 'لا تنسَ تناول الدواء في الصباح',
          schedule: {
            at: morning,
            every: 'day'
          },
          actionTypeId: 'MEDICINE',
          extra: {
            type: 'medicine_reminder',
            time: 'morning'
          }
        },
        {
          id: 3,
          title: 'تذكير الدواء - المساء',
          body: 'لا تنسَ تناول الدواء في المساء',
          schedule: {
            at: evening,
            every: 'day'
          },
          actionTypeId: 'MEDICINE',
          extra: {
            type: 'medicine_reminder',
            time: 'evening'
          }
        }
      ]
    });

    console.log('Medicine reminders scheduled');
  } catch (err) {
    console.error('Failed to schedule medicine reminders:', err);
  }
}

export async function sendNotification(title: string, body: string) {
  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 10000),
          title,
          body,
          schedule: {
            at: new Date(Date.now() + 1000)
          }
        }
      ]
    });
  } catch (err) {
    console.error('Failed to send notification:', err);
  }
}

export async function cancelNotification(id: number) {
  try {
    await LocalNotifications.cancel({ notifications: [{ id }] });
  } catch (err) {
    console.error('Failed to cancel notification:', err);
  }
}
