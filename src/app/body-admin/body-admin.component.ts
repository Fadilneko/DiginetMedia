import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-body-admin',
  templateUrl: './body-admin.component.html',
  styleUrls: ['./body-admin.component.css']
})

export class BodyAdminComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  ngOnInit(): void {
    console.log('Initial collapsed:', this.collapsed);
    console.log('Initial screen width:', this.screenWidth);
  }

  ngOnChanges(): void {
    console.log('Collapsed updated:', this.collapsed);  // Debugging
    console.log('Screen width updated:', this.screenWidth);  // Debugging
  }

  getBodyClass(): string {
    let styleClass = '';
    console.log('Collapsed:', this.collapsed);  // Debugging
    console.log('Screen Width:', this.screenWidth);  // Debugging

    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-collapsed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    console.log('Body class:', styleClass);  // Debugging
    return styleClass;
  }
}

  


