import { Injectable } from '@nestjs/common';
import * as SiigoApi from 'siigo_api';

@Injectable()
export class AccountGroupsService {
  private accountGroupsApi;

  constructor() {
    this.accountGroupsApi = new SiigoApi.AccountGroupApi();
  }

  async findAll() {
    const accountGroups = await this.accountGroupsApi.getAccountGroups();
    console.log(accountGroups);
    
    return accountGroups;
  }
}
