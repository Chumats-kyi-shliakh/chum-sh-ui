import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input() public titleText!: string;
  @Input() public isBackButton = false;

  constructor(private router: Router) {}

  public goToMainPage(): void {
    this.router.navigate(['']);
  }
}
