import { Game, GameModule } from './Game';

export type TInputModuleIvents = keyof typeof InputModule.events;

export class InputModule implements GameModule {
  private gameInstance: Game | null = null;
  private gamepads: Record<number, Gamepad> = {};

  private eventHandlersMap: Record<TInputModuleIvents, keyof DocumentEventMap> = {
    keyDown: 'keydown',
    keyPress: 'keypress',
    keyUp: 'keyup',
  }

  public static events = {
    keyDown: 'InputModule:key-down',
    keyUp: 'InputModule:key-up',
    keyPress: 'InputModule:key-press',
  };

  public static getGamepads() {
    return navigator.getGamepads ? navigator.getGamepads() : [];
  }

  public static isButtonPressed(b: GamepadButton) {
    if (typeof b === 'object') {
      return b.pressed;
    }
    return b == 1.0;
  }

  public update() {}

  public init(gameInstance: Game) {
    this.gameInstance = gameInstance;

    const gamepadHandler = (event: GamepadEvent, connecting: boolean) => {
      var gamepad = event.gamepad;

      if (connecting) {
        this.gamepads[gamepad.index] = gamepad;
      } else {
        delete this.gamepads[gamepad.index];
      }
    }

    window.addEventListener('gamepadconnected', function(e) { gamepadHandler(e, true); }, false);
    window.addEventListener('gamepaddisconnected', function(e) { gamepadHandler(e, false); }, false);

    Object.keys(this.eventHandlersMap).forEach(eventKey => {
      document.addEventListener(this.eventHandlersMap[eventKey as TInputModuleIvents], (e: Event) => {
        this.gameInstance?.eventManager.fire(InputModule.events[eventKey as TInputModuleIvents], e);
      })
    })
    console.log('Input module init');
  }
}
