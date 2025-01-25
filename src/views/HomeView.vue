<template>
  <main>
    <TitleComp :guest_type="guest_type" />
    <LetterComp :guest_type="guest_type" />
    <ContactComp />
  </main>
</template>

<script>
import TitleComp from "@/components/TitleComp.vue";
import LetterComp from "@/components/LetterComp.vue";
import ContactComp from "@/components/ContactComp.vue";

import { GuestType } from '@/constants';

export default {
  name: "HomeView",
  components: {
    TitleComp,
    LetterComp,
    ContactComp,
  },
  data() {
    return {
      guest_type: GuestType.GUEST,
    }
  }
};
</script>