import { onBeforeMount, onMounted } from "vue";

export function useClickOutside(el_target_ref, callback_fn) {
  if (!el_target_ref) return;

  let listener = (e) => {
    if (e.target == el_target_ref.value) {
      // We clicked inside element
      return;
    }
    if (typeof callback_fn == "function") {
      callback_fn();
    }
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onBeforeMount(() => {
    window.removeEventListener("click", listener);
  });
}
