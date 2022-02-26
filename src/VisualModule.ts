import { createApp } from 'vue';
import { Game, GameModule } from './Game';
import App from './visual';

export interface IVisualModuleConfig {
  mount?: string;
}

export class VisualModule implements GameModule {
  constructor(
    private config?: IVisualModuleConfig
  ) {}

  public update() {}

  public init(gameInstance: Game) {
    createApp(App(gameInstance)).mount(this.config?.mount || '#app');
    console.log('Visual module init');
  }
}
