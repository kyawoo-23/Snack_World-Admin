export type TAnnouncementCreateRequest = {
  vendorId: string[];
  customerId: string[];
  title: string;
  content: string;
  type: 'ALL' | 'VENDOR' | 'CUSTOMER';
};
