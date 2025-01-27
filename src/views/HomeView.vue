<template>
  <main>
    <TitleComp :guest_type="guest_type" :guest_status="guest_status" />
    <LetterComp :guest_type="guest_type" />
    <ContactComp />
    <CalendarComp :guest_status="guest_status" />
    <GalleryComp />
    <AccountComp v-if="account_status" />
    <Footer />
    <FloatingButtons :guest_status="guest_status" />
  </main>
</template>

<script>
import TitleComp from "@/components/TitleComp.vue";
import LetterComp from "@/components/LetterComp.vue";
import ContactComp from "@/components/ContactComp.vue";
import CalendarComp from "@/components/CalendarComp.vue";
import GalleryComp from "@/components/GalleryComp.vue";
import AccountComp from "@/components/AccountComp.vue";
import Footer from "@/components/Footer.vue"
import FloatingButtons from "@/components/FloatingButtons.vue"

import { GuestType, GuestStatus } from '@/constants';

export default {
  name: "HomeView",
  components: {
    TitleComp,
    LetterComp,
    ContactComp,
    CalendarComp,
    GalleryComp,
    AccountComp,
    Footer,
    FloatingButtons,
  },
  data() {
    return {
      guest_type: GuestType.GUEST,
    }
  },
  computed: {
    guest_status() {
      const statusKey = this.$route.query.status;
      return GuestStatus[statusKey] || GuestStatus.DEFAULT;
    },
    account_status() {
      const statusKey = this.$route.query.account;
      return statusKey == "y" ? true : false;
    },
  },
};
</script>