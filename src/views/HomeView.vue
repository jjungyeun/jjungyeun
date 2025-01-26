<template>
  <main>
    <TitleComp :guest_type="guest_type" />
    <LetterComp :guest_type="guest_type" />
    <ContactComp />
    <AccountComp />

  </main>
</template>

<script>
import TitleComp from "@/components/TitleComp.vue";
import LetterComp from "@/components/LetterComp.vue";
import ContactComp from "@/components/ContactComp.vue";
import AccountComp from "@/components/AccountComp.vue";

import { GuestType } from '@/constants';

export default {
  name: "HomeView",
  components: {
    TitleComp,
    LetterComp,
    ContactComp,
    AccountComp,
  },
  data() {
    return {
      guest_type: GuestType.GUEST,
    }
  }
};
</script>