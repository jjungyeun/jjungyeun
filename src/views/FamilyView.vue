<template>
  <main>
    <TitleComp :guest_type="guest_type" :family_status="family_status" />
    <LetterComp :guest_type="guest_type" />
    <CalendarComp v-if="family_status!=FamilyStatus.DEFAULT" :family_status="family_status" />
    <ContactComp />
  </main>
</template>

<script>
import TitleComp from "@/components/TitleComp.vue";
import LetterComp from "@/components/LetterComp.vue";
import ContactComp from "@/components/ContactComp.vue";
import CalendarComp from "@/components/CalendarComp.vue";

import { GuestType, FamilyStatus } from '@/constants';

export default {
  name: "FamilyView",
  components: {
    TitleComp,
    LetterComp,
    ContactComp,
    CalendarComp,
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
    },
    FamilyStatus() {
      return FamilyStatus;
    },
  },
};
</script>