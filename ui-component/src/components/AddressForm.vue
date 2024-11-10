<script setup lang="ts">
import { ref } from 'vue';
import { JSX } from 'vue/jsx-runtime';
import ContactNumber from './ContactNumber.vue';
import RegisterDeliveryAddress from './RegisterDeliveryAddress.vue';
import DeliveryAddress from './DeliveryAddress.vue';
import PastDeliveryAddress from './PastDeliveryAddress.vue';

export type AddressOption = JSX.IntrinsicElements['option'] & { id: string };
export type Props = {
  deliveryAddresses?: AddressOption[];
  onSubmit?: (e: Event) => void;
};

defineProps<Props>();

const registerNew = ref<boolean | undefined>(undefined);
</script>

<template>
  <form @submit="onSubmit">
    <h2>お届け先情報の入力</h2>
    <ContactNumber />
    <template v-if="deliveryAddresses && deliveryAddresses.length">
      <RegisterDeliveryAddress @change="(value) => (registerNew = value)" />
      <template v-if="registerNew">
        <DeliveryAddress title="新しいお届け先" />
      </template>
      <PastDeliveryAddress
        :disabled="registerNew === undefined"
        :options="deliveryAddresses"
      />
    </template>
    <template v-else>
      <DeliveryAddress />
    </template>
    <hr />
    <div>
      <button type="submit">注文内容の確認へ進む</button>
    </div>
  </form>
</template>
