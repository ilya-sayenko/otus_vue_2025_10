<script setup lang="ts">
import {usePartyStore} from "@/stores/partyStore.ts";
import {storeToRefs} from "pinia";
import {Party} from "@/models/Party.ts";
import {PartyCreateRequest} from "@/http/models/PartyCreateRequest.ts";
import PartyCard from "@/components/PartyCard.vue";
import {useRouter} from "vue-router";

const partyStore = usePartyStore();
const router = useRouter();
const { localParties } = storeToRefs(partyStore);

async function addParty() {
  const party = new PartyCreateRequest();
  party.name = "Party";
  party.description = "Party description";
  const newPartyId = await partyStore.createParty(party);
  partyStore.saveLocalParty({
    id: newPartyId,
    name: party.name,
    description: party.description
  });
}

function routeToPartyPage(partyId: string) {
  router.push(`/parties/${partyId}`);
}
</script>

<template>
  <div class="container">
    <div class="card">
      <h2>📅 Мои события</h2>
      <button class="btn btn-main" @click="addParty">Добавить событие</button>

      <div class="parties-grid">
        <PartyCard
          v-for="localParty in localParties"
          :id="localParty.id"
          :name="localParty.name"
          @click="routeToPartyPage(localParty.id)"
        ></PartyCard>
<!--        <PartyCard name="123" description="123"></PartyCard>-->
<!--        <PartyCard name="123" description="123"></PartyCard>-->
<!--        <PartyCard name="123" description="123"></PartyCard>-->
      </div>
    </div>

  </div>

</template>

<style scoped>

</style>