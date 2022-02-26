import { computed, defineComponent, inject, ref } from 'vue';
import { gameInjectionKey } from '.';
import { InputModule } from '../InputModule';

export default defineComponent({
  setup() {
    const game = inject(gameInjectionKey);
    const MAXIMUM_HISTORY_LENGTH = 10;
    const DEBOUNCE = 3000;
    const keyPressHistory = ref<KeyboardEvent[]>([]);
    const lastKeyPressed = computed(() => keyPressHistory.value[0]?.key || '');
    let debounceTimer = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      keyPressHistory.value.unshift(e);

      if (keyPressHistory.value.length > MAXIMUM_HISTORY_LENGTH) {
        keyPressHistory.value = keyPressHistory.value.slice(0, MAXIMUM_HISTORY_LENGTH);
      }

      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        keyPressHistory.value = [];
      }, DEBOUNCE);
    };

    if (game) {
      game.eventManager.listen(InputModule.events.keyDown, onKeyDown);
    }

    return () => (
      <p>Last key pressed: {lastKeyPressed.value} ({keyPressHistory.value.map(e => e.key).join(',')})</p>
    );
  },
})
