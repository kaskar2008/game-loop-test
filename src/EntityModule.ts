import { GameModule } from './Game';

export class EntityModule implements GameModule {
  public update() {}

  public init() {
    console.log('Entity module init');
  }
}
