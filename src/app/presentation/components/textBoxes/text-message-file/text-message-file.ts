import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface TextMessageEvent {
  prompt?: string | null;
  file: File;
}

@Component({
  selector: 'app-text-message-file',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-message-file.html'
})
export class TextMessageFile {
  placeholder = input.required<string>();
  disableCorrections = input<boolean>(false);

  onMessage = output<TextMessageEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [],
    file: [null, Validators.required]
  });

  public file: File | null = null;

  handleFileInput(event: any) {
    const file = event.target.files.item(0);
    this.form.controls.file.setValue(file)
  }

  handleSubmit() {
    if (this.form.invalid) return;
    const { prompt = '', file } = this.form.value;
    this.onMessage.emit({ prompt, file: file!  });
    this.form.reset();
  }
}
