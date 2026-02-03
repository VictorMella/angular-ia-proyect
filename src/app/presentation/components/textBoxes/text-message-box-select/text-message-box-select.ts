import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Option {
  id: string;
  text: string;
}

export interface TextMessageBoxEvent {
  prompt: string;
  selectedOption: string;
}

@Component({
  selector: 'app-text-message-box-select',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-message-box-select.html',
  styleUrl: './text-message-box-select.css',
})
export class TextMessageBoxSelect {
  placeholder = input.required<string>();
  onMessage = output<TextMessageBoxEvent>();
  options = input.required<Option[]>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
    selectedOption: ['', Validators.required ]
  });


  handleSubmit() {
    if ( this.form.invalid ) return;

    const { prompt, selectedOption } = this.form.value;

    this.onMessage.emit({prompt: prompt!, selectedOption:selectedOption! });
    this.form.reset();

  }
}
