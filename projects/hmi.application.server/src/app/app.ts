import { Component, signal , OnInit,inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Workbench } from "./workbench/workbench";
import { HMI_LOGGER_TOKEN} from 'hmi.reusable.web.imp';
import { HmiLogger } from 'hmi.reusable.web.ifc';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Workbench],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('shell');

  private logger:HmiLogger = inject(HMI_LOGGER_TOKEN);

  ngOnInit(): void {
    this.logger.info('hmi shell initialized');
  }
 
}
