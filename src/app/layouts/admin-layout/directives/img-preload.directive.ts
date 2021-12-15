import {Directive, Input, HostBinding} from '@angular/core'
@Directive({
  selector: 'img[appDefault]',
  host: {
    '(error)': 'updateUrl()',
    '(load)': 'load()',
    '[src]': 'src'
  }
})

export class ImagePreloadDirective {
  @Input() src: string;
  @Input() appDefault: string;
  @HostBinding('class') className;

  updateUrl() {
    this.src = this.appDefault;
  }
  load() {
    this.className = 'image-loaded';
  }
}
