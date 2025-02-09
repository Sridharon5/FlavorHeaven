import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-cards',
  imports: [],
  templateUrl: './recipe-cards.component.html',
  styleUrl: './recipe-cards.component.scss'
})
export class RecipeCardsComponent {
 @Input()
  text!: string;
  @Input() Title!:string;

  @Input() imga!:string;

  @Output() cardClick = new EventEmitter<void>();

  onCardClick() {
    this.cardClick.emit();
  }


}
