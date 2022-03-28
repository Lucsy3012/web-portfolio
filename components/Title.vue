<template>
  <div v-if="order">
    <slot name="outline" :class="fontSizes"></slot>
    <slot name="fill" :class="fontSizes"></slot>
  </div>
  <div v-else>
    <slot name="fill" :class="fontSizes"></slot>
    <slot name="outline" :class="fontSizes"></slot>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: {
      type: String,
    },
    titleOutline: {
      type: String,
    },
    size: {
      type: Number,
      default: 1,
    },
    order: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    fontSizes() {
      if (this.size === 1) {
        return "tf5 tf6-m tf7-xl";
      } else if (this.size === 2) {
        return "tf4 tf5-m tf6-xl";
      } else if (this.size === 3) {
        return "tf3 tf4-s tf5-l";
      }
    }
  }
}
</script>
