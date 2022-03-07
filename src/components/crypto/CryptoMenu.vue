<template v-slot:activator="{ on, attrs }">
  <v-btn left class="mx-2" fab dark color="teal"><v-icon dark>mdi-format-list-bulleted-square</v-icon></v-btn>
  <v-menu>
  <v-list>
  <v-list-item
  v-for="(item, index) in items"
  :key="index"
  >
  <v-list-item-title>{{ item.title }}</v-list-item-title>
</v-list-item>
</v-list>
</v-menu>
</div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
}
</script>
