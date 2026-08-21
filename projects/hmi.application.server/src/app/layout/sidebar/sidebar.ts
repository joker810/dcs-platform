import { Component, inject } from '@angular/core';
import { ExtensionRegistry } from 'hmi.reusable.web.imp';
import { ExtensionPoints, MenuItem } from 'hmi.reusable.web.ifc';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  extensionRegistry = inject(ExtensionRegistry);
  readonly menuItems =
    this.extensionRegistry.contributions<MenuItem>(
        ExtensionPoints.SIDEBAR
    );
}
