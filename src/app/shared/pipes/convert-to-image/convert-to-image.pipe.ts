import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'convertToImage'
})
export class ConvertToImagePipe implements PipeTransform {
  transform(url: string): string {
    let image = `${environment.POKEMONIMAGEAPI}${url.split('/')[6]}.png`;
    return image;
  }
}
