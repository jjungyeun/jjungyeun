<template>
  <main>
    <TitleComp :guest_type="guest_type" :family_status="family_status" />
    <LetterComp :guest_type="guest_type" />
    <ContactComp />
  </main>
</template>

<script>
import TitleComp from "@/components/TitleComp.vue";
import LetterComp from "@/components/LetterComp.vue";
import ContactComp from "@/components/ContactComp.vue";

import { GuestType, FamilyStatus } from '@/constants';

export default {
  name: "FamilyView",
  components: {
    TitleComp,
    LetterComp,
    ContactComp,
  },
  data() {
    return {
      guest_type: GuestType.FAMILY,
    }
  },
  computed: {
    family_status() {
      const statusKey = this.$route.query.status;
      return FamilyStatus[statusKey] || FamilyStatus.DEFAULT;
    }
  },
};
</script>