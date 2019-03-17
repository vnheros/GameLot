import { NgModule } from '@angular/core';
import { NumbersPanelComponent } from './numbers-panel/numbers-panel.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [NumbersPanelComponent],
    imports: [CommonModule , IonicModule],
    exports: [NumbersPanelComponent]
})

export class ComponentsModule {}