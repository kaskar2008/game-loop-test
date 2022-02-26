import { defineComponent, InjectionKey, provide } from 'vue';
import { Game } from '../Game';
import FPSCounter from './FPSCounter';
import InputDisplay from './InputDisplay';
import StartGameButton from './StartGameButton';

export const gameInjectionKey: InjectionKey<Game> = Symbol()

export default (gameInstance: Game) => defineComponent({
  setup() {
    provide(gameInjectionKey, gameInstance);

    return () => (
      <>
        <StartGameButton/>
        <FPSCounter/>
        <InputDisplay/>
      </>
    );
  },
})
