import { Component, signal , OnInit,inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Workbench } from "./workbench/workbench";
// import {DevelopmentPluginSource} from "../plugin-sources/development-plugin-source";
import { PluginManager } from 'hmi.reusable.web.imp';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Workbench],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit{
  protected readonly title = signal('shell');
  private pluginManager = inject(PluginManager);

  ngOnInit(): void {
    // Delays execution by 5000 milliseconds (5 seconds)
    setTimeout(() => {
      console.log("this ran")
      // this.pluginManager.uninstall('welcome');
    }, 5000);
  }
}
