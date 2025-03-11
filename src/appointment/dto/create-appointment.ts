export class CreateAppointmentDto {
  customerId: string;
  title: string;
  location: string;
  photoshootType: string;
  date: Date;
  description?: string;
  discount: number;
  howMuchPaid: number;
  isApproved: boolean;
  packageId: number;
}
