import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertGender',
})
export class ConvertGenderPipe implements PipeTransform {

  transform(value: number): string {
    let defaultGender = 'male';
    if (value >= 4) {
      return (defaultGender = 'female');
    } else if (value === -1) {
      return (defaultGender = 'genderless');
    } else {
      return defaultGender;
    }
  }

}
