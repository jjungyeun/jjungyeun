<template>
  <main>
    <TitleComp />
    <LetterComp />
    <ContactComp />
  </main>
</template>

<script>
import TitleComp from "@/components/TitleComp.vue";
import LetterComp from "@/components/LetterComp.vue";
import ContactComp from "@/components/ContactComp.vue";

export default {
  name: "HomeView",
  components: {
    TitleComp,
    LetterComp,
    ContactComp,
  },
};
</script>