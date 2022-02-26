import { Game } from './Game';
import { DebugModule } from './DebugModule';
import { EntityModule } from './EntityModule';
import { VisualModule } from './VisualModule';
import { InputModule } from './InputModule';

(window as any).game = new Game([
  new EntityModule(),
  new DebugModule(),
  new VisualModule(),
  new InputModule(),
]);
