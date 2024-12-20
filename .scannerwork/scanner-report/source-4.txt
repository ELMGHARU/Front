import { Component, OnInit } from '@angular/core';
import { DeckService, CreateFlashcardRequest, Flashcard, FlashcardsResponse } from '../deck.service';
import { CloudinaryService } from '../services/cloudinary.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class AddCardComponent implements OnInit {
  flashcard: CreateFlashcardRequest = {
    question: '',
    answer: '',
    imageUrl: '',
    deckId: 1, // Valeur par défaut, qui sera mise à jour dans ngOnInit
    difficultyLevel: 1
  };

  maxQuestionLength = 20;
  maxAnswerLength = 20;
  selectedImage: string | null = null;
  isLoading: boolean = false;
  isUploading: boolean = false;
  errorMessage: string | null = null;
  flashcards: Flashcard[] = [];
  currentDeckId: number | null = null;

  constructor(
    private deckService: DeckService,
    private cloudinaryService: CloudinaryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Récupération du deckId depuis la query string
    const deckIdFromQuery = this.route.snapshot.queryParamMap.get('deckId');
    console.log('Deck ID récupéré depuis la query string:', deckIdFromQuery);

    if (deckIdFromQuery && !isNaN(+deckIdFromQuery)) {
      this.flashcard.deckId = +deckIdFromQuery;
      this.currentDeckId = +deckIdFromQuery;
      this.getFlashcards();
    } else {
      this.errorMessage = 'Deck ID invalide ou manquant.';
      console.error('Deck ID invalide ou manquant');
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // Afficher l'aperçu
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);

      // Upload vers Cloudinary
      this.isUploading = true;
      this.errorMessage = null;

      this.cloudinaryService.uploadImage(file).subscribe({
        next: (url) => {
          this.flashcard.imageUrl = url;
          this.isUploading = false;
        },
        error: (error) => {
          console.error('Erreur lors du téléchargement de l\'image:', error);
          this.errorMessage = 'Erreur lors du téléchargement de l\'image';
          this.isUploading = false;
        }
      });
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.flashcard.imageUrl = '';
  }

  addFlashcard() {
    if (this.flashcard.question.trim().length > this.maxQuestionLength) {
      this.errorMessage = `La question ne doit pas dépasser ${this.maxQuestionLength} caractères.`;
      return;
    }

    if (this.flashcard.answer.trim().length > this.maxAnswerLength) {
      this.errorMessage = `La réponse ne doit pas dépasser ${this.maxAnswerLength} caractères.`;
      return;
    }

    if (this.isUploading) {
      this.errorMessage = 'Veuillez attendre que l\'image soit téléchargée.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // Ajout de la flashcard
    console.log('Ajout de la carte:', this.flashcard);

    this.deckService.createFlashcard(this.flashcard).subscribe({
      next: (response) => {
        console.log('Carte créée avec succès:', response);
        this.resetForm();
        this.getFlashcards();
        this.router.navigate(['/decks']); // Navigate vers la page des paquets
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erreur lors de la création de la carte:', error);
        this.errorMessage = 'Une erreur est survenue lors de la création de la carte.';
      }
    });
  }

  getFlashcards() {
    this.deckService.getFlashcardsByDeckId(this.flashcard.deckId).subscribe({
      next: (response: FlashcardsResponse) => {
        this.flashcards = response.content;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des flashcards:', error);
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.flashcard = {
      question: '',
      answer: '',
      imageUrl: '',
      deckId: this.currentDeckId || 1,
      difficultyLevel: 1
    };
    this.selectedImage = null;
    this.isLoading = false;
  }

  goBack() {
    this.router.navigate(['/decks']);
  }
}
