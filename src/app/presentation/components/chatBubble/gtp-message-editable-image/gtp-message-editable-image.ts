import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-gtp-message-editable-image',
  imports: [CommonModule],
  templateUrl: './gtp-message-editable-image.html',
})
export class GtpMessageEditableImage implements AfterViewInit {
  text = input.required<string>();
  imageInfo = input.required<{ url: string; alt: string }>();
  onSelectedImage = output<string>();
  canvasElement = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  public originalImage = signal<HTMLImageElement|null>(null);
  public isDrawing = signal(false);
  public coords = signal({ x:0, y:0 });

  handleClick() {
    this.onSelectedImage.emit(this.imageInfo().url);
  }

  ngAfterViewInit() {
    if (!this.canvasElement()?.nativeElement) return;
    const canvas = this.canvasElement()?.nativeElement;
    const context = canvas?.getContext('2d');
    if (context) {
      const image = new Image();
      image.crossOrigin = 'Anonymous'; // This is important for CORS-enabled images
      image.src = this.imageInfo().url;
      this.originalImage.set(image);
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas!.width, canvas!.height);
      };
    }
  }


  onMouseDown( event: MouseEvent ) {
    if ( !this.canvasElement()?.nativeElement ) return;
    this.isDrawing.set(true);
    // Obtener las coordenadas del mouse relativo al canvas
    const startX = event.clientX - this.canvasElement()!.nativeElement.getBoundingClientRect().left;
    const startY = event.clientY - this.canvasElement()!.nativeElement.getBoundingClientRect().top;
    // Estos valos son mis coords
    this.coords.set({ x:startX, y:startY });
  }

  onMouseMove( event: MouseEvent ) {
    if ( !this.isDrawing() ) return;
    if ( !this.canvasElement()?.nativeElement )return;

    const canvasRef = this.canvasElement()!.nativeElement;

    const currentX = event.clientX - canvasRef.getBoundingClientRect().left;
    const currentY = event.clientY - canvasRef.getBoundingClientRect().top;

    // Calcular el alto y ancho de un rectángulo
    const width = currentX - this.coords().x;
    const height = currentY - this.coords().y;

    const canvasWidth = canvasRef.width;
    const canvasHeight = canvasRef.height;

    const ctx = canvasRef.getContext('2d')!;
    ctx.clearRect(0,0, canvasWidth, canvasHeight );
    ctx.drawImage( this.originalImage()!, 0,0, canvasWidth, canvasHeight );
    ctx.clearRect( this.coords().x, this.coords().y, width, height );
  }

   onMouseUp() {
    this.isDrawing.set(false);

    const canvas = this.canvasElement()!.nativeElement;
    const url = canvas.toDataURL('image/png');
    this.onSelectedImage.emit(url);


   }

}
