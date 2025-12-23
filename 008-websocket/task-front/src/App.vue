<script setup>
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import { createClient } from 'graphql-ws'
import {ApolloClient, ApolloLink, gql, HttpLink, InMemoryCache} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {onMounted, ref} from "vue";

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
  })
)

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

const tasks = ref([])

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      status
    }
  }
`

const TASK_ADDED_SUBSCRIPTION = gql`
  subscription OnTaskAdded {
    taskAdded {
      id
      title
      status
    }
  }
`

onMounted(async () => {
  const { data } = await apolloClient.query({
    query: GET_TASKS
  })
  tasks.value = data.tasks

  apolloClient.subscribe({
    query: TASK_ADDED_SUBSCRIPTION
  }).subscribe({
    next({ data }) {
      console.log('subscribe done')
      console.log(data)
      tasks.value = [...tasks.value, data.taskAdded]
    },
    error(err) {
      console.error('Subscription error:', err)
    }
  })
})

</script>

<template>
  <div>
    <h2>Tasks</h2>
    <ul>
      <li v-for="task in tasks">
        {{ task.title }} - {{ task.status }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
