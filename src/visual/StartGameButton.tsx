import { computed, defineComponent, inject, ref } from 'vue';
import { gameInjectionKey } from '.';
import { EGameState, Game } from '../Game';

export default defineComponent({
  setup() {
    const game = inject(gameInjectionKey);
    const gameState = ref<EGameState>(EGameState.IDLE);
    const buttonText = computed(() => {
      let text = '';

      if (gameState.value === EGameState.IDLE) {
        text = 'Start the game loop';
      } else if (gameState.value === EGameState.PAUSED) {
        text = 'Continue the game loop';
      } else {
        text = 'Pause the game loop'
      }

      return text;
    });

    game?.eventManager.listen(Game.events.state, (state: EGameState) => {
      gameState.value = state;
    });

    const onClick = () => {
      if (gameState.value === EGameState.IDLE || gameState.value === EGameState.PAUSED) {
        game?.start();
      } else {
        game?.pause();
      }

      console.log(gameState.value);
    }

    return () => (
      <div>
        <button onClick={onClick}>{buttonText.value}</button>
      </div>
    );
  },
})
