import { NotificationRepository } from './notification.repository';

export class NotificationService {
  private notificationRepository: NotificationRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
  }

  // Define business logic here
}
