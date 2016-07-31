/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { TheftService } from './theft.service';

describe('Service: Theft', () => {
  beforeEach(() => {
    addProviders([TheftService]);
  });

  it('should ...',
    inject([TheftService],
      (service: TheftService) => {
        expect(service).toBeTruthy();
      }));
});
