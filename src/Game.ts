import EventManager from 'js-simple-events';

export abstract class GameModule {
  public init(gameInstance: Game) {}
  public update() {}
}

export enum EGameState {
  IDLE = 'idle',
  STARTED = 'started',
  PAUSED = 'paused',
}

export class Game {
  constructor(
    private modules: GameModule[] = []
  ) {
    this.modules.forEach(module => module.init(this));
    this.eventManager.fire(Game.events.state, this.state);
  }

  public eventManager = new EventManager();
  public state: EGameState = EGameState.IDLE;

  public static events = {
    state: 'Game:state-change',
  };

  private gameLoop(){
    if (this.state === EGameState.STARTED) {
      window.requestAnimationFrame(this.gameLoop.bind(this));
      this.update();
    }
  }

  private update() {
    this.modules.forEach(module => module.update());
  }

  public start() {
    this.state = EGameState.STARTED;
    this.eventManager.fire(Game.events.state, this.state);
    this.gameLoop();
  }

  public pause() {
    this.state = EGameState.PAUSED;
    this.eventManager.fire(Game.events.state, this.state);
  }
}
