import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-gtp-message-editable-image',
  imports: [CommonModule],
  templateUrl: './gtp-message-editable-image.html',
})
export class GtpMessageEditableImage {
  text = input.required<string>();
  imageInfo = input.required<{ url: string; alt: string }>();
  onSelectedImage = output<string>();

  handleClick() {
    this.onSelectedImage.emit(this.imageInfo().url);
  }
}
