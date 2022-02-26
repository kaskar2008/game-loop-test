import { Game, GameModule } from './Game';

export class DebugModule implements GameModule {
  private gameInstance: Game | null = null;
  private lastTimeValue = performance.now();
  private timeDiffValue = 0;

  public static events = {
    fpsInfoUpdate: 'DebugModule:fps-update',
  };

  public update() {
    const now = performance.now();
    this.timeDiffValue = (now - this.lastTimeValue) / 1000;
    this.lastTimeValue = now;
    this.gameInstance?.eventManager.fire(
      DebugModule.events.fpsInfoUpdate,
      Math.floor(1 / this.timeDiffValue)
    );
  }

  public init(gameInstance: Game) {
    this.gameInstance = gameInstance;
    console.log('Debug module init');
  }
}
