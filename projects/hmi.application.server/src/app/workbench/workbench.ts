import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Sidebar} from "../layout/sidebar/sidebar";

@Component({
  selector: 'app-workbench',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './workbench.html',
  styleUrl: './workbench.css',
})
export class Workbench {}
