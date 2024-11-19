import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-info-selengkapnya-beranda',
  templateUrl: './info-selengkapnya-beranda.component.html',
  styleUrls: ['./info-selengkapnya-beranda.component.css']
})
export class InfoSelengkapnyaBerandaComponent {
  @ViewChild('slidesContainer', { static: true }) slidesContainer!: ElementRef;
  slideIndex = 0;

  showSlide(index: number) {
    const slides: HTMLElement = this.slidesContainer.nativeElement;
    const totalSlides = slides.children.length;

    if (index >= totalSlides) {
      this.slideIndex = 0;
    } else if (index < 0) {
      this.slideIndex = totalSlides - 1;
    } else {
      this.slideIndex = index;
    }

    const offset = -this.slideIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
  }

  nextSlide() {
    this.showSlide(this.slideIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.slideIndex - 1);
  }

  ngOnInit() {
    this.showSlide(this.slideIndex); // Initialize the first slide
  }
}
