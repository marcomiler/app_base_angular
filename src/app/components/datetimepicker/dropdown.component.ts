import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  template: ` <ng-template cdk-portal>
    <ng-content></ng-content>
  </ng-template>`,
})
export class DropdownComponent {
  @Input() public reference!: HTMLElement;

  @ViewChild(CdkPortal)
  public contentTemplate!: CdkPortal;

  protected overlayRef!: OverlayRef;

  public showing = false;

  constructor(protected overlay: Overlay) {}

  public hide(): void {
    this.overlayRef.detach();
    this.showing = false;
  }

  public show(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    // const dialogPortal = new ComponentPortal(TimeSelectComponent);
    this.overlayRef.attach(this.contentTemplate);
    // this.overlayRef.attach(dialogPortal);
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.destroy());
    this.showing = true;
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      // .flexibleConnectedTo(this.inputDate.nativeElement)
      .flexibleConnectedTo(this.reference)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4,
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      // width: '100%',
    });
  }

  private syncWidth(): void {
    if (!this.overlayRef) {
      return;
    }
    const refRectWidth = this.reference.getBoundingClientRect().width;
    // this.inputDate.nativeElement.getBoundingClientRect().width;

    this.overlayRef.updateSize({ width: refRectWidth });
  }

  @HostListener('window:resize')
  public onWinResize(): void {
    this.syncWidth();
  }

  private destroy(): void {
    this.overlayRef.detach();
  }
}
