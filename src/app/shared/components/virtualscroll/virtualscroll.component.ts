import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-virtualscroll',
  templateUrl: './virtualscroll.component.html',
  styleUrls: ['./virtualscroll.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VirtualscrollComponent implements OnInit {
  @Input() items: string[]
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  
  scrollLeft(){
    const currentOffset = this.viewPort.measureScrollOffset();
    this.viewPort.scrollToOffset(currentOffset - 500, 'smooth');
    
  }

  scrollRight(){
    const currentOffset = this.viewPort.measureScrollOffset();
    this.viewPort.scrollToOffset(currentOffset + 500, 'smooth');
  }
  constructor() { }

  ngOnInit(): void {
  }

}
