export interface IDiscountToken {
  code: string;
  percentage: number;
  maxUsage: number;
  usedCount?: number;
  validFrom?: Date;
  validUntil: Date;
  isActive?: boolean;
  minCartValue?: number;
  createdBy: string;
}
