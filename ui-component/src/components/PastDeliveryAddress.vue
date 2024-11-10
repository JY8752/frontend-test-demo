<script setup lang="ts">
import { computed } from 'vue';
import { AddressOption } from './AddressForm.vue';

type Props = {
  disabled?: boolean;
  options: AddressOption[];
};
const { disabled, options } = defineProps<Props>();

const fieldsetStyle = computed(() => `opacity: ${disabled ? 0.3 : 1}`);
</script>

<template>
  <fieldset :disabled :style="fieldsetStyle">
    <legend>過去のお届け先</legend>
    <select name="pastDeliveryAddress">
      <option v-for="{ id, ...opt } in options" :key="id" v-bind="opt" />
    </select>
  </fieldset>
</template>
