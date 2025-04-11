import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAulasComponent } from './video-aulas.component';

describe('VideoAulasComponent', () => {
  let component: VideoAulasComponent;
  let fixture: ComponentFixture<VideoAulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoAulasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
