import { defineComponent, inject, ref } from 'vue';
import { gameInjectionKey } from '.';
import { DebugModule } from '../DebugModule';

export default defineComponent({
  setup() {
    const game = inject(gameInjectionKey);
    const fps = ref(0);
    const debouncedFps = ref(0);
    const debounce = 100;

    const onFpsUpdate = (payload: number) => {
      fps.value = payload;
    }

    if (game) {
      setInterval(() => {
        debouncedFps.value = fps.value;
      }, debounce)

      game.eventManager.listen(DebugModule.events.fpsInfoUpdate, onFpsUpdate);
    }

    return () => (
      <p>FPS: {debouncedFps.value}</p>
    );
  },
})
