<template>
  <main>
    <TitleComp :guest_type="guest_type" :guest_status="guest_status" />
    <LetterComp :guest_type="guest_type" />
    <ContactComp />
    <CalendarComp :guest_status="guest_status" />
    <GalleryComp />
    <LocationComp v-if="guest_status==GuestStatus.JY_DAD || guest_status==GuestStatus.YJ_MOM" />
    <AccountComp />
    <Footer />
    <FloatingButtons :guest_status="guest_status" />
    <BgmComp />
  </main>
</template>

<script>
import TitleComp from "@/components/TitleComp.vue";
import LetterComp from "@/components/LetterComp.vue";
import ContactComp from "@/components/ContactComp.vue";
import CalendarComp from "@/components/CalendarComp.vue";
import GalleryComp from "@/components/GalleryComp.vue";
import LocationComp from "@/components/LocationComp.vue";
import AccountComp from "@/components/AccountComp.vue";
import Footer from "@/components/Footer.vue"
import FloatingButtons from "@/components/FloatingButtons.vue"
import BgmComp from "@/components/BgmComp.vue";

import { GuestType, GuestStatus } from '@/constants';

export default {
  name: "FamilyView",
  components: {
    TitleComp,
    LetterComp,
    ContactComp,
    CalendarComp,
    GalleryComp,
    LocationComp,
    AccountComp,
    Footer,
    FloatingButtons,
    BgmComp,
  },
  data() {
    return {
      guest_type: GuestType.FAMILY,
    }
  },
  computed: {
    guest_status() {
      const statusKey = this.$route.query.status;
      return GuestStatus[statusKey] || GuestStatus.DEFAULT;
    },
    GuestStatus() {
      return GuestStatus;
    },
  },
};
</script>