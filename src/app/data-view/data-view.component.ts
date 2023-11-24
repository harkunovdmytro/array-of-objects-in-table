import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { IColorItem } from 'src/app/shared/models/color-item.model';
import { IGetColorItemsResponse } from 'src/app/shared/models/get-color-items-response.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss']
})
export class DataViewComponent implements OnInit {
  public isLoading = true;
  public colorItems: IColorItem[] = [];
  public colorItemsFormGroup = new FormGroup({
    colorItemsFormArray: new FormArray<FormControl<string | null>>([])
  });

  constructor(private dataService: DataService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public updateItemName(item: IColorItem): void {
    this.setLoading(true);

    this.dataService.updateItemName(item)
      .pipe(take(1))
      .subscribe(() => this.setLoading(false));
  }

  private loadData(): void {
    this.setLoading(true);

    this.dataService.getItems()
      .pipe(
        take(1),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (results: IGetColorItemsResponse) => {
          this.clearFormArray(this.colorItemsFormGroup.controls.colorItemsFormArray);
          this.colorItems = results.items;

          results.items.forEach((colorItem: IColorItem) => {
            this.colorItemsFormGroup.controls.colorItemsFormArray.push(new FormControl<string | null>(colorItem.itemName));
          });
        },
        error: (err: any) => {
          this.clearFormArray(this.colorItemsFormGroup.controls.colorItemsFormArray);
          this.colorItems = [];

          console.warn('[DataViewComponent] dataService.getItems Error: ', err?.mesage);
        }
      });
  }

  private setLoading(state: boolean): void {
    this.isLoading = state;

    if (state) {
      this.colorItemsFormGroup.controls.colorItemsFormArray.disable();
    } else {
      this.colorItemsFormGroup.controls.colorItemsFormArray.enable();
    }
  }

  private clearFormArray(formArray: FormArray): void {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
}
