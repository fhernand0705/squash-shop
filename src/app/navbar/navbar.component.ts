import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

<<<<<<< HEAD
=======
  dropMenu() {
    let btn = document.getElementById('dropdown');
    btn.classList.toggle('show');
  }

>>>>>>> master
}
