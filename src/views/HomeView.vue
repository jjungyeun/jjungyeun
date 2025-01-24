<template>
  <main>
    <TitleComp />
    <LetterComp />
  </main>
</template>

<script>
import TitleComp from "@/components/TitleComp.vue";
import LetterComp from "@/components/LetterComp.vue";

export default {
  name: "HomeView",
  components: {
    TitleComp,
    LetterComp,
  },
};
</script>