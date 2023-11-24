import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, timer } from 'rxjs';
import { IColorItem } from 'src/app/shared/models/color-item.model';
import { IGetColorItemsResponse } from 'src/app/shared/models/get-color-items-response.model';

@Injectable()
export class DataService {

  constructor() {
  }

  public getItems(): Observable<IGetColorItemsResponse> {
    return of({
      items: [
        {
          id: 1,
          itemName: 'Name 1',
          itemColour: 'Colour 1'
        }, {
          id: 2,
          itemName: 'Name 2',
          itemColour: 'Colour 2'
        }
      ]
    });
  }

  public updateItemName(item: IColorItem): Observable<number> {
    return timer(300);
  }
}
