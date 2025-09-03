import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  computed,
  inject,
  effect,
  ElementRef,
  ViewChild,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  OverlayConfig,
  FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';

export interface DpOverlayConfig {
  origin: ElementRef | HTMLElement;
  backdropClass?: string;
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  backdropClickCloses?: boolean;
  escapeKeyCloses?: boolean;
  positions?: 'below' | 'above' | 'auto';
  offsetX?: number;
  offsetY?: number;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
}

@Component({
  selector: 'dp-overlay',
  imports: [],
  template: `
    <ng-template #overlayTemplate>
      <div class="dp-overlay-panel" 
           [style.width]="width()"
           [style.height]="height()"
           [style.minWidth]="minWidth()"
           [style.minHeight]="minHeight()"
           [style.maxWidth]="maxWidth()"
           [style.maxHeight]="maxHeight()">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  styleUrl: './dp-overlay.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DpOverlay implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly document = inject(DOCUMENT);

  @ViewChild('overlayTemplate', { static: true, read: TemplateRef })
  private overlayTemplate!: TemplateRef<unknown>;

  // Input properties
  readonly config = input<DpOverlayConfig | null>(null);
  readonly isOpen = input<boolean>(false);

  // Output events
  readonly opened = output<void>();
  readonly closed = output<void>();
  readonly backdropClick = output<MouseEvent>();
  readonly escapeKeyPress = output<KeyboardEvent>();

  // Internal state
  private overlayRef: OverlayRef | null = null;
  private portal: TemplatePortal | null = null;

  // Computed config properties
  readonly width = computed(() => this.config()?.width);
  readonly height = computed(() => this.config()?.height);
  readonly minWidth = computed(() => this.config()?.minWidth);
  readonly minHeight = computed(() => this.config()?.minHeight);
  readonly maxWidth = computed(() => this.config()?.maxWidth);
  readonly maxHeight = computed(() => this.config()?.maxHeight);

  constructor() {
    // Effect to manage overlay open/close state
    effect(() => {
      const shouldBeOpen = this.isOpen();
      const config = this.config();

      if (shouldBeOpen && config) {
        this.openOverlay(config);
      } else if (!shouldBeOpen) {
        this.closeOverlay();
      }
    });
  }

  private openOverlay(config: DpOverlayConfig): void {
    if (this.overlayRef?.hasAttached()) {
      return; // Already open
    }

    // Create overlay config
    const overlayConfig = this.createOverlayConfig(config);
    
    // Create overlay
    this.overlayRef = this.overlay.create(overlayConfig);
    
    // Create portal
    this.portal = new TemplatePortal(this.overlayTemplate, {
      $implicit: null
    } as never);

    // Attach portal to overlay
    this.overlayRef.attach(this.portal);

    // Set up event listeners
    this.setupEventListeners(config);

    // Emit opened event
    this.opened.emit();
  }

  private closeOverlay(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
      this.closed.emit();
    }
  }

  private createOverlayConfig(config: DpOverlayConfig): OverlayConfig {
    const overlayConfig = new OverlayConfig();

    // Set position strategy
    if (config.origin) {
      overlayConfig.positionStrategy = this.createPositionStrategy(config);
    } else {
      overlayConfig.positionStrategy = this.overlay.position().global();
    }

    // Set backdrop
    overlayConfig.hasBackdrop = config.hasBackdrop ?? true;
    if (config.backdropClass) {
      overlayConfig.backdropClass = config.backdropClass;
    }

    // Set panel class
    if (config.panelClass) {
      overlayConfig.panelClass = config.panelClass;
    }

    // Set scroll strategy
    overlayConfig.scrollStrategy = this.overlay.scrollStrategies.reposition();

    // Set size constraints
    if (config.width) overlayConfig.width = config.width;
    if (config.height) overlayConfig.height = config.height;
    if (config.minWidth) overlayConfig.minWidth = config.minWidth;
    if (config.minHeight) overlayConfig.minHeight = config.minHeight;
    if (config.maxWidth) overlayConfig.maxWidth = config.maxWidth;
    if (config.maxHeight) overlayConfig.maxHeight = config.maxHeight;

    return overlayConfig;
  }

  private createPositionStrategy(config: DpOverlayConfig): FlexibleConnectedPositionStrategy {
    const originElement = config.origin instanceof ElementRef 
      ? config.origin.nativeElement 
      : config.origin;

    const strategy = this.overlay
      .position()
      .flexibleConnectedTo(originElement);

    const offsetX = config.offsetX ?? 0;
    const offsetY = config.offsetY ?? 4;
    const positions = config.positions ?? 'below';

    switch (positions) {
      case 'below':
        strategy.withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetX,
            offsetY,
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetX,
            offsetY: -offsetY,
          },
        ]);
        break;

      case 'above':
        strategy.withPositions([
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetX,
            offsetY: -offsetY,
          },
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetX,
            offsetY,
          },
        ]);
        break;

      case 'auto':
      default:
        strategy.withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetX,
            offsetY,
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetX,
            offsetY: -offsetY,
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetX: -offsetX,
            offsetY,
          },
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
            offsetX: -offsetX,
            offsetY: -offsetY,
          },
        ]);
        break;
    }

    return strategy;
  }

  private setupEventListeners(config: DpOverlayConfig): void {
    if (!this.overlayRef) return;

    // Backdrop click
    if (config.hasBackdrop !== false) {
      this.overlayRef.backdropClick().subscribe((event: MouseEvent) => {
        this.backdropClick.emit(event);
        if (config.backdropClickCloses !== false) {
          this.closeOverlay();
        }
      });
    }

    // Escape key press
    if (config.escapeKeyCloses !== false) {
      this.overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          this.escapeKeyPress.emit(event);
          this.closeOverlay();
        }
      });
    }
  }

  // Public methods
  updatePosition(): void {
    if (this.overlayRef) {
      this.overlayRef.updatePosition();
    }
  }

  dispose(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.portal = null;
    }
  }

  ngOnDestroy(): void {
    this.dispose();
  }
}