import {Component} from '@angular/core';
import {SettingsService} from "../service/settings/settings.service";

@Component({
  selector: 'bitstamp-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent {
  useMocks?: boolean;
  settingsMenuOpen = false;

  constructor(private settingsService: SettingsService) {
    this.useMocks = this.settingsService.settings.useMocks;
  }

  setMockedApi(checked: boolean) {
    this.useMocks = checked;
    this.settingsService.setUseMocks(this.useMocks);
  }
}
