export interface AccountDetail {
  accountId:            string;
  balance:              number;
  currentPage:          number;
  pageSize:             number;
  totalPages:           number;
  accountOperationDTOS: AccountOperation[];
}

export interface AccountOperation {
  id:            number;
  operationDate: Date;
  amount:        number;
  description:   string;
  type:          string;
}
