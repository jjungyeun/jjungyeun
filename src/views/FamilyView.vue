<template>
  <main>
    <TitleComp :guest_type="guest_type" :guest_status="guest_status" />
    <LetterComp :guest_type="guest_type" />
    <IntervalPhoto />
    <ContactComp />
    <CalendarComp :guest_status="guest_status" />
    <GalleryComp />
    <LocationComp1 v-if="guest_status==GuestStatus.JY_DAD || guest_status==GuestStatus.YJ_MOM" />
    <LocationComp2 v-if="guest_status==GuestStatus.JY_MOM" />
    <LocationComp3 v-if="guest_status==GuestStatus.YJ_DAD" />
    <AccountComp />
    <LastPhoto />
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
import LocationComp1 from "@/components/LocationComp1.vue";
import LocationComp2 from "@/components/LocationComp2.vue";
import LocationComp3 from "@/components/LocationComp3.vue";
import AccountComp from "@/components/AccountComp.vue";
import Footer from "@/components/Footer.vue"
import FloatingButtons from "@/components/FloatingButtons.vue"
import BgmComp from "@/components/BgmComp.vue";
import IntervalPhoto from "@/components/IntervalPhoto.vue"
import LastPhoto from "@/components/LastPhoto.vue"

import { GuestType, GuestStatus } from '@/constants';

export default {
  name: "FamilyView",
  components: {
    TitleComp,
    LetterComp,
    ContactComp,
    CalendarComp,
    GalleryComp,
    LocationComp1,
    LocationComp2,
    LocationComp3,
    AccountComp,
    Footer,
    FloatingButtons,
    BgmComp,
    IntervalPhoto,
    LastPhoto,
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