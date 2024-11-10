<script setup lang="ts">
const emit = defineEmits<{ (e: 'change', value: boolean): void }>();
const handleChange = (value: boolean) => {
  emit('change', value);
};
</script>

<template>
  <fieldset>
    <legend>新しいお届け先を登録しますか？</legend>
    <label>
      <input
        type="radio"
        name="registerDeliveryAddress"
        value="0"
        @change="handleChange(false)"
      />
      いいえ
    </label>
    <label>
      <input
        type="radio"
        name="registerDeliveryAddress"
        value="1"
        @change="handleChange(true)"
      />
      はい
    </label>
  </fieldset>
</template>
