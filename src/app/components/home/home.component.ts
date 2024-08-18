import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Game } from 'src/app/model/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  games: Game[] = [];
  errorMessage: string | null = null;
  showLoader:boolean = true;

  constructor(private gameService: GamesService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.fetchGamesData();
  }

  fetchGamesData(filters: any = {}) {
    this.gameService.getGames(filters).subscribe({
      next: (res) => {
        this.games = res.data;
        this.errorMessage = null; // Clear any previous error messages
        this.showLoader = false;
      },
      error: (error) => {
        this.toastr.error('Failed to load games data.', 'Error');
        this.errorMessage = error.message;
        this.games = []; // Optionally clear games data on error
      }
    });
  }

  onFiltersChanged(filters: any) {
    this.fetchGamesData(filters);
  }

}
