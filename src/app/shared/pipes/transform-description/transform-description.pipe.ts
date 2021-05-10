import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDescription'
})
export class TransformDescriptionPipe implements PipeTransform {

  transform(value: number): number {
    return value/10;
  }

}
