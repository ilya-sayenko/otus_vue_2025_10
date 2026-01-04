import {ref, computed, watch} from 'vue'
import { defineStore } from 'pinia'
import type {Party} from "@/models/Party.ts";
import {MoneySplitterHttpClient} from "@/http/MoneySplitterHttpClient.ts";
import type {Participant} from "@/models/Participant.ts";
import type {Spending} from "@/models/Spending.ts";
import type {Transaction} from "@/models/Transaction.ts";
import type {PartyCreateRequest} from "@/http/models/PartyCreateRequest.ts";

export const usePartyStore = defineStore('party', () => {
  const LOCAL_STORAGE_KEY = "PARTY_LOCAL_STORAGE_KEY";
  const httpClient = new MoneySplitterHttpClient();
  const party = ref<Party>();
  const participants = ref<Participant[]>();
  const spendings = ref<Spending[]>();
  const transactions = ref<Transaction[]>();
  const localParties = ref<Party[]>(loadLocalParties());

  async function loadPartyById(partyId: string) {
    party.value = await httpClient.getPartyById(partyId);
  }

  async function loadParticipantsByPartyId(partyId: string) {
    participants.value = await httpClient.getParticipantsByPartyId(partyId);
  }

  async function loadSpendingsByPartyId(partyId: string) {
    spendings.value = await httpClient.getSpendingsByPartyId(partyId);
  }

  async function loadTransactionsByPartyId(partyId: string) {
    transactions.value = await httpClient.getTransactionsByPartyId(partyId);
  }

  async function createParty(party: PartyCreateRequest) {
    const newPartyId = httpClient.postParty(party);
    return newPartyId;
  }

  function loadLocalParties(): Party[] {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored);
    }

    return [];
  }

  watch(localParties, (value) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
  }, { deep: true });

  function saveLocalParty(party: Party) {
    localParties.value.push(party);
  }

  return {
    party,
    participants,
    spendings,
    transactions,
    localParties,
    loadPartyById,
    loadParticipantsByPartyId,
    loadSpendingsByPartyId,
    loadTransactionsByPartyId,
    createParty,
    loadLocalParties,
    saveLocalParty
  };
})
