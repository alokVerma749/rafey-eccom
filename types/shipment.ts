type Center = {
  code: string;
  e: string;
  cn: string;
  s: string;
  u: string;
  sort_code: string;
  ud: string;
};

type PostalCode = {
  max_weight: number;
  city: string;
  cod: string;
  inc: string;
  district: string;
  pin: number;
  max_amount: number;
  pre_paid: string;
  cash: string;
  state_code: string;
  remarks: string;
  pickup: string;
  repl: string;
  covid_zone: string | null;
  country_code: string;
  is_oda: string;
  protect_blacklist: boolean;
  sort_code: string;
  sun_tat: boolean;
  center: Center[];
};

type DeliveryCode = {
  postal_code?: PostalCode;
};

type DeliveryOptionsResponse = {
  delivery_codes?: DeliveryCode[];
};
